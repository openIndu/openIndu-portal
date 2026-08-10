import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Bot, Cog, Github, Globe, Users, Code, ExternalLink, Cpu, Search, Database, BarChart3, Plug, Workflow as WorkflowIcon } from "lucide-react";
import { SEO } from "../components/SEO";

/** Five-stage closed loop — icon/order is fixed, copy comes from the "home" i18n namespace. */
const architectureNodeKeys = [
  { key: "processKnowledge", icon: Search },
  { key: "engineering", icon: WorkflowIcon },
  { key: "crossBrand", icon: Cpu },
  { key: "dataAcquisition", icon: Database },
  { key: "insight", icon: BarChart3 },
] as const;

/** Three core products — title is the repo name (invariant), rest from i18n. */
const coreProductKeys = [
  { key: "studio", icon: Bot, title: "openIndu-studio", link: "/motion-control/studio", external: false },
  { key: "platform", icon: Globe, title: "openIndu-platform", link: "/iiot-platform", external: false },
  {
    key: "station",
    icon: Cog,
    title: "openindu-station",
    link: "https://github.com/openIndu/openindu-station",
    external: true,
  },
] as const;

const benefitKeys = [
  { key: "openSourceEndToEnd", icon: Github },
  { key: "protocols", icon: Plug },
  { key: "contribute", icon: Users },
  { key: "collaborate", icon: Code },
] as const;

export function Home() {
  const { t } = useTranslation("home");

  return (
    <div>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        keywords={t("seo.keywords")}
        canonicalPath="/"
      />

      {/* ── 1. Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-5">
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t("hero.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
              {t("hero.titleLine1")}
              <span className="block text-blue-600 text-2xl sm:text-3xl md:text-5xl mt-4 sm:mt-6">
                {t("hero.titleLine2")}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/motion-control/studio"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t("hero.ctaStudio")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/iiot-platform"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
              >
                {t("hero.ctaSolutions")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 三大核心产品 ── */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">{t("products.heading")}</h2>
            <p className="text-sm sm:text-base text-gray-600">
              {t("products.subheading")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {coreProductKeys.map((product) => {
              const card = (
                <div className="h-full bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100">
                  <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg mb-4">
                    <product.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium mb-3">
                    {t(`products.${product.key}.stage`)}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t(`products.${product.key}.description`)}</p>
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

      {/* ── 3. 五大节点闭环 ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">{t("nodes.heading")}</h2>
            <p className="text-sm sm:text-base text-gray-600">
              {t("nodes.subheading")}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-2 sm:gap-3">
            {architectureNodeKeys.map((node, i) => (
              <div key={node.key} className="flex-1 flex flex-col lg:flex-row items-center gap-2 sm:gap-3">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-5 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2 lg:block">
                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white text-blue-600 rounded-lg border border-blue-200 lg:mb-3 flex-shrink-0">
                      <node.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 lg:mb-1.5">{t(`nodes.${node.key}.title`)}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{t(`nodes.${node.key}.duty`)}</p>
                  <span className="text-xs text-blue-700 font-medium">{t(`nodes.${node.key}.owner`)}</span>
                </div>
                {i < architectureNodeKeys.length - 1 && (
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
              {t("openSource.heading")}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              {t("openSource.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
            {benefitKeys.map((benefit) => (
              <div key={benefit.key} className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-lg mb-4 border border-blue-100">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{t(`openSource.${benefit.key}.title`)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(`openSource.${benefit.key}.description`)}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("openSource.ctaHeading")}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-8">{t("openSource.ctaSubheading")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <a
                href="https://github.com/openIndu/"
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("cta.heading")}</h2>
              <p className="text-base sm:text-xl mb-8 sm:mb-10 text-blue-100 max-w-2xl">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  href="https://github.com/openIndu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  {t("cta.quickStart")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <Link
                  to="/iiot-platform"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  {t("cta.learnPlatform")}
                </Link>
              </div>
            </div>
            {/* WeChat QR */}
            <div className="flex flex-col items-center text-center order-2">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">{t("cta.wechatHeading")}</h3>
              <img
                src="/assets/iiot/qr-code.jpg"
                alt={t("cta.wechatAlt")}
                className="w-80 sm:w-[480px] lg:w-[560px] h-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
