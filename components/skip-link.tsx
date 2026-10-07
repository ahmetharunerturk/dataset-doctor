import { getTranslations } from "next-intl/server";

/**
 * Keyboard-first escape hatch into the main landmark. Visually hidden until
 * it receives focus, then surfaced in place — with its focus ring intact
 * (focus indicators are never suppressed for this or the sticky header).
 */
export async function SkipLink() {
  const t = await getTranslations("A11y");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:inset-inline-start-4 focus:z-[60] focus:rounded-full focus:bg-raised focus:px-5 focus:py-3 focus:font-medium focus:text-[14px] focus:shadow-lg"
    >
      {t("skip")}
    </a>
  );
}