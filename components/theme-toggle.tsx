"use client";

import { useSyncExternalStore } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/components/theme-provider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getDirection } from "@/lib/i18n/locales";

const themeOptions = [
  { value: "system", icon: Monitor, labelKey: "system" },
  { value: "light", icon: Sun, labelKey: "light" },
  { value: "dark", icon: Moon, labelKey: "dark" },
] as const;

/** The only values the RadioGroup can ever emit — mirror it for setTheme. */
type ThemeOptionsValue = (typeof themeOptions)[number]["value"];

/**
 * Compact theme selector (system / light / dark). The trigger icon defers to
 * the mounted value so server markup and the first client render match.
 */
const subscribeNoop = () => () => {};

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const { theme, setTheme } = useTheme();
  // Hydration-aware mounting: `useSyncExternalStore` reports false during SSR
  // and on the first client render, flipping true afterwards — no setState-in-
  // effect (react-hooks/set-state-in-effect), same shape as Footer's clock.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const active = mounted ? (theme ?? "system") : "system";
  const ActiveIcon =
    themeOptions.find((option) => option.value === active)?.icon ?? Monitor;

  return (
    <DropdownMenu dir={getDirection(useLocale())}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="min-h-11 min-w-11 px-0"
          aria-label={t("toggle")}
        >
          <ActiveIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={active}
          onValueChange={(value) => setTheme(value as ThemeOptionsValue)}
        >
          {themeOptions.map(({ value, icon: Icon, labelKey }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <span>{t(labelKey)}</span>
              {mounted && active === value ? (
                <Check className="ms-auto size-3.5 shrink-0 text-accent-text" />
              ) : null}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
