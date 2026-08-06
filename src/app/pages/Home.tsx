import { Link } from "react-router";
import { ArrowRight, Bot, Cog, Github, Globe, Users, Code, ExternalLink, Cpu, Search, Database, BarChart3, Plug, Workflow as WorkflowIcon } from "lucide-react";
import { SEO } from "../components/SEO";

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

const coreProducts = [
  {
    icon: Bot,
    title: "openIndu-studio",
    stage: "工艺知识 + 工程生成",
    description:
      "AI 辅助全链路工控开发工具链。电气模组 → 电路图 → BOM → IO 地址表 → PLC 程序 → HMI 画面，六步一个工具，多品牌输出。",
    link: "/motion-control/studio",
    external: false,
  },
  {
    icon: Globe,
    title: "openIndu-platform",
    stage: "工业互联网平台",
    description:
      "工业物联网平台。设备接入、数据采集、产线监控、产品追溯一体化。协议层基于 Apache PLC4X，S7、Modbus、EtherNet/IP、OPC-UA 全覆盖。",
    link: "/iiot-platform",
    external: false,
  },
  {
    icon: Cog,
    title: "openindu-station",
    stage: "工站软件",
    description:
      "C# 工控站控应用。运动控制 · 机器视觉 · 扫码读码 · 点胶 · 激光 —— 非标自动化工站的软件基座。",
    link: "https://github.com/openIndu/openindu-station",
    external: true,
  },
];

const benefits = [
  {
    icon: Github,
    title: "全链路开源",
    description: "电气 → BOM → IO → PLC/HMI 每一步都看得见、验得了，Apache-2.0 授权",
  },
  {
    icon: Plug,
    title: "开箱即用的协议支持",
    description: "S7、Modbus、EtherNet/IP、OPC-UA 等主流工业协议，接上就能采数据",
  },
  {
    icon: Users,
    title: "贡献不必写代码",
    description: "一条品牌映射、一张 IO 表、一个工艺窗口，都是实打实的贡献",
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
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-5">
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Apache-2.0 · 开源 · 开放 · 协作
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
              一栈贯通，开放智造
              <span className="block text-blue-600 text-2xl sm:text-3xl md:text-5xl mt-4 sm:mt-6">
                工业自动化的端到端开源操作系统
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              从工艺参数到产线数据，一个栈打通。任意品牌 PLC，全部开源。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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

      {/* ── 2. 三大核心产品 ── */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">三大核心产品</h2>
            <p className="text-sm sm:text-base text-gray-600">
              全部 Apache-2.0 开源，覆盖从工艺知识到生产洞察的完整链路
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {coreProducts.map((product) => {
              const card = (
                <div className="h-full bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100">
                  <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg mb-4">
                    <product.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium mb-3">
                    {product.stage}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    {product.title}
                  </h3>
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

      {/* ── 3. 五节点闭环 ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">五节点闭环</h2>
            <p className="text-sm sm:text-base text-gray-600">
              工艺约束 → 生成 → 执行 → 数据 → 洞察 → 回到工艺约束
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-2 sm:gap-3">
            {architectureNodes.map((node, i) => (
              <div key={node.title} className="flex-1 flex flex-col lg:flex-row items-center gap-2 sm:gap-3">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-5 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2 lg:block">
                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white text-blue-600 rounded-lg border border-blue-200 lg:mb-3 flex-shrink-0">
                      <node.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 lg:mb-1.5">{node.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{node.duty}</p>
                  <span className="text-xs text-blue-700 font-medium">{node.owner}</span>
                </div>
                {i < architectureNodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 rotate-90 lg:rotate-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 开源仓库 ── */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              开源、开放标准、开放协作
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              最小的有效贡献是一条数据条目，不是一个写满代码的 PR
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-lg mb-4 border border-blue-100">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              查看代码，参与贡献
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-8">全部仓库公开，Apache-2.0 授权</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <a
                href="https://github.com/openindu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 bg-[#24292f] rounded-2xl p-8 lg:p-10 hover:bg-[#1b1f24] hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-5 min-w-0">
                  <Github className="w-12 h-12 lg:w-14 lg:h-14 text-white flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <h4 className="text-2xl font-semibold text-white">GitHub</h4>
                    <p className="text-base text-gray-400 truncate">github.com/openIndu</p>
                  </div>
                </div>
                <ExternalLink className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
              </a>
              <a
                href="https://gitee.com/openIndu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 bg-[#c71d23] rounded-2xl p-8 lg:p-10 hover:bg-[#a8181d] hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-5 min-w-0">
                  <Globe className="w-12 h-12 lg:w-14 lg:h-14 text-white flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <h4 className="text-2xl font-semibold text-white">Gitee</h4>
                    <p className="text-base text-gray-200 truncate">gitee.com/openIndu</p>
                  </div>
                </div>
                <ExternalLink className="w-6 h-6 text-white/70 group-hover:text-white transition-colors flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            {/* CTA copy */}
            <div className="text-center lg:text-left order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">加入 openIndu 社区</h2>
              <p className="text-base sm:text-xl mb-8 sm:mb-10 text-blue-100 max-w-2xl">
                从工艺参数到产线数据，一个栈打通。与全球开发者共同构建工业自动化开源生态
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  href="https://github.com/openIndu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  快速开始
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <Link
                  to="/iiot-platform"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  了解平台
                </Link>
              </div>
            </div>
            {/* WeChat QR */}
            <div className="flex flex-col items-center text-center order-2">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">微信扫码关注公众号</h3>
              <img
                src="/assets/iiot/qr-code.jpg"
                alt="openIndu 微信公众号二维码"
                className="w-72 h-72 sm:w-80 sm:h-80"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
