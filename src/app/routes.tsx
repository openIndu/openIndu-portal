import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { MotionControl } from "./pages/MotionControl";
import { Vision } from "./pages/Vision";
import { IIoTPlatform } from "./pages/IIoTPlatform";
import { TokenService } from "./pages/TokenService";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "motion-control", Component: MotionControl },
      { path: "vision", Component: Vision },
      { path: "iiot-platform", Component: IIoTPlatform },
      { path: "infrastructure", Component: TokenService },
      // 保留旧路由以支持现有链接
      { path: "platform", Component: IIoTPlatform },
      { path: "features", Component: IIoTPlatform },
      { path: "quick-start", Component: IIoTPlatform },
      { path: "docs", Component: IIoTPlatform },
      { path: "token-service", Component: TokenService },
    ],
  },
]);
