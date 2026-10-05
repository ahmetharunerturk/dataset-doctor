import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "tr"],
  defaultLocale: "en",
  localePrefix: "always",
  // Unprefixed visits always use English; explicit locale URLs stay selected.
  localeDetection: false,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeShort: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  tr: "TR",
};
