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

  const canSendCode = phonePattern.test(phone) && cooldown === 0 && !sending;
  const canLogin = phonePattern.test(phone) && codePattern.test(code) && !submitting;

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
      setMessage("验证码已发送，请在 5 分钟内完成登录");
    } catch (err) {
      setError(getApiErrorMessage(err, "验证码发送失败"));
    } finally {
      setSending(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!canLogin) {
      setError("请输入正确手机号和 6 位验证码");
      return;
    }
    setSubmitting(true);
    try {
      const result = await authApi.login(phone, code);
      await login(result);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, "登录失败，请检查验证码"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-16 sm:py-24">
      <Card className="mx-auto max-w-md border-blue-100 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle>手机号登录</CardTitle>
          <CardDescription>使用短信验证码登录 openIndu 社区门户</CardDescription>
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
            {message && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <Button type="submit" disabled={!canLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              {submitting ? <Loader2 className="animate-spin" /> : "登录"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            第一次使用？ <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">立即注册</Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
