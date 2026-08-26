import { useTranslation } from "react-i18next";
import { ArrowRight, MessageCircle, Users, Lightbulb, Code } from "lucide-react";
import { SEO } from "../components/SEO";

export function Forum() {
  const { t } = useTranslation("common");

  const features = [
    {
      icon: MessageCircle,
      title: "技术讨论",
      description: "分享工业自动化技术问题、经验和最佳实践"
    },
    {
      icon: Users,
      title: "社区协作",
      description: "与全球开发者协作，共同构建开源生态"
    },
    {
      icon: Lightbulb,
      title: "想法交流",
      description: "提出新想法、功能建议和改进方案"
    },
    {
      icon: Code,
      title: "代码分享",
      description: "分享代码片段、项目经验和技术方案"
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
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-5">
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
                href="https://forum.openindu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                进入论坛
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="https://github.com/openIndu/openIndu-portal/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
              >
                GitHub 讨论
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              论坛特色
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              在论坛中交流、学习、协作
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            准备好加入社区了吗？
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            无论你是提问者、解答者还是贡献者，论坛都欢迎你的参与。一起打造开源工业自动化生态。
          </p>
          <a
            href="https://forum.openindu.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            前往论坛 →
          </a>
        </div>
      </section>
    </div>
  );
}

export default Forum;
