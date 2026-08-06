import { Link } from "react-router";
import { ArrowRight, ArrowDown, Bot, Cog, Github, Globe, Users, Zap, Code, ExternalLink, Cpu, FileSpreadsheet, ListChecks, MonitorCog, Layers, TrendingUp, Search, Workflow as WorkflowIcon } from "lucide-react";
import { SEO } from "../components/SEO";

const workflowSteps = [
  {
    icon: Zap,
    title: "电气模组梳理",
    description: "根据设备清单与工艺需求拆分电气模组，明确功能边界、执行元件与传感器需求。",
  },
  {
    icon: WorkflowIcon,
    title: "电路图设计",
    description: "围绕电源、控制、驱动、安全与通信回路生成电路图设计建议，并输出初步 IO 需求。",
  },
  {
    icon: FileSpreadsheet,
    title: "BOM 清单",
    description: "依据电路图和品牌选型规则汇总 PLC、HMI、驱动器、低压电器、线缆端子等物料清单。",
  },
  {
    icon: ListChecks,
    title: "IO 地址规划",
    description: "结合设备动作、信号类型和品牌地址规范生成 IO 地址表，为 PLC 变量定义提供依据。",
  },
  {
    icon: Cpu,
    title: "PLC 编程",
    description: "基于 IO 表与工艺流程设计程序结构，生成顺控、报警、手自动、通信等核心逻辑草案。",
  },
  {
    icon: MonitorCog,
    title: "HMI 编程",
    description: "围绕设备操作、状态监控、报警诊断和参数维护设计 HMI 画面与变量绑定方案。",
  },
];

const coreProducts = [
  {
    icon: Bot,
    title: "openIndu-studio",
    description: "AI 辅助的 PLC/HMI 程序开发工具链，六步工作流覆盖电气模组、电路图、BOM、IO 地址规划与编程全流程。",
    link: "/motion-control/studio",
    external: false,
  },
  {
    icon: Globe,
    title: "openIndu-platform",
    description: "面向 3C 电子制造的企业级工业互联网平台，设备管理、数据采集、可视化看板与产品追溯一体化。",
    link: "/iiot-platform",
    external: false,
  },
  {
    icon: Cog,
    title: "openindu-station",
    description: "C# 工控站控应用，集成运动控制、机器视觉、扫码、点胶与激光等非标自动化核心工艺模块。",
    link: "https://github.com/openIndu/openindu-station",
    external: true,
  },
];

const strategicLayers = [
  {
    icon: ArrowDown,
    title: "向下扎根：OT/IT 融合 · 端侧 AI",
    description:
      "工控行业打到底 —— 端侧小模型推理，数据不出厂、毫秒级时延、断网自持。打通 PLC、运动控制器、视觉系统与 IT 系统的数据壁垒，实现真正的 OT/IT 一体化。",
  },
  {
    icon: Layers,
    title: "中间深耕：非标自动化解决方案",
    description:
      "视觉引导 + 工控扫描 + 运动控制一体化，覆盖面板贴合、新能源装配、医疗检测等高精度非标自动化场景，提供从方案设计到交付的完整工具链支撑。",
  },
  {
    icon: TrendingUp,
    title: "向上突破：工艺知识专栏",
    description:
      "聚焦面板行业与半导体行业核心工艺流程，汇聚社区专家经验，打造开放、可追溯的工艺知识库 —— 即将推出，敬请期待。",
  },
];

const benefits = [
  {
    icon: Github,
    title: "完全开源",
    description: "所有核心代码公开透明，支持自由使用、修改和分发",
  },
  {
    icon: Users,
    title: "社区驱动",
    description: "由全球开发者共同参与建设，持续迭代优化",
  },
  {
    icon: Zap,
    title: "免费使用",
    description: "无需授权费用，降低企业数字化转型成本",
  },
  {
    icon: Code,
    title: "开放协作",
    description: "欢迎提交 Issue 和 PR，共同打造工业互联网生态",
  },
];

export function Home() {
  return (
    <div>
      <SEO
        title="openIndu Community｜开源非标自动化全链路工具链"
        description="openIndu Community 提供开源的非标自动化全链路工具链：AI 辅助 PLC/HMI 开发、工业互联网平台、工控站控应用。深耕 OT/IT 融合、端侧 AI、面板与半导体工艺知识。"
        keywords="openIndu,非标自动化,PLC,HMI,AI Agent,OT/IT,端侧AI,面板,半导体,工艺知识,RAG,MCP"
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                <Github className="w-4 h-4" />
                开源社区驱动
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              openIndu Community
              <span className="block text-blue-600 mt-3">开源的非标自动化全链路工具链</span>
            </h1>
            <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              工艺知识社区 · 向下扎根 OT/IT 融合与端侧 AI，中间深耕非标自动化解决方案，向上突破面板与半导体工艺
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                <ArrowDown className="w-3.5 h-3.5" /> OT/IT · 端侧 AI
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                <Layers className="w-3.5 h-3.5" /> 非标自动化
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                <TrendingUp className="w-3.5 h-3.5" /> 工艺知识
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/motion-control/studio"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                了解 openIndu-studio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/iiot-platform"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
              >
                查看解决方案
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Core Products */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">三大核心产品</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              从工控开发工具链到工业互联网平台再到站控应用，覆盖非标自动化全链路
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreProducts.map((product) => (
              <div
                key={product.title}
                className="relative p-8 border border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg mb-5 group-hover:scale-105 transition-transform">
                  <product.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                {product.external ? (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    查看仓库
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    to={product.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    了解更多
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Layers */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">上中下战略</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              向下扎根工控、中间深耕非标自动化、向上突破工艺知识天花板
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-5">
            {strategicLayers.map((layer) => (
              <div
                key={layer.title}
                className="flex flex-col sm:flex-row gap-5 items-start bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg shrink-0">
                  <layer.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{layer.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{layer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* openIndu-studio Workflow */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">openIndu-studio 开发工作流</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              AI 辅助的 PLC 开发六步工作流，从电气设计到程序草案全链路可追溯
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workflowSteps.map((step, index) => (
              <div
                key={step.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg shrink-0">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600">步骤 {index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/motion-control/studio"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              了解完整工作流
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Open Source Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Github className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择开源？</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              openIndu Community 坚持开源理念，代码公开透明，由社区共同驱动发展
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-700 mb-6 font-medium">立即访问我们的开源仓库，查看代码并参与贡献</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://github.com/openindu/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-8 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Github className="w-12 h-12" />
                  <div>
                    <h3 className="text-2xl font-semibold">GitHub</h3>
                    <p className="text-gray-300">在 GitHub 上查看项目和贡献代码</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300 font-medium group-hover:text-white transition-colors">
                  访问仓库
                  <ExternalLink className="ml-2 h-5 w-5" />
                </div>
              </a>
              <a
                href="https://gitee.com/openIndu/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-8 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Globe className="w-12 h-12" />
                  <div>
                    <h3 className="text-2xl font-semibold">Gitee</h3>
                    <p className="text-red-100">在 Gitee 上查看项目和贡献代码</p>
                  </div>
                </div>
                <div className="flex items-center text-red-200 font-medium group-hover:text-white transition-colors">
                  访问仓库
                  <ExternalLink className="ml-2 h-5 w-5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">加入 openIndu社区</h2>
          <p className="text-xl mb-10 text-blue-100">
            立即体验开源非标自动化全链路工具链，与全球开发者共同构建智能制造生态
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://gitee.com/openIndu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              快速开始
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="https://gitee.com/openIndu/openIndu-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              了解平台
            </a>
          </div>
          <div className="mt-12 flex justify-center">
            {/* 微信公众号：微信官方搜一搜联合传播样式 */}
            <div className="bg-[#07C160] rounded-2xl p-5 sm:p-6 shadow-xl max-w-md w-full">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* 左侧：二维码 — 白色圆角卡片内嵌 */}
                <div className="shrink-0 bg-white rounded-xl p-3">
                  <img
                    src="/assets/iiot/qr-code.jpg"
                    alt="openIndu 微信公众号二维码"
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg"
                  />
                </div>
                {/* 右侧：搜一搜引导信息（白字绿底） */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
                  {/* 搜一搜图标 + 标签 */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <Search className="w-4 h-4 text-white/80" />
                    <span className="text-sm text-white/80 font-medium">搜一搜</span>
                  </div>
                  {/* 公众号名称 */}
                  <p className="text-lg font-semibold text-white mb-3">openIndu</p>
                  {/* 搜索框模拟 */}
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-3 w-full max-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-white/60 shrink-0" />
                    <span className="text-sm text-white/60 truncate">openIndu</span>
                  </div>
                  {/* CTA 文案 */}
                  <p className="text-sm text-white/90">微信扫码关注公众号</p>
                  <p className="text-xs text-white/60 mt-1">获取最新动态与技术分享</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
