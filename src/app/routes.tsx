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
import ChatPage from "./pages/ChatPage";
import { AccountSettings } from "./pages/AccountSettings";
import { CookiesPolicy, LegalIndex, LegalNotice, PrivacyPolicy } from "./pages/LegalPages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", element: <Navigate to="/login" replace /> },
      { path: "account", Component: AccountSettings },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "legal", Component: LegalNotice },
      { path: "cookies", Component: CookiesPolicy },
      { path: "legal-center", Component: LegalIndex },
      { path: "motion-control", Component: MotionControl },
      // openIndu-studio 介绍（原"工作流"）：作为 AI+运动控制 的子项，公开可见，点击即显示内容
      { path: "motion-control/studio", Component: Workflow },
      { path: "chat", Component: ChatPage },
      { path: "vision", Component: Vision },
      { path: "iiot-platform", Component: IIoTPlatform },
      { path: "infrastructure", Component: TokenService },
      { path: "resources", Component: Resources },
      { path: "resources/documents", Component: Resources },
      { path: "resources/software", Component: Resources },
      // 保留旧路由以支持现有链接
      { path: "workflow", element: <Navigate to="/motion-control/studio" replace /> },
      { path: "platform", Component: IIoTPlatform },
      { path: "features", Component: IIoTPlatform },
      { path: "quick-start", Component: IIoTPlatform },
      { path: "docs", Component: IIoTPlatform },
      { path: "token-service", Component: TokenService },
      { path: "*", Component: NotFound },
    ],
  },
]);
