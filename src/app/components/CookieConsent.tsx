import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import type { CookieConsent as Preference } from "@/lib/cookieConsent";
import { saveCookieConsent } from "@/lib/cookieConsent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export const OPEN_COOKIE_SETTINGS_EVENT = "openindu:open-cookie-settings";

type Props = {
  preference: Preference | null;
  onChange: (preference: Preference) => void;
};

export function CookieConsent({ preference, onChange }: Props) {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(preference?.analytics ?? false);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const openSettings = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setAnalytics(preference?.analytics ?? false);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, [preference]);

  const choose = (allowAnalytics: boolean) => {
    const saved = saveCookieConsent(allowAnalytics);
    if (saved) onChange(saved);
  };

  const setDialogOpen = (next: boolean) => {
    setOpen(next);
    if (!next) requestAnimationFrame(() => restoreFocusRef.current?.focus());
  };

  return (
    <>
      {!preference && (
        <section
          aria-label={t("cookieConsent.title")}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-5xl rounded-2xl border border-sky-200 bg-white p-5 shadow-2xl sm:inset-x-6"
          data-testid="cookie-consent-banner"
        >
          <h2 className="text-lg font-semibold text-gray-950">{t("cookieConsent.title")}</h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {t("cookieConsent.description")}{" "}
            <Link className="font-medium text-sky-700 underline" to="/privacy">
              {t("cookieConsent.privacyLink")}
            </Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              className="min-h-11 rounded-lg border border-gray-300 px-4 py-2 font-medium"
              data-testid="cookie-reject"
              onClick={() => choose(false)}
            >
              {t("cookieConsent.reject")}
            </button>
            <button
              className="min-h-11 rounded-lg border border-sky-700 px-4 py-2 font-medium text-sky-800"
              data-testid="cookie-manage"
              onClick={(event) => {
                restoreFocusRef.current = event.currentTarget;
                setOpen(true);
              }}
            >
              {t("cookieConsent.manage")}
            </button>
            <button
              className="min-h-11 rounded-lg bg-sky-700 px-4 py-2 font-medium text-white"
              data-testid="cookie-accept"
              onClick={() => choose(true)}
            >
              {t("cookieConsent.accept")}
            </button>
          </div>
        </section>
      )}

      <AlertDialog open={open} onOpenChange={setDialogOpen}>
        <AlertDialogContent data-testid="cookie-settings-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("cookieConsent.manageTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("cookieConsent.manageDescription")}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-3">
            <label className="flex min-h-11 items-center justify-between rounded-lg border p-3">
              <span>{t("cookieConsent.necessary")}</span>
              <input aria-label={t("cookieConsent.necessary")} checked disabled type="checkbox" />
            </label>
            <label className="flex min-h-11 items-center justify-between rounded-lg border p-3">
              <span>{t("cookieConsent.analytics")}</span>
              <input
                aria-label={t("cookieConsent.analytics")}
                checked={analytics}
                data-testid="cookie-analytics"
                onChange={(event) => setAnalytics(event.target.checked)}
                type="checkbox"
              />
            </label>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cookieConsent.cancel")}</AlertDialogCancel>
            <AlertDialogAction data-testid="cookie-save" onClick={() => choose(analytics)}>
              {t("cookieConsent.save")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
