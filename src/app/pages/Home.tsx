import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Github, Users, Code, ExternalLink, Plug, CheckCircle } from "lucide-react";
import { SEO } from "../components/SEO";


/**
 * Product names contain a hyphen, and a hyphen is a soft wrap opportunity, so
 * "openIndu-platform" was being split across lines in the narrow Layer-3 cards.
 * No CSS property suppresses a break at an explicit hyphen, so make each
 * hyphenated token atomic and let the line break at a space instead.
 */
function NoBreakNames({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, i) =>
        part.includes("-") ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

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

      {/* ── 1. Hero: Full-Stack Architecture Visualization ── */}
      <section className="relative bg-gradient-to-b from-sky-50 via-white to-white py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-200 text-[#0B72B5] rounded-full text-sm font-semibold mb-5">
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t("hero.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="block text-[#0B72B5] mt-2 break-words">{t("hero.titleLine2")}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("hero.chain")}
            </p>
          </div>

          {/* 4-Layer Stack Visualization */}
          <div className="space-y-3 mb-12 max-w-4xl mx-auto">
            {/* Layer 4: Craftsmanship */}
            <div className="bg-white border border-sky-100 rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0B72B5] flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">④</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900">{t("stack.l4Title")}</h3>
                  <p className="text-sm text-gray-600">{t("stack.l4Desc")}</p>
                </div>
                <Link to="/craftsmanship" className="text-[#0B72B5] hover:text-[#085A90] text-sm font-medium whitespace-nowrap inline-flex items-center py-2 px-3 min-h-[44px]">
                  {t("stack.view")}
                </Link>
              </div>
            </div>

            {/* Layer 3: Applications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white border border-sky-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0B72B5] flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold">③</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900">{t("stack.l3Vision")}</h4>
                    <p className="text-sm text-gray-600"><NoBreakNames text={t("stack.l3VisionDesc")} /></p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-sky-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0B72B5] flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold">③</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900">{t("stack.l3Studio")}</h4>
                    <p className="text-sm text-gray-600"><NoBreakNames text={t("stack.l3StudioDesc")} /></p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-sky-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0B72B5] flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold">③</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900">{t("stack.l3Data")}</h4>
                    <p className="text-sm text-gray-600"><NoBreakNames text={t("stack.l3DataDesc")} /></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 2: Programming */}
            <div className="bg-white border border-sky-100 rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0B72B5] flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">②</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900">{t("stack.l2Title")}</h3>
                  <p className="text-sm text-gray-600">{t("stack.l2Desc")}</p>
                </div>
                <Link to="/architecture" className="text-[#0B72B5] hover:text-[#085A90] text-sm font-medium whitespace-nowrap inline-flex items-center py-2 px-3 min-h-[44px]">
                  {t("stack.learn")}
                </Link>
              </div>
            </div>

            {/* Layer 1: Hardware */}
            <div className="bg-white border border-sky-100 rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0B72B5] flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">①</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900">{t("stack.l1Title")}</h3>
                  <p className="text-sm text-gray-600">{t("stack.l1Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap">
            <Link
              to="/architecture"
              className="inline-flex min-h-[48px] items-center justify-center px-8 bg-[#0B72B5] text-white rounded-lg hover:bg-[#085A90] transition-colors font-semibold"
            >
              {t("stack.ctaArchitecture")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/use-cases"
              className="inline-flex min-h-[48px] items-center justify-center px-8 bg-white border border-gray-300 text-gray-800 rounded-lg hover:border-[#0B72B5] hover:text-[#0B72B5] transition-colors font-semibold"
            >
              {t("stack.ctaUseCases")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://github.com/openIndu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center px-8 bg-white border border-gray-300 text-gray-800 rounded-lg hover:border-[#0B72B5] hover:text-[#0B72B5] transition-colors font-semibold"
            >
              GitHub
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. Three-step funnel: learn → scenario → tool ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">{t("steps.heading")}</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              {t("steps.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Step 1: Understand Architecture */}
            <Link to="/architecture" className="group">
              <div className="h-full bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-[#0B72B5] hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-md bg-[#0B72B5] text-white flex items-center justify-center mb-5 font-bold text-lg">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t("steps.s1Title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {t("steps.s1Desc")}
                </p>
                <div className="inline-flex items-center gap-2 text-[#0B72B5] font-medium group-hover:gap-3 transition-all">
                  {t("steps.s1Cta")}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Step 2: Explore Use Cases */}
            <Link to="/use-cases" className="group">
              <div className="h-full bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-[#0B72B5] hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-md bg-[#0B72B5] text-white flex items-center justify-center mb-5 font-bold text-lg">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t("steps.s2Title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {t("steps.s2Desc")}
                </p>
                <div className="inline-flex items-center gap-2 text-[#0B72B5] font-medium group-hover:gap-3 transition-all">
                  {t("steps.s2Cta")}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Step 3: Choose Product */}
            <div className="group">
              <div className="h-full bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
                <div className="w-12 h-12 rounded-md bg-[#0B72B5] text-white flex items-center justify-center mb-5 font-bold text-lg">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t("steps.s3Title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {t("steps.s3Desc")}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <Link to="/motion-control" className="inline-flex items-center justify-center px-3 py-3 bg-white text-[#0B72B5] rounded border border-gray-200 hover:bg-gray-100 transition-colors text-sm font-medium min-h-[44px]">
                    {t("steps.motionControl")}
                  </Link>
                  <Link to="/vision" className="inline-flex items-center justify-center px-3 py-3 bg-white text-[#0B72B5] rounded border border-gray-200 hover:bg-gray-100 transition-colors text-sm font-medium min-h-[44px]">
                    {t("steps.vision")}
                  </Link>
                  <Link to="/iiot-platform" className="inline-flex items-center justify-center px-3 py-3 bg-white text-[#0B72B5] rounded border border-gray-200 hover:bg-gray-100 transition-colors text-sm font-medium min-h-[44px]">
                    {t("steps.iiot")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Craftsmanship knowledge base + community participation ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Craftsmanship Knowledge */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {t("knowledge.heading")}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("knowledge.description")}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#0B72B5] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{t("knowledge.item1Title")}</p>
                    <p className="text-sm text-gray-600">{t("knowledge.item1Desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#0B72B5] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{t("knowledge.item2Title")}</p>
                    <p className="text-sm text-gray-600">{t("knowledge.item2Desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#0B72B5] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{t("knowledge.item3Title")}</p>
                    <p className="text-sm text-gray-600">{t("knowledge.item3Desc")}</p>
                  </div>
                </div>
              </div>
              <Link
                to="/craftsmanship"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0B72B5] text-white rounded-lg hover:bg-[#085A90] transition-colors font-medium"
              >
                {t("knowledge.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right: Open Source & Contribute */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {t("openSource.heading")}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("openSource.description")}
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Code className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{t("openSource.item1Title")}</p>
                    <p className="text-sm text-gray-600">{t("openSource.item1Desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{t("openSource.item2Title")}</p>
                    <p className="text-sm text-gray-600">{t("openSource.item2Desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Plug className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{t("openSource.item3Title")}</p>
                    <p className="text-sm text-gray-600">{t("openSource.item3Desc")}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://github.com/openIndu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-[#24292f] text-white rounded-lg p-4 hover:bg-[#1b1f24] transition-colors"
                >
                  <span className="font-medium">GitHub</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href="https://gitee.com/openIndu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-[#c71d23] text-white rounded-lg p-4 hover:bg-[#a8181d] transition-colors"
                >
                  <span className="font-medium">Gitee</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="py-16 sm:py-20 bg-[#0B72B5] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            {/* CTA copy */}
            <div className="text-center lg:text-left order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("cta.heading")}</h2>
              <p className="text-base sm:text-xl mb-8 sm:mb-10 text-white/90 max-w-2xl">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  href="https://github.com/openIndu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-sky-700 rounded-lg hover:bg-sky-50 transition-colors font-medium"
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
