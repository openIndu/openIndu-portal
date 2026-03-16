import { Link } from "react-router";
import { ArrowRight, Github, Globe, Users, Zap, Code, ExternalLink, Clock, Cpu, Eye, Network, Server } from "lucide-react";

export function Home() {
  const solutions = [
    {
      icon: Cpu,
      title: "AI+运动控制",
      description: "智能运动控制解决方案，结合AI算法优化工业设备运动精度与效率",
      status: "coming-soon",
      link: "/motion-control",
    },
    {
      icon: Eye,
      title: "AI+视觉",
      description: "基于深度学习的工业视觉检测系统，实现产品质量自动化检测",
      status: "coming-soon",
      link: "/vision",
    },
    {
      icon: Network,
      title: "AI+工业互联网平台",
      description: "openIndu-platform：企业级工业物联网全栈解决方案，设备管理、流程控制、产品追溯一体化",
      status: "available",
      link: "/iiot-platform",
    },
    {
      icon: Server,
      title: "AI+基础设施",
      description: "大模型API中转服务，为智能制造提供统一的AI能力接入平台",
      status: "available",
      link: "/infrastructure",
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
      description: "欢迎提交Issue和PR，共同打造工业互联网生态",
    },
  ];

  return (
    <div>

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
                致力于智能制造场景，提供AI赋能的工业互联网解决方案。
                融合运动控制、机器视觉、工业物联网平台与AI基础设施，由社区共同构建完整的智能制造生态。
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

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心解决方案</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              四大核心解决方案，覆盖智能制造全场景，为工业4.0转型提供完整支持
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="relative p-8 border border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all group"
              >
                {solution.status === "coming-soon" && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    <Clock className="w-4 h-4" />
                    <span>敬请期待</span>
                  </div>
                )}
                {solution.status === "available" && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    可用
                  </div>
                )}
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <solution.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-6 min-h-[3rem]">{solution.description}</p>
                {solution.status === "available" ? (
                  <Link
                    to={solution.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    了解更多
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center text-gray-400 font-medium">
                    即将推出
                  </span>
                )}
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
            {benefits.map((benefit, index) => (
              <div
                key={index}
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

          {/* Repository Links */}
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
                  <h3 className="text-2xl font-semibold mb-2">GitHub</h3>
                  <p className="text-gray-300">在 GitHub 上查看项目和贡献代码</p>
                </div>
                <div className={`flex items-center text-gray-300 font-medium group-hover:text-white transition-colors`}>
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
                  <h3 className="text-2xl font-semibold mb-2">Gitee</h3>
                  <p className="text-red-100">在 Gitee 上查看项目和贡献代码</p>
                </div>
                <div className={`flex items-center text-red-200 font-medium group-hover:text-white transition-colors`}>
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
          <h2 className="text-3xl font-bold mb-4">加入openIndu开源社区</h2>
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
