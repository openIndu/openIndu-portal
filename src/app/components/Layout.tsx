import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import logo from "/assets/logo.png";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navigation = [
    { name: "首页", href: "/" },
    { name: "资源中心", href: "/resources" },
    { name: "工作流", href: "/workflow" },
    { name: "AI+运动控制", href: "/motion-control" },
    { name: "AI+视觉", href: "/vision" },
    { name: "AI+工业互联网平台", href: "/iiot-platform" },
    { name: "AI+基础设施", href: "/infrastructure" },
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
              {navigation.map((item) => (
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
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              {isAuthenticated ? (
                <>
                  <div className="flex max-w-[220px] items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm text-blue-700">
                    <UserRound className="h-4 w-4 shrink-0" />
                    <span className="truncate">{user?.phone ?? "已登录用户"}</span>
                    {user?.role && <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs uppercase">{user.role}</span>}
                  </div>
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
                  <Link to="/login" className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">登录</Link>
                  <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">注册</Link>
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
              <Link
                key={item.name}
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
            ))}
            <div className="mt-3 border-t border-gray-100 pt-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
                    <div>{user?.phone ?? "已登录用户"}</div>
                    {user?.role && <div className="text-xs uppercase">角色：{user.role}</div>}
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleLogout()}
                    className="block w-full rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
                  >
                    退出登录
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="rounded-lg border border-gray-200 px-3 py-2 text-center text-gray-700">登录</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="rounded-lg bg-blue-600 px-3 py-2 text-center text-white">注册</Link>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <Link to="/resources" className="hover:text-white">资源中心</Link>
                </li>
                <li>
                  <Link to="/workflow" className="hover:text-white">工作流</Link>
                </li>
                <li>
                  <Link to="/motion-control" className="hover:text-white">AI+运动控制</Link>
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

            {/* Support */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">技术支持</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://gitee.com/openIndu/openindu-platform/tree/feature/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    工业互联网平台文档
                  </a>
                </li>
                <li>
                  <a href="https://monitor.openindu.com/status/service" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    服务监控
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <p className="text-center text-gray-400 text-sm">© 2026 openIndu Community. 版本 0.0.1-SNAPSHOT</p>
            <p className="text-center text-gray-400 text-sm mt-2">
              最后更新: 2026-02-10 | 备案号: <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">蜀ICP备2025160760号-1</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
