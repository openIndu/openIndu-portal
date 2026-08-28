import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Layers, Cpu, Code, TrendingUp } from "lucide-react";
import { SEO } from "../components/SEO";

// Layer 4 first, matching the stack drawing on the home page. The tints are
// per-layer identity, not decoration, so they stay multi-hue while the rest of
// the site runs on the sky palette.
const layerKeys = [
  { key: "craftsmanship", icon: TrendingUp, color: "from-orange-50 to-amber-50", border: "border-orange-200" },
  { key: "application", icon: Layers, color: "from-blue-50 to-cyan-50", border: "border-sky-200" },
  { key: "programming", icon: Code, color: "from-green-50 to-emerald-50", border: "border-green-200" },
  { key: "hardware", icon: Cpu, color: "from-purple-50 to-pink-50", border: "border-purple-200" },
] as const;

export function Architecture() {
  const { t } = useTranslation("architecture");

  const layers = layerKeys.map((l) => ({
    ...l,
    title: t(`layers.${l.key}.title`),
    titleEn: t(`layers.${l.key}.titleEn`),
    description: t(`layers.${l.key}.description`),
    benefits: t(`layers.${l.key}.benefits`, { returnObjects: true }) as string[],
  }));

  const comparisons = t("comparison.rows", { returnObjects: true }) as {
    aspect: string;
    traditional: string;
    openindu: string;
  }[];

  return (
    <div>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        canonicalPath="/architecture"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 [word-break:keep-all]">
              {t("hero.title")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <p className="text-gray-600">{t("hero.formula")}</p>
          </div>
        </div>
      </section>

      {/* Four Layers */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {layers.map((layer) => (
              <div key={layer.key} className={`border-l-4 ${layer.border} rounded-lg p-6 sm:p-8 bg-gradient-to-br ${layer.color}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0">
                    <layer.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {layer.title}
                      <span className="text-sm text-gray-700 ml-2">({layer.titleEn})</span>
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{layer.description}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.benefits.map((benefit) => (
                    <span key={benefit} className="inline-block px-3 py-1 bg-white/70 text-gray-900 text-sm rounded-full font-medium">
                      ✓ {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layer Interaction */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("interaction.heading")}</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">{t("interaction.flowTitle")}</h3>
              <div className="text-gray-700 space-y-2">
                {[1, 2, 3].map((n) => (
                  <p key={n}>
                    {["1️⃣", "2️⃣", "3️⃣"][n - 1]} <strong>{t(`interaction.flowStep${n}Label`)}</strong>：
                    {t(`interaction.flowStep${n}`)}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">{t("interaction.appsTitle")}</h3>
              <div className="text-gray-700 space-y-2">
                {["Left", "Core", "Right"].map((side) => (
                  <p key={side}>
                    <strong>{t(`interaction.apps${side}Label`)}</strong>：{t(`interaction.apps${side}`)}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">{t("interaction.loopTitle")}</h3>
              <div className="text-gray-700 space-y-2">
                <p>{t("interaction.loop")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison vs Traditional */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("comparison.heading")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[150px]">{t("comparison.colAspect")}</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 min-w-[250px]">{t("comparison.colTraditional")}</th>
                  <th className="px-4 py-3 text-left font-semibold text-sky-800 min-w-[250px]">{t("comparison.colOpenIndu")}</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, idx) => (
                  <tr key={row.aspect} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-4 font-semibold text-gray-900 border-b border-gray-200">{row.aspect}</td>
                    <td className="px-4 py-4 text-gray-600 border-b border-gray-200">{row.traditional}</td>
                    <td className="px-4 py-4 text-sky-800 border-b border-gray-200 font-medium">{row.openindu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#085A90] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("cta.heading")}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/use-cases"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#085A90] rounded-lg hover:bg-sky-50 transition-colors font-medium"
            >
              {t("cta.useCases")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://github.com/openIndu/openIndu-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              {t("cta.studio")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Architecture;
