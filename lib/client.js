// Auto-generated from src/client/index.tsx — do not edit directly.
window.__ModuleLoader__.load({
	id: "dsh-memory-panel",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function detectAccessMode() {
  if (typeof window === "undefined") return "local";
  const host = window.location.hostname;
  const isLoopback = host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "";
  return isLoopback ? "local" : "tunnel";
}
function MemoryIcon({ size = 18, color = "currentColor" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 1.75,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 5h7a1 1 0 0 1 1 1v12H5a1 1 0 0 1-1-1V5Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 5h-7a1 1 0 0 0-1 1v12h7a1 1 0 0 0 1-1V5Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v13" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 8h3v4l-1.5-1L7 12V8Z" })
      ]
    }
  );
}
function categoryMeta(cat) {
  const map = {
    identity: { bg: "rgba(59,130,246,0.08)", fg: "#3B82F6" },
    preference: { bg: "rgba(29,201,129,0.08)", fg: "#1DC981" },
    task: { bg: "rgba(239,170,23,0.08)", fg: "#EFAA17" },
    decision: { bg: "rgba(232,70,58,0.08)", fg: "#E8463A" },
    knowledge: { bg: "rgba(75,63,227,0.08)", fg: "#4B3FE3" }
  };
  return map[cat] || { bg: "rgba(127,127,127,0.08)", fg: "#71717A" };
}
function categoryLabel(t, cat) {
  const key = `category.${cat}`;
  const translated = t(key);
  return translated === key ? cat || t("category.other") : translated;
}
var DICTS = {
  zh: {
    "button.label": "记忆",
    "button.title": "记忆面板",
    "panel.title": "记忆面板",
    "panel.subtitle": "代理的长期记忆库",
    "panel.refresh": "刷新",
    "panel.loading": "加载中",
    "panel.close": "关闭 (ESC)",
    "panel.empty.title": "还没有记忆",
    "panel.empty.hint": "告诉代理「记住……」即可存下第一条",
    "panel.loadFailed": "加载失败: {error}",
    "panel.loadingText": "加载中...",
    "panel.footer.brand": "dsh-memory-panel",
    "panel.footer.path": "~/.dsh/memory.json",
    "tunnel.badge": "穿透模式",
    "tunnel.body": "访问本地文件系统、设置项受 dsh 安全围栏限制。请在本地访问 {url} 使用这些功能。",
    "category.identity": "身份",
    "category.preference": "偏好",
    "category.task": "任务",
    "category.decision": "决策",
    "category.knowledge": "知识",
    "category.other": "其他",
    "category.general": "其他"
  },
  en: {
    "button.label": "Memory",
    "button.title": "Memory panel",
    "panel.title": "Memory panel",
    "panel.subtitle": "The agent's long-term memory store",
    "panel.refresh": "Refresh",
    "panel.loading": "Loading",
    "panel.close": "Close (ESC)",
    "panel.empty.title": "No memories yet",
    "panel.empty.hint": 'Tell the agent "remember …" to store the first one',
    "panel.loadFailed": "Load failed: {error}",
    "panel.loadingText": "Loading...",
    "panel.footer.brand": "dsh-memory-panel",
    "panel.footer.path": "~/.dsh/memory.json",
    "tunnel.badge": "Tunnel mode",
    "tunnel.body": "Local filesystem and settings are restricted by the dsh security fence. Visit {url} locally to use these features.",
    "category.identity": "Identity",
    "category.preference": "Preference",
    "category.task": "Task",
    "category.decision": "Decision",
    "category.knowledge": "Knowledge",
    "category.other": "Other",
    "category.general": "Other"
  }
};
function MemoryPanelModal({ t, memories, loading, error, accessMode, onClose, onRefresh }) {
  (0, import_react.useEffect)(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.42)",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "mfpFadeIn 0.18s ease-out"
  }, onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
    background: "var(--bg-level-0, #FFFFFF)",
    color: "var(--text-primary, #171717)",
    borderRadius: "12px",
    border: "1px solid var(--border-level-1, rgba(127,127,127,0.14))",
    width: "min(520px, 92vw)",
    maxHeight: "72vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)",
    animation: "mfpPop 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
    overflow: "hidden"
  }, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "14px 18px",
      borderBottom: "1px solid var(--border-level-1, rgba(127,127,127,0.1))"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryIcon, { size: 18, color: "var(--text-300, #999)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: "2px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "14px", fontWeight: 500, lineHeight: 1.3 }, children: t("panel.title") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--text-500, #8F8F8F)", fontWeight: 400, lineHeight: 1.3 }, children: t("panel.subtitle") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onRefresh, disabled: loading, title: t("panel.refresh"), style: {
        height: "28px",
        padding: "0 10px",
        background: "transparent",
        border: "1px solid var(--border-level-1, rgba(127,127,127,0.18))",
        borderRadius: "6px",
        cursor: loading ? "not-allowed" : "pointer",
        color: loading ? "var(--text-500, #999)" : "var(--text-400, #666)",
        fontSize: "11px",
        fontWeight: 500,
        transition: "all 0.12s ease",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        outline: "none"
      }, children: loading ? t("panel.loading") : t("panel.refresh") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onClose, title: t("panel.close"), style: {
        width: "28px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        color: "var(--text-400, #666)",
        fontSize: "16px",
        lineHeight: 1,
        transition: "all 0.12s ease",
        outline: "none"
      }, children: "×" })
    ] }),
    accessMode === "tunnel" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      padding: "10px 18px",
      background: "rgba(239,170,23,0.06)",
      borderBottom: "1px solid rgba(239,170,23,0.18)",
      fontSize: "12px",
      lineHeight: 1.55,
      color: "var(--text-400, #666)"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "14px", lineHeight: 1, flexShrink: 0, marginTop: "1px" }, children: "⚠" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontWeight: 500, color: "var(--text-primary, #171717)", marginBottom: "2px" }, children: t("tunnel.badge") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("tunnel.body", { url: "http://127.0.0.1:8080" }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, overflowY: "auto", padding: "10px 18px 18px" }, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "48px 0", textAlign: "center", fontSize: "12px", color: "var(--text-500, #999)" }, children: t("panel.loadingText") }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "48px 0", textAlign: "center", fontSize: "12px", color: "#E8463A" }, children: t("panel.loadFailed", { error }) }) : memories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
      padding: "48px 0",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryIcon, { size: 32, color: "var(--text-600, #CCC)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "13px", color: "var(--text-500, #999)" }, children: t("panel.empty.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--text-500, #999)" }, children: t("panel.empty.hint") })
    ] }) : memories.map((m, i) => {
      const meta = categoryMeta(m.category);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
        padding: "14px 14px",
        marginTop: i === 0 ? "8px" : "10px",
        background: "var(--bg-level-0, #fff)",
        border: "1px solid var(--border-level-1, rgba(127,127,127,0.1))",
        borderRadius: "10px",
        transition: "border-color 0.12s ease, box-shadow 0.12s ease"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20px",
            padding: "0 7px",
            borderRadius: "4px",
            fontSize: "10px",
            fontWeight: 500,
            background: meta.bg,
            color: meta.fg,
            letterSpacing: "0.02em"
          }, children: categoryLabel(t, m.category) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "12px", fontWeight: 500, color: "var(--text-primary, #171717)", lineHeight: 1 }, children: m.key }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginLeft: "auto", fontSize: "10px", fontWeight: 400, color: "var(--text-500, #999)", lineHeight: 1 }, children: m.date })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "13px", lineHeight: 1.65, color: "var(--text-400, #555)", wordBreak: "break-word" }, children: m.content })
      ] }, `${m.key}-${i}`);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
      padding: "10px 18px",
      borderTop: "1px solid var(--border-level-1, rgba(127,127,127,0.08))",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryIcon, { size: 12, color: "var(--text-600, #BBB)" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "10px", fontWeight: 400, color: "var(--text-500, #999)" }, children: t("panel.footer.brand") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "10px", fontWeight: 400, color: "var(--text-500, #999)" }, children: t("panel.footer.path") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          @keyframes mfpFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes mfpPop { from { opacity: 0; transform: translateY(6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        ` })
  ] }) });
}
function MemoryPanelButton({ wide, t }) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const [memories, setMemories] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const tr = t || ((k, p) => {
    const s = DICTS.zh[k] ?? k;
    if (!p) return s;
    return s.replace(/\{(\w+)\}/g, (_, name) => String(p[name] ?? `{${name}}`));
  });
  const fetchMemories = (0, import_react.useCallback)(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/memory");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const parsed = (data.memories || []).map((m) => ({
        category: m.category || "general",
        key: m.key || "",
        content: m.content || "",
        date: String(m.updated_at || m.created_at || "").slice(0, 10)
      }));
      setMemories(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "load failed");
    } finally {
      setLoading(false);
    }
  }, []);
  const handleOpen = () => {
    setOpen(true);
    fetchMemories();
  };
  const baseStyle = {
    background: "transparent",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "var(--text-400, #666)",
    transition: "background 0.12s ease, color 0.12s ease",
    boxSizing: "border-box",
    outline: "none"
  };
  const commonHandlers = {
    onMouseEnter: (e) => {
      e.currentTarget.style.background = "var(--bg-level-1, rgba(127,127,127,0.08))";
      e.currentTarget.style.color = "var(--text-primary, #171717)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "var(--text-400, #666)";
    },
    onFocus: (e) => {
      e.currentTarget.style.background = "var(--bg-level-1, rgba(127,127,127,0.08))";
    }
  };
  const modal = open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    MemoryPanelModal,
    {
      t: tr,
      memories,
      loading,
      error,
      accessMode: detectAccessMode(),
      onClose: () => setOpen(false),
      onRefresh: fetchMemories
    }
  ) : null;
  if (wide) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          onClick: handleOpen,
          title: tr("button.title"),
          style: { ...baseStyle, display: "flex", alignItems: "center", gap: "10px", width: "100%", height: "36px", padding: "0 12px" },
          ...commonHandlers,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryIcon, { size: 18 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "13px", fontWeight: 400, lineHeight: 1 }, children: tr("button.label") }),
            memories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginLeft: "auto", fontSize: "11px", fontWeight: 500, color: "var(--text-500, #999)", lineHeight: 1 }, children: memories.length })
          ]
        }
      ),
      modal
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handleOpen, title: tr("button.title"), style: { ...baseStyle, width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }, ...commonHandlers, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryIcon, { size: 18 }) }),
    modal
  ] });
}
var inject = ["slots", "locale"];
function apply(ctx) {
  ctx.locale.register("memory-panel", DICTS);
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
    name: "sidebar.footer.action",
    id: "memory-panel",
    locale: "memory-panel"
    // 声明命名空间 → 组件 props 自动获得 t
  }, MemoryPanelButton));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuXG4vLyBkc2gtbWVtb3J5LXBhbmVsIOKAlCBjbGllbnQgaGFsZlxuLy8g5L6n6L655qCP44CM6K6w5b+G44CN5oyJ6ZKuICsg6K6w5b+G6Z2i5p2/5by556qX77yM6K+75Y+WIEdFVCAvYXBpL21lbW9yee+8iOWuv+S4u+WNiuaPkOS+m++8ieOAglxuLy8g5paH5qGI6YCa6L+HIGxvY2FsZSDmnI3liqEgaTE4bu+8iHpoIC8gZW7vvInvvIznu4Tku7YgcHJvcHMg5rOo5YWlIHQg57+76K+R5Ye95pWw44CCXG5cbi8vIOiuv+mXruaooeW8j+ajgOa1i++8muacrOWcsCB2cyDnqb/pgI9cbi8vIGRzaCDnmoQgYnJvd3Nlci10cnVzdCBmZW5jZSDkvJrlm6DkuLogc2VjLWZldGNoLXNpdGU9Y3Jvc3Mtc2l0ZSDmi5Lnu53mnaXoh6rnqb/pgI/ln5/lkI3nmoTmlY/mhJ/mjqXlj6NcbmZ1bmN0aW9uIGRldGVjdEFjY2Vzc01vZGUoKTogJ2xvY2FsJyB8ICd0dW5uZWwnIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJ2xvY2FsJ1xuICBjb25zdCBob3N0ID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lXG4gIGNvbnN0IGlzTG9vcGJhY2sgPSBob3N0ID09PSAnbG9jYWxob3N0JyB8fCBob3N0ID09PSAnMTI3LjAuMC4xJyB8fCBob3N0ID09PSAnOjoxJyB8fCBob3N0ID09PSAnJ1xuICByZXR1cm4gaXNMb29wYmFjayA/ICdsb2NhbCcgOiAndHVubmVsJ1xufVxuXG5pbnRlcmZhY2UgTWVtb3J5SXRlbSB7XG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAga2V5OiBzdHJpbmdcbiAgY29udGVudDogc3RyaW5nXG4gIGRhdGU6IHN0cmluZ1xufVxuXG4vLyDlm77moIfvvJrnur/mgKcgb3V0bGluZe+8jOS4pOacrOS5piA9IOiusOW/hlxuZnVuY3Rpb24gTWVtb3J5SWNvbih7IHNpemUgPSAxOCwgY29sb3IgPSAnY3VycmVudENvbG9yJyB9OiB7IHNpemU/OiBudW1iZXI7IGNvbG9yPzogc3RyaW5nIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHdpZHRoPXtzaXplfSBoZWlnaHQ9e3NpemV9IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Y29sb3J9IHN0cm9rZVdpZHRoPXsxLjc1fVxuICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPlxuICAgICAgPHBhdGggZD1cIk00IDVoN2ExIDEgMCAwIDEgMSAxdjEySDVhMSAxIDAgMCAxLTEtMVY1WlwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTIwIDVoLTdhMSAxIDAgMCAwLTEgMXYxMmg3YTEgMSAwIDAgMCAxLTFWNVpcIiAvPlxuICAgICAgPHBhdGggZD1cIk0xMiA1djEzXCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNNyA4aDN2NGwtMS41LTFMNyAxMlY4WlwiIC8+XG4gICAgPC9zdmc+XG4gIClcbn1cblxuLy8g5YiG57G76YWN6Imy77yI5omB5bmz5L2O6aWx5ZKM77yJ4oCU4oCUIOminOiJsuWbuuWumu+8jGxhYmVsIOeUseiwg+eUqOaWuee/u+ivkVxuZnVuY3Rpb24gY2F0ZWdvcnlNZXRhKGNhdDogc3RyaW5nKTogeyBiZzogc3RyaW5nOyBmZzogc3RyaW5nIH0ge1xuICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIHsgYmc6IHN0cmluZzsgZmc6IHN0cmluZyB9PiA9IHtcbiAgICBpZGVudGl0eTogeyBiZzogJ3JnYmEoNTksMTMwLDI0NiwwLjA4KScsIGZnOiAnIzNCODJGNicgfSxcbiAgICBwcmVmZXJlbmNlOiB7IGJnOiAncmdiYSgyOSwyMDEsMTI5LDAuMDgpJywgZmc6ICcjMURDOTgxJyB9LFxuICAgIHRhc2s6IHsgYmc6ICdyZ2JhKDIzOSwxNzAsMjMsMC4wOCknLCBmZzogJyNFRkFBMTcnIH0sXG4gICAgZGVjaXNpb246IHsgYmc6ICdyZ2JhKDIzMiw3MCw1OCwwLjA4KScsIGZnOiAnI0U4NDYzQScgfSxcbiAgICBrbm93bGVkZ2U6IHsgYmc6ICdyZ2JhKDc1LDYzLDIyNywwLjA4KScsIGZnOiAnIzRCM0ZFMycgfSxcbiAgfVxuICByZXR1cm4gbWFwW2NhdF0gfHwgeyBiZzogJ3JnYmEoMTI3LDEyNywxMjcsMC4wOCknLCBmZzogJyM3MTcxN0EnIH1cbn1cblxuLy8g5YiG57G757+76K+R77yI5pyq55+l5YiG57G75Zue6YCA5Li65Y6f5paH77yJXG5mdW5jdGlvbiBjYXRlZ29yeUxhYmVsKHQ6IChrOiBzdHJpbmcpID0+IHN0cmluZywgY2F0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBrZXkgPSBgY2F0ZWdvcnkuJHtjYXR9YFxuICBjb25zdCB0cmFuc2xhdGVkID0gdChrZXkpXG4gIHJldHVybiB0cmFuc2xhdGVkID09PSBrZXkgPyBjYXQgfHwgdCgnY2F0ZWdvcnkub3RoZXInKSA6IHRyYW5zbGF0ZWRcbn1cblxuLy8g5a2X5YW477yaemggLyBlbiDkuKTlpZfvvIzplK7kv53mjIHkuIDoh7TvvIjnu4Tku7bpgJrov4cgdChrZXkpIOWPluWAvO+8iVxuY29uc3QgRElDVFM6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+ID0ge1xuICB6aDoge1xuICAgICdidXR0b24ubGFiZWwnOiAn6K6w5b+GJyxcbiAgICAnYnV0dG9uLnRpdGxlJzogJ+iusOW/humdouadvycsXG4gICAgJ3BhbmVsLnRpdGxlJzogJ+iusOW/humdouadvycsXG4gICAgJ3BhbmVsLnN1YnRpdGxlJzogJ+S7o+eQhueahOmVv+acn+iusOW/huW6kycsXG4gICAgJ3BhbmVsLnJlZnJlc2gnOiAn5Yi35pawJyxcbiAgICAncGFuZWwubG9hZGluZyc6ICfliqDovb3kuK0nLFxuICAgICdwYW5lbC5jbG9zZSc6ICflhbPpl60gKEVTQyknLFxuICAgICdwYW5lbC5lbXB0eS50aXRsZSc6ICfov5jmsqHmnInorrDlv4YnLFxuICAgICdwYW5lbC5lbXB0eS5oaW50JzogJ+WRiuivieS7o+eQhuOAjOiusOS9j+KApuKApuOAjeWNs+WPr+WtmOS4i+esrOS4gOadoScsXG4gICAgJ3BhbmVsLmxvYWRGYWlsZWQnOiAn5Yqg6L295aSx6LSlOiB7ZXJyb3J9JyxcbiAgICAncGFuZWwubG9hZGluZ1RleHQnOiAn5Yqg6L295LitLi4uJyxcbiAgICAncGFuZWwuZm9vdGVyLmJyYW5kJzogJ2RzaC1tZW1vcnktcGFuZWwnLFxuICAgICdwYW5lbC5mb290ZXIucGF0aCc6ICd+Ly5kc2gvbWVtb3J5Lmpzb24nLFxuICAgICd0dW5uZWwuYmFkZ2UnOiAn56m/6YCP5qih5byPJyxcbiAgICAndHVubmVsLmJvZHknOiAn6K6/6Zeu5pys5Zyw5paH5Lu257O757uf44CB6K6+572u6aG55Y+XIGRzaCDlronlhajlm7TmoI/pmZDliLbjgILor7flnKjmnKzlnLDorr/pl64ge3VybH0g5L2/55So6L+Z5Lqb5Yqf6IO944CCJyxcbiAgICAnY2F0ZWdvcnkuaWRlbnRpdHknOiAn6Lqr5Lu9JyxcbiAgICAnY2F0ZWdvcnkucHJlZmVyZW5jZSc6ICflgY/lpb0nLFxuICAgICdjYXRlZ29yeS50YXNrJzogJ+S7u+WKoScsXG4gICAgJ2NhdGVnb3J5LmRlY2lzaW9uJzogJ+WGs+etlicsXG4gICAgJ2NhdGVnb3J5Lmtub3dsZWRnZSc6ICfnn6Xor4YnLFxuICAgICdjYXRlZ29yeS5vdGhlcic6ICflhbbku5YnLFxuICAgICdjYXRlZ29yeS5nZW5lcmFsJzogJ+WFtuS7licsXG4gIH0sXG4gIGVuOiB7XG4gICAgJ2J1dHRvbi5sYWJlbCc6ICdNZW1vcnknLFxuICAgICdidXR0b24udGl0bGUnOiAnTWVtb3J5IHBhbmVsJyxcbiAgICAncGFuZWwudGl0bGUnOiAnTWVtb3J5IHBhbmVsJyxcbiAgICAncGFuZWwuc3VidGl0bGUnOiAnVGhlIGFnZW50XFwncyBsb25nLXRlcm0gbWVtb3J5IHN0b3JlJyxcbiAgICAncGFuZWwucmVmcmVzaCc6ICdSZWZyZXNoJyxcbiAgICAncGFuZWwubG9hZGluZyc6ICdMb2FkaW5nJyxcbiAgICAncGFuZWwuY2xvc2UnOiAnQ2xvc2UgKEVTQyknLFxuICAgICdwYW5lbC5lbXB0eS50aXRsZSc6ICdObyBtZW1vcmllcyB5ZXQnLFxuICAgICdwYW5lbC5lbXB0eS5oaW50JzogJ1RlbGwgdGhlIGFnZW50IFwicmVtZW1iZXIg4oCmXCIgdG8gc3RvcmUgdGhlIGZpcnN0IG9uZScsXG4gICAgJ3BhbmVsLmxvYWRGYWlsZWQnOiAnTG9hZCBmYWlsZWQ6IHtlcnJvcn0nLFxuICAgICdwYW5lbC5sb2FkaW5nVGV4dCc6ICdMb2FkaW5nLi4uJyxcbiAgICAncGFuZWwuZm9vdGVyLmJyYW5kJzogJ2RzaC1tZW1vcnktcGFuZWwnLFxuICAgICdwYW5lbC5mb290ZXIucGF0aCc6ICd+Ly5kc2gvbWVtb3J5Lmpzb24nLFxuICAgICd0dW5uZWwuYmFkZ2UnOiAnVHVubmVsIG1vZGUnLFxuICAgICd0dW5uZWwuYm9keSc6ICdMb2NhbCBmaWxlc3lzdGVtIGFuZCBzZXR0aW5ncyBhcmUgcmVzdHJpY3RlZCBieSB0aGUgZHNoIHNlY3VyaXR5IGZlbmNlLiBWaXNpdCB7dXJsfSBsb2NhbGx5IHRvIHVzZSB0aGVzZSBmZWF0dXJlcy4nLFxuICAgICdjYXRlZ29yeS5pZGVudGl0eSc6ICdJZGVudGl0eScsXG4gICAgJ2NhdGVnb3J5LnByZWZlcmVuY2UnOiAnUHJlZmVyZW5jZScsXG4gICAgJ2NhdGVnb3J5LnRhc2snOiAnVGFzaycsXG4gICAgJ2NhdGVnb3J5LmRlY2lzaW9uJzogJ0RlY2lzaW9uJyxcbiAgICAnY2F0ZWdvcnkua25vd2xlZGdlJzogJ0tub3dsZWRnZScsXG4gICAgJ2NhdGVnb3J5Lm90aGVyJzogJ090aGVyJyxcbiAgICAnY2F0ZWdvcnkuZ2VuZXJhbCc6ICdPdGhlcicsXG4gIH0sXG59XG5cbmludGVyZmFjZSBNb2RhbFByb3BzIHtcbiAgdDogKGs6IHN0cmluZywgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHN0cmluZ1xuICBtZW1vcmllczogTWVtb3J5SXRlbVtdXG4gIGxvYWRpbmc6IGJvb2xlYW5cbiAgZXJyb3I6IHN0cmluZyB8IG51bGxcbiAgYWNjZXNzTW9kZTogJ2xvY2FsJyB8ICd0dW5uZWwnXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWRcbiAgb25SZWZyZXNoOiAoKSA9PiB2b2lkXG59XG5cbmZ1bmN0aW9uIE1lbW9yeVBhbmVsTW9kYWwoeyB0LCBtZW1vcmllcywgbG9hZGluZywgZXJyb3IsIGFjY2Vzc01vZGUsIG9uQ2xvc2UsIG9uUmVmcmVzaCB9OiBNb2RhbFByb3BzKSB7XG4gIC8vIEVTQyDlhbPpl61cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvbktleSA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7IGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG9uQ2xvc2UoKSB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5KVxuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXkpXG4gIH0sIFtvbkNsb3NlXSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogMCwgYmFja2dyb3VuZDogJ3JnYmEoMCwwLDAsMC40MiknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoM3B4KScsXG4gICAgICBXZWJraXRCYWNrZHJvcEZpbHRlcjogJ2JsdXIoM3B4KScsIHpJbmRleDogOTk5OSwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYW5pbWF0aW9uOiAnbWZwRmFkZUluIDAuMThzIGVhc2Utb3V0JyxcbiAgICB9fSBvbkNsaWNrPXtvbkNsb3NlfT5cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWJnLWxldmVsLTAsICNGRkZGRkYpJywgY29sb3I6ICd2YXIoLS10ZXh0LXByaW1hcnksICMxNzE3MTcpJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1ib3JkZXItbGV2ZWwtMSwgcmdiYSgxMjcsMTI3LDEyNywwLjE0KSknLFxuICAgICAgICB3aWR0aDogJ21pbig1MjBweCwgOTJ2dyknLCBtYXhIZWlnaHQ6ICc3MnZoJywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgYm94U2hhZG93OiAnMCAyNHB4IDY0cHggcmdiYSgwLDAsMCwwLjE4KSwgMCA4cHggMjRweCByZ2JhKDAsMCwwLDAuMDgpJyxcbiAgICAgICAgYW5pbWF0aW9uOiAnbWZwUG9wIDAuMnMgY3ViaWMtYmV6aWVyKDAuMjIsIDEsIDAuMzYsIDEpJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgfX0gb25DbGljaz17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9PlxuICAgICAgICB7Lyog5aS06YOoICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcsIHBhZGRpbmc6ICcxNHB4IDE4cHgnLFxuICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1ib3JkZXItbGV2ZWwtMSwgcmdiYSgxMjcsMTI3LDEyNywwLjEpKScsXG4gICAgICAgIH19PlxuICAgICAgICAgIDxNZW1vcnlJY29uIHNpemU9ezE4fSBjb2xvcj1cInZhcigtLXRleHQtMzAwLCAjOTk5KVwiIC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICcycHgnIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiA1MDAsIGxpbmVIZWlnaHQ6IDEuMyB9fT57dCgncGFuZWwudGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS10ZXh0LTUwMCwgIzhGOEY4RiknLCBmb250V2VpZ2h0OiA0MDAsIGxpbmVIZWlnaHQ6IDEuMyB9fT5cbiAgICAgICAgICAgICAge3QoJ3BhbmVsLnN1YnRpdGxlJyl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uUmVmcmVzaH0gZGlzYWJsZWQ9e2xvYWRpbmd9IHRpdGxlPXt0KCdwYW5lbC5yZWZyZXNoJyl9IHN0eWxlPXt7XG4gICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JywgcGFkZGluZzogJzAgMTBweCcsIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tYm9yZGVyLWxldmVsLTEsIHJnYmEoMTI3LDEyNywxMjcsMC4xOCkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICAgICAgICAgIGN1cnNvcjogbG9hZGluZyA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXG4gICAgICAgICAgICBjb2xvcjogbG9hZGluZyA/ICd2YXIoLS10ZXh0LTUwMCwgIzk5OSknIDogJ3ZhcigtLXRleHQtNDAwLCAjNjY2KScsIGZvbnRTaXplOiAnMTFweCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsIHRyYW5zaXRpb246ICdhbGwgMC4xMnMgZWFzZScsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzRweCcsXG4gICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICB7bG9hZGluZyA/IHQoJ3BhbmVsLmxvYWRpbmcnKSA6IHQoJ3BhbmVsLnJlZnJlc2gnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9IHRpdGxlPXt0KCdwYW5lbC5jbG9zZScpfSBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6ICcyOHB4JywgaGVpZ2h0OiAnMjhweCcsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsIGJvcmRlcjogJ25vbmUnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tdGV4dC00MDAsICM2NjYpJywgZm9udFNpemU6ICcxNnB4JywgbGluZUhlaWdodDogMSwgdHJhbnNpdGlvbjogJ2FsbCAwLjEycyBlYXNlJyxcbiAgICAgICAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICAgICAgICB9fT7DlzwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7Lyog56m/6YCP5qih5byP5o+Q56S6ICovfVxuICAgICAgICB7YWNjZXNzTW9kZSA9PT0gJ3R1bm5lbCcgJiYgKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICc4cHgnLCBwYWRkaW5nOiAnMTBweCAxOHB4JyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDIzOSwxNzAsMjMsMC4wNiknLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgcmdiYSgyMzksMTcwLDIzLDAuMTgpJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNTUsIGNvbG9yOiAndmFyKC0tdGV4dC00MDAsICM2NjYpJyxcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTRweCcsIGxpbmVIZWlnaHQ6IDEsIGZsZXhTaHJpbms6IDAsIG1hcmdpblRvcDogJzFweCcgfX0+4pqgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxIH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6ICd2YXIoLS10ZXh0LXByaW1hcnksICMxNzE3MTcpJywgbWFyZ2luQm90dG9tOiAnMnB4JyB9fT57dCgndHVubmVsLmJhZGdlJyl9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+e3QoJ3R1bm5lbC5ib2R5JywgeyB1cmw6ICdodHRwOi8vMTI3LjAuMC4xOjgwODAnIH0pfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIOWGheWuueWMuiAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzEwcHggMThweCAxOHB4JyB9fT5cbiAgICAgICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzQ4cHggMCcsIHRleHRBbGlnbjogJ2NlbnRlcicsIGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAndmFyKC0tdGV4dC01MDAsICM5OTkpJyB9fT5cbiAgICAgICAgICAgICAge3QoJ3BhbmVsLmxvYWRpbmdUZXh0Jyl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogZXJyb3IgPyAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc0OHB4IDAnLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyNFODQ2M0EnIH19PlxuICAgICAgICAgICAgICB7dCgncGFuZWwubG9hZEZhaWxlZCcsIHsgZXJyb3IgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbWVtb3JpZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICBwYWRkaW5nOiAnNDhweCAwJywgdGV4dEFsaWduOiAnY2VudGVyJywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIDxNZW1vcnlJY29uIHNpemU9ezMyfSBjb2xvcj1cInZhcigtLXRleHQtNjAwLCAjQ0NDKVwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxM3B4JywgY29sb3I6ICd2YXIoLS10ZXh0LTUwMCwgIzk5OSknIH19Pnt0KCdwYW5lbC5lbXB0eS50aXRsZScpfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tdGV4dC01MDAsICM5OTkpJyB9fT5cbiAgICAgICAgICAgICAgICB7dCgncGFuZWwuZW1wdHkuaGludCcpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBtZW1vcmllcy5tYXAoKG0sIGkpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWV0YSA9IGNhdGVnb3J5TWV0YShtLmNhdGVnb3J5KVxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgJHttLmtleX0tJHtpfWB9IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTRweCAxNHB4JywgbWFyZ2luVG9wOiBpID09PSAwID8gJzhweCcgOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctbGV2ZWwtMCwgI2ZmZiknLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWJvcmRlci1sZXZlbC0xLCByZ2JhKDEyNywxMjcsMTI3LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYm9yZGVyLWNvbG9yIDAuMTJzIGVhc2UsIGJveC1zaGFkb3cgMC4xMnMgZWFzZScsXG4gICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1mbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAgN3B4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgZm9udFNpemU6ICcxMHB4JywgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IG1ldGEuYmcsIGNvbG9yOiBtZXRhLmZnLCBsZXR0ZXJTcGFjaW5nOiAnMC4wMmVtJyxcbiAgICAgICAgICAgICAgICAgICAgfX0+e2NhdGVnb3J5TGFiZWwodCwgbS5jYXRlZ29yeSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA1MDAsIGNvbG9yOiAndmFyKC0tdGV4dC1wcmltYXJ5LCAjMTcxNzE3KScsIGxpbmVIZWlnaHQ6IDEgfX0+XG4gICAgICAgICAgICAgICAgICAgICAge20ua2V5fVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICdhdXRvJywgZm9udFNpemU6ICcxMHB4JywgZm9udFdlaWdodDogNDAwLCBjb2xvcjogJ3ZhcigtLXRleHQtNTAwLCAjOTk5KScsIGxpbmVIZWlnaHQ6IDEgfX0+XG4gICAgICAgICAgICAgICAgICAgICAge20uZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTNweCcsIGxpbmVIZWlnaHQ6IDEuNjUsIGNvbG9yOiAndmFyKC0tdGV4dC00MDAsICM1NTUpJywgd29yZEJyZWFrOiAnYnJlYWstd29yZCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHttLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7Lyog5bqV6YOoICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgcGFkZGluZzogJzEwcHggMThweCcsIGJvcmRlclRvcDogJzFweCBzb2xpZCB2YXIoLS1ib3JkZXItbGV2ZWwtMSwgcmdiYSgxMjcsMTI3LDEyNywwLjA4KSknLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgIDxNZW1vcnlJY29uIHNpemU9ezEyfSBjb2xvcj1cInZhcigtLXRleHQtNjAwLCAjQkJCKVwiIC8+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiAndmFyKC0tdGV4dC01MDAsICM5OTkpJyB9fT57dCgncGFuZWwuZm9vdGVyLmJyYW5kJyl9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6ICd2YXIoLS10ZXh0LTUwMCwgIzk5OSknIH19Pnt0KCdwYW5lbC5mb290ZXIucGF0aCcpfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHN0eWxlPntgXG4gICAgICAgICAgQGtleWZyYW1lcyBtZnBGYWRlSW4geyBmcm9tIHsgb3BhY2l0eTogMDsgfSB0byB7IG9wYWNpdHk6IDE7IH0gfVxuICAgICAgICAgIEBrZXlmcmFtZXMgbWZwUG9wIHsgZnJvbSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSg2cHgpIHNjYWxlKDAuOTgpOyB9IHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHNjYWxlKDEpOyB9IH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuLy8g6K6w5b+G6Z2i5p2/5oyJ6ZKu77yI5L6n6L655qCP77yJ4oCU4oCUIHQg55SxIHNsb3Qg5riy5p+T5Zmo5rOo5YWlXG5mdW5jdGlvbiBNZW1vcnlQYW5lbEJ1dHRvbih7IHdpZGUsIHQgfTogeyB3aWRlPzogYm9vbGVhbjsgdD86IChrOiBzdHJpbmcsIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiBzdHJpbmcgfSkge1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW21lbW9yaWVzLCBzZXRNZW1vcmllc10gPSB1c2VTdGF0ZTxNZW1vcnlJdGVtW10+KFtdKVxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICAvLyB0IOWPr+iDveacquazqOWFpe+8iOa1i+ivlS/ni6znq4vnjq/looPvvInvvIzlm57pgIDliLAgemgg5a2X5YW4XG4gIGNvbnN0IHRyID0gdCB8fCAoKGs6IHN0cmluZywgcD86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XG4gICAgY29uc3QgcyA9IERJQ1RTLnpoW2tdID8/IGtcbiAgICBpZiAoIXApIHJldHVybiBzXG4gICAgcmV0dXJuIHMucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csIChfLCBuYW1lOiBzdHJpbmcpID0+IFN0cmluZyhwW25hbWVdID8/IGB7JHtuYW1lfX1gKSlcbiAgfSlcblxuICBjb25zdCBmZXRjaE1lbW9yaWVzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldExvYWRpbmcodHJ1ZSlcbiAgICBzZXRFcnJvcihudWxsKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9tZW1vcnknKVxuICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlcy5zdGF0dXN9YClcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXG4gICAgICBjb25zdCBwYXJzZWQ6IE1lbW9yeUl0ZW1bXSA9IChkYXRhLm1lbW9yaWVzIHx8IFtdKS5tYXAoKG06IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiAoe1xuICAgICAgICBjYXRlZ29yeTogKG0uY2F0ZWdvcnkgYXMgc3RyaW5nKSB8fCAnZ2VuZXJhbCcsXG4gICAgICAgIGtleTogKG0ua2V5IGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIGNvbnRlbnQ6IChtLmNvbnRlbnQgYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgICAgZGF0ZTogU3RyaW5nKG0udXBkYXRlZF9hdCB8fCBtLmNyZWF0ZWRfYXQgfHwgJycpLnNsaWNlKDAsIDEwKSxcbiAgICAgIH0pKVxuICAgICAgc2V0TWVtb3JpZXMocGFyc2VkKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHNldEVycm9yKGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6ICdsb2FkIGZhaWxlZCcpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9LCBbXSlcblxuICBjb25zdCBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIHNldE9wZW4odHJ1ZSlcbiAgICBmZXRjaE1lbW9yaWVzKClcbiAgfVxuXG4gIGNvbnN0IGJhc2VTdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcbiAgICBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLCBib3JkZXI6ICdub25lJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgY29sb3I6ICd2YXIoLS10ZXh0LTQwMCwgIzY2NiknLCB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjEycyBlYXNlLCBjb2xvciAwLjEycyBlYXNlJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94Jywgb3V0bGluZTogJ25vbmUnLFxuICB9XG5cbiAgY29uc3QgY29tbW9uSGFuZGxlcnMgPSB7XG4gICAgb25Nb3VzZUVudGVyOiAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3ZhcigtLWJnLWxldmVsLTEsIHJnYmEoMTI3LDEyNywxMjcsMC4wOCkpJ1xuICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmNvbG9yID0gJ3ZhcigtLXRleHQtcHJpbWFyeSwgIzE3MTcxNyknXG4gICAgfSxcbiAgICBvbk1vdXNlTGVhdmU6IChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAndHJhbnNwYXJlbnQnXG4gICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuY29sb3IgPSAndmFyKC0tdGV4dC00MDAsICM2NjYpJ1xuICAgIH0sXG4gICAgb25Gb2N1czogKGU6IFJlYWN0LkZvY3VzRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICd2YXIoLS1iZy1sZXZlbC0xLCByZ2JhKDEyNywxMjcsMTI3LDAuMDgpKSdcbiAgICB9LFxuICB9XG5cbiAgY29uc3QgbW9kYWwgPSBvcGVuID8gKFxuICAgIDxNZW1vcnlQYW5lbE1vZGFsXG4gICAgICB0PXt0cn0gbWVtb3JpZXM9e21lbW9yaWVzfSBsb2FkaW5nPXtsb2FkaW5nfSBlcnJvcj17ZXJyb3J9XG4gICAgICBhY2Nlc3NNb2RlPXtkZXRlY3RBY2Nlc3NNb2RlKCl9IG9uQ2xvc2U9eygpID0+IHNldE9wZW4oZmFsc2UpfSBvblJlZnJlc2g9e2ZldGNoTWVtb3JpZXN9XG4gICAgLz5cbiAgKSA6IG51bGxcblxuICBpZiAod2lkZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlT3Blbn1cbiAgICAgICAgICB0aXRsZT17dHIoJ2J1dHRvbi50aXRsZScpfVxuICAgICAgICAgIHN0eWxlPXt7IC4uLmJhc2VTdHlsZSwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzM2cHgnLCBwYWRkaW5nOiAnMCAxMnB4JyB9fVxuICAgICAgICAgIHsuLi5jb21tb25IYW5kbGVyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxNZW1vcnlJY29uIHNpemU9ezE4fSAvPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDQwMCwgbGluZUhlaWdodDogMSB9fT57dHIoJ2J1dHRvbi5sYWJlbCcpfTwvc3Bhbj5cbiAgICAgICAgICB7bWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnYXV0bycsIGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6ICd2YXIoLS10ZXh0LTUwMCwgIzk5OSknLCBsaW5lSGVpZ2h0OiAxIH19PlxuICAgICAgICAgICAgICB7bWVtb3JpZXMubGVuZ3RofVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICB7bW9kYWx9XG4gICAgICA8Lz5cbiAgICApXG4gIH1cblxuICAvLyDnqoTlsY/ovajpgZPlm77moIdcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVPcGVufSB0aXRsZT17dHIoJ2J1dHRvbi50aXRsZScpfSBzdHlsZT17eyAuLi5iYXNlU3R5bGUsIHdpZHRoOiAnMzZweCcsIGhlaWdodDogJzM2cHgnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0gey4uLmNvbW1vbkhhbmRsZXJzfT5cbiAgICAgICAgPE1lbW9yeUljb24gc2l6ZT17MTh9IC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIHttb2RhbH1cbiAgICA8Lz5cbiAgKVxufVxuXG4vLyDmj5Lku7blhaXlj6NcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZSddXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiB7XG4gIHNsb3RzOiB7IGluamVjdDogKHNsb3Q6IHN0cmluZywgY2I6ICgpID0+IHVua25vd24pID0+IHZvaWQ7IHJlZ2lzdGVyOiAob3B0czogeyBuYW1lOiBzdHJpbmc7IGlkOiBzdHJpbmc7IGxvY2FsZTogc3RyaW5nIH0sIGNvbXA6IHVua25vd24pID0+IHVua25vd24gfVxuICBsb2NhbGU6IHsgcmVnaXN0ZXI6IChuczogc3RyaW5nLCBkaWN0czogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgc3RyaW5nPj4pID0+ICgpID0+IHZvaWQgfVxufSkge1xuICAvLyDms6jlhozlrZflhbjvvIh6aC9lbiDkuKTlpZfvvJtkaXNwb3NlciDnlLEgZmliZXIg566h55CG77yJXG4gIGN0eC5sb2NhbGUucmVnaXN0ZXIoJ21lbW9yeS1wYW5lbCcsIERJQ1RTKVxuICBjdHguc2xvdHMuaW5qZWN0KCdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLCAoKSA9PiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgIG5hbWU6ICdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLFxuICAgIGlkOiAnbWVtb3J5LXBhbmVsJyxcbiAgICBsb2NhbGU6ICdtZW1vcnktcGFuZWwnLCAvLyDlo7DmmI7lkb3lkI3nqbrpl7Qg4oaSIOe7hOS7tiBwcm9wcyDoh6rliqjojrflvpcgdFxuICB9LCBNZW1vcnlQYW5lbEJ1dHRvbikpXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF3RDtBQXlCcEQ7QUFqQkosU0FBUyxtQkFBdUM7QUFDOUMsTUFBSSxPQUFPLFdBQVcsWUFBYSxRQUFPO0FBQzFDLFFBQU0sT0FBTyxPQUFPLFNBQVM7QUFDN0IsUUFBTSxhQUFhLFNBQVMsZUFBZSxTQUFTLGVBQWUsU0FBUyxTQUFTLFNBQVM7QUFDOUYsU0FBTyxhQUFhLFVBQVU7QUFDaEM7QUFVQSxTQUFTLFdBQVcsRUFBRSxPQUFPLElBQUksUUFBUSxlQUFlLEdBQXNDO0FBQzVGLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUFJLE9BQU87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RUFDRjtBQUVBLFFBQU0sUUFBUSxPQUNaO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxHQUFHO0FBQUEsTUFBSTtBQUFBLE1BQW9CO0FBQUEsTUFBa0I7QUFBQSxNQUM3QyxZQUFZLGlCQUFpQjtBQUFBLE1BQUcsU0FBUyxNQUFNLFFBQVEsS0FBSztBQUFBLE1BQUcsV0FBVztBQUFBO0FBQUEsRUFDNUUsSUFDRTtBQUVKLE1BQUksTUFBTTtBQUNSLFdBQ0UsNEVBQ0U7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUztBQUFBLFVBQ1QsT0FBTyxHQUFHLGNBQWM7QUFBQSxVQUN4QixPQUFPLEVBQUUsR0FBRyxXQUFXLFNBQVMsUUFBUSxZQUFZLFVBQVUsS0FBSyxRQUFRLE9BQU8sUUFBUSxRQUFRLFFBQVEsU0FBUyxTQUFTO0FBQUEsVUFDM0gsR0FBRztBQUFBLFVBRUo7QUFBQSx3REFBQyxjQUFXLE1BQU0sSUFBSTtBQUFBLFlBQ3RCLDRDQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssWUFBWSxFQUFFLEdBQUksYUFBRyxjQUFjLEdBQUU7QUFBQSxZQUN0RixTQUFTLFNBQVMsS0FDakIsNENBQUMsVUFBSyxPQUFPLEVBQUUsWUFBWSxRQUFRLFVBQVUsUUFBUSxZQUFZLEtBQUssT0FBTyx5QkFBeUIsWUFBWSxFQUFFLEdBQ2pILG1CQUFTLFFBQ1o7QUFBQTtBQUFBO0FBQUEsTUFFSjtBQUFBLE1BQ0M7QUFBQSxPQUNIO0FBQUEsRUFFSjtBQUdBLFNBQ0UsNEVBQ0U7QUFBQSxnREFBQyxZQUFPLFNBQVMsWUFBWSxPQUFPLEdBQUcsY0FBYyxHQUFHLE9BQU8sRUFBRSxHQUFHLFdBQVcsT0FBTyxRQUFRLFFBQVEsUUFBUSxTQUFTLFFBQVEsWUFBWSxVQUFVLGdCQUFnQixTQUFTLEdBQUksR0FBRyxnQkFDbkwsc0RBQUMsY0FBVyxNQUFNLElBQUksR0FDeEI7QUFBQSxJQUNDO0FBQUEsS0FDSDtBQUVKO0FBR08sSUFBTSxTQUFTLENBQUMsU0FBUyxRQUFRO0FBQ2pDLFNBQVMsTUFBTSxLQUduQjtBQUVELE1BQUksT0FBTyxTQUFTLGdCQUFnQixLQUFLO0FBQ3pDLE1BQUksTUFBTSxPQUFPLHlCQUF5QixNQUFNLElBQUksTUFBTSxTQUFTO0FBQUEsSUFDakUsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osUUFBUTtBQUFBO0FBQUEsRUFDVixHQUFHLGlCQUFpQixDQUFDO0FBQ3ZCOyIsCiAgIm5hbWVzIjogW10KfQo=

		return module.exports;
	}
});
