import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { ArrowRight, ChevronDown, ChevronRight, LogOut, Menu, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/store/auth";
import { visitsApi } from "@/api";
import { getDisplayName, maskPhone } from "../utils/user";
import { StructuredData } from "./StructuredData";
import { LanguageSwitcher, LanguageSwitcherCompact, LanguageSwitcherMobile } from "./LanguageSwitcher";
import logo from "/assets/logo.png";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("common");
  const locale = i18n.language; // "zh" | "en"

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Report every SPA navigation to /visits/track. The shared axios client
  // attaches the Bearer token automatically when one is in localStorage, so
  // an authenticated user's pageviews land with user_id set — which is what
  // the dashboard "Monthly Active Login Users" chart counts. Failures are
  // swallowed: analytics must never break navigation.
  useEffect(() => {
    void visitsApi.track(location.pathname).catch(() => {});
  }, [location.pathname]);
  const { isAuthenticated, user, logout } = useAuth();
  const displayName = getDisplayName(user);

  const ROLE_LABELS: Record<string, string> = useMemo(
    () => ({
      user: t("role.user"),
      member: t("role.member"),
      admin: t("role.admin"),
    }),
    [t],
  );

  type NavItem = { name: string; href: string; testid?: string; children?: NavItem[]; external?: boolean };
  const navigation: NavItem[] = useMemo(() => {
    const items: NavItem[] = [
      { name: t("nav.home"), href: "/", testid: "nav-home" },
      { name: t("nav.architecture"), href: "/architecture", testid: "nav-architecture" },
      { name: t("nav.useCases"), href: "/use-cases", testid: "nav-use-cases" },
      { name: t("nav.craftsmanship"), href: "/craftsmanship", testid: "nav-craftsmanship" },
      {
        name: t("nav.products"),
        href: "/motion-control",
        testid: "nav-products",
        children: [
          { name: t("nav.studio"), href: "/motion-control/studio", testid: "nav-studio" },
          { name: t("nav.vision"), href: "/vision/station", testid: "nav-station" },
          { name: t("nav.cim"), href: "/edge-computing", testid: "nav-edge-computing" },
          { name: t("nav.platform"), href: "/iiot-platform", testid: "nav-iiot-platform" },
        ],
      },
      { name: t("nav.forum"), href: "/forum", testid: "nav-forum" },
      { name: t("nav.downloads"), href: "/resources", testid: "nav-downloads" },
    ];
    // Hide AI Assistant on EN — the RAG knowledge base is Chinese-only
    if (locale === "zh") {
      items.push({ name: t("nav.aiAssistant"), href: "/chat", testid: "nav-ai-assistant" });
    }
    return items;
  }, [t, locale]);

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

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="absolute -top-16 -left-16 focus:top-0 focus:left-0 focus:z-50 px-4 py-4 bg-sky-700 text-white flex items-center justify-center min-h-[48px] min-w-[240px] rounded-lg font-medium"
      >
        {t("a11y.skipToContent")}
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 py-2 px-1 min-h-[44px]">
              <img
                src={logo}
                alt="openIndu Logo"
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="text-xl font-semibold text-gray-900">openIndu</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden min-w-0 flex-1 items-center justify-center gap-x-6 xl:flex">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.name} className="group relative">
                    <Link
                      to={item.href}
                      data-testid={item.testid}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex items-center justify-center gap-1 text-sm transition-colors whitespace-nowrap py-2 px-2 min-h-[44px] min-w-[60px] ${
                        isActive(item.href)
                          ? "text-sky-700 font-medium"
                          : "text-gray-700 hover:text-sky-700"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    </Link>
                    {/* pt-2 bridges the hover gap between parent item and dropdown */}
                    <div className="absolute left-0 top-full z-50 hidden min-w-[180px] pt-2 group-hover:block group-focus-within:block">
                      <div className="rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                        {item.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.name}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={child.testid}
                              className="flex items-center px-4 py-3.5 text-sm transition-colors text-gray-700 hover:bg-gray-50 hover:text-sky-700 min-h-[44px] w-full"
                            >
                              {child.name}
                            </a>
                          ) : (
                            <Link
                              key={child.name}
                              to={child.href}
                              data-testid={child.testid}
                              className={`flex items-center px-4 py-3.5 text-sm transition-colors min-h-[44px] w-full ${
                                location.pathname === child.href
                                  ? "bg-sky-50 font-medium text-sky-700"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-sky-700"
                              }`}
                            >
                              {child.name}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={item.testid}
                    className="text-sm transition-colors whitespace-nowrap text-gray-700 hover:text-sky-700 py-2 px-2 min-h-[44px] min-w-[60px] inline-flex items-center justify-center"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    data-testid={item.testid}
                    className={`text-sm transition-colors whitespace-nowrap py-2 px-2 min-h-[44px] min-w-[60px] inline-flex items-center justify-center ${
                      isActive(item.href)
                        ? "text-sky-700 font-medium"
                        : "text-gray-700 hover:text-sky-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Desktop Auth */}
            <div className="hidden xl:flex xl:items-center xl:gap-3">
              <LanguageSwitcherCompact />
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="flex max-w-[240px] items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-sm text-sky-800 hover:bg-sky-100">
                    <UserRound className="h-4 w-4 shrink-0" />
                    <span className="truncate">{displayName}</span>
                    {user?.role && <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs">{ROLE_LABELS[user.role] ?? user.role}</span>}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleLogout()}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sky-700"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("auth.signOut")}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-800 min-h-[44px] inline-flex items-center">{t("auth.signIn")}</Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="xl:hidden p-2.5 text-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label={mobileMenuOpen ? t("a11y.mobileMenuClose") : t("a11y.mobileMenuOpen")}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
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
        <div id="mobile-menu" className="xl:hidden border-t border-gray-200 bg-white" role="navigation" aria-label="Mobile navigation">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  data-testid={item.testid}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    isActive(item.href)
                      ? "bg-sky-700 text-white font-medium"
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
                        data-testid={child.testid}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm ${
                          location.pathname === child.href
                            ? "bg-sky-50 font-medium text-sky-700"
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
            {/* Language switcher (mobile) — segment control above auth block */}
            <div className="mt-3 border-t border-gray-200 pt-3">
              <LanguageSwitcherMobile onNavigate={() => setMobileMenuOpen(false)} />
            </div>
            <div className="border-t border-gray-200 pt-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-sky-50 px-3 py-3 hover:bg-sky-100"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-700 text-white">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium text-gray-900">{displayName}</span>
                        {user?.role && (
                          <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs text-sky-800">
                            {ROLE_LABELS[user.role] ?? user.role}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-gray-600">{maskPhone(user?.phone)}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-sky-300" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleLogout()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-700"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("auth.signOutFull")}
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <p className="mb-2 text-center text-xs text-gray-500">{t("auth.ctaBanner")}</p>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-sky-700 px-3 py-2.5 text-sm font-medium text-white hover:bg-sky-800"
                  >
                    {t("auth.signIn")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main id="main-content" role="main">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-sky-900 text-white mt-20" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <nav aria-label="Footer navigation" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
            {/* Logo and Description */}
            <div className="flex flex-col items-start md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={logo}
                  alt="openIndu Logo"
                  className="w-10 h-10 rounded-lg object-contain"
                />
                <span className="text-xl font-semibold text-white">openIndu Community</span>
              </div>
              <p className="text-sky-100 max-w-md">
                {t("footer.description")}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">{t("footer.quickLinks")}</h3>
              <ul className="space-y-1 text-sky-100">
                <li>
                  <Link to="/" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.home")}</Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.downloads")}</Link>
                </li>
                <li>
                  <Link to="/motion-control" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.motionControl")}</Link>
                </li>
                <li>
                  <Link to="/vision" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.vision")}</Link>
                </li>
                <li>
                  <a href="https://forum.openindu.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.forum")}</a>
                </li>
                <li>
                  <Link to="/developers" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.developers")}</Link>
                </li>
              </ul>
            </div>

            {/* Core Services */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">{t("footer.coreServices")}</h3>
              <ul className="space-y-1 text-sky-100">
                <li>
                  <Link to="/iiot-platform" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.iiotPlatform")}</Link>
                </li>
                <li>
                  <Link to="/motion-control/studio" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.studioPlatform")}</Link>
                </li>
                <li>
                  <Link to="/vision/station" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.station")}</Link>
                </li>
                <li>
                  <a href="https://github.com/openIndu" target="_blank" rel="noopener noreferrer" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.edgeComputing")}</a>
                </li>
                <li>
                  <Link to="/chat" className="hover:text-white inline-flex flex-wrap items-center gap-x-2 gap-y-1 py-1.5 pr-3 min-h-[44px]">
                    <span>{t("footer.aiAssistantBot")}</span>
                    {locale === "en" && (
                      <sup className="shrink-0 text-[10px] font-semibold tracking-wide text-sky-300" aria-label="Chinese only">ZH</sup>
                    )}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Related platforms */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">{t("footer.relatedPlatforms")}</h3>
              <ul className="space-y-1 text-sky-100">
                <li>
                  <a href="https://monitor.openindu.com/status/service" target="_blank" rel="noopener noreferrer" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">
                    {t("footer.serviceStatus")}
                  </a>
                </li>
                <li>
                  <a href="https://admin.openindu.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">
                    {t("footer.communityAdmin")}
                  </a>
                </li>
                {/* Rehomed from the removed "Community & Developers" column so
                    the code-hosting links stay reachable from the footer. */}
                <li>
                  <a href="https://github.com/openIndu" target="_blank" rel="noopener noreferrer" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.github")}</a>
                </li>
                <li>
                  <a href="https://gitee.com/openIndu" target="_blank" rel="noopener noreferrer" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.gitee")}</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-white mb-4">{t("footer.legalAndPrivacy")}</h3>
              <ul className="space-y-1 text-sky-100">
                <li>
                  {locale === "en" ? (
                    <a href="/privacy" className="hover:text-white inline-flex flex-wrap items-center gap-x-2 gap-y-1 py-1.5 pr-3 min-h-[44px]">
                      {t("footer.privacyStatement")}
                      <sup className="shrink-0 text-[10px] font-semibold tracking-wide text-sky-300" aria-label="Chinese only">ZH</sup>
                    </a>
                  ) : (
                    <Link to="/privacy" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.privacyStatement")}</Link>
                  )}
                </li>
                <li>
                  {locale === "en" ? (
                    <a href="/legal" className="hover:text-white inline-flex flex-wrap items-center gap-x-2 gap-y-1 py-1.5 pr-3 min-h-[44px]">
                      {t("footer.legalNotice")}
                      <sup className="shrink-0 text-[10px] font-semibold tracking-wide text-sky-300" aria-label="Chinese only">ZH</sup>
                    </a>
                  ) : (
                    <Link to="/legal" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.legalNotice")}</Link>
                  )}
                </li>
                <li>
                  {locale === "en" ? (
                    <a href="/cookies" className="hover:text-white inline-flex flex-wrap items-center gap-x-2 gap-y-1 py-1.5 pr-3 min-h-[44px]">
                      {t("footer.aboutCookies")}
                      <sup className="shrink-0 text-[10px] font-semibold tracking-wide text-sky-300" aria-label="Chinese only">ZH</sup>
                    </a>
                  ) : (
                    <Link to="/cookies" className="hover:text-white py-1.5 pr-3 min-w-[60px] min-h-[44px] inline-flex items-center">{t("footer.aboutCookies")}</Link>
                  )}
                </li>
              </ul>
            </div>

          </nav>

          {/* Copyright + language.
              The switcher used to be a seventh grid column, which squeezed every
              link column to 146px — narrow enough that "Privacy Statement" and
              its ZH marker wrapped, and "Community Admin" cleared it by 1px.
              Moving it here leaves six tracks and 176px per column. */}
          <div className="border-t border-sky-800 mt-8 pt-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="order-2 text-center sm:order-1 sm:text-left">
                <p className="text-sky-100 text-sm">{t("footer.copyright", { date: __BUILD_DATE__ })}</p>
                <p className="text-sky-100 text-sm mt-1">
                  {`${t("footer.icpFiling")}: `}
                  <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center py-1.5 pr-2 min-h-[44px]">蜀ICP备2025160760号-1</a>
                </p>
              </div>
              <div className="order-1 sm:order-2">
                <LanguageSwitcher variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Layout;
