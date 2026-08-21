import React, { useState, useCallback, useEffect } from 'react'

// dsh-memory-panel — client half
// 侧边栏「记忆」按钮 + 记忆面板弹窗，读取 GET /api/memory（宿主半提供）。

// 访问模式检测：本地 vs 穿透
// dsh 的 browser-trust fence 会因为 sec-fetch-site=cross-site 拒绝来自穿透域名的敏感接口
function detectAccessMode(): 'local' | 'tunnel' {
  if (typeof window === 'undefined') return 'local'
  const host = window.location.hostname
  const isLoopback = host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === ''
  return isLoopback ? 'local' : 'tunnel'
}

interface MemoryItem {
  category: string
  key: string
  content: string
  date: string
}

// 图标：线性 outline，两本书 = 记忆
function MemoryIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h7a1 1 0 0 1 1 1v12H5a1 1 0 0 1-1-1V5Z" />
      <path d="M20 5h-7a1 1 0 0 0-1 1v12h7a1 1 0 0 0 1-1V5Z" />
      <path d="M12 5v13" />
      <path d="M7 8h3v4l-1.5-1L7 12V8Z" />
    </svg>
  )
}

// 分类配色（扁平低饱和）
function categoryMeta(cat: string): { label: string; bg: string; fg: string } {
  const map: Record<string, { label: string; bg: string; fg: string }> = {
    identity: { label: '身份', bg: 'rgba(59,130,246,0.08)', fg: '#3B82F6' },
    preference: { label: '偏好', bg: 'rgba(29,201,129,0.08)', fg: '#1DC981' },
    task: { label: '任务', bg: 'rgba(239,170,23,0.08)', fg: '#EFAA17' },
    decision: { label: '决策', bg: 'rgba(232,70,58,0.08)', fg: '#E8463A' },
    knowledge: { label: '知识', bg: 'rgba(75,63,227,0.08)', fg: '#4B3FE3' },
  }
  return map[cat] || { label: cat || '其他', bg: 'rgba(127,127,127,0.08)', fg: '#71717A' }
}

interface ModalProps {
  memories: MemoryItem[]
  loading: boolean
  error: string | null
  accessMode: 'local' | 'tunnel'
  onClose: () => void
  onRefresh: () => void
}

function MemoryPanelModal({ memories, loading, error, accessMode, onClose, onRefresh }: ModalProps) {
  // ESC 关闭
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(3px)',
      WebkitBackdropFilter: 'blur(3px)', zIndex: 9999, display: 'flex', alignItems: 'center',
      justifyContent: 'center', animation: 'mfpFadeIn 0.18s ease-out',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-level-0, #FFFFFF)', color: 'var(--text-primary, #171717)',
        borderRadius: '12px', border: '1px solid var(--border-level-1, rgba(127,127,127,0.14))',
        width: 'min(520px, 92vw)', maxHeight: '72vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)',
        animation: 'mfpPop 0.2s cubic-bezier(0.22, 1, 0.36, 1)', overflow: 'hidden',
      }} onClick={(e) => e.stopPropagation()}>
        {/* 头部 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px',
          borderBottom: '1px solid var(--border-level-1, rgba(127,127,127,0.1))',
        }}>
          <MemoryIcon size={18} color="var(--text-300, #999)" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.3 }}>记忆面板</div>
            <div style={{ fontSize: '11px', color: 'var(--text-500, #8F8F8F)', fontWeight: 400, lineHeight: 1.3 }}>
              代理的长期记忆库
            </div>
          </div>
          <button onClick={onRefresh} disabled={loading} title="刷新" style={{
            height: '28px', padding: '0 10px', background: 'transparent',
            border: '1px solid var(--border-level-1, rgba(127,127,127,0.18))', borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            color: loading ? 'var(--text-500, #999)' : 'var(--text-400, #666)', fontSize: '11px',
            fontWeight: 500, transition: 'all 0.12s ease', display: 'flex', alignItems: 'center', gap: '4px',
            outline: 'none',
          }}>
            {loading ? '加载中' : '刷新'}
          </button>
          <button onClick={onClose} title="关闭 (ESC)" style={{
            width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer',
            color: 'var(--text-400, #666)', fontSize: '16px', lineHeight: 1, transition: 'all 0.12s ease',
            outline: 'none',
          }}>×</button>
        </div>

        {/* 穿透模式提示 */}
        {accessMode === 'tunnel' && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 18px',
            background: 'rgba(239,170,23,0.06)', borderBottom: '1px solid rgba(239,170,23,0.18)',
            fontSize: '12px', lineHeight: 1.55, color: 'var(--text-400, #666)',
          }}>
            <span style={{ fontSize: '14px', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>⚠</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: 'var(--text-primary, #171717)', marginBottom: '2px' }}>穿透模式</div>
              <div>
                访问本地文件系统、设置项受 dsh 安全围栏限制。请在本地访问 <code style={{
                  fontSize: '11px', padding: '1px 5px', background: 'rgba(127,127,127,0.10)',
                  borderRadius: '3px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}>http://127.0.0.1:8080</code> 使用这些功能。
              </div>
            </div>
          </div>
        )}

        {/* 内容区 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 18px 18px' }}>
          {loading ? (
            <div style={{ padding: '48px 0', textAlign: 'center', fontSize: '12px', color: 'var(--text-500, #999)' }}>
              加载中...
            </div>
          ) : error ? (
            <div style={{ padding: '48px 0', textAlign: 'center', fontSize: '12px', color: '#E8463A' }}>
              加载失败: {error}
            </div>
          ) : memories.length === 0 ? (
            <div style={{
              padding: '48px 0', textAlign: 'center', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '10px',
            }}>
              <MemoryIcon size={32} color="var(--text-600, #CCC)" />
              <div style={{ fontSize: '13px', color: 'var(--text-500, #999)' }}>还没有记忆</div>
              <div style={{ fontSize: '11px', color: 'var(--text-500, #999)' }}>
                告诉代理「记住……」即可存下第一条
              </div>
            </div>
          ) : (
            memories.map((m, i) => {
              const meta = categoryMeta(m.category)
              return (
                <div key={`${m.key}-${i}`} style={{
                  padding: '14px 14px', marginTop: i === 0 ? '8px' : '10px',
                  background: 'var(--bg-level-0, #fff)',
                  border: '1px solid var(--border-level-1, rgba(127,127,127,0.1))', borderRadius: '10px',
                  transition: 'border-color 0.12s ease, box-shadow 0.12s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '20px',
                      padding: '0 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 500,
                      background: meta.bg, color: meta.fg, letterSpacing: '0.02em',
                    }}>{meta.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary, #171717)', lineHeight: 1 }}>
                      {m.key}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 400, color: 'var(--text-500, #999)', lineHeight: 1 }}>
                      {m.date}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--text-400, #555)', wordBreak: 'break-word' }}>
                    {m.content}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* 底部 */}
        <div style={{
          padding: '10px 18px', borderTop: '1px solid var(--border-level-1, rgba(127,127,127,0.08))',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MemoryIcon size={12} color="var(--text-600, #BBB)" />
            <span style={{ fontSize: '10px', fontWeight: 400, color: 'var(--text-500, #999)' }}>dsh-memory-panel</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 400, color: 'var(--text-500, #999)' }}>~/.dsh/memory.json</span>
        </div>

        <style>{`
          @keyframes mfpFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes mfpPop { from { opacity: 0; transform: translateY(6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        `}</style>
      </div>
    </div>
  )
}

// 记忆面板按钮（侧边栏）
function MemoryPanelButton({ wide }: { wide?: boolean }) {
  const [open, setOpen] = useState(false)
  const [memories, setMemories] = useState<MemoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMemories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/memory')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const parsed: MemoryItem[] = (data.memories || []).map((m: Record<string, unknown>) => ({
        category: (m.category as string) || 'general',
        key: (m.key as string) || '',
        content: (m.content as string) || '',
        date: String(m.updated_at || m.created_at || '').slice(0, 10),
      }))
      setMemories(parsed)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'load failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleOpen = () => {
    setOpen(true)
    fetchMemories()
  }

  const baseStyle: React.CSSProperties = {
    background: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer',
    color: 'var(--text-400, #666)', transition: 'background 0.12s ease, color 0.12s ease',
    boxSizing: 'border-box', outline: 'none',
  }

  const commonHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.background = 'var(--bg-level-1, rgba(127,127,127,0.08))'
      e.currentTarget.style.color = 'var(--text-primary, #171717)'
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.background = 'transparent'
      e.currentTarget.style.color = 'var(--text-400, #666)'
    },
    onFocus: (e: React.FocusEvent<HTMLButtonElement>) => {
      e.currentTarget.style.background = 'var(--bg-level-1, rgba(127,127,127,0.08))'
    },
  }

  if (wide) {
    return (
      <>
        <button
          onClick={handleOpen}
          title="记忆面板"
          style={{ ...baseStyle, display: 'flex', alignItems: 'center', gap: '10px', width: '100%', height: '36px', padding: '0 12px' }}
          {...commonHandlers}
        >
          <MemoryIcon size={18} />
          <span style={{ fontSize: '13px', fontWeight: 400, lineHeight: 1 }}>记忆</span>
          {memories.length > 0 && (
            <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 500, color: 'var(--text-500, #999)', lineHeight: 1 }}>
              {memories.length}
            </span>
          )}
        </button>
        {open && (
          <MemoryPanelModal
            memories={memories} loading={loading} error={error}
            accessMode={detectAccessMode()} onClose={() => setOpen(false)} onRefresh={fetchMemories}
          />
        )}
      </>
    )
  }

  // 窄屏轨道图标
  return (
    <>
      <button onClick={handleOpen} title="记忆面板" style={{ ...baseStyle, width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...commonHandlers}>
        <MemoryIcon size={18} />
      </button>
      {open && (
        <MemoryPanelModal
          memories={memories} loading={loading} error={error}
          accessMode={detectAccessMode()} onClose={() => setOpen(false)} onRefresh={fetchMemories}
        />
      )}
    </>
  )
}

// 插件入口
export const inject = ['slots']
export function apply(ctx: { slots: { inject: (slot: string, cb: () => unknown) => void; register: (opts: { name: string; id: string }, comp: unknown) => unknown } }) {
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
    name: 'sidebar.footer.action',
    id: 'memory-panel',
  }, MemoryPanelButton))
}
