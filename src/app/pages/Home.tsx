import { Link } from "react-router";
import { ArrowRight, Bot, Cog, Github, Globe, Users, Zap, Code, ExternalLink, Cpu, FileSpreadsheet, ListChecks, MonitorCog, Layers, Search, Database, BarChart3, ShieldCheck, Unlock, FileSearch, Workflow as WorkflowIcon } from "lucide-react";
import { SEO } from "../components/SEO";

/** 五段痛点 —— 每段都有工具，没有一段连着下一段 */
const painPoints = [
  {
    icon: Search,
    stage: "工艺知识",
    text: "工艺窗口在老师傅脑子里。人走了，参数为什么这么设就没人说得清。",
  },
  {
    icon: WorkflowIcon,
    stage: "工程生成",
    text: "电气图、BOM、IO 表、PLC 程序活在四个互不相通的工具里。改一处，四处手工同步。",
  },
  {
    icon: Cpu,
    stage: "跨品牌执行",
    text: "换一个 PLC 品牌，程序全部重写。你的软件被硬件厂商的生态绑死。",
  },
  {
    icon: Database,
    stage: "采集与数据",
    text: "运行数据锁在控制器里。要拿出来，得再买一套系统。",
  },
  {
    icon: BarChart3,
    stage: "分析洞察",
    text: "良率掉了查不到根因。就算查到了，结论也回不到下一次设计里。",
  },
];

/** 五节点闭环 */
const architectureNodes = [
  {
    icon: Search,
    title: "工艺知识",
    duty: "工艺窗口 · 缺陷图谱 · 节拍模型",
    owner: "openIndu-studio",
  },
  {
    icon: WorkflowIcon,
    title: "工程生成",
    duty: "电气 → BOM → IO → PLC/HMI",
    owner: "openIndu-studio",
  },
  {
    icon: Cpu,
    title: "跨品牌执行",
    duty: "西门子 / 三菱 / 欧姆龙 / 基恩士 / 汇川",
    owner: "studio 产出",
  },
  {
    icon: Database,
    title: "采集与数据",
    duty: "Apache PLC4X 协议层 · 时序库",
    owner: "openIndu-platform",
  },
  {
    icon: BarChart3,
    title: "分析洞察",
    duty: "BI · OEE · 良率归因",
    owner: "openIndu-admin",
  },
];

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
    stage: "工艺知识 + 工程生成",
    description:
      "AI 辅助全链路工控开发工具链。电气模组 → 电路图 → BOM → IO 地址表 → PLC 程序 → HMI 画面，六步一个工具，多品牌输出。工艺约束库是生成的护栏：只在工艺窗口内生成。",
    link: "/motion-control/studio",
    external: false,
  },
  {
    icon: Globe,
    title: "openIndu-platform",
    stage: "采集与数据",
    description:
      "工业物联网平台。设备接入、数据采集、产线监控、产品追溯一体化。协议层直接站在 Apache PLC4X 上：S7、Modbus、EtherNet/IP、OPC-UA 全覆盖，不重复造轮子。",
    link: "/iiot-platform",
    external: false,
  },
  {
    icon: Cog,
    title: "openindu-station",
    stage: "工站软件",
    description:
      "C# 工控站控应用。运动控制 · 机器视觉 · 扫码读码 · 点胶 · 激光 —— 非标自动化工站的软件基座。硬件买得到从来不是难点，调得通才是。",
    link: "https://github.com/openIndu/openindu-station",
    external: true,
  },
];

/** 价值主张 —— 只讲用户拿到什么 */
const values = [
  {
    icon: Unlock,
    title: "跨品牌中立",
    description: "同一套设计生成西门子、三菱、欧姆龙、基恩士、汇川的代码。换品牌不用重写。",
  },
  {
    icon: ShieldCheck,
    title: "数据主权",
    description: "图纸、工艺参数、良率数据不出你的电脑，也不出你的工厂。本地运行，不依赖外网。",
  },
  {
    icon: FileSearch,
    title: "可验证",
    description: "每份产出都带解释和 diff，约束可追溯。验不了的代码，就是不敢用的代码。",
  },
];

const benefits = [
  {
    icon: Github,
    title: "全链路开源",
    description: "电气 → BOM → IO → PLC/HMI 每一步都看得见、验得了，Apache-2.0 授权",
  },
  {
    icon: Users,
    title: "贡献不必写代码",
    description: "一条品牌映射、一张 IO 表、一个工艺窗口，都是实打实的贡献",
  },
  {
    icon: Layers,
    title: "站在上游生态上",
    description: "协议层用 Apache PLC4X，不重复造轮子，把力气花在没人做的那一段",
  },
  {
    icon: Code,
    title: "开放协作",
    description: "欢迎提交 Issue 和 PR，共同打造工业自动化开源生态",
  },
];

export function Home() {
  return (
    <div>
      <SEO
        title="openIndu Community｜工业自动化的端到端开源操作系统"
        description="从工艺参数到产线数据，一个栈打通。AI 辅助全链路工控开发（电气→BOM→IO→PLC/HMI）、跨品牌代码生成、工业物联网数据采集与良率分析。任意品牌 PLC，Apache-2.0 全开源。"
        keywords="openIndu,工业自动化,开源,PLC,HMI,跨品牌,电气设计,BOM,IO地址表,工业互联网,PLC4X,OEE,良率分析,非标自动化"
        canonicalPath="/"
      />

      {/* ── 1. Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                <Github className="w-4 h-4" />
                Apache-2.0 · 开源 · 开放 · 协作
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              一栈贯通，开放智造
              <span className="block text-blue-600 text-3xl md:text-4xl mt-4">
                工业自动化的端到端开源操作系统
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              从工艺参数到产线数据，一个栈打通。任意品牌 PLC，全部开源。
            </p>
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

      {/* ── 2. 五段痛点 ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              工控行业不缺工具，缺的是把工具连起来的东西
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {painPoints.map((p) => (
              <div
                key={p.stage}
                className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white text-gray-500 rounded-lg border border-gray-200">
                  <p.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="inline-block text-sm font-semibold text-blue-700 mb-1">{p.stage}</span>
                  <p className="text-gray-700 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-lg text-gray-900 font-semibold mt-10 max-w-3xl mx-auto">
            每一段都有人做工具，<span className="text-blue-600">没有一段连着下一段</span>。
            操作系统做的就是这件事——统一的抽象、共享的驱动模型、一致的接口，让分立的部件变成一个系统。
          </p>
        </div>
      </section>

      {/* ── 3. 三大核心产品 ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">三大核心产品</h2>
            <p className="text-gray-600">全部 Apache-2.0 开源，覆盖从工艺知识到生产洞察的完整链路</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreProducts.map((product) => {
              const card = (
                <div className="h-full bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg mb-4">
                    <product.icon className="w-6 h-6" />
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium mb-3">
                    {product.stage}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              );
              return product.external ? (
                <a key={product.title} href={product.link} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              ) : (
                <Link key={product.title} to={product.link}>
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. 五节点闭环 ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">五节点闭环</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              工艺约束限定生成什么 → 程序落到产线上跑，不挑品牌 → 数据回流 → 分析修正约束 → 下一次设计从更好的基线开始
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-3 mb-8">
            {architectureNodes.map((node, i) => (
              <div key={node.title} className="flex-1 flex flex-col lg:flex-row items-center gap-3">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center justify-center w-10 h-10 bg-white text-blue-600 rounded-lg mb-3 border border-blue-200">
                    <node.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5">{node.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{node.duty}</p>
                  <span className="text-xs text-blue-700 font-medium">{node.owner}</span>
                </div>
                {i < architectureNodes.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0 rotate-90 lg:rotate-0" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 bg-gray-50 rounded-xl py-4 px-6 border border-dashed border-gray-300 max-w-3xl mx-auto">
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-180 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">闭环回流：</span>
              分析结果修正工艺窗口，回到第一个节点。每一层都可以有独立的贡献者。
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. studio 六步工作流（工程生成节点的展开）── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
              工程生成节点 · 展开
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">openIndu-studio 六步工作流</h2>
            <p className="text-gray-600">从一份设备清单到可下装的 PLC/HMI 程序，每一步的产出都是真实工程文件</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <div
                key={step.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-400">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. 价值主张 ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">你拿到什么</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white text-blue-600 rounded-lg mb-4 border border-blue-200">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. 开源仓库 ── */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Github className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">开源、开放标准、开放协作</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              最小的有效贡献是一条数据条目，不是一个写满代码的 PR
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

      {/* ── 8. CTA ── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">加入 openIndu社区</h2>
          <p className="text-xl mb-10 text-blue-100">
            从工艺参数到产线数据，一个栈打通。与全球开发者共同构建工业自动化开源生态
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
