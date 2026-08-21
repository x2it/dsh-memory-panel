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
    identity: { label: "身份", bg: "rgba(59,130,246,0.08)", fg: "#3B82F6" },
    preference: { label: "偏好", bg: "rgba(29,201,129,0.08)", fg: "#1DC981" },
    task: { label: "任务", bg: "rgba(239,170,23,0.08)", fg: "#EFAA17" },
    decision: { label: "决策", bg: "rgba(232,70,58,0.08)", fg: "#E8463A" },
    knowledge: { label: "知识", bg: "rgba(75,63,227,0.08)", fg: "#4B3FE3" }
  };
  return map[cat] || { label: cat || "其他", bg: "rgba(127,127,127,0.08)", fg: "#71717A" };
}
function MemoryPanelModal({ memories, loading, error, accessMode, onClose, onRefresh }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "14px", fontWeight: 500, lineHeight: 1.3 }, children: "记忆面板" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--text-500, #8F8F8F)", fontWeight: 400, lineHeight: 1.3 }, children: "代理的长期记忆库" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onRefresh, disabled: loading, title: "刷新", style: {
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
      }, children: loading ? "加载中" : "刷新" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onClose, title: "关闭 (ESC)", style: {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontWeight: 500, color: "var(--text-primary, #171717)", marginBottom: "2px" }, children: "穿透模式" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          "访问本地文件系统、设置项受 dsh 安全围栏限制。请在本地访问 ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { style: {
            fontSize: "11px",
            padding: "1px 5px",
            background: "rgba(127,127,127,0.10)",
            borderRadius: "3px",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
          }, children: "http://127.0.0.1:8080" }),
          " 使用这些功能。"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, overflowY: "auto", padding: "10px 18px 18px" }, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "48px 0", textAlign: "center", fontSize: "12px", color: "var(--text-500, #999)" }, children: "加载中..." }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "48px 0", textAlign: "center", fontSize: "12px", color: "#E8463A" }, children: [
      "加载失败: ",
      error
    ] }) : memories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
      padding: "48px 0",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryIcon, { size: 32, color: "var(--text-600, #CCC)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "13px", color: "var(--text-500, #999)" }, children: "还没有记忆" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--text-500, #999)" }, children: "告诉代理「记住……」即可存下第一条" })
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
          }, children: meta.label }),
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "10px", fontWeight: 400, color: "var(--text-500, #999)" }, children: "dsh-memory-panel" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "10px", fontWeight: 400, color: "var(--text-500, #999)" }, children: "~/.dsh/memory.json" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          @keyframes mfpFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes mfpPop { from { opacity: 0; transform: translateY(6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        ` })
  ] }) });
}
function MemoryPanelButton({ wide }) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const [memories, setMemories] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
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
  if (wide) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          onClick: handleOpen,
          title: "记忆面板",
          style: { ...baseStyle, display: "flex", alignItems: "center", gap: "10px", width: "100%", height: "36px", padding: "0 12px" },
          ...commonHandlers,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryIcon, { size: 18 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "13px", fontWeight: 400, lineHeight: 1 }, children: "记忆" }),
            memories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginLeft: "auto", fontSize: "11px", fontWeight: 500, color: "var(--text-500, #999)", lineHeight: 1 }, children: memories.length })
          ]
        }
      ),
      open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        MemoryPanelModal,
        {
          memories,
          loading,
          error,
          accessMode: detectAccessMode(),
          onClose: () => setOpen(false),
          onRefresh: fetchMemories
        }
      )
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handleOpen, title: "记忆面板", style: { ...baseStyle, width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }, ...commonHandlers, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryIcon, { size: 18 }) }),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      MemoryPanelModal,
      {
        memories,
        loading,
        error,
        accessMode: detectAccessMode(),
        onClose: () => setOpen(false),
        onRefresh: fetchMemories
      }
    )
  ] });
}
var inject = ["slots"];
function apply(ctx) {
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
    name: "sidebar.footer.action",
    id: "memory-panel"
  }, MemoryPanelButton));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuXG4vLyBkc2gtbWVtb3J5LXBhbmVsIOKAlCBjbGllbnQgaGFsZlxuLy8g5L6n6L655qCP44CM6K6w5b+G44CN5oyJ6ZKuICsg6K6w5b+G6Z2i5p2/5by556qX77yM6K+75Y+WIEdFVCAvYXBpL21lbW9yee+8iOWuv+S4u+WNiuaPkOS+m++8ieOAglxuXG4vLyDorr/pl67mqKHlvI/mo4DmtYvvvJrmnKzlnLAgdnMg56m/6YCPXG4vLyBkc2gg55qEIGJyb3dzZXItdHJ1c3QgZmVuY2Ug5Lya5Zug5Li6IHNlYy1mZXRjaC1zaXRlPWNyb3NzLXNpdGUg5ouS57ud5p2l6Ieq56m/6YCP5Z+f5ZCN55qE5pWP5oSf5o6l5Y+jXG5mdW5jdGlvbiBkZXRlY3RBY2Nlc3NNb2RlKCk6ICdsb2NhbCcgfCAndHVubmVsJyB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuICdsb2NhbCdcbiAgY29uc3QgaG9zdCA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZVxuICBjb25zdCBpc0xvb3BiYWNrID0gaG9zdCA9PT0gJ2xvY2FsaG9zdCcgfHwgaG9zdCA9PT0gJzEyNy4wLjAuMScgfHwgaG9zdCA9PT0gJzo6MScgfHwgaG9zdCA9PT0gJydcbiAgcmV0dXJuIGlzTG9vcGJhY2sgPyAnbG9jYWwnIDogJ3R1bm5lbCdcbn1cblxuaW50ZXJmYWNlIE1lbW9yeUl0ZW0ge1xuICBjYXRlZ29yeTogc3RyaW5nXG4gIGtleTogc3RyaW5nXG4gIGNvbnRlbnQ6IHN0cmluZ1xuICBkYXRlOiBzdHJpbmdcbn1cblxuLy8g5Zu+5qCH77ya57q/5oCnIG91dGxpbmXvvIzkuKTmnKzkuaYgPSDorrDlv4ZcbmZ1bmN0aW9uIE1lbW9yeUljb24oeyBzaXplID0gMTgsIGNvbG9yID0gJ2N1cnJlbnRDb2xvcicgfTogeyBzaXplPzogbnVtYmVyOyBjb2xvcj86IHN0cmluZyB9KSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9e2NvbG9yfSBzdHJva2VXaWR0aD17MS43NX1cbiAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj5cbiAgICAgIDxwYXRoIGQ9XCJNNCA1aDdhMSAxIDAgMCAxIDEgMXYxMkg1YTEgMSAwIDAgMS0xLTFWNVpcIiAvPlxuICAgICAgPHBhdGggZD1cIk0yMCA1aC03YTEgMSAwIDAgMC0xIDF2MTJoN2ExIDEgMCAwIDAgMS0xVjVaXCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTIgNXYxM1wiIC8+XG4gICAgICA8cGF0aCBkPVwiTTcgOGgzdjRsLTEuNS0xTDcgMTJWOFpcIiAvPlxuICAgIDwvc3ZnPlxuICApXG59XG5cbi8vIOWIhuexu+mFjeiJsu+8iOaJgeW5s+S9jumlseWSjO+8iVxuZnVuY3Rpb24gY2F0ZWdvcnlNZXRhKGNhdDogc3RyaW5nKTogeyBsYWJlbDogc3RyaW5nOyBiZzogc3RyaW5nOyBmZzogc3RyaW5nIH0ge1xuICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIHsgbGFiZWw6IHN0cmluZzsgYmc6IHN0cmluZzsgZmc6IHN0cmluZyB9PiA9IHtcbiAgICBpZGVudGl0eTogeyBsYWJlbDogJ+i6q+S7vScsIGJnOiAncmdiYSg1OSwxMzAsMjQ2LDAuMDgpJywgZmc6ICcjM0I4MkY2JyB9LFxuICAgIHByZWZlcmVuY2U6IHsgbGFiZWw6ICflgY/lpb0nLCBiZzogJ3JnYmEoMjksMjAxLDEyOSwwLjA4KScsIGZnOiAnIzFEQzk4MScgfSxcbiAgICB0YXNrOiB7IGxhYmVsOiAn5Lu75YqhJywgYmc6ICdyZ2JhKDIzOSwxNzAsMjMsMC4wOCknLCBmZzogJyNFRkFBMTcnIH0sXG4gICAgZGVjaXNpb246IHsgbGFiZWw6ICflhrPnrZYnLCBiZzogJ3JnYmEoMjMyLDcwLDU4LDAuMDgpJywgZmc6ICcjRTg0NjNBJyB9LFxuICAgIGtub3dsZWRnZTogeyBsYWJlbDogJ+efpeivhicsIGJnOiAncmdiYSg3NSw2MywyMjcsMC4wOCknLCBmZzogJyM0QjNGRTMnIH0sXG4gIH1cbiAgcmV0dXJuIG1hcFtjYXRdIHx8IHsgbGFiZWw6IGNhdCB8fCAn5YW25LuWJywgYmc6ICdyZ2JhKDEyNywxMjcsMTI3LDAuMDgpJywgZmc6ICcjNzE3MTdBJyB9XG59XG5cbmludGVyZmFjZSBNb2RhbFByb3BzIHtcbiAgbWVtb3JpZXM6IE1lbW9yeUl0ZW1bXVxuICBsb2FkaW5nOiBib29sZWFuXG4gIGVycm9yOiBzdHJpbmcgfCBudWxsXG4gIGFjY2Vzc01vZGU6ICdsb2NhbCcgfCAndHVubmVsJ1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkXG4gIG9uUmVmcmVzaDogKCkgPT4gdm9pZFxufVxuXG5mdW5jdGlvbiBNZW1vcnlQYW5lbE1vZGFsKHsgbWVtb3JpZXMsIGxvYWRpbmcsIGVycm9yLCBhY2Nlc3NNb2RlLCBvbkNsb3NlLCBvblJlZnJlc2ggfTogTW9kYWxQcm9wcykge1xuICAvLyBFU0Mg5YWz6ZetXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25LZXkgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4geyBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBvbkNsb3NlKCkgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleSlcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5KVxuICB9LCBbb25DbG9zZV0pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIGJhY2tncm91bmQ6ICdyZ2JhKDAsMCwwLDAuNDIpJywgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDNweCknLFxuICAgICAgV2Via2l0QmFja2Ryb3BGaWx0ZXI6ICdibHVyKDNweCknLCB6SW5kZXg6IDk5OTksIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFuaW1hdGlvbjogJ21mcEZhZGVJbiAwLjE4cyBlYXNlLW91dCcsXG4gICAgfX0gb25DbGljaz17b25DbG9zZX0+XG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1iZy1sZXZlbC0wLCAjRkZGRkZGKScsIGNvbG9yOiAndmFyKC0tdGV4dC1wcmltYXJ5LCAjMTcxNzE3KScsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tYm9yZGVyLWxldmVsLTEsIHJnYmEoMTI3LDEyNywxMjcsMC4xNCkpJyxcbiAgICAgICAgd2lkdGg6ICdtaW4oNTIwcHgsIDkydncpJywgbWF4SGVpZ2h0OiAnNzJ2aCcsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGJveFNoYWRvdzogJzAgMjRweCA2NHB4IHJnYmEoMCwwLDAsMC4xOCksIDAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjA4KScsXG4gICAgICAgIGFuaW1hdGlvbjogJ21mcFBvcCAwLjJzIGN1YmljLWJlemllcigwLjIyLCAxLCAwLjM2LCAxKScsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgIH19IG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgey8qIOWktOmDqCAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnLCBwYWRkaW5nOiAnMTRweCAxOHB4JyxcbiAgICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tYm9yZGVyLWxldmVsLTEsIHJnYmEoMTI3LDEyNywxMjcsMC4xKSknLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8TWVtb3J5SWNvbiBzaXplPXsxOH0gY29sb3I9XCJ2YXIoLS10ZXh0LTMwMCwgIzk5OSlcIiAvPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMnB4JyB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogNTAwLCBsaW5lSGVpZ2h0OiAxLjMgfX0+6K6w5b+G6Z2i5p2/PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tdGV4dC01MDAsICM4RjhGOEYpJywgZm9udFdlaWdodDogNDAwLCBsaW5lSGVpZ2h0OiAxLjMgfX0+XG4gICAgICAgICAgICAgIOS7o+eQhueahOmVv+acn+iusOW/huW6k1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvblJlZnJlc2h9IGRpc2FibGVkPXtsb2FkaW5nfSB0aXRsZT1cIuWIt+aWsFwiIHN0eWxlPXt7XG4gICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JywgcGFkZGluZzogJzAgMTBweCcsIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tYm9yZGVyLWxldmVsLTEsIHJnYmEoMTI3LDEyNywxMjcsMC4xOCkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICAgICAgICAgIGN1cnNvcjogbG9hZGluZyA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXG4gICAgICAgICAgICBjb2xvcjogbG9hZGluZyA/ICd2YXIoLS10ZXh0LTUwMCwgIzk5OSknIDogJ3ZhcigtLXRleHQtNDAwLCAjNjY2KScsIGZvbnRTaXplOiAnMTFweCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsIHRyYW5zaXRpb246ICdhbGwgMC4xMnMgZWFzZScsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzRweCcsXG4gICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICB7bG9hZGluZyA/ICfliqDovb3kuK0nIDogJ+WIt+aWsCd9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsb3NlfSB0aXRsZT1cIuWFs+mXrSAoRVNDKVwiIHN0eWxlPXt7XG4gICAgICAgICAgICB3aWR0aDogJzI4cHgnLCBoZWlnaHQ6ICcyOHB4JywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JywgYm9yZGVyOiAnbm9uZScsIGJvcmRlclJhZGl1czogJzZweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS10ZXh0LTQwMCwgIzY2NiknLCBmb250U2l6ZTogJzE2cHgnLCBsaW5lSGVpZ2h0OiAxLCB0cmFuc2l0aW9uOiAnYWxsIDAuMTJzIGVhc2UnLFxuICAgICAgICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgICAgIH19PsOXPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiDnqb/pgI/mqKHlvI/mj5DnpLogKi99XG4gICAgICAgIHthY2Nlc3NNb2RlID09PSAndHVubmVsJyAmJiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzhweCcsIHBhZGRpbmc6ICcxMHB4IDE4cHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMjM5LDE3MCwyMywwLjA2KScsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCByZ2JhKDIzOSwxNzAsMjMsMC4xOCknLFxuICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS41NSwgY29sb3I6ICd2YXIoLS10ZXh0LTQwMCwgIzY2NiknLFxuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxNHB4JywgbGluZUhlaWdodDogMSwgZmxleFNocmluazogMCwgbWFyZ2luVG9wOiAnMXB4JyB9fT7imqA8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEgfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNTAwLCBjb2xvcjogJ3ZhcigtLXRleHQtcHJpbWFyeSwgIzE3MTcxNyknLCBtYXJnaW5Cb3R0b206ICcycHgnIH19Puepv+mAj+aooeW8jzwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIOiuv+mXruacrOWcsOaWh+S7tuezu+e7n+OAgeiuvue9rumhueWPlyBkc2gg5a6J5YWo5Zu05qCP6ZmQ5Yi244CC6K+35Zyo5pys5Zyw6K6/6ZeuIDxjb2RlIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzExcHgnLCBwYWRkaW5nOiAnMXB4IDVweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDEyNywxMjcsMTI3LDAuMTApJyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzNweCcsIGZvbnRGYW1pbHk6ICd1aS1tb25vc3BhY2UsIFNGTW9uby1SZWd1bGFyLCBNZW5sbywgbW9ub3NwYWNlJyxcbiAgICAgICAgICAgICAgICB9fT5odHRwOi8vMTI3LjAuMC4xOjgwODA8L2NvZGU+IOS9v+eUqOi/meS6m+WKn+iDveOAglxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiDlhoXlrrnljLogKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICcxMHB4IDE4cHggMThweCcgfX0+XG4gICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc0OHB4IDAnLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJ3ZhcigtLXRleHQtNTAwLCAjOTk5KScgfX0+XG4gICAgICAgICAgICAgIOWKoOi9veS4rS4uLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IGVycm9yID8gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnNDhweCAwJywgdGV4dEFsaWduOiAnY2VudGVyJywgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjRTg0NjNBJyB9fT5cbiAgICAgICAgICAgICAg5Yqg6L295aSx6LSlOiB7ZXJyb3J9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbWVtb3JpZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICBwYWRkaW5nOiAnNDhweCAwJywgdGV4dEFsaWduOiAnY2VudGVyJywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIDxNZW1vcnlJY29uIHNpemU9ezMyfSBjb2xvcj1cInZhcigtLXRleHQtNjAwLCAjQ0NDKVwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxM3B4JywgY29sb3I6ICd2YXIoLS10ZXh0LTUwMCwgIzk5OSknIH19Pui/mOayoeacieiusOW/hjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tdGV4dC01MDAsICM5OTkpJyB9fT5cbiAgICAgICAgICAgICAgICDlkYror4nku6PnkIbjgIzorrDkvY/igKbigKbjgI3ljbPlj6/lrZjkuIvnrKzkuIDmnaFcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgbWVtb3JpZXMubWFwKChtLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1ldGEgPSBjYXRlZ29yeU1ldGEobS5jYXRlZ29yeSlcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7bS5rZXl9LSR7aX1gfSBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzE0cHggMTRweCcsIG1hcmdpblRvcDogaSA9PT0gMCA/ICc4cHgnIDogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWJnLWxldmVsLTAsICNmZmYpJyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1ib3JkZXItbGV2ZWwtMSwgcmdiYSgxMjcsMTI3LDEyNywwLjEpKScsIGJvcmRlclJhZGl1czogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2JvcmRlci1jb2xvciAwLjEycyBlYXNlLCBib3gtc2hhZG93IDAuMTJzIGVhc2UnLFxuICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc4cHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGhlaWdodDogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDdweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGZvbnRTaXplOiAnMTBweCcsIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBtZXRhLmJnLCBjb2xvcjogbWV0YS5mZywgbGV0dGVyU3BhY2luZzogJzAuMDJlbScsXG4gICAgICAgICAgICAgICAgICAgIH19PnttZXRhLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNTAwLCBjb2xvcjogJ3ZhcigtLXRleHQtcHJpbWFyeSwgIzE3MTcxNyknLCBsaW5lSGVpZ2h0OiAxIH19PlxuICAgICAgICAgICAgICAgICAgICAgIHttLmtleX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnYXV0bycsIGZvbnRTaXplOiAnMTBweCcsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6ICd2YXIoLS10ZXh0LTUwMCwgIzk5OSknLCBsaW5lSGVpZ2h0OiAxIH19PlxuICAgICAgICAgICAgICAgICAgICAgIHttLmRhdGV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEzcHgnLCBsaW5lSGVpZ2h0OiAxLjY1LCBjb2xvcjogJ3ZhcigtLXRleHQtNDAwLCAjNTU1KScsIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnIH19PlxuICAgICAgICAgICAgICAgICAgICB7bS5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIOW6lemDqCAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDE4cHgnLCBib3JkZXJUb3A6ICcxcHggc29saWQgdmFyKC0tYm9yZGVyLWxldmVsLTEsIHJnYmEoMTI3LDEyNywxMjcsMC4wOCkpJyxcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICA8TWVtb3J5SWNvbiBzaXplPXsxMn0gY29sb3I9XCJ2YXIoLS10ZXh0LTYwMCwgI0JCQilcIiAvPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgZm9udFdlaWdodDogNDAwLCBjb2xvcjogJ3ZhcigtLXRleHQtNTAwLCAjOTk5KScgfX0+ZHNoLW1lbW9yeS1wYW5lbDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiAndmFyKC0tdGV4dC01MDAsICM5OTkpJyB9fT5+Ly5kc2gvbWVtb3J5Lmpzb248L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxzdHlsZT57YFxuICAgICAgICAgIEBrZXlmcmFtZXMgbWZwRmFkZUluIHsgZnJvbSB7IG9wYWNpdHk6IDA7IH0gdG8geyBvcGFjaXR5OiAxOyB9IH1cbiAgICAgICAgICBAa2V5ZnJhbWVzIG1mcFBvcCB7IGZyb20geyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNnB4KSBzY2FsZSgwLjk4KTsgfSB0byB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSBzY2FsZSgxKTsgfSB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbi8vIOiusOW/humdouadv+aMiemSru+8iOS+p+i+ueagj++8iVxuZnVuY3Rpb24gTWVtb3J5UGFuZWxCdXR0b24oeyB3aWRlIH06IHsgd2lkZT86IGJvb2xlYW4gfSkge1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW21lbW9yaWVzLCBzZXRNZW1vcmllc10gPSB1c2VTdGF0ZTxNZW1vcnlJdGVtW10+KFtdKVxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuXG4gIGNvbnN0IGZldGNoTWVtb3JpZXMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0TG9hZGluZyh0cnVlKVxuICAgIHNldEVycm9yKG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL21lbW9yeScpXG4gICAgICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzLnN0YXR1c31gKVxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcbiAgICAgIGNvbnN0IHBhcnNlZDogTWVtb3J5SXRlbVtdID0gKGRhdGEubWVtb3JpZXMgfHwgW10pLm1hcCgobTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+ICh7XG4gICAgICAgIGNhdGVnb3J5OiAobS5jYXRlZ29yeSBhcyBzdHJpbmcpIHx8ICdnZW5lcmFsJyxcbiAgICAgICAga2V5OiAobS5rZXkgYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgICAgY29udGVudDogKG0uY29udGVudCBhcyBzdHJpbmcpIHx8ICcnLFxuICAgICAgICBkYXRlOiBTdHJpbmcobS51cGRhdGVkX2F0IHx8IG0uY3JlYXRlZF9hdCB8fCAnJykuc2xpY2UoMCwgMTApLFxuICAgICAgfSkpXG4gICAgICBzZXRNZW1vcmllcyhwYXJzZWQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgc2V0RXJyb3IoZSBpbnN0YW5jZW9mIEVycm9yID8gZS5tZXNzYWdlIDogJ2xvYWQgZmFpbGVkJylcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH0sIFtdKVxuXG4gIGNvbnN0IGhhbmRsZU9wZW4gPSAoKSA9PiB7XG4gICAgc2V0T3Blbih0cnVlKVxuICAgIGZldGNoTWVtb3JpZXMoKVxuICB9XG5cbiAgY29uc3QgYmFzZVN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xuICAgIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsIGJvcmRlcjogJ25vbmUnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBjb2xvcjogJ3ZhcigtLXRleHQtNDAwLCAjNjY2KScsIHRyYW5zaXRpb246ICdiYWNrZ3JvdW5kIDAuMTJzIGVhc2UsIGNvbG9yIDAuMTJzIGVhc2UnLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBvdXRsaW5lOiAnbm9uZScsXG4gIH1cblxuICBjb25zdCBjb21tb25IYW5kbGVycyA9IHtcbiAgICBvbk1vdXNlRW50ZXI6IChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAndmFyKC0tYmctbGV2ZWwtMSwgcmdiYSgxMjcsMTI3LDEyNywwLjA4KSknXG4gICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuY29sb3IgPSAndmFyKC0tdGV4dC1wcmltYXJ5LCAjMTcxNzE3KSdcbiAgICB9LFxuICAgIG9uTW91c2VMZWF2ZTogKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICd0cmFuc3BhcmVudCdcbiAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5jb2xvciA9ICd2YXIoLS10ZXh0LTQwMCwgIzY2NiknXG4gICAgfSxcbiAgICBvbkZvY3VzOiAoZTogUmVhY3QuRm9jdXNFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3ZhcigtLWJnLWxldmVsLTEsIHJnYmEoMTI3LDEyNywxMjcsMC4wOCkpJ1xuICAgIH0sXG4gIH1cblxuICBpZiAod2lkZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlT3Blbn1cbiAgICAgICAgICB0aXRsZT1cIuiusOW/humdouadv1wiXG4gICAgICAgICAgc3R5bGU9e3sgLi4uYmFzZVN0eWxlLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4Jywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMzZweCcsIHBhZGRpbmc6ICcwIDEycHgnIH19XG4gICAgICAgICAgey4uLmNvbW1vbkhhbmRsZXJzfVxuICAgICAgICA+XG4gICAgICAgICAgPE1lbW9yeUljb24gc2l6ZT17MTh9IC8+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxM3B4JywgZm9udFdlaWdodDogNDAwLCBsaW5lSGVpZ2h0OiAxIH19PuiusOW/hjwvc3Bhbj5cbiAgICAgICAgICB7bWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnYXV0bycsIGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6ICd2YXIoLS10ZXh0LTUwMCwgIzk5OSknLCBsaW5lSGVpZ2h0OiAxIH19PlxuICAgICAgICAgICAgICB7bWVtb3JpZXMubGVuZ3RofVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICB7b3BlbiAmJiAoXG4gICAgICAgICAgPE1lbW9yeVBhbmVsTW9kYWxcbiAgICAgICAgICAgIG1lbW9yaWVzPXttZW1vcmllc30gbG9hZGluZz17bG9hZGluZ30gZXJyb3I9e2Vycm9yfVxuICAgICAgICAgICAgYWNjZXNzTW9kZT17ZGV0ZWN0QWNjZXNzTW9kZSgpfSBvbkNsb3NlPXsoKSA9PiBzZXRPcGVuKGZhbHNlKX0gb25SZWZyZXNoPXtmZXRjaE1lbW9yaWVzfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8Lz5cbiAgICApXG4gIH1cblxuICAvLyDnqoTlsY/ovajpgZPlm77moIdcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVPcGVufSB0aXRsZT1cIuiusOW/humdouadv1wiIHN0eWxlPXt7IC4uLmJhc2VTdHlsZSwgd2lkdGg6ICczNnB4JywgaGVpZ2h0OiAnMzZweCcsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fSB7Li4uY29tbW9uSGFuZGxlcnN9PlxuICAgICAgICA8TWVtb3J5SWNvbiBzaXplPXsxOH0gLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAge29wZW4gJiYgKFxuICAgICAgICA8TWVtb3J5UGFuZWxNb2RhbFxuICAgICAgICAgIG1lbW9yaWVzPXttZW1vcmllc30gbG9hZGluZz17bG9hZGluZ30gZXJyb3I9e2Vycm9yfVxuICAgICAgICAgIGFjY2Vzc01vZGU9e2RldGVjdEFjY2Vzc01vZGUoKX0gb25DbG9zZT17KCkgPT4gc2V0T3BlbihmYWxzZSl9IG9uUmVmcmVzaD17ZmV0Y2hNZW1vcmllc31cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC8+XG4gIClcbn1cblxuLy8g5o+S5Lu25YWl5Y+jXG5leHBvcnQgY29uc3QgaW5qZWN0ID0gWydzbG90cyddXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiB7IHNsb3RzOiB7IGluamVjdDogKHNsb3Q6IHN0cmluZywgY2I6ICgpID0+IHVua25vd24pID0+IHZvaWQ7IHJlZ2lzdGVyOiAob3B0czogeyBuYW1lOiBzdHJpbmc7IGlkOiBzdHJpbmcgfSwgY29tcDogdW5rbm93bikgPT4gdW5rbm93biB9IH0pIHtcbiAgY3R4LnNsb3RzLmluamVjdCgnc2lkZWJhci5mb290ZXIuYWN0aW9uJywgKCkgPT4gY3R4LnNsb3RzLnJlZ2lzdGVyKHtcbiAgICBuYW1lOiAnc2lkZWJhci5mb290ZXIuYWN0aW9uJyxcbiAgICBpZDogJ21lbW9yeS1wYW5lbCcsXG4gIH0sIE1lbW9yeVBhbmVsQnV0dG9uKSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQXdEO0FBd0JwRDtBQWpCSixTQUFTLG1CQUF1QztBQUM5QyxNQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFDMUMsUUFBTSxPQUFPLE9BQU8sU0FBUztBQUM3QixRQUFNLGFBQWEsU0FBUyxlQUFlLFNBQVMsZUFBZSxTQUFTLFNBQVMsU0FBUztBQUM5RixTQUFPLGFBQWEsVUFBVTtBQUNoQztBQVVBLFNBQVMsV0FBVyxFQUFFLE9BQU8sSUFBSSxRQUFRLGVBQWUsR0FBc0M7QUFDNUYsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQUksT0FBTztBQUFBLE1BQU0sUUFBUTtBQUFBLE1BQU0sU0FBUTtBQUFBLE1BQVksTUFBSztBQUFBLE1BQU8sUUFBUTtBQUFBLE1BQU8sYUFBYTtBQUFBLE1BQzFGLGVBQWM7QUFBQSxNQUFRLGdCQUFlO0FBQUEsTUFDckM7QUFBQSxvREFBQyxVQUFLLEdBQUUsOENBQTZDO0FBQUEsUUFDckQsNENBQUMsVUFBSyxHQUFFLGdEQUErQztBQUFBLFFBQ3ZELDRDQUFDLFVBQUssR0FBRSxZQUFXO0FBQUEsUUFDbkIsNENBQUMsVUFBSyxHQUFFLDJCQUEwQjtBQUFBO0FBQUE7QUFBQSxFQUNwQztBQUVKO0FBR0EsU0FBUyxhQUFhLEtBQXdEO0FBQzVFLFFBQU0sTUFBaUU7QUFBQSxJQUNyRSxVQUFVLEVBQUUsT0FBTyxNQUFNLElBQUkseUJBQXlCLElBQUksVUFBVTtBQUFBLElBQ3BFLFlBQVksRUFBRSxPQUFPLE1BQU0sSUFBSSx5QkFBeUIsSUFBSSxVQUFVO0FBQUEsSUFDdEUsTUFBTSxFQUFFLE9BQU8sTUFBTSxJQUFJLHlCQUF5QixJQUFJLFVBQVU7QUFBQSxJQUNoRSxVQUFVLEVBQUUsT0FBTyxNQUFNLElBQUksd0JBQXdCLElBQUksVUFBVTtBQUFBLElBQ25FLFdBQVcsRUFBRSxPQUFPLE1BQU0sSUFBSSx3QkFBd0IsSUFBSSxVQUFVO0FBQUEsRUFDdEU7QUFDQSxTQUFPLElBQUksR0FBRyxLQUFLLEVBQUUsT0FBTyxPQUFPLE1BQU0sSUFBSSwwQkFBMEIsSUFBSSxVQUFVO0FBQ3ZGO0FBV0EsU0FBUyxpQkFBaUIsRUFBRSxVQUFVLFNBQVMsT0FBTyxZQUFZLFNBQVMsVUFBVSxHQUFlO0FBRWxHLDhCQUFVLE1BQU07QUFDZCxVQUFNLFFBQVEsQ0FBQyxNQUFxQjtBQUFFLFVBQUksRUFBRSxRQUFRLFNBQVUsU0FBUTtBQUFBLElBQUU7QUFDeEUsYUFBUyxpQkFBaUIsV0FBVyxLQUFLO0FBQzFDLFdBQU8sTUFBTSxTQUFTLG9CQUFvQixXQUFXLEtBQUs7QUFBQSxFQUM1RCxHQUFHLENBQUMsT0FBTyxDQUFDO0FBRVosU0FDRSw0Q0FBQyxTQUFJLE9BQU87QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUFTLE9BQU87QUFBQSxJQUFHLFlBQVk7QUFBQSxJQUFvQixnQkFBZ0I7QUFBQSxJQUM3RSxzQkFBc0I7QUFBQSxJQUFhLFFBQVE7QUFBQSxJQUFNLFNBQVM7QUFBQSxJQUFRLFlBQVk7QUFBQSxJQUM5RSxnQkFBZ0I7QUFBQSxJQUFVLFdBQVc7QUFBQSxFQUN2QyxHQUFHLFNBQVMsU0FDVix1REFBQyxTQUFJLE9BQU87QUFBQSxJQUNWLFlBQVk7QUFBQSxJQUE4QixPQUFPO0FBQUEsSUFDakQsY0FBYztBQUFBLElBQVEsUUFBUTtBQUFBLElBQzlCLE9BQU87QUFBQSxJQUFvQixXQUFXO0FBQUEsSUFBUSxTQUFTO0FBQUEsSUFBUSxlQUFlO0FBQUEsSUFDOUUsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQThDLFVBQVU7QUFBQSxFQUNyRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEdBRW5DO0FBQUEsaURBQUMsU0FBSSxPQUFPO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFBUSxZQUFZO0FBQUEsTUFBVSxLQUFLO0FBQUEsTUFBUSxTQUFTO0FBQUEsTUFDN0QsY0FBYztBQUFBLElBQ2hCLEdBQ0U7QUFBQSxrREFBQyxjQUFXLE1BQU0sSUFBSSxPQUFNLHlCQUF3QjtBQUFBLE1BQ3BELDZDQUFDLFNBQUksT0FBTyxFQUFFLE1BQU0sR0FBRyxTQUFTLFFBQVEsZUFBZSxVQUFVLEtBQUssTUFBTSxHQUMxRTtBQUFBLG9EQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssWUFBWSxJQUFJLEdBQUcsa0JBQUk7QUFBQSxRQUN4RSw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxVQUFVLFFBQVEsT0FBTyw0QkFBNEIsWUFBWSxLQUFLLFlBQVksSUFBSSxHQUFHLHNCQUV2RztBQUFBLFNBQ0Y7QUFBQSxNQUNBLDRDQUFDLFlBQU8sU0FBUyxXQUFXLFVBQVUsU0FBUyxPQUFNLE1BQUssT0FBTztBQUFBLFFBQy9ELFFBQVE7QUFBQSxRQUFRLFNBQVM7QUFBQSxRQUFVLFlBQVk7QUFBQSxRQUMvQyxRQUFRO0FBQUEsUUFBMkQsY0FBYztBQUFBLFFBQ2pGLFFBQVEsVUFBVSxnQkFBZ0I7QUFBQSxRQUNsQyxPQUFPLFVBQVUsMEJBQTBCO0FBQUEsUUFBeUIsVUFBVTtBQUFBLFFBQzlFLFlBQVk7QUFBQSxRQUFLLFlBQVk7QUFBQSxRQUFrQixTQUFTO0FBQUEsUUFBUSxZQUFZO0FBQUEsUUFBVSxLQUFLO0FBQUEsUUFDM0YsU0FBUztBQUFBLE1BQ1gsR0FDRyxvQkFBVSxRQUFRLE1BQ3JCO0FBQUEsTUFDQSw0Q0FBQyxZQUFPLFNBQVMsU0FBUyxPQUFNLFlBQVcsT0FBTztBQUFBLFFBQ2hELE9BQU87QUFBQSxRQUFRLFFBQVE7QUFBQSxRQUFRLFNBQVM7QUFBQSxRQUFRLFlBQVk7QUFBQSxRQUFVLGdCQUFnQjtBQUFBLFFBQ3RGLFlBQVk7QUFBQSxRQUFlLFFBQVE7QUFBQSxRQUFRLGNBQWM7QUFBQSxRQUFPLFFBQVE7QUFBQSxRQUN4RSxPQUFPO0FBQUEsUUFBeUIsVUFBVTtBQUFBLFFBQVEsWUFBWTtBQUFBLFFBQUcsWUFBWTtBQUFBLFFBQzdFLFNBQVM7QUFBQSxNQUNYLEdBQUcsZUFBQztBQUFBLE9BQ047QUFBQSxJQUdDLGVBQWUsWUFDZCw2Q0FBQyxTQUFJLE9BQU87QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUFRLFlBQVk7QUFBQSxNQUFjLEtBQUs7QUFBQSxNQUFPLFNBQVM7QUFBQSxNQUNoRSxZQUFZO0FBQUEsTUFBeUIsY0FBYztBQUFBLE1BQ25ELFVBQVU7QUFBQSxNQUFRLFlBQVk7QUFBQSxNQUFNLE9BQU87QUFBQSxJQUM3QyxHQUNFO0FBQUEsa0RBQUMsVUFBSyxPQUFPLEVBQUUsVUFBVSxRQUFRLFlBQVksR0FBRyxZQUFZLEdBQUcsV0FBVyxNQUFNLEdBQUcsZUFBQztBQUFBLE1BQ3BGLDZDQUFDLFNBQUksT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUNwQjtBQUFBLG9EQUFDLFNBQUksT0FBTyxFQUFFLFlBQVksS0FBSyxPQUFPLGdDQUFnQyxjQUFjLE1BQU0sR0FBRyxrQkFBSTtBQUFBLFFBQ2pHLDZDQUFDLFNBQUk7QUFBQTtBQUFBLFVBQzZCLDRDQUFDLFVBQUssT0FBTztBQUFBLFlBQzNDLFVBQVU7QUFBQSxZQUFRLFNBQVM7QUFBQSxZQUFXLFlBQVk7QUFBQSxZQUNsRCxjQUFjO0FBQUEsWUFBTyxZQUFZO0FBQUEsVUFDbkMsR0FBRyxtQ0FBcUI7QUFBQSxVQUFPO0FBQUEsV0FDakM7QUFBQSxTQUNGO0FBQUEsT0FDRjtBQUFBLElBSUYsNENBQUMsU0FBSSxPQUFPLEVBQUUsTUFBTSxHQUFHLFdBQVcsUUFBUSxTQUFTLGlCQUFpQixHQUNqRSxvQkFDQyw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxTQUFTLFVBQVUsV0FBVyxVQUFVLFVBQVUsUUFBUSxPQUFPLHdCQUF3QixHQUFHLG9CQUUxRyxJQUNFLFFBQ0YsNkNBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxVQUFVLFdBQVcsVUFBVSxVQUFVLFFBQVEsT0FBTyxVQUFVLEdBQUc7QUFBQTtBQUFBLE1BQ25GO0FBQUEsT0FDVCxJQUNFLFNBQVMsV0FBVyxJQUN0Qiw2Q0FBQyxTQUFJLE9BQU87QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUFVLFdBQVc7QUFBQSxNQUFVLFNBQVM7QUFBQSxNQUFRLGVBQWU7QUFBQSxNQUN4RSxZQUFZO0FBQUEsTUFBVSxLQUFLO0FBQUEsSUFDN0IsR0FDRTtBQUFBLGtEQUFDLGNBQVcsTUFBTSxJQUFJLE9BQU0seUJBQXdCO0FBQUEsTUFDcEQsNENBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sd0JBQXdCLEdBQUcsbUJBQUs7QUFBQSxNQUN2RSw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxVQUFVLFFBQVEsT0FBTyx3QkFBd0IsR0FBRywrQkFFbEU7QUFBQSxPQUNGLElBRUEsU0FBUyxJQUFJLENBQUMsR0FBRyxNQUFNO0FBQ3JCLFlBQU0sT0FBTyxhQUFhLEVBQUUsUUFBUTtBQUNwQyxhQUNFLDZDQUFDLFNBQTBCLE9BQU87QUFBQSxRQUNoQyxTQUFTO0FBQUEsUUFBYSxXQUFXLE1BQU0sSUFBSSxRQUFRO0FBQUEsUUFDbkQsWUFBWTtBQUFBLFFBQ1osUUFBUTtBQUFBLFFBQTBELGNBQWM7QUFBQSxRQUNoRixZQUFZO0FBQUEsTUFDZCxHQUNFO0FBQUEscURBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLFlBQVksVUFBVSxLQUFLLE9BQU8sY0FBYyxNQUFNLEdBQ25GO0FBQUEsc0RBQUMsVUFBSyxPQUFPO0FBQUEsWUFDWCxTQUFTO0FBQUEsWUFBZSxZQUFZO0FBQUEsWUFBVSxnQkFBZ0I7QUFBQSxZQUFVLFFBQVE7QUFBQSxZQUNoRixTQUFTO0FBQUEsWUFBUyxjQUFjO0FBQUEsWUFBTyxVQUFVO0FBQUEsWUFBUSxZQUFZO0FBQUEsWUFDckUsWUFBWSxLQUFLO0FBQUEsWUFBSSxPQUFPLEtBQUs7QUFBQSxZQUFJLGVBQWU7QUFBQSxVQUN0RCxHQUFJLGVBQUssT0FBTTtBQUFBLFVBQ2YsNENBQUMsVUFBSyxPQUFPLEVBQUUsVUFBVSxRQUFRLFlBQVksS0FBSyxPQUFPLGdDQUFnQyxZQUFZLEVBQUUsR0FDcEcsWUFBRSxLQUNMO0FBQUEsVUFDQSw0Q0FBQyxVQUFLLE9BQU8sRUFBRSxZQUFZLFFBQVEsVUFBVSxRQUFRLFlBQVksS0FBSyxPQUFPLHlCQUF5QixZQUFZLEVBQUUsR0FDakgsWUFBRSxNQUNMO0FBQUEsV0FDRjtBQUFBLFFBQ0EsNENBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxRQUFRLFlBQVksTUFBTSxPQUFPLHlCQUF5QixXQUFXLGFBQWEsR0FDdkcsWUFBRSxTQUNMO0FBQUEsV0FyQlEsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBc0J2QjtBQUFBLElBRUosQ0FBQyxHQUVMO0FBQUEsSUFHQSw2Q0FBQyxTQUFJLE9BQU87QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUFhLFdBQVc7QUFBQSxNQUNqQyxTQUFTO0FBQUEsTUFBUSxZQUFZO0FBQUEsTUFBVSxnQkFBZ0I7QUFBQSxJQUN6RCxHQUNFO0FBQUEsbURBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLFlBQVksVUFBVSxLQUFLLE1BQU0sR0FDOUQ7QUFBQSxvREFBQyxjQUFXLE1BQU0sSUFBSSxPQUFNLHlCQUF3QjtBQUFBLFFBQ3BELDRDQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssT0FBTyx3QkFBd0IsR0FBRyw4QkFBZ0I7QUFBQSxTQUN0RztBQUFBLE1BQ0EsNENBQUMsVUFBSyxPQUFPLEVBQUUsVUFBVSxRQUFRLFlBQVksS0FBSyxPQUFPLHdCQUF3QixHQUFHLGdDQUFrQjtBQUFBLE9BQ3hHO0FBQUEsSUFFQSw0Q0FBQyxXQUFPO0FBQUE7QUFBQTtBQUFBLFdBR047QUFBQSxLQUNKLEdBQ0Y7QUFFSjtBQUdBLFNBQVMsa0JBQWtCLEVBQUUsS0FBSyxHQUF1QjtBQUN2RCxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksdUJBQVMsS0FBSztBQUN0QyxRQUFNLENBQUMsVUFBVSxXQUFXLFFBQUksdUJBQXVCLENBQUMsQ0FBQztBQUN6RCxRQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksdUJBQVMsS0FBSztBQUM1QyxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksdUJBQXdCLElBQUk7QUFFdEQsUUFBTSxvQkFBZ0IsMEJBQVksWUFBWTtBQUM1QyxlQUFXLElBQUk7QUFDZixhQUFTLElBQUk7QUFDYixRQUFJO0FBQ0YsWUFBTSxNQUFNLE1BQU0sTUFBTSxhQUFhO0FBQ3JDLFVBQUksQ0FBQyxJQUFJLEdBQUksT0FBTSxJQUFJLE1BQU0sUUFBUSxJQUFJLE1BQU0sRUFBRTtBQUNqRCxZQUFNLE9BQU8sTUFBTSxJQUFJLEtBQUs7QUFDNUIsWUFBTSxVQUF3QixLQUFLLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFnQztBQUFBLFFBQ3RGLFVBQVcsRUFBRSxZQUF1QjtBQUFBLFFBQ3BDLEtBQU0sRUFBRSxPQUFrQjtBQUFBLFFBQzFCLFNBQVUsRUFBRSxXQUFzQjtBQUFBLFFBQ2xDLE1BQU0sT0FBTyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsRUFBRSxNQUFNLEdBQUcsRUFBRTtBQUFBLE1BQzlELEVBQUU7QUFDRixrQkFBWSxNQUFNO0FBQUEsSUFDcEIsU0FBUyxHQUFHO0FBQ1YsZUFBUyxhQUFhLFFBQVEsRUFBRSxVQUFVLGFBQWE7QUFBQSxJQUN6RCxVQUFFO0FBQ0EsaUJBQVcsS0FBSztBQUFBLElBQ2xCO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sYUFBYSxNQUFNO0FBQ3ZCLFlBQVEsSUFBSTtBQUNaLGtCQUFjO0FBQUEsRUFDaEI7QUFFQSxRQUFNLFlBQWlDO0FBQUEsSUFDckMsWUFBWTtBQUFBLElBQWUsUUFBUTtBQUFBLElBQVEsY0FBYztBQUFBLElBQU8sUUFBUTtBQUFBLElBQ3hFLE9BQU87QUFBQSxJQUF5QixZQUFZO0FBQUEsSUFDNUMsV0FBVztBQUFBLElBQWMsU0FBUztBQUFBLEVBQ3BDO0FBRUEsUUFBTSxpQkFBaUI7QUFBQSxJQUNyQixjQUFjLENBQUMsTUFBMkM7QUFDeEQsUUFBRSxjQUFjLE1BQU0sYUFBYTtBQUNuQyxRQUFFLGNBQWMsTUFBTSxRQUFRO0FBQUEsSUFDaEM7QUFBQSxJQUNBLGNBQWMsQ0FBQyxNQUEyQztBQUN4RCxRQUFFLGNBQWMsTUFBTSxhQUFhO0FBQ25DLFFBQUUsY0FBYyxNQUFNLFFBQVE7QUFBQSxJQUNoQztBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQTJDO0FBQ25ELFFBQUUsY0FBYyxNQUFNLGFBQWE7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFFQSxNQUFJLE1BQU07QUFDUixXQUNFLDRFQUNFO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFNBQVM7QUFBQSxVQUNULE9BQU07QUFBQSxVQUNOLE9BQU8sRUFBRSxHQUFHLFdBQVcsU0FBUyxRQUFRLFlBQVksVUFBVSxLQUFLLFFBQVEsT0FBTyxRQUFRLFFBQVEsUUFBUSxTQUFTLFNBQVM7QUFBQSxVQUMzSCxHQUFHO0FBQUEsVUFFSjtBQUFBLHdEQUFDLGNBQVcsTUFBTSxJQUFJO0FBQUEsWUFDdEIsNENBQUMsVUFBSyxPQUFPLEVBQUUsVUFBVSxRQUFRLFlBQVksS0FBSyxZQUFZLEVBQUUsR0FBRyxnQkFBRTtBQUFBLFlBQ3BFLFNBQVMsU0FBUyxLQUNqQiw0Q0FBQyxVQUFLLE9BQU8sRUFBRSxZQUFZLFFBQVEsVUFBVSxRQUFRLFlBQVksS0FBSyxPQUFPLHlCQUF5QixZQUFZLEVBQUUsR0FDakgsbUJBQVMsUUFDWjtBQUFBO0FBQUE7QUFBQSxNQUVKO0FBQUEsTUFDQyxRQUNDO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQW9CO0FBQUEsVUFBa0I7QUFBQSxVQUN0QyxZQUFZLGlCQUFpQjtBQUFBLFVBQUcsU0FBUyxNQUFNLFFBQVEsS0FBSztBQUFBLFVBQUcsV0FBVztBQUFBO0FBQUEsTUFDNUU7QUFBQSxPQUVKO0FBQUEsRUFFSjtBQUdBLFNBQ0UsNEVBQ0U7QUFBQSxnREFBQyxZQUFPLFNBQVMsWUFBWSxPQUFNLFFBQU8sT0FBTyxFQUFFLEdBQUcsV0FBVyxPQUFPLFFBQVEsUUFBUSxRQUFRLFNBQVMsUUFBUSxZQUFZLFVBQVUsZ0JBQWdCLFNBQVMsR0FBSSxHQUFHLGdCQUNySyxzREFBQyxjQUFXLE1BQU0sSUFBSSxHQUN4QjtBQUFBLElBQ0MsUUFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUFvQjtBQUFBLFFBQWtCO0FBQUEsUUFDdEMsWUFBWSxpQkFBaUI7QUFBQSxRQUFHLFNBQVMsTUFBTSxRQUFRLEtBQUs7QUFBQSxRQUFHLFdBQVc7QUFBQTtBQUFBLElBQzVFO0FBQUEsS0FFSjtBQUVKO0FBR08sSUFBTSxTQUFTLENBQUMsT0FBTztBQUN2QixTQUFTLE1BQU0sS0FBaUo7QUFDckssTUFBSSxNQUFNLE9BQU8seUJBQXlCLE1BQU0sSUFBSSxNQUFNLFNBQVM7QUFBQSxJQUNqRSxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsRUFDTixHQUFHLGlCQUFpQixDQUFDO0FBQ3ZCOyIsCiAgIm5hbWVzIjogW10KfQo=

		return module.exports;
	}
});
