/**
 * Single source of truth for everything locale-shaped — routing,
 * generateStaticParams, hreflang alternates, the language menu, per-locale
 * fonts and the smoke tests all derive from LOCALES. No second list exists.
 */

/** Writing systems we tune typography (and lazily load webfonts) for. */
export type Script =
  | "latin" | "cyrillic" | "greek" | "arabic" | "hebrew"
  | "devanagari" | "bengali" | "thai" | "han" | "kana" | "hangul";

export type LocaleDirection = "ltr" | "rtl";

export type LocaleEntry = {
  /** URL/file identifier — also the filename stem under `messages/`. */
  readonly code: string;
  /** Name of the language in itself, as shown in the language menu. */
  readonly nativeName: string;
  /** Short native label used where vertical space is tight. */
  readonly shortName: string;
  readonly direction: LocaleDirection;
  readonly script: Script;
};

/** Registry order doubles as language-menu order. */
export const LOCALES: readonly LocaleEntry[] = [
  { code: "en", nativeName: "English", shortName: "EN", direction: "ltr", script: "latin" },
  { code: "de", nativeName: "Deutsch", shortName: "DE", direction: "ltr", script: "latin" },
  { code: "tr", nativeName: "Türkçe", shortName: "TR", direction: "ltr", script: "latin" },
  { code: "es", nativeName: "Español", shortName: "ES", direction: "ltr", script: "latin" },
  { code: "zh-CN", nativeName: "简体中文", shortName: "ZH", direction: "ltr", script: "han" },
  { code: "fr", nativeName: "Français", shortName: "FR", direction: "ltr", script: "latin" },
  { code: "ar", nativeName: "العربية", shortName: "AR", direction: "rtl", script: "arabic" },
  { code: "hi", nativeName: "हिन्दी", shortName: "HI", direction: "ltr", script: "devanagari" },
  { code: "pt-BR", nativeName: "Português (Brasil)", shortName: "PT", direction: "ltr", script: "latin" },
  { code: "ru", nativeName: "Русский", shortName: "RU", direction: "ltr", script: "cyrillic" },
  { code: "ja", nativeName: "日本語", shortName: "JA", direction: "ltr", script: "kana" },
  { code: "it", nativeName: "Italiano", shortName: "IT", direction: "ltr", script: "latin" },
  { code: "ko", nativeName: "한국어", shortName: "KO", direction: "ltr", script: "hangul" },
  { code: "id", nativeName: "Bahasa Indonesia", shortName: "ID", direction: "ltr", script: "latin" },
  { code: "vi", nativeName: "Tiếng Việt", shortName: "VI", direction: "ltr", script: "latin" },
  { code: "nl", nativeName: "Nederlands", shortName: "NL", direction: "ltr", script: "latin" },
  { code: "pl", nativeName: "Polski", shortName: "PL", direction: "ltr", script: "latin" },
  { code: "th", nativeName: "ไทย", shortName: "TH", direction: "ltr", script: "thai" },
  { code: "sv", nativeName: "Svenska", shortName: "SV", direction: "ltr", script: "latin" },
  { code: "el", nativeName: "Ελληνικά", shortName: "EL", direction: "ltr", script: "greek" },
  { code: "cs", nativeName: "Čeština", shortName: "CS", direction: "ltr", script: "latin" },
  { code: "he", nativeName: "עברית", shortName: "HE", direction: "rtl", script: "hebrew" },
  { code: "uk", nativeName: "Українська", shortName: "UK", direction: "ltr", script: "cyrillic" },
  { code: "da", nativeName: "Dansk", shortName: "DA", direction: "ltr", script: "latin" },
  { code: "nb", nativeName: "Norsk bokmål", shortName: "NB", direction: "ltr", script: "latin" },
  { code: "fi", nativeName: "Suomi", shortName: "FI", direction: "ltr", script: "latin" },
  { code: "ro", nativeName: "Română", shortName: "RO", direction: "ltr", script: "latin" },
  { code: "hu", nativeName: "Magyar", shortName: "HU", direction: "ltr", script: "latin" },
  { code: "fa", nativeName: "فارسی", shortName: "FA", direction: "rtl", script: "arabic" },
  { code: "bn", nativeName: "বাংলা", shortName: "BN", direction: "ltr", script: "bengali" },
];

export type LocaleCode = (typeof LOCALES)[number]["code"];
export const DEFAULT_LOCALE = "en";
export const RTL_LOCALES: readonly string[] = LOCALES.filter((e) => e.direction === "rtl").map((e) => e.code);
/** Locale identifiers as used in `[locale]` routes and message filenames. */
export const localeCodes: readonly string[] = LOCALES.map((entry) => entry.code);

const byCode = new Map<string, LocaleEntry>(LOCALES.map((entry) => [entry.code, entry]));

export function isSupportedLocale(value: unknown): value is string {
  return typeof value === "string" && byCode.has(value);
}

export function getLocaleEntry(code: string): LocaleEntry {
  const entry = byCode.get(code);
  if (!entry) throw new Error(`Unknown locale: ${code}`);
  return entry;
}

export function getDirection(code: string): LocaleDirection {
  return getLocaleEntry(code).direction;
}

/**
 * Per-script Google Fonts sheets — body face first, display counterpart where
 * one exists (paired with the [data-script] font overrides in app/globals.css).
 * Latin needs nothing: the Instrument trio self-hosts via next/font.
 */
const SCRIPT_FONT_SHEETS: Readonly<Partial<Record<Script, string>>> =
  Object.freeze({
    cyrillic:
      "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&family=Noto+Serif:ital,wght@0,400;0,500;1,400&display=swap",
    greek:
      "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&family=Noto+Serif:ital,wght@0,400;0,500;1,400&display=swap",
    arabic:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap",
    hebrew:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;500;600&family=Noto+Serif+Hebrew:wght@400;500&display=swap",
    devanagari:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&family=Noto+Serif+Devanagari:wght@400;500&display=swap",
    bengali:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600&family=Noto+Serif+Bengali:wght@400;500&display=swap",
    thai:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600&family=Noto+Serif+Thai:wght@400;500&display=swap",
    han:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@400;500&display=swap",
    kana:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600&family=Noto+Serif+JP:wght@400;500&display=swap",
    hangul:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@400;500&display=swap"
  });

/**
 * Webfont stylesheet for a locale's script, or `null` when the loaded brand
 * fonts cover it. Only the active locale's sheet is ever requested.
 */
export function getScriptFontStylesheet(code: string): string | null {
  return SCRIPT_FONT_SHEETS[getLocaleEntry(code).script] ?? null;
}

/** Scripts whose shaping breaks under CSS synthetic oblique. */
export const NON_OBLIQUE_SCRIPTS: readonly Script[] = [
  "arabic", "hebrew", "devanagari", "bengali", "thai", "han", "kana", "hangul",
];

/** Scripts where wide tracking damages connected/complex glyph clusters. */
export const COMPACT_TRACKING_SCRIPTS: readonly Script[] = [
  "arabic", "hebrew", "devanagari", "bengali", "thai",
];