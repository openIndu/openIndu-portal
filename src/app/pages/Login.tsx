import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { authApi, getApiErrorMessage } from "@/api";
import { useAuth } from "@/store/auth";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

const phonePattern = /^1\d{10}$/;
const codePattern = /^\d{6}$/;

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const redirectTo = typeof location.state === "object" && location.state && "from" in location.state
    ? (location.state.from as { pathname?: string }).pathname ?? "/resources"
    : new URLSearchParams(location.search).get("redirect") ?? "/resources";

  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true });
  }, [isAuthenticated, navigate, redirectTo]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => setCooldown((value) => Math.max(value - 1, 0)), 1_000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  // 仅在倒计时/发送中禁用按钮；手机号格式校验放到点击时提示，避免按钮静默置灰让用户误以为"无法点击"。
  const canSendCode = cooldown === 0 && !sending;
  const canSubmit = phonePattern.test(phone) && codePattern.test(code) && privacyAccepted && !submitting;

  async function handleSendCode() {
    setError("");
    setMessage("");
    if (!phonePattern.test(phone)) {
      setError("请输入 11 位中国大陆手机号");
      return;
    }
    setSending(true);
    try {
      await authApi.sendCode(phone);
      setCooldown(60);
      setMessage("验证码已发送，请在 5 分钟内完成登录/注册");
    } catch (err) {
      const msg = getApiErrorMessage(err, "验证码发送失败");
      if (msg.includes("过于频繁")) {
        setCooldown(60);
        setError(`${msg}，请等待 60 秒后再试`);
      } else {
        setError(msg);
      }
    } finally {
      setSending(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!privacyAccepted) {
      setError("请先阅读并同意隐私声明");
      return;
    }
    if (!canSubmit) {
      setError("请输入正确手机号和 6 位验证码");
      return;
    }
    setSubmitting(true);
    try {
      const result = await authApi.signIn(phone, code);
      await login(result);
      if (result.is_new_user) {
        setMessage("首次登录，已为你创建 openIndu 社区账号");
      }
      // 登录会更新 AuthProvider 状态；等待 isAuthenticated 变为 true 后由上方 effect 跳转，
      // 避免在同一个事件周期内直接进入受保护路由导致 AuthGuard 读到旧状态并回跳登录页。
    } catch (err) {
      setError(getApiErrorMessage(err, "登录/注册失败，请检查验证码"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-16 sm:py-24">
      <Card className="mx-auto max-w-md border-blue-100 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle>手机号登录 / 注册</CardTitle>
          <CardDescription>输入手机号和短信验证码；未注册手机号将自动创建 openIndu 社区账号</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="login-phone" className="text-sm font-medium text-gray-700">手机号</label>
              <Input
                id="login-phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))}
                inputMode="numeric"
                autoComplete="tel"
                placeholder="请输入 11 位手机号"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="login-code" className="text-sm font-medium text-gray-700">验证码</label>
              <div className="flex gap-2">
                <Input
                  id="login-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="6 位验证码"
                />
                <Button type="button" variant="outline" onClick={handleSendCode} disabled={!canSendCode} className="min-w-28">
                  {sending ? <Loader2 className="animate-spin" /> : cooldown > 0 ? `${cooldown}s` : "发送验证码"}
                </Button>
              </div>
            </div>
            <label className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(event) => setPrivacyAccepted(event.target.checked)}
                className="mt-1"
              />
              <span>
                我已阅读并同意 <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-700">openIndu社区隐私声明</Link>，了解平台对个人信息的处理方式。
              </span>
            </label>
            {message && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <Button type="submit" disabled={!canSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
              {submitting ? <Loader2 className="animate-spin" /> : "登录 / 注册"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
