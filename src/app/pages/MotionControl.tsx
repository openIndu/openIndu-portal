import { useTranslation } from "react-i18next";
import { Cpu, CheckCircle, Layers, Code2 } from "lucide-react";
import { SEO } from "../components/SEO";

const featureKeys = [
  { key: "plc", icon: Cpu },
  { key: "hostDev", icon: Code2 },
  { key: "motionCard", icon: Layers },
] as const;

const plcBrandKeys = ["mitsubishi", "siemens", "omron", "keyence", "inovance"] as const;
const motionCardBrandKeys = ["leadshine", "googol", "advantech", "adlink", "zmotion"] as const;
const industryKeys = ["display", "newEnergy", "medical"] as const;

export function MotionControl() {
  const { t } = useTranslation("motion-control");

  const plcBrands = plcBrandKeys.map((key) => ({
    key,
    name: t(`plcBrands.${key}.name`),
    desc: t(`plcBrands.${key}.desc`),
  }));

  const motionCardBrands = motionCardBrandKeys.map((key) => ({
    key,
    name: t(`motionCardBrands.${key}.name`),
    desc: t(`motionCardBrands.${key}.desc`),
  }));

  const industries = industryKeys.map((key) => ({
    key,
    name: t(`industries.${key}.name`),
    applications: t(`industries.${key}.applications`, { returnObjects: true }) as string[],
    tech: t(`industries.${key}.tech`),
  }));

  const csharpItems = t("hostDevSection.csharp.items", { returnObjects: true }) as string[];
  const cppItems = t("hostDevSection.cpp.items", { returnObjects: true }) as string[];

  return (
    <div className="py-12">
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        keywords={t("seo.keywords")}
        canonicalPath="/motion-control"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-lg">
              <Cpu className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{t("hero.title")}</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mb-6">{t("hero.description")}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{t("hero.badge")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("features.heading")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureKeys.map((feature) => (
              <div
                key={feature.key}
                className="p-6 border border-gray-200 rounded-xl hover:border-orange-600 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(`features.${feature.key}.title`)}</h3>
                <p className="text-sm text-gray-600">{t(`features.${feature.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t("plcBrands.heading")}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t("plcBrands.subheading")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {plcBrands.map((brand) => (
              <div key={brand.key} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-orange-600 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-lg mb-3 font-bold text-lg">
                  {brand.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600">{brand.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t("motionCardBrands.heading")}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t("motionCardBrands.subheading")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {motionCardBrands.map((brand) => (
              <div key={brand.key} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-orange-600 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-600 to-red-600 text-white rounded-lg mb-3 font-bold text-lg">
                  {brand.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600">{brand.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t("industries.heading")}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t("industries.subheading")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {industries.map((industry, index) => (
              <div key={industry.key} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-200 hover:border-orange-600 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-lg font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{industry.name}</h3>
                </div>
                <ul className="space-y-3 mb-4">
                  {industry.applications.map((app) => (
                    <li key={app} className="flex items-start gap-2 text-gray-700">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">{t("industries.coreTechLabel")}</p>
                  <p className="text-sm text-gray-700 font-medium">{industry.tech}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("hostDevSection.heading")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t("hostDevSection.csharp.title")}</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                {csharpItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-lg">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t("hostDevSection.cpp.title")}</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                {cppItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{t("cta.heading")}</h2>
          <p className="text-xl mb-8 text-orange-100">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@openindu.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-700 rounded-lg hover:bg-orange-50 transition-colors font-medium"
            >
              {t("cta.contact")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
