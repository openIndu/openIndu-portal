import { useTranslation } from "react-i18next";
import { SEO } from "../components/SEO";

export function Forum() {
  const { t } = useTranslation("common");

  return (
    <div>
      <SEO
        title={`${t("nav.forum")} - openIndu Community`}
        description="openIndu community forum"
        canonicalPath="/forum"
      />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t("nav.forum")}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Community forum coming soon. Discussion powered by the openIndu community.
            </p>
            <p className="text-gray-500">
              In the meantime, join us on GitHub Discussions or visit our community channels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Forum;
