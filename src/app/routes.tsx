import { createBrowserRouter } from "react-router";
import { AuthGuard } from "./components/AuthGuard";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { Home } from "./pages/Home";
import { MotionControl } from "./pages/MotionControl";
import { Vision } from "./pages/Vision";
import { IIoTPlatform } from "./pages/IIoTPlatform";
import { TokenService } from "./pages/TokenService";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Resources } from "./pages/Resources";
import { Workflow } from "./pages/Workflow";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "motion-control", Component: MotionControl },
      { path: "vision", Component: Vision },
      { path: "iiot-platform", Component: IIoTPlatform },
      { path: "infrastructure", Component: TokenService },
      {
        Component: AuthGuard,
        children: [
          { path: "resources", Component: Resources },
          { path: "resources/documents", Component: Resources },
          { path: "resources/software", Component: Resources },
        ],
      },
      {
        element: <AuthGuard role="member" />,
        children: [
          { path: "workflow", Component: Workflow },
        ],
      },
      // 保留旧路由以支持现有链接
      { path: "platform", Component: IIoTPlatform },
      { path: "features", Component: IIoTPlatform },
      { path: "quick-start", Component: IIoTPlatform },
      { path: "docs", Component: IIoTPlatform },
      { path: "token-service", Component: TokenService },
      { path: "*", Component: NotFound },
    ],
  },
]);
