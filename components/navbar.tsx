"use client";

import { Menu } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { RepoStatus } from "@/components/repo-status";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLocale, useTranslations } from "next-intl";

const NAV_ITEMS = [
  { key: "features", href: "#features" },
  { key: "workflow", href: "#how-it-works" },
  { key: "report", href: "#report" },
  { key: "opensource", href: "#open-source" },
] as const;

/** Move keyboard focus to the destination heading after an in-page jump. */
function focusSection(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  window.setTimeout(() => {
    const heading = target.querySelector<HTMLElement>("h2, h3") ?? target;
    heading.tabIndex = -1;
    heading.focus();
  }, 0);
}

export function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pendingSection = useRef<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-2 px-6 sm:gap-6">
        <Link
          href={`/${locale}`}
          aria-label={t("homeAria")}
          className="flex shrink-0 items-center gap-2.5"
        >
          <svg width="32" height="16" viewBox="0 0 32 16" aria-hidden="true">
            <circle cx="4" cy="8" r="4.5" fill="var(--accent)" />
            <circle cx="14" cy="8" r="4.5" fill="rgb(var(--veil-rgb)/0.22)" />
            <circle cx="24" cy="8" r="4.5" fill="rgb(var(--veil-rgb)/0.1)" />
          </svg>
          <span className="text-[15px] font-bold tracking-[0.14em]">DATASET DOCTOR</span>
        </Link>

        <nav aria-label={t("sectionsAria")} className="hidden items-center gap-8 xl:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => focusSection(item.href)}
              className="hover:text-foreground text-[13.5px] font-medium text-muted-foreground transition-colors"
            >
              {t(`links.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="#report"
            onClick={() => focusSection("#report")}
            className="rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            {t("cta")}
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="min-h-11 min-w-11 px-0 xl:hidden"
              aria-label={t("openMenu")}
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            closeLabel={t("closeMenu")}
            onCloseAutoFocus={(event) => {
              const hash = pendingSection.current;
              if (!hash) return;
              // Section navigation takes focus after the dialog releases its trap.
              event.preventDefault();
              pendingSection.current = null;
              focusSection(hash);
            }}
          >
            <div className="border-b border-line pb-4">
              <SheetTitle className="pr-10 text-[15px] font-semibold">{t("sheetTitle")}</SheetTitle>
              <SheetDescription className="mt-1 text-[13px] text-muted-foreground">
                {t("sheetDesc")}
              </SheetDescription>
            </div>

            <nav aria-label={t("sheetTitle")} className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => (
                <SheetClose asChild key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => { pendingSection.current = item.href; }}
                    className="border-b border-line py-4 text-[16px] font-medium last:border-b-0"
                  >
                    {t(`links.${item.key}`)}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="py-4">
              <SheetClose asChild>
                <Link
                  href="#report"
                  onClick={() => { pendingSection.current = "#report"; }}
                  className="block rounded-full bg-primary px-5 py-3 text-center text-[13.5px] font-semibold text-primary-foreground"
                >
                  {t("cta")}
                </Link>
              </SheetClose>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-5">
              <RepoStatus />
              <div className="flex items-center gap-1">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>

            <p className="pb-8 font-mono text-[10.5px] tracking-[0.18em] text-faint-foreground uppercase">
              {t("sheetMeta")}
            </p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
