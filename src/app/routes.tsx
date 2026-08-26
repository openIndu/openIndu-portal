import { useEffect, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { Home } from "./pages/Home";
import { MotionControl } from "./pages/MotionControl";
import { Vision } from "./pages/Vision";
import { IIoTPlatform } from "./pages/IIoTPlatform";
import { TokenService } from "./pages/TokenService";
import { Login } from "./pages/Login";
import { Resources } from "./pages/Resources";
import { Workflow } from "./pages/Workflow";
import { Station } from "./pages/Station";
import { Forum } from "./pages/Forum";
import ChatPage from "./pages/ChatPage";
import { AccountSettings } from "./pages/AccountSettings";
import { CookiesPolicy, LegalIndex, LegalNotice, PrivacyPolicy } from "./pages/LegalPages";
import { detectLocale, stripLocalePrefix } from "@/i18n/locale";

/**
 * On the EN locale, legal pages are not translated — redirect to the ZH
 * version via a real browser navigation (cross-basename boundary).  On the
 * ZH locale this is a transparent pass-through.
 */
function ZhOnlyGuard({ children }: { children: ReactNode }) {
  useEffect(() => {
    const locale = detectLocale();
    if (locale === "en") {
      const zhPath = stripLocalePrefix(window.location.pathname);
      window.location.replace(zhPath);
    }
  }, []);
  return <>{children}</>;
}

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "login", Component: Login },
        { path: "register", element: <Navigate to="/login" replace /> },
        { path: "account", Component: AccountSettings },
        { path: "privacy", element: <ZhOnlyGuard><PrivacyPolicy /></ZhOnlyGuard> },
        { path: "legal", element: <ZhOnlyGuard><LegalNotice /></ZhOnlyGuard> },
        { path: "cookies", element: <ZhOnlyGuard><CookiesPolicy /></ZhOnlyGuard> },
        { path: "legal-center", element: <ZhOnlyGuard><LegalIndex /></ZhOnlyGuard> },
        { path: "motion-control", Component: MotionControl },
        // openIndu-studio (formerly "workflow"): sub-page of AI+Motion Control, publicly visible
        { path: "motion-control/studio", Component: Workflow },
        // Chat's RAG knowledge base is Chinese-only — same ZH-only treatment as legal pages.
        { path: "chat", element: <ZhOnlyGuard><ChatPage /></ZhOnlyGuard> },
        { path: "vision", Component: Vision },
        // openindu-station: sub-page of AI+Vision, publicly visible
        { path: "vision/station", Component: Station },
        { path: "iiot-platform", Component: IIoTPlatform },
        // Community forum — may redirect to external platform (Discourse/GitHub Discussions) in future
        { path: "forum", Component: Forum },
        { path: "infrastructure", Component: TokenService },
        { path: "resources", Component: Resources },
        { path: "resources/documents", Component: Resources },
        { path: "resources/software", Component: Resources },
        // Legacy route redirects
        { path: "workflow", element: <Navigate to="/motion-control/studio" replace /> },
        { path: "platform", Component: IIoTPlatform },
        { path: "features", Component: IIoTPlatform },
        { path: "quick-start", Component: IIoTPlatform },
        { path: "docs", Component: IIoTPlatform },
        { path: "token-service", Component: TokenService },
        { path: "*", Component: NotFound },
      ],
    },
  ],
  { basename: detectLocale() === "en" ? "/en" : "/" },
);
