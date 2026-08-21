import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { readFileSync, writeFileSync, renameSync, copyFileSync, unlinkSync, existsSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'

// dsh-memory-panel — host half
// 记忆层插件：让 Agent 跨会话记住用户偏好、任务上下文、历史决策。
// 提供 memory_save / memory_recall / memory_list / memory_delete / memory_clear
// 五个工具 + GET /api/memory 端点。
export const name = 'memory-tool'
export const inject = ['tools', 'webServer']

const MEMORY_FILE = join(homedir(), '.dsh', 'memory.json')
const TMP_FILE = MEMORY_FILE + '.tmp'

// —— 增长控制 ——
const MAX_CONTENT_LENGTH = 4000   // 单条记忆内容上限（字符）
const MAX_MEMORIES = 500          // 记忆库总条数上限（超出按创建时间淘汰最旧）
const MAX_RECALL_RESULTS = 30     // memory_recall 单次返回条数上限
const MAX_RECALL_CONTENT = 300    // memory_recall / memory_list 单条展示内容截断（字符）

interface Memory {
  id: string
  key: string
  category: string
  content: string
  created_at: string
  updated_at: string
}

interface MemoryStore {
  version: number
  memories: Memory[]
}

// —— 进程内写串行化 ——
// memory_save 是"读整个文件 → 改 → 写回"的复合操作，多个并发调用会互相覆盖。
// 用一条 promise 链把所有写操作串起来；读操作不参与（写采用原子 rename，读永远看到完整文件）。
let writeQueue: Promise<unknown> = Promise.resolve()
function withWriteLock<T>(fn: () => Promise<T> | T): Promise<T> {
  const run = writeQueue.then(fn, fn)
  // 无论上一步成功还是失败，都让队列继续，避免一次异常永久卡死后续写入
  writeQueue = run.then(() => undefined, () => undefined)
  return run
}

function isValidMemory(m: unknown): m is Memory {
  if (typeof m !== 'object' || m === null) return false
  const r = m as Record<string, unknown>
  return typeof r.id === 'string' &&
    typeof r.key === 'string' &&
    typeof r.category === 'string' &&
    typeof r.content === 'string' &&
    typeof r.created_at === 'string' &&
    typeof r.updated_at === 'string'
}

function loadStore(): MemoryStore {
  if (!existsSync(MEMORY_FILE)) {
    return { version: 1, memories: [] }
  }
  let raw: string
  try {
    raw = readFileSync(MEMORY_FILE, 'utf-8')
  } catch (err) {
    console.warn(`[memory-tool] cannot read ${MEMORY_FILE}:`, err)
    return { version: 1, memories: [] }
  }
  try {
    const parsed = JSON.parse(raw) as Partial<MemoryStore>
    if (typeof parsed !== 'object' || parsed === null || !Array.isArray(parsed.memories)) {
      throw new Error('unexpected shape: expected { version, memories[] }')
    }
    return {
      version: typeof parsed.version === 'number' ? parsed.version : 1,
      memories: parsed.memories.filter(isValidMemory),
    }
  } catch (err) {
    // 损坏时先备份原文件，再从空库继续 —— 绝不静默丢数据
    const backup = `${MEMORY_FILE}.corrupt-${Date.now()}`
    try {
      copyFileSync(MEMORY_FILE, backup)
      console.warn(`[memory-tool] memory.json is corrupt (${err instanceof Error ? err.message : String(err)}); backed up to ${backup}`)
    } catch (backupErr) {
      console.warn(`[memory-tool] memory.json is corrupt and backup failed:`, backupErr)
    }
    return { version: 1, memories: [] }
  }
}

// 原子写：先写临时文件再 rename 覆盖，保证任何时刻读者看到的都是完整文件
function saveStore(store: MemoryStore): void {
  const dir = join(homedir(), '.dsh')
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(TMP_FILE, JSON.stringify(store, null, 2), 'utf-8')
  try {
    renameSync(TMP_FILE, MEMORY_FILE)
  } catch (err) {
    try { unlinkSync(TMP_FILE) } catch { /* ignore */ }
    throw err
  }
}

function nowISO(): string {
  return new Date().toISOString()
}

// 超长内容截断（保留可读性，不静默截掉）
function clamp(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1) + '…' : s
}

// 条数淘汰：超出上限时保留创建时间最新的 MAX_MEMORIES 条
function prune(store: MemoryStore): MemoryStore {
  if (store.memories.length <= MAX_MEMORIES) return store
  store.memories = store.memories
    .slice()
    .sort((a, b) => (a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0))
    .slice(-MAX_MEMORIES)
  return store
}

export function apply(ctx: Context) {
  console.log('[memory-tool] apply() called — registering 5 memory tools + HTTP endpoint')

  // HTTP 端点：暴露 memory.json 给客户端 UI 插件读取
  // GET /api/memory — 返回所有记忆
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/api/memory',
    handler: (req: IncomingMessage, res: ServerResponse) => {
      if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'method not allowed' }))
        return
      }
      const store = loadStore()
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      })
      res.end(JSON.stringify(store))
    },
  }), 'memory-tool: /api/memory endpoint')

  // 工具 1：存记忆（新建或更新）
  ctx.tools.register(defineTool({
    name: 'memory_save',
    description: 'Save a piece of information to long-term memory. Use this to remember user preferences, task context, decisions, or anything that should persist across conversations. If a memory with the same key exists, it will be updated.',
    parameters: {
      key: { type: 'string', required: true, description: 'A short identifier for this memory (e.g. "user_profile", "current_task", "stock_watchlist")' },
      content: { type: 'string', required: true, description: 'The content to remember' },
      category: { type: 'string', required: true, description: 'Category for grouping: "identity", "preference", "task", "decision", "knowledge", or custom' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    // 读改写复合操作，禁止并发执行；进程内还有写锁兜底
    isConcurrencySafe: () => false,
    async execute(args) {
      return withWriteLock(async () => {
        const store = loadStore()
        const content = clamp(args.content, MAX_CONTENT_LENGTH)
        const truncated = content !== args.content
        const existing = store.memories.find(m => m.key === args.key)
        if (existing) {
          existing.content = content
          existing.category = args.category
          existing.updated_at = nowISO()
          saveStore(store)
          return `Memory updated: [${args.category}] ${args.key}\nContent: ${content}${truncated ? `\n(content truncated to ${MAX_CONTENT_LENGTH} chars)` : ''}\nLocation: ${MEMORY_FILE}`
        }
        const mem: Memory = {
          id: randomUUID(),
          key: args.key,
          category: args.category,
          content,
          created_at: nowISO(),
          updated_at: nowISO(),
        }
        store.memories.push(mem)
        prune(store)
        saveStore(store)
        return `Memory saved: [${args.category}] ${args.key}\nContent: ${content}${truncated ? `\n(content truncated to ${MAX_CONTENT_LENGTH} chars)` : ''}\nLocation: ${MEMORY_FILE}`
      })
    },
  }))

  // 工具 2：召回记忆（按关键词或类别）
  ctx.tools.register(defineTool({
    name: 'memory_recall',
    description: 'Recall memories from long-term memory. Search by keyword (matches key, category, or content) or filter by category. Use this at the start of a conversation to recall user context, or when you need to check what was previously decided.',
    parameters: {
      query: { type: 'string', required: true, description: 'Search keyword (matches key/category/content) or a category name to filter by' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      const store = loadStore()
      if (store.memories.length === 0) {
        return `No memories stored yet. Use memory_save to start remembering things.\nLocation: ${MEMORY_FILE}`
      }
      const q = args.query.toLowerCase()
      const matches = store.memories.filter(m =>
        m.key.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.content.toLowerCase().includes(q)
      )
      if (matches.length === 0) {
        return `No memories matched "${args.query}". Total stored: ${store.memories.length}`
      }
      const shown = matches.slice(0, MAX_RECALL_RESULTS)
      const lines = shown.map(m =>
        `[${m.category}] ${m.key}\n  ${clamp(m.content, MAX_RECALL_CONTENT)}\n  saved: ${m.created_at.slice(0, 10)}${m.updated_at !== m.created_at ? ', updated: ' + m.updated_at.slice(0, 10) : ''}`
      )
      const overflow = matches.length > shown.length ? `\n… and ${matches.length - shown.length} more (results capped at ${MAX_RECALL_RESULTS})` : ''
      return `Found ${matches.length} memor${matches.length === 1 ? 'y' : 'ies'} for "${args.query}":\n\n${lines.join('\n\n')}${overflow}`
    },
  }))

  // 工具 3：列出所有记忆（让 Agent 知道已经记了什么）
  ctx.tools.register(defineTool({
    name: 'memory_list',
    description: 'List all stored memories with their keys, categories, and creation dates. Use this to see what the agent already knows about the user.',
    parameters: {
      // 注意：省略 required 键 = 可选；DSL 里 required 只能为 true
      category_filter: { type: 'string', description: 'Category to filter by (e.g. "identity", "preference", "task", "decision", "knowledge"). Omit or pass "all" to list everything.' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      const filter = (args.category_filter || 'all').toLowerCase()
      const store = loadStore()
      if (store.memories.length === 0) {
        return `No memories stored yet.\nLocation: ${MEMORY_FILE}`
      }
      const filtered = filter === 'all' ? store.memories : store.memories.filter(m => m.category.toLowerCase() === filter)
      if (filtered.length === 0) {
        return `No memories in category "${args.category_filter}". Total stored: ${store.memories.length}`
      }
      const lines = filtered.map(m =>
        `- [${m.category}] ${m.key} — ${clamp(m.content, 60)} (${m.created_at.slice(0, 10)})`
      )
      return `${filtered.length} memor${filtered.length === 1 ? 'y' : 'ies'}${filter !== 'all' ? ` in category "${args.category_filter}"` : ''}:\nLocation: ${MEMORY_FILE}\n\n${lines.join('\n')}`
    },
  }))

  // 工具 4：删除单条记忆（按 key）
  ctx.tools.register(defineTool({
    name: 'memory_delete',
    description: 'Delete one memory by its exact key. Returns the deleted memory content, or reports that no such key exists.',
    parameters: {
      key: { type: 'string', required: true, description: 'The exact key of the memory to delete (e.g. "user_profile", "current_task")' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    // 读改写复合操作，禁止并发执行；进程内还有写锁兜底
    isConcurrencySafe: () => false,
    async execute(args) {
      return withWriteLock(async () => {
        const store = loadStore()
        const idx = store.memories.findIndex(m => m.key === args.key)
        if (idx === -1) {
          return `No memory found with key "${args.key}". Total stored: ${store.memories.length}`
        }
        const removed = store.memories[idx]
        store.memories.splice(idx, 1)
        saveStore(store)
        return `Memory deleted: [${removed.category}] ${removed.key}\nContent: ${removed.content}\nLocation: ${MEMORY_FILE}`
      })
    },
  }))

  // 工具 5：清空所有记忆
  ctx.tools.register(defineTool({
    name: 'memory_clear',
    description: 'Delete ALL stored memories. Use with caution — this permanently empties the memory store. Pass confirm=true to execute.',
    parameters: {
      confirm: { type: 'boolean', required: true, description: 'Must be true to actually clear the store; any other value aborts safely.' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    // 读改写复合操作，禁止并发执行；进程内还有写锁兜底
    isConcurrencySafe: () => false,
    async execute(args) {
      if (args.confirm !== true) {
        return `Aborted: memory_clear requires confirm=true. Total stored: ${loadStore().memories.length}`
      }
      return withWriteLock(async () => {
        const store = loadStore()
        const count = store.memories.length
        if (count === 0) {
          return `Memory store is already empty. Location: ${MEMORY_FILE}`
        }
        saveStore({ version: store.version, memories: [] })
        return `Memory cleared: removed ${count} memor${count === 1 ? 'y' : 'ies'}.\nLocation: ${MEMORY_FILE}`
      })
    },
  }))
}
