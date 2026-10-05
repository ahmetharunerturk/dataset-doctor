"use client";

import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeShort, type Locale } from "@/i18n/routing";

const languageOptions: { value: Locale; labelKey: "en" | "de" | "tr" }[] = [
  { value: "en", labelKey: "en" },
  { value: "de", labelKey: "de" },
  { value: "tr", labelKey: "tr" },
];

/**
 * Compact language selector. Switching swaps only the locale segment and
 * keeps the current path (and hash) so the visitor stays where they are.
 */
export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    router.replace(`${pathname}${hash}`, { locale: next });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="min-h-11 gap-1.5 px-2.5"
          aria-label={t("select")}
        >
          <Globe className="size-4" />
          <span className="font-mono text-[11.5px] tracking-[0.08em]">
            {localeShort[locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale} onValueChange={(value) => switchTo(value as Locale)}>
          {languageOptions.map(({ value, labelKey }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <span>{t(labelKey)}</span>
              {locale === value ? (
                <Check className="ml-auto size-3.5 shrink-0 text-accent-text" />
              ) : null}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
