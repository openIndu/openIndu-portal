import { Github, Mail, Code, Eye, Cloud, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "../components/SEO";

/**
 * This page used to list four named "core maintainers" (Chen Wei, Zhang Li,
 * Wang Jun, Liu Yang) with years-of-experience bios and social links pointing
 * at "#". None of those people exist: the GitHub org publishes no public
 * members, so there is no roster to source them from. Inventing individuals on
 * a public site is the same failure as the invented forum authors that were
 * removed from the craftsmanship page.
 *
 * What IS verifiable is which repositories exist and what each one covers, so
 * the page now presents maintained AREAS linked to real repos. If a real
 * roster becomes available, add it here with real names and real profile links.
 */
const areaKeys = [
  { key: "studio", icon: Code, repo: "https://github.com/openIndu/openIndu-studio" },
  { key: "vision", icon: Eye, repo: "https://github.com/openIndu/openIndu-vision" },
  { key: "platform", icon: Cloud, repo: "https://github.com/openIndu/openIndu-platform" },
  { key: "portal", icon: Globe, repo: "https://github.com/openIndu/openIndu-portal" },
] as const;

export function Team() {
  const { t } = useTranslation("team");
  const { t: tc } = useTranslation("common");

  const areas = areaKeys.map((a) => ({
    ...a,
    name: t(`areas.${a.key}.name`),
    description: t(`areas.${a.key}.description`),
    repoName: t(`areas.${a.key}.repo`),
  }));

  return (
    <div>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        canonicalPath="/team"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Maintained areas */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("areas.heading")}</h2>
            <p className="text-gray-600">{t("areas.subheading")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {areas.map((area) => (
              <div key={area.key} className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#0B72B5] flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{area.description}</p>
                <a
                  href={area.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#0B72B5] hover:text-[#085A90]"
                >
                  <Github className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {area.repoName}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("community.heading")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("community.subheading")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <p className="text-gray-700 font-medium">{t(`community.item${n}`)}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">{t("community.joinPrompt")}</p>
            <a
              href="https://github.com/openIndu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B72B5] text-white rounded-lg hover:bg-[#085A90] transition-colors"
            >
              <Github className="w-5 h-5" />
              {t("community.joinCta")}
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("contact.heading")}</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{t("contact.description")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://forum.openindu.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-[#0B72B5] hover:text-[#0B72B5] transition-colors">
              {tc("nav.forum")}
            </a>
            <a href="https://github.com/openIndu/openIndu-portal/discussions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-[#0B72B5] hover:text-[#0B72B5] transition-colors">
              GitHub Discussions
            </a>
            <a href="mailto:contact@openindu.com" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-[#0B72B5] hover:text-[#0B72B5] transition-colors">
              <Mail className="w-5 h-5" />
              {t("contact.email")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
