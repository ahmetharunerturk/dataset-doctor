"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RepoStatus } from "@/components/repo-status";
import { DOCUMENTATION_URL, ISSUES_URL, REPO_PUBLISHED, REPO_URL } from "@/lib/project";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const YEAR = String(new Date().getUTCFullYear());

const REFERENCE_LINK_CLASS =
  "hover:text-foreground underline-offset-4 transition-colors hover:underline";

function subscribe() {
  return () => {};
}

function getServerYear() {
  return YEAR;
}

function getClientYear() {
  return String(new Date().getUTCFullYear());
}

export function Footer() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const locale = useLocale();
  const year = useSyncExternalStore(subscribe, getClientYear, getServerYear);

  return (
    <footer className="border-t border-line px-6 pt-20 pb-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Link href={`/${locale}`} aria-label={tn("homeAria")} className="text-[17px] font-bold tracking-[0.14em]">
              DATASET DOCTOR
            </Link>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <RepoStatus variant="block" showHint />
          </div>
        </div>

        {/* Repository references — source, readme, issues */}
        {REPO_PUBLISHED ? <nav
          aria-label={t("linksAria")}
          className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-faint-foreground"
        >
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center ${REFERENCE_LINK_CLASS}`}
          >
            {t("linkSource")}
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={DOCUMENTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center ${REFERENCE_LINK_CLASS}`}
          >
            {t("linkReadme")}
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center ${REFERENCE_LINK_CLASS}`}
          >
            {t("linkIssues")}
          </a>
        </nav> : null}

        <div className="border-t border-line-strong mt-16 flex flex-col items-start justify-between gap-3 pt-8 text-[13px] text-faint-foreground sm:flex-row sm:items-center">
          <p>{t("copyright", { year })}</p>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
