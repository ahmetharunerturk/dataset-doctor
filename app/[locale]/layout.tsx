import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { ThemeProvider } from "@/components/theme-provider";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";
import {
  LOCALES,
  getDirection,
  getLocaleEntry,
  getScriptFontStylesheet,
  isSupportedLocale,
  localeCodes,
} from "@/lib/i18n/locales";
import "../globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

/** Self-referencing language alternates for every shipped locale, x-default on /en. */
const HREFLANGES = Object.freeze({
  ...Object.fromEntries(LOCALES.map((entry) => [entry.code, `/${entry.code}`])),
  "x-default": "/en",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("title"),
    description: t("description"),
    applicationName: "Dataset Doctor",
    keywords: [
      t("keywords.0"),
      t("keywords.1"),
      t("keywords.2"),
      t("keywords.3"),
      t("keywords.4"),
    ],
    alternates: {
      languages: HREFLANGES,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const entry = getLocaleEntry(locale);
  const direction = getDirection(locale);
  const scriptFont = getScriptFontStylesheet(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      data-script={entry.script}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {scriptFont ? (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin=""
            />
            <link
              rel="stylesheet"
              href={scriptFont}
              /* Deterministic per-locale script sheet — safe to fetch eagerly. */
              data-script-font=""
            />
          </>
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        {/* Pre-paint theme bootstrap. Injected into <head> by Next's runtime via
            beforeInteractive, so it never trips the React script-host-element
            warning (as next-themes' client-rendered inline script did) and it
            eliminates the flash of the wrong theme before hydration. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-meter-fill]{width:var(--meter-value)!important}`}</style>
        </noscript>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}