import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Github, Users, Code, ExternalLink, Plug, CheckCircle } from "lucide-react";
import { SEO } from "../components/SEO";


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
        <div className="absolute inset-0 opacity-[0.35]" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-200 text-[#0B72B5] rounded-full text-sm font-semibold mb-5">
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t("hero.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900 [word-break:keep-all]">
              {t("hero.titleLine1")}
              <span className="block text-[#0B72B5] mt-2">{t("hero.accent")}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
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
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold">③</span>
                  <h4 className="font-semibold text-gray-900">{t("stack.l3Vision")}</h4>
                </div>
                <p className="text-sm text-gray-600">{t("stack.l3VisionDesc")}</p>
              </div>
              <div className="bg-white border border-sky-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold">③</span>
                  <h4 className="font-semibold text-gray-900">{t("stack.l3Studio")}</h4>
                </div>
                <p className="text-sm text-gray-600">{t("stack.l3StudioDesc")}</p>
              </div>
              <div className="bg-white border border-sky-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold">③</span>
                  <h4 className="font-semibold text-gray-900">{t("stack.l3Data")}</h4>
                </div>
                <p className="text-sm text-gray-600">{t("stack.l3DataDesc")}</p>
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
              理解全栈架构
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/use-cases"
              className="inline-flex min-h-[48px] items-center justify-center px-8 bg-white border border-gray-300 text-gray-800 rounded-lg hover:border-[#0B72B5] hover:text-[#0B72B5] transition-colors font-semibold"
            >
              查看行业场景
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

      {/* ── 2. 三步快速开始（从学习到产品选择的漏斗） ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">三步掌握 openIndu</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              从理解全栈架构，到选择适合的产品，openIndu 帮你快速上手
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Step 1: Understand Architecture */}
            <Link to="/architecture" className="group">
              <div className="h-full bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-[#0B72B5] hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-md bg-[#0B72B5] text-white flex items-center justify-center mb-5 font-bold text-lg">
                  1️⃣
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">理解全栈架构</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  4层从硬件到工艺知识，掌握 openIndu 如何打通工业自动化全流程
                </p>
                <div className="inline-flex items-center gap-2 text-[#0B72B5] font-medium group-hover:gap-3 transition-all">
                  深入了解
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Step 2: Explore Use Cases */}
            <Link to="/use-cases" className="group">
              <div className="h-full bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-[#0B72B5] hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-md bg-[#0B72B5] text-white flex items-center justify-center mb-5 font-bold text-lg">
                  2️⃣
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">选择行业场景</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  面板、芯片、新能源三条工艺主链的完整解决方案与工程实践
                </p>
                <div className="inline-flex items-center gap-2 text-[#0B72B5] font-medium group-hover:gap-3 transition-all">
                  查看场景
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Step 3: Choose Product */}
            <div className="group">
              <div className="h-full bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
                <div className="w-12 h-12 rounded-md bg-[#0B72B5] text-white flex items-center justify-center mb-5 font-bold text-lg">
                  3️⃣
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">选择产品工具</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  根据场景选择运动控制、工业视觉或 IIoT 平台
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <Link to="/motion-control" className="inline-flex items-center justify-center px-3 py-3 bg-white text-[#0B72B5] rounded border border-gray-200 hover:bg-gray-100 transition-colors text-sm font-medium min-h-[44px]">
                    运动控制
                  </Link>
                  <Link to="/vision" className="inline-flex items-center justify-center px-3 py-3 bg-white text-[#0B72B5] rounded border border-gray-200 hover:bg-gray-100 transition-colors text-sm font-medium min-h-[44px]">
                    工业视觉
                  </Link>
                  <Link to="/iiot-platform" className="inline-flex items-center justify-center px-3 py-3 bg-white text-[#0B72B5] rounded border border-gray-200 hover:bg-gray-100 transition-colors text-sm font-medium min-h-[44px]">
                    工业互联网
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 工艺知识库与社区参与 ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Craftsmanship Knowledge */}
            <div>
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
                Layer 4: 工艺知识层
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                工艺知识众包库
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                openIndu 不仅提供工具，更重要的是汇聚全球制造工程师的工艺知识。论坛中共享的每一条参数、每一个案例，都是生产线实战经验的积累。
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">电池工艺</p>
                    <p className="text-sm text-gray-600">卷绕速度、焊接温度、良率优化</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">PCB工艺</p>
                    <p className="text-sm text-gray-600">回流曲线、贴片精度、不良对策</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">芯片与汽车工艺</p>
                    <p className="text-sm text-gray-600">键合参数、焊接标准、质量溯源</p>
                  </div>
                </div>
              </div>
              <Link
                to="/craftsmanship"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0B72B5] text-white rounded-lg hover:bg-[#085A90] transition-colors font-medium"
              >
                了解工艺知识库
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right: Open Source & Contribute */}
            <div>
              <div className="inline-block px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-4">
                开源 · 开放 · 协作
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                完全开源，欢迎参与
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                openIndu 所有代码都在 GitHub 和 Gitee 开源。无论是提交代码、分享工艺参数，还是参与讨论，每一个贡献都推动工业自动化向前发展。
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Code className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">代码贡献</p>
                    <p className="text-sm text-gray-600">openindu-studio、platform、vision 等核心项目</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">知识分享</p>
                    <p className="text-sm text-gray-600">论坛讨论、工艺参数、经验教训</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Plug className="w-6 h-6 text-sky-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">协议扩展</p>
                    <p className="text-sm text-gray-600">基于 Apache PLC4X 添加工业协议支持</p>
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
