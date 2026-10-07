"use client";

import { useCallback, useMemo, useRef } from "react";
import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, getDirection, getLocaleEntry, type LocaleCode } from "@/lib/i18n/locales";

/**
 * Locale menu for every shipped language. Rows carry endonyms straight from the
 * LOCALES registry (the list is deliberately not duplicated in message catalogs)
 * and declare their own reading direction so mixed-script rows stay coherent.
 * Switching preserves the full URL — path, query string and fragment — so the
 * visitor stays exactly where they are, in the language they picked.
 */
export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale() as LocaleCode;
  const router = useRouter();
  const pathname = usePathname();
  const entry = getLocaleEntry(locale);
  const direction = getDirection(locale);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const currentIndex = useMemo(
    () => LOCALES.findIndex((candidate) => candidate.code === locale),
    [locale],
  );

  // Once the menu settles, park the viewport on the active language.
  const scrollToCurrent = useCallback(() => {
    requestAnimationFrame(() => {
      const active = viewportRef.current?.querySelector<HTMLElement>(
        '[role="menuitemradio"][aria-checked="true"]',
      );
      active?.scrollIntoView({ block: "center" });
    });
  }, []);

  const switchTo = (next: string) => {
    const target = next as LocaleCode;
    if (target === locale) return;
    const search = typeof window === "undefined" ? "" : window.location.search;
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    router.replace(`${pathname}${search}${hash}`, { locale: target });
  };

  return (
    <DropdownMenu dir={direction} modal={false} onOpenChange={(open) => {
      if (open) scrollToCurrent();
    }}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="min-h-11 gap-1.5 px-2.5"
          aria-label={t("select")}
          onClick={scrollToCurrent}
        >
          <Globe className="size-4" />
          <span className="font-mono text-[11.5px] tracking-[0.08em]">
            {entry.shortName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        collisionPadding={12}
        className="w-[min(268px,80vw)]"
      >
        <DropdownMenuLabel className="font-mono text-[10.5px] tracking-[0.18em] text-faint-foreground uppercase">
          {t("label")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div ref={viewportRef} className="max-h-[min(420px,calc(100dvh-8rem))] overflow-y-auto overscroll-contain">
        <DropdownMenuRadioGroup value={locale} onValueChange={switchTo}>
          {LOCALES.map((candidate, index) => {
            const isCurrent = index === currentIndex;
            return (
              <DropdownMenuRadioItem
                key={candidate.code}
                value={candidate.code}
                data-current={isCurrent || undefined}
                className="flex min-h-11 items-center gap-3 py-2 text-[14px]"
                onKeyDown={(event) => {
                  // Home/End travel the full list; typing jumps to endonyms (Radix typeahead).
                  if (event.key === "Home" || event.key === "End") {
                    event.preventDefault();
                    const list = viewportRef.current?.querySelectorAll<HTMLElement>(
                      '[role="menuitemradio"]',
                    );
                    const target = event.key === "Home" ? list?.[0] : list?.[list.length - 1];
                    target?.focus();
                  }
                }}
              >
                <span dir="auto" className="min-w-0 truncate">
                  {candidate.nativeName}
                </span>
                <span className="ms-auto flex shrink-0 items-center gap-2 font-mono text-[10.5px] tracking-[0.12em] text-faint-foreground">
                  {isCurrent ? (
                    <Check className="size-3.5 text-accent-text" aria-hidden="true" />
                  ) : null}
                  {candidate.shortName}
                </span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
