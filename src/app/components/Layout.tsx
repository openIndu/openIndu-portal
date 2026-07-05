import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { ChevronDown, LogOut, Menu, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/auth";
import { visitsApi } from "@/api";
import { getDisplayName, maskPhone } from "../utils/user";
import { StructuredData } from "./StructuredData";
import { ChatWidget } from "./ChatWidget";
import logo from "/assets/logo.png";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Report every SPA navigation to /visits/track. The shared axios client
  // attaches the Bearer token automatically when one is in localStorage, so
  // an authenticated user's pageviews land with user_id set — which is what
  // the dashboard "本月登录访问趋势" chart counts. Failures are swallowed:
  // analytics must never break navigation.
  useEffect(() => {
    void visitsApi.track(location.pathname).catch(() => {});
  }, [location.pathname]);
  const { isAuthenticated, user, logout } = useAuth();
  const displayName = getDisplayName(user);

  const ROLE_LABELS: Record<string, string> = { user: "普通用户", member: "会员", admin: "管理员" };

  type NavItem = { name: string; href: string; children?: { name: string; href: string }[] };
  const navigation: NavItem[] = [
    { name: "首页", href: "/" },
    { name: "下载中心", href: "/resources" },
    {
      name: "AI+运动控制",
      href: "/motion-control",
      children: [
        { name: "概览", href: "/motion-control" },
        { name: "openIndu-studio 平台", href: "/motion-control/studio" },
      ],
    },
    { name: "AI+视觉", href: "/vision" },
    { name: "AI+工业互联网平台", href: "/iiot-platform" },
    { name: "AI+基础设施", href: "/infrastructure" },
    { name: "智能咨询", href: "/chat" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  async function handleLogout() {
    await logout();
    setMobileMenuOpen(false);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-white">
      <StructuredData pagePath={location.pathname === "/" ? "/" : location.pathname} />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="openIndu Logo"
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="text-xl font-semibold text-gray-900">openIndu</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 xl:gap-x-6 lg:flex">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.name} className="group relative">
                    <Link
                      to={item.href}
                      className={`flex items-center gap-1 text-sm transition-colors whitespace-nowrap ${
                        isActive(item.href)
                          ? "text-blue-600 font-medium"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </Link>
                    {/* pt-2 作为悬停桥接，避免父项与面板间缝隙导致下拉收起 */}
                    <div className="absolute left-0 top-full z-50 hidden min-w-[180px] pt-2 group-hover:block">
                      <div className="rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location.pathname === child.href
                                ? "bg-blue-50 font-medium text-blue-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm transition-colors whitespace-nowrap ${
                      isActive(item.href)
                        ? "text-blue-600 font-medium"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="flex max-w-[240px] items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-100">
                    <UserRound className="h-4 w-4 shrink-0" />
                    <span className="truncate">{displayName}</span>
                    {user?.role && <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs">{ROLE_LABELS[user.role] ?? user.role}</span>}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleLogout()}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    <LogOut className="h-4 w-4" />
                    退出
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">登录 / 注册</Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-700"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="打开导航菜单"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-3 mt-1 space-y-1 border-l border-gray-100 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm ${
                          location.pathname === child.href
                            ? "bg-blue-50 font-medium text-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 border-t border-gray-100 pt-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
                    <div className="font-medium">个人中心：{displayName}</div>
                    <div className="text-xs text-blue-600">手机号：{maskPhone(user?.phone)}</div>
                    {user?.role && <div className="text-xs">角色：{ROLE_LABELS[user.role] ?? user.role}</div>}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleLogout()}
                    className="block w-full rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
                  >
                    退出登录
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="rounded-lg bg-blue-600 px-3 py-2 text-center text-white">登录 / 注册</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Logo and Description */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={logo}
                  alt="openIndu Logo"
                  className="w-10 h-10 rounded-lg object-contain"
                />
                <span className="text-xl font-semibold text-white">openIndu Community</span>
              </div>
              <p className="text-gray-400 max-w-md">
                致力于智能制造场景，提供AI赋能的工业互联网解决方案。
                融合运动控制、机器视觉、工业物联网平台与AI基础设施，构建完整的智能制造生态。
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">快速链接</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white">首页</Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-white">下载中心</Link>
                </li>
                <li>
                  <Link to="/motion-control" className="hover:text-white">AI+运动控制-概览</Link>
                </li>
                <li>
                  <Link to="/vision" className="hover:text-white">AI+视觉</Link>
                </li>
                <li>
                  <Link to="/iiot-platform" className="hover:text-white">AI+工业互联网平台</Link>
                </li>
                <li>
                  <Link to="/infrastructure" className="hover:text-white">AI+基础设施</Link>
                </li>
              </ul>
            </div>

            {/* Core Services */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">核心服务</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/motion-control/studio" className="hover:text-white">openIndu-studio 平台</Link>
                </li>
                <li>
                  <Link to="/chat" className="hover:text-white">智能咨询机器人</Link>
                </li>
              </ul>
            </div>

            {/* Related platforms */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">相关平台</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://monitor.openindu.com/status/service" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    社区服务状态
                  </a>
                </li>
                <li>
                  <a href="https://admin.openindu.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    社区管理平台
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">法律与隐私</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/privacy" className="hover:text-white">隐私声明</Link>
                </li>
                <li>
                  <Link to="/legal" className="hover:text-white">法律声明</Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-white">关于 Cookies</Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <p className="text-center text-gray-400 text-sm">© 2026 openIndu Community. 最后更新: 2026-07-04</p>
            <p className="text-center text-gray-400 text-sm mt-2">
              备案号: <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">蜀ICP备2025160760号-1</a>
            </p>
          </div>
        </div>
      </footer>

      {/* 智能咨询悬浮组件（全站可用，面向 member） */}
      <ChatWidget />
    </div>
  );
}

export default Layout;
