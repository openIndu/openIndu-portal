import { useTranslation } from "react-i18next";
import { ArrowRight, BookOpen, Battery, Bot, Car, Cpu } from "lucide-react";
import { SEO } from "../components/SEO";

const FORUM = "https://forum.openindu.com";

// Industries and process-chain wording follow the community research
// baseline. The detailed internal guides under community/docs/ are NOT linked
// because that directory is marked "内部资产，不对外发布" — every link below
// points at a public forum topic instead. IDs verified by
// scripts/check-external-links.mjs.
const industryKeys = [
  { key: "panel", icon: BookOpen, topic: 53 },
  { key: "semiconductor", icon: Cpu, topic: 56 },
  { key: "newEnergy", icon: Battery, topic: 57 },
  { key: "automotive", icon: Car, topic: 58 },
  { key: "equipment", icon: Bot, topic: 59 },
] as const;

const articleKeys = [
  { key: "tftLcd", topic: 53 },
  { key: "oled", topic: 55 },
  { key: "wafer", topic: 56 },
  { key: "battery", topic: 57 },
  { key: "pv", topic: 73 },
  { key: "automotive", topic: 58 },
  { key: "robot", topic: 59 },
] as const;

export function Craftsmanship() {
  const { t } = useTranslation("craftsmanship");

  const industries = industryKeys.map((i) => ({
    ...i,
    name: t(`industries.${i.key}.name`),
    description: t(`industries.${i.key}.description`),
    topics: t(`industries.${i.key}.topics`, { returnObjects: true }) as string[],
  }));

  const articles = articleKeys.map((a) => ({
    ...a,
    title: t(`articles.${a.key}.title`),
    industry: t(`articles.${a.key}.industry`),
  }));

  const benefits = t("benefits.items", { returnObjects: true }) as {
    icon: string;
    title: string;
    description: string;
  }[];

  const steps = t("howItWorks.steps", { returnObjects: true }) as {
    title: string;
    desc: string;
  }[];

  return (
    <div>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        canonicalPath="/craftsmanship"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <p className="text-gray-600">{t("hero.tagline")}</p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("industries.heading")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => (
              <a
                key={industry.key}
                href={`${FORUM}/t/topic/${industry.topic}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border-2 border-gray-200 p-6 sm:p-8 hover:border-[#0B72B5] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#0B72B5] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <industry.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{industry.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {industry.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="inline-block px-3 py-1 bg-sky-50 text-[#085A90] text-sm rounded-full">
                      {topic}
                    </span>
                  ))}
                  {industry.topics.length > 3 && (
                    <span className="inline-block px-3 py-1 bg-sky-50 text-[#085A90] text-sm rounded-full">
                      +{industry.topics.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[#0B72B5] font-medium group-hover:translate-x-1 transition-transform">
                  {t("industries.enterForum")} <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Participation */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("benefits.heading")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forum articles */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("articles.heading")}</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <a
                key={article.key}
                href={`${FORUM}/t/topic/${article.topic}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 border border-gray-200 rounded-lg hover:border-[#0B72B5] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">{article.title}</h3>
                  <span className="shrink-0 inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-sm text-[#085A90]">
                    {article.industry}
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={`${FORUM}/c/process/7`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0B72B5] text-white rounded-lg hover:bg-[#085A90] transition-colors font-medium"
            >
              {t("articles.viewAll")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("howItWorks.heading")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0B72B5] text-white font-bold text-xl mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#085A90] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("cta.heading")}</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">{t("cta.description")}</p>
          <a
            href={`${FORUM}/c/process/7`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#085A90] rounded-lg hover:bg-sky-50 transition-colors font-medium"
          >
            {t("cta.button")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Craftsmanship;
