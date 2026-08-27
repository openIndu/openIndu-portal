import { useTranslation } from "react-i18next";
import { ArrowRight, MessageCircle, Code, Cpu, Lightbulb } from "lucide-react";
import { SEO } from "../components/SEO";

export function Forum() {
  const { t } = useTranslation("common");

  const categories = [
    {
      icon: Code,
      title: "工控",
      description: "讨论 PLC 硬件、软件、通信总线（EtherCAT、CANopen 等）和工控系统架构。分享多品牌 PLC 的选型、集成和工业控制网络方案。",
      topics: ["PLC 硬件/软件", "EtherCAT 总线", "通信协议", "系统架构"]
    },
    {
      icon: Cpu,
      title: "自动化",
      description: "分享 PLC 编程、HMI 编程、工业视觉、运动控制等自动化应用。讨论各类自动化设备集成、工程规范和最佳实践。",
      topics: ["PLC 编程", "HMI 编程", "工业视觉", "运动控制"]
    },
    {
      icon: Lightbulb,
      title: "工艺",
      description: "分享工业工艺流程优化、工艺参数设定、缺陷分析和良率提升经验。讨论工艺知识库建设和工程方法论。",
      topics: ["工艺流程", "参数优化", "良率分析", "知识库"]
    }
  ];

  return (
    <div>
      <SEO
        title={`${t("nav.forum")} | openIndu Community`}
        description="Join the openIndu community forum to discuss industrial automation, share experiences, and collaborate on open-source projects."
        canonicalPath="/forum"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-sky-100 text-sky-800 rounded-full text-xs sm:text-sm font-semibold mb-5">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              openIndu 社区论坛
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t("nav.forum")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              加入全球开发者社区，讨论工业自动化技术、分享经验、协作贡献
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forum.openindu.com/c/process/7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-sky-700 text-white rounded-lg hover:bg-[#085A90] transition-colors font-medium"
              >
                进入论坛
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="https://github.com/openIndu/openIndu-portal/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-sky-700 hover:text-sky-700 transition-colors font-medium"
              >
                GitHub 讨论
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              论坛主要板块
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              三大核心主题，汇聚全球工业自动化经验
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category) => (
              <div key={category.title} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-sky-100 text-sky-700">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">热门话题</p>
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic) => (
                      <span key={topic} className="inline-block px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 to-cyan-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            准备好加入社区了吗？
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            无论你是提问者、解答者还是贡献者，论坛都欢迎你的参与。一起打造开源工业自动化生态。
          </p>
          <a
            href="https://forum.openindu.com/c/process/7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 rounded-lg hover:bg-sky-50 transition-colors font-medium"
          >
            前往论坛 →
          </a>
        </div>
      </section>
    </div>
  );
}

export default Forum;
