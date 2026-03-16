import { Outlet, Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "/assets/logo.png";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "首页", href: "/" },
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
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
            <div className="hidden md:flex md:gap-x-8">
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

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <div className="md:hidden border-t border-gray-200 bg-white">
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
                  <Link to="/motion-control" className="hover:text-white">AI+运动控制</Link>
                </li>
                <li>
                  <Link to="/vision" className="hover:text-white">AI+视觉</Link>
                </li>
                <li>
                  <Link to="/iiot-platform" className="hover:text-white">AI+工业互联网平台</Link>
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
