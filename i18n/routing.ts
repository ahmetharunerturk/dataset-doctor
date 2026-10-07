import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES, localeCodes } from "@/lib/i18n/locales";

export const routing = defineRouting({
  locales: [...localeCodes],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  // Unprefixed visits always use English; explicit locale URLs stay selected.
  localeDetection: false,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];

/** Short display codes, derived from the central registry. */
export const localeShort: Record<Locale, string> = Object.fromEntries(
  LOCALES.map((entry) => [entry.code, entry.shortName]),
) as Record<Locale, string>;
