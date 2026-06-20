import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Github, Globe, Users, Zap, Code, ExternalLink, Cpu, Eye, Network, Server } from "lucide-react";
import { visitsApi } from "@/api";
import { ImageCarousel } from "../components/ImageCarousel";
import { SEO } from "../components/SEO";

const carouselSlides = [
  {
    src: "/assets/iiot/login.png",
    alt: "智能登录界面",
    title: "智能登录 · 安全便捷",
    description: "账号密码登录与注册，JWT Token 双令牌认证机制",
  },
  {
    src: "/assets/iiot/workbench.png",
    alt: "工作台总览",
    title: "工作台 · 全局一目了然",
    description: "多维度数据聚合，设备状态、产线运行、告警信息实时展示",
  },
  {
    src: "/assets/iiot/dashboard.png",
    alt: "数据大屏",
    title: "数据大屏 · 生产态势一屏掌控",
    description: "暗色科技风格数据大屏，适合车间看板与管理指挥中心",
  },
  {
    src: "/assets/iiot/device-mgmt.png",
    alt: "设备管理",
    title: "设备管理 · 全生命周期管控",
    description: "从设备注册到报废的全生命周期管理，实时监控与预警",
  },
  {
    src: "/assets/iiot/traceability.png",
    alt: "产品追溯",
    title: "产品追溯 · 从原料到成品全链路",
    description: "完整的产品追溯链条，从原材料到成品全程可追溯",
  },
];

const solutions = [
  {
    icon: Cpu,
    title: "工业物联网平台",
    description: "设备接入、数据采集、产线监控与告警，覆盖智能制造全场景的工业互联网基础平台。",
    link: "/iiot-platform",
  },
  {
    icon: Network,
    title: "PLC 开发工作流",
    description: "面向西门子、三菱、欧姆龙等主流品牌的 PLC 程序开发与调试工作流，AI 辅助编程。",
    link: "/workflow",
  },
  {
    icon: Eye,
    title: "机器视觉解决方案",
    description: "集成工业相机与视觉算法，实现缺陷检测、尺寸测量与产品分类的自动化视觉检测。",
    link: "/vision",
  },
  {
    icon: Server,
    title: "AI 基础设施",
    description: "基于 RAG + MCP 的工业知识库，为 Claude Code 等 AI Agent 提供工业领域知识检索服务。",
    link: "/iiot-platform",
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
  useEffect(() => {
    void visitsApi.track('/').catch(() => {})
  }, [])

  return (
    <div>
      <SEO
        title="openIndu Community｜开源智能制造工业生态"
        description="openIndu Community 面向智能制造场景，提供工业互联网平台、PLC 开发工作流、资源中心与 AI 赋能解决方案。"
        keywords="openIndu,智能制造,工业互联网,PLC,HMI,AI Agent,RAG,MCP"
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
              <span className="block text-blue-600 mt-3">开源智能制造解决方案</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold text-blue-600 block mb-2">开源、开放、协作</span>
              <span className="block">
                致力于智能制造场景，提供 AI 赋能的工业互联网解决方案。
                融合运动控制、机器视觉、工业物联网平台与 AI 基础设施，由社区共同构建完整的智能制造生态。
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/iiot-platform"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                探索解决方案
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/iiot-platform#docs"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
              >
                查看文档
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Screenshot Carousel */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">平台核心功能展示</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              六大核心功能模块，覆盖智能制造全场景
            </p>
          </div>
          <ImageCarousel slides={carouselSlides} />
          <div className="text-center mt-8">
            <Link
              to="/iiot-platform"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              了解更多详情
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心解决方案</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              四大核心解决方案，覆盖智能制造全场景，为工业 4.0 转型提供完整支持
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="relative p-8 border border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <solution.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-6 min-h-[3rem]">{solution.description}</p>
                <Link
                  to={solution.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  了解更多
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
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
          <h2 className="text-3xl font-bold mb-4">加入 openIndu 社区</h2>
          <p className="text-xl mb-10 text-blue-100">
            立即体验开源工业互联网平台，与全球开发者共同构建智能制造生态
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
        </div>
      </section>
    </div>
  );
}
