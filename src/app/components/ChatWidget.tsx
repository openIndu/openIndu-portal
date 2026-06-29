import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AlertTriangle, Check, CheckCircle2, Copy, FileText, Loader2, MessageCircle, Plus, Send, Trash2, X } from "lucide-react";
import { useAuth } from "@/store/auth";
import {
  chatApi,
  chatSessionApi,
  getApiErrorMessage,
  memberApplicationApi,
  type ChatMode,
  type ChatSession,
  type ChatSource,
  type MemberApplicationStatus,
} from "@/api";

interface Msg {
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  mode?: ChatMode;
  error?: boolean;
}

const EXAMPLE_PROMPTS = [
  "S7-1200 怎么配置 Modbus TCP？",
  "三菱 FX3U 怎么做串口通信？",
  "欧姆龙 NJ 系列支持哪些现场总线？",
  "变频器过流报警如何排查？",
];

const STREAMING_HINTS = [
  "正在检索知识库…",
  "AI 正在整理答案…",
];

export function ChatWidget() {
  const { isMember, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [streamingPhase, setStreamingPhase] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [application, setApplication] = useState<MemberApplicationStatus | null | undefined>(undefined);
  const [applying, setApplying] = useState(false);

  // Session state
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [msgsLoading, setMsgsLoading] = useState(false);

  // Copy state: tracks which message index was last copied
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  function autoSizeTextarea() {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (open) autoSizeTextarea();
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!streaming) { setStreamingPhase(0); return; }
    const timer = setInterval(() => setStreamingPhase((p) => (p + 1) % STREAMING_HINTS.length), 2000);
    return () => clearInterval(timer);
  }, [streaming]);

  // Load member application status
  useEffect(() => {
    if (open && isAuthenticated && !isMember && application === undefined) {
      memberApplicationApi.mine().then((v) => setApplication(v ?? null)).catch(() => setApplication(null));
    }
  }, [open, isAuthenticated, isMember, application]);

  // Load sessions when member opens the widget
  useEffect(() => {
    if (open && isMember && sessions.length === 0 && !sessionsLoading) {
      void loadSessions();
    }
  }, [open, isMember]);

  async function loadSessions() {
    setSessionsLoading(true);
    try {
      const list = await chatSessionApi.list();
      setSessions(list);
      if (list.length > 0) {
        await switchSession(list[0].id, list);
      } else {
        // Auto-create first session
        const s = await chatSessionApi.create();
        setSessions([s]);
        setActiveSessionId(s.id);
        setMessages([]);
      }
    } catch {
      /* ignore */
    } finally {
      setSessionsLoading(false);
    }
  }

  async function switchSession(id: number, list?: ChatSession[]) {
    if (streaming) return;
    setActiveSessionId(id);
    setMessages([]);
    setMsgsLoading(true);
    try {
      const raw = await chatSessionApi.messages(id);
      setMessages(
        raw.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
          sources: m.sources ?? undefined,
          mode: m.mode ?? undefined,
        }))
      );
      if (list) setSessions(list);
    } catch {
      setMessages([]);
    } finally {
      setMsgsLoading(false);
    }
  }

  async function handleNewSession() {
    if (streaming) return;
    try {
      const s = await chatSessionApi.create();
      setSessions((prev) => [s, ...prev]);
      setActiveSessionId(s.id);
      setMessages([]);
    } catch { /* ignore */ }
  }

  async function handleDeleteSession() {
    if (!activeSessionId || streaming) return;
    const id = activeSessionId;
    try {
      await chatSessionApi.remove(id);
      const next = sessions.filter((s) => s.id !== id);
      if (next.length === 0) {
        const s = await chatSessionApi.create();
        setSessions([s]);
        setActiveSessionId(s.id);
        setMessages([]);
      } else {
        setSessions(next);
        await switchSession(next[0].id);
      }
    } catch { /* ignore */ }
  }

  function patchLast(fn: (m: Msg) => void) {
    setMessages((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.role === "assistant") fn(last);
      return next;
    });
  }

  // After streaming ends, refresh session title (backend may have auto-set it)
  async function refreshSessionTitle() {
    try {
      const list = await chatSessionApi.list();
      setSessions(list);
    } catch { /* ignore */ }
  }

  async function sendPrompt(q: string) {
    if (!q || streaming || !activeSessionId) return;
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";
    setMessages((prev) => [...prev, { role: "user", content: q }, { role: "assistant", content: "" }]);
    setStreaming(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    await chatApi.streamSession(activeSessionId, q, {
      signal: ctrl.signal,
      onSources: (sources) => patchLast((m) => { m.sources = sources; }),
      onMode: (mode) => patchLast((m) => { m.mode = mode; }),
      onDelta: (text) => patchLast((m) => { m.content += text; }),
      onError: (detail) => patchLast((m) => { m.content = detail; m.error = true; }),
    });

    setStreaming(false);
    abortRef.current = null;
    void refreshSessionTitle();
  }

  function handleSend() { return sendPrompt(input.trim()); }

  async function copyMessage(content: string, idx: number) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch { /* ignore */ }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="智能咨询"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[80vh] max-h-[720px] w-[92vw] max-w-[480px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl lg:max-h-[820px] lg:max-w-[560px] xl:max-h-[88vh] xl:max-w-[640px]">
          {/* Header */}
          <div className="bg-blue-600 px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">openIndu社区智能咨询</div>
                <div className="text-xs text-blue-100">基于平台知识库的工业问答机器人</div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="关闭">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Session bar — only for members */}
            {isMember && (
              <div className="mt-2 flex items-center gap-2">
                <select
                  className="flex-1 truncate rounded-lg bg-blue-700 px-2 py-1 text-xs text-white focus:outline-none disabled:opacity-50"
                  value={activeSessionId ?? ""}
                  disabled={streaming || sessionsLoading}
                  onChange={(e) => void switchSession(Number(e.target.value))}
                >
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                <button
                  type="button"
                  title="新建会话"
                  disabled={streaming}
                  onClick={() => void handleNewSession()}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="删除当前会话"
                  disabled={streaming || !activeSessionId}
                  onClick={() => void handleDeleteSession()}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-700 text-white hover:bg-red-600 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {!isMember ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <MessageCircle className="h-10 w-10 text-blue-500" />
              <p className="text-lg text-gray-600">
                智能咨询面向<strong>会员</strong>开放
              </p>
              {isAuthenticated ? (
                application?.status === "pending" ? (
                  <div className="flex items-center gap-1.5 text-sm text-amber-700">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    申请已提交，等待管理员审核
                  </div>
                ) : application?.status === "approved" ? (
                  <div className="flex items-center gap-1.5 text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    申请已通过，请重新登录生效
                  </div>
                ) : application?.status === "rejected" ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1.5 text-sm text-red-600">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      申请已被驳回，可重新提交
                    </div>
                    <button
                      type="button"
                      disabled={applying}
                      onClick={async () => {
                        setApplying(true);
                        try {
                          const result = await memberApplicationApi.apply();
                          setApplication(result);
                        } catch (err) {
                          alert(getApiErrorMessage(err, "申请失败，请稍后重试"));
                        } finally {
                          setApplying(false);
                        }
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      重新申请
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={applying}
                    onClick={async () => {
                      setApplying(true);
                      try {
                        const result = await memberApplicationApi.apply();
                        setApplication(result);
                      } catch (err) {
                        alert(getApiErrorMessage(err, "申请失败，请稍后重试"));
                      } finally {
                        setApplying(false);
                      }
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    申请成为会员
                  </button>
                )
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
                {(sessionsLoading || msgsLoading) && (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                )}

                {!sessionsLoading && !msgsLoading && messages.length === 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-center text-sm text-gray-400">试着问我：</p>
                    {EXAMPLE_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendPrompt(prompt)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-left text-sm text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                    {m.role === "assistant" && m.mode === "fallback" && !m.error && (
                      <div className="mb-1 inline-flex items-start gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-left text-[11px] leading-snug text-amber-700 ring-1 ring-amber-200">
                        <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0" />
                        <span>以下回答<strong>非来自</strong>本平台知识库，由 AI 通用知识生成，关键参数请以厂家原版手册为准。</span>
                      </div>
                    )}
                    <div className="group relative inline-block max-w-[85%]">
                      <div
                        className={`whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-left text-sm ${
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
                            <span className="flex items-center gap-2 text-gray-400">
                              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
                              <span className="text-sm">{STREAMING_HINTS[streamingPhase]}</span>
                            </span>
                          ) : (
                            ""
                          ))}
                      </div>
                      {/* Copy button — visible on hover, only when content exists */}
                      {m.content && (
                        <button
                          type="button"
                          title="复制"
                          onClick={() => void copyMessage(m.content, i)}
                          className={`absolute -top-1 right-0 hidden rounded-md p-1 text-gray-400 transition-colors hover:text-gray-600 group-hover:flex ${
                            m.role === "user" ? "right-full mr-1" : "left-full ml-1"
                          }`}
                        >
                          {copiedIdx === i ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
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
                    ref={taRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      autoSizeTextarea();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void handleSend();
                      }
                    }}
                    rows={2}
                    placeholder="输入你的工业问题，可粘贴报错日志 / 程序段… (Enter 发送，Shift+Enter 换行)"
                    className="max-h-60 flex-1 resize-none overflow-y-auto break-words rounded-lg border border-gray-200 px-3 py-2 text-sm leading-relaxed focus:border-blue-500 focus:outline-none lg:max-h-72 xl:max-h-96"
                  />
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={streaming || !input.trim()}
                    aria-label="发送"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-40"
                  >
                    {streaming ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[11px] text-gray-300">答案由 AI 依据知识库生成，仅供参考</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChatWidget;
