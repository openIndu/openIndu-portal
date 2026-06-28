import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AlertTriangle, FileText, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useAuth } from "@/store/auth";
import { chatApi, type ChatMode, type ChatSource } from "@/api";

interface Msg {
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  mode?: ChatMode;
  error?: boolean;
}

/**
 * 智能咨询悬浮组件（§2.2.7）。全站右下角气泡，面向 member 及以上；
 * 非会员/未登录点击引导登录。问答经 /api/v1/chat SSE 流式返回。
 */
export function ChatWidget() {
  const { isMember, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  // 卸载时中断进行中的流
  useEffect(() => () => abortRef.current?.abort(), []);

  function patchLast(fn: (m: Msg) => void) {
    setMessages((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.role === "assistant") fn(last);
      return next;
    });
  }

  async function handleSend() {
    const q = input.trim();
    if (!q || streaming) return;
    setInput("");
    const history = messages
      .filter((m) => !m.error)
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }));
    setMessages((prev) => [...prev, { role: "user", content: q }, { role: "assistant", content: "" }]);
    setStreaming(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    await chatApi.stream(
      { message: q, history },
      {
        signal: ctrl.signal,
        onSources: (sources) => patchLast((m) => { m.sources = sources; }),
        onMode: (mode) => patchLast((m) => { m.mode = mode; }),
        onDelta: (text) => patchLast((m) => { m.content += text; }),
        onError: (detail) => patchLast((m) => { m.content = detail; m.error = true; }),
      },
    );

    setStreaming(false);
    abortRef.current = null;
  }

  return (
    <>
      {/* 悬浮气泡 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="智能咨询"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* 对话面板 */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[70vh] max-h-[560px] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <div>
              <div className="text-sm font-semibold">openIndu 智能咨询</div>
              <div className="text-xs text-blue-100">基于平台知识库的工业问答</div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="关闭">
              <X className="h-5 w-5" />
            </button>
          </div>

          {!isMember ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <MessageCircle className="h-10 w-10 text-blue-500" />
              <p className="text-sm text-gray-600">
                智能咨询面向<strong>会员</strong>开放。
              </p>
              {isAuthenticated ? (
                <p className="text-xs text-gray-400">当前账号暂无会员权限，请联系管理员升级。</p>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  登录 / 注册
                </Link>
              )}
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.length === 0 && (
                  <div className="mt-6 text-center text-sm text-gray-400">
                    试着问我：
                    <br />
                    「S7-1200 怎么配置 Modbus TCP？」
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                    {m.role === "assistant" && m.mode === "fallback" && !m.error && (
                      <div className="mb-1 inline-flex items-start gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-left text-[11px] leading-snug text-amber-700 ring-1 ring-amber-200">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-px" />
                        <span>以下回答<strong>非来自</strong>本平台知识库，由 AI 通用知识生成，关键参数请以厂家原版手册为准。</span>
                      </div>
                    )}
                    <div
                      className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-left text-sm ${
                        m.role === "user"
                          ? "bg-blue-600 text-white"
                          : m.error
                            ? "bg-red-50 text-red-600"
                            : m.mode === "fallback"
                              ? "bg-amber-50 text-gray-800 ring-1 ring-amber-200"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {m.content ||
                        (streaming && i === messages.length - 1 ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          ""
                        ))}
                    </div>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-1 space-y-1">
                        <div className="text-xs text-gray-400">来源：</div>
                        {m.sources.map((s, j) => (
                          <div key={j} className="flex items-center gap-1 text-xs text-gray-400">
                            <FileText className="h-3 w-3 shrink-0" />
                            <span className="truncate">
                              《{s.document_name}》p.{s.page}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void handleSend();
                      }
                    }}
                    rows={1}
                    placeholder="输入你的工业问题…"
                    className="max-h-28 flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={streaming || !input.trim()}
                    aria-label="发送"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white disabled:opacity-40"
                  >
                    {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-center text-[11px] text-gray-300">答案由 AI 依据知识库生成，仅供参考</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChatWidget;
