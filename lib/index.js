// src/index.ts
import { defineTool } from "@deepseek-ai/dsh-tools";
import { readFileSync, writeFileSync, renameSync, copyFileSync, unlinkSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
var name = "memory-tool";
var inject = ["tools", "webServer"];
var MEMORY_FILE = join(homedir(), ".dsh", "memory.json");
var TMP_FILE = MEMORY_FILE + ".tmp";
var MAX_CONTENT_LENGTH = 4e3;
var MAX_MEMORIES = 500;
var MAX_RECALL_RESULTS = 30;
var MAX_RECALL_CONTENT = 300;
var writeQueue = Promise.resolve();
function withWriteLock(fn) {
  const run = writeQueue.then(fn, fn);
  writeQueue = run.then(() => void 0, () => void 0);
  return run;
}
function isValidMemory(m) {
  if (typeof m !== "object" || m === null) return false;
  const r = m;
  return typeof r.id === "string" && typeof r.key === "string" && typeof r.category === "string" && typeof r.content === "string" && typeof r.created_at === "string" && typeof r.updated_at === "string";
}
function loadStore() {
  if (!existsSync(MEMORY_FILE)) {
    return { version: 1, memories: [] };
  }
  let raw;
  try {
    raw = readFileSync(MEMORY_FILE, "utf-8");
  } catch (err) {
    console.warn(`[memory-tool] cannot read ${MEMORY_FILE}:`, err);
    return { version: 1, memories: [] };
  }
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || !Array.isArray(parsed.memories)) {
      throw new Error("unexpected shape: expected { version, memories[] }");
    }
    return {
      version: typeof parsed.version === "number" ? parsed.version : 1,
      memories: parsed.memories.filter(isValidMemory)
    };
  } catch (err) {
    const backup = `${MEMORY_FILE}.corrupt-${Date.now()}`;
    try {
      copyFileSync(MEMORY_FILE, backup);
      console.warn(`[memory-tool] memory.json is corrupt (${err instanceof Error ? err.message : String(err)}); backed up to ${backup}`);
    } catch (backupErr) {
      console.warn(`[memory-tool] memory.json is corrupt and backup failed:`, backupErr);
    }
    return { version: 1, memories: [] };
  }
}
function saveStore(store) {
  const dir = join(homedir(), ".dsh");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(TMP_FILE, JSON.stringify(store, null, 2), "utf-8");
  try {
    renameSync(TMP_FILE, MEMORY_FILE);
  } catch (err) {
    try {
      unlinkSync(TMP_FILE);
    } catch {
    }
    throw err;
  }
}
function nowISO() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function clamp(s, max) {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}
function prune(store) {
  if (store.memories.length <= MAX_MEMORIES) return store;
  store.memories = store.memories.slice().sort((a, b) => a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0).slice(-MAX_MEMORIES);
  return store;
}
function apply(ctx) {
  console.log("[memory-tool] apply() called — registering 5 memory tools + HTTP endpoint");
  ctx.effect(() => ctx.webServer.register({
    kind: "exact",
    path: "/api/memory",
    handler: (req, res) => {
      if (req.method !== "GET") {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "method not allowed" }));
        return;
      }
      const store = loadStore();
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      });
      res.end(JSON.stringify(store));
    }
  }), "memory-tool: /api/memory endpoint");
  ctx.tools.register(defineTool({
    name: "memory_save",
    description: "Save a piece of information to long-term memory. Use this to remember user preferences, task context, decisions, or anything that should persist across conversations. If a memory with the same key exists, it will be updated.",
    parameters: {
      key: { type: "string", required: true, description: 'A short identifier for this memory (e.g. "user_profile", "current_task", "stock_watchlist")' },
      content: { type: "string", required: true, description: "The content to remember" },
      category: { type: "string", required: true, description: 'Category for grouping: "identity", "preference", "task", "decision", "knowledge", or custom' }
    },
    output: {
      schema: { type: "string" },
      render: (_args, value) => [{ type: "text", text: value }]
    },
    // 读改写复合操作，禁止并发执行；进程内还有写锁兜底
    isConcurrencySafe: () => false,
    async execute(args) {
      return withWriteLock(async () => {
        const store = loadStore();
        const content = clamp(args.content, MAX_CONTENT_LENGTH);
        const truncated = content !== args.content;
        const existing = store.memories.find((m) => m.key === args.key);
        if (existing) {
          existing.content = content;
          existing.category = args.category;
          existing.updated_at = nowISO();
          saveStore(store);
          return `Memory updated: [${args.category}] ${args.key}
Content: ${content}${truncated ? `
(content truncated to ${MAX_CONTENT_LENGTH} chars)` : ""}
Location: ${MEMORY_FILE}`;
        }
        const mem = {
          id: randomUUID(),
          key: args.key,
          category: args.category,
          content,
          created_at: nowISO(),
          updated_at: nowISO()
        };
        store.memories.push(mem);
        prune(store);
        saveStore(store);
        return `Memory saved: [${args.category}] ${args.key}
Content: ${content}${truncated ? `
(content truncated to ${MAX_CONTENT_LENGTH} chars)` : ""}
Location: ${MEMORY_FILE}`;
      });
    }
  }));
  ctx.tools.register(defineTool({
    name: "memory_recall",
    description: "Recall memories from long-term memory. Search by keyword (matches key, category, or content) or filter by category. Use this at the start of a conversation to recall user context, or when you need to check what was previously decided.",
    parameters: {
      query: { type: "string", required: true, description: "Search keyword (matches key/category/content) or a category name to filter by" }
    },
    output: {
      schema: { type: "string" },
      render: (_args, value) => [{ type: "text", text: value }]
    },
    async execute(args) {
      const store = loadStore();
      if (store.memories.length === 0) {
        return `No memories stored yet. Use memory_save to start remembering things.
Location: ${MEMORY_FILE}`;
      }
      const q = args.query.toLowerCase();
      const matches = store.memories.filter(
        (m) => m.key.toLowerCase().includes(q) || m.category.toLowerCase().includes(q) || m.content.toLowerCase().includes(q)
      );
      if (matches.length === 0) {
        return `No memories matched "${args.query}". Total stored: ${store.memories.length}`;
      }
      const shown = matches.slice(0, MAX_RECALL_RESULTS);
      const lines = shown.map(
        (m) => `[${m.category}] ${m.key}
  ${clamp(m.content, MAX_RECALL_CONTENT)}
  saved: ${m.created_at.slice(0, 10)}${m.updated_at !== m.created_at ? ", updated: " + m.updated_at.slice(0, 10) : ""}`
      );
      const overflow = matches.length > shown.length ? `
… and ${matches.length - shown.length} more (results capped at ${MAX_RECALL_RESULTS})` : "";
      return `Found ${matches.length} memor${matches.length === 1 ? "y" : "ies"} for "${args.query}":

${lines.join("\n\n")}${overflow}`;
    }
  }));
  ctx.tools.register(defineTool({
    name: "memory_list",
    description: "List all stored memories with their keys, categories, and creation dates. Use this to see what the agent already knows about the user.",
    parameters: {
      // 注意：省略 required 键 = 可选；DSL 里 required 只能为 true
      category_filter: { type: "string", description: 'Category to filter by (e.g. "identity", "preference", "task", "decision", "knowledge"). Omit or pass "all" to list everything.' }
    },
    output: {
      schema: { type: "string" },
      render: (_args, value) => [{ type: "text", text: value }]
    },
    async execute(args) {
      const filter = (args.category_filter || "all").toLowerCase();
      const store = loadStore();
      if (store.memories.length === 0) {
        return `No memories stored yet.
Location: ${MEMORY_FILE}`;
      }
      const filtered = filter === "all" ? store.memories : store.memories.filter((m) => m.category.toLowerCase() === filter);
      if (filtered.length === 0) {
        return `No memories in category "${args.category_filter}". Total stored: ${store.memories.length}`;
      }
      const lines = filtered.map(
        (m) => `- [${m.category}] ${m.key} — ${clamp(m.content, 60)} (${m.created_at.slice(0, 10)})`
      );
      return `${filtered.length} memor${filtered.length === 1 ? "y" : "ies"}${filter !== "all" ? ` in category "${args.category_filter}"` : ""}:
Location: ${MEMORY_FILE}

${lines.join("\n")}`;
    }
  }));
  ctx.tools.register(defineTool({
    name: "memory_delete",
    description: "Delete one memory by its exact key. Returns the deleted memory content, or reports that no such key exists.",
    parameters: {
      key: { type: "string", required: true, description: 'The exact key of the memory to delete (e.g. "user_profile", "current_task")' }
    },
    output: {
      schema: { type: "string" },
      render: (_args, value) => [{ type: "text", text: value }]
    },
    // 读改写复合操作，禁止并发执行；进程内还有写锁兜底
    isConcurrencySafe: () => false,
    async execute(args) {
      return withWriteLock(async () => {
        const store = loadStore();
        const idx = store.memories.findIndex((m) => m.key === args.key);
        if (idx === -1) {
          return `No memory found with key "${args.key}". Total stored: ${store.memories.length}`;
        }
        const removed = store.memories[idx];
        store.memories.splice(idx, 1);
        saveStore(store);
        return `Memory deleted: [${removed.category}] ${removed.key}
Content: ${removed.content}
Location: ${MEMORY_FILE}`;
      });
    }
  }));
  ctx.tools.register(defineTool({
    name: "memory_clear",
    description: "Delete ALL stored memories. Use with caution — this permanently empties the memory store. Pass confirm=true to execute.",
    parameters: {
      confirm: { type: "boolean", required: true, description: "Must be true to actually clear the store; any other value aborts safely." }
    },
    output: {
      schema: { type: "string" },
      render: (_args, value) => [{ type: "text", text: value }]
    },
    // 读改写复合操作，禁止并发执行；进程内还有写锁兜底
    isConcurrencySafe: () => false,
    async execute(args) {
      if (args.confirm !== true) {
        return `Aborted: memory_clear requires confirm=true. Total stored: ${loadStore().memories.length}`;
      }
      return withWriteLock(async () => {
        const store = loadStore();
        const count = store.memories.length;
        if (count === 0) {
          return `Memory store is already empty. Location: ${MEMORY_FILE}`;
        }
        saveStore({ version: store.version, memories: [] });
        return `Memory cleared: removed ${count} memor${count === 1 ? "y" : "ies"}.
Location: ${MEMORY_FILE}`;
      });
    }
  }));
}
export {
  apply,
  inject,
  name
};
