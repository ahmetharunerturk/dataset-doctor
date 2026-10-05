"use client";

import { GithubGlyph } from "@/components/icons";
import { REPO_PUBLISHED, REPO_URL } from "@/lib/project";
import { useTranslations } from "next-intl";

/**
 * Honest publication status for the repository, documentation and issues.
 *
 * Private source stays non-interactive for anonymous visitors; public source
 * uses the same canonical GitHub destination in every section.
 */
export function RepoStatus({
  variant = "inline",
  showHint = false,
}: {
  variant?: "inline" | "block";
  showHint?: boolean;
}) {
  const t = useTranslations("Project");

  if (REPO_PUBLISHED) {
    return (
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 max-w-full items-center gap-2.5 rounded-full border border-line-strong px-6 py-3 text-[14px] font-medium transition-colors hover:border-foreground/40"
      >
        <GithubGlyph className="size-4 shrink-0" />
        <span>{t("link")}</span>
      </a>
    );
  }

  if (variant === "block") {
    return (
      <div className="flex min-w-0 items-start gap-3">
        <GithubGlyph className="mt-0.5 size-4 shrink-0 text-faint-foreground" />
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
            {t("status")}
          </p>
          {showHint ? (
            <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-muted-foreground">
              {t("hint")}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex min-h-11 items-center gap-2.5 text-faint-foreground">
      <GithubGlyph className="size-4" />
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
        {t("status")}
      </span>
    </span>
  );
}
