"use client";

import { RepoStatus } from "@/components/repo-status";

import { Reveal } from "@/components/reveal";
import { richTags } from "@/lib/rich-tags";
import { useTranslations } from "next-intl";

export function FinalCta() {
  const t = useTranslations("CTA");

  return (
    <section
      aria-labelledby="cta-title"
      className="border-b border-line bg-raised px-6 py-24 text-center md:py-32"
    >
      <div className="mx-auto max-w-[860px]">
        <Reveal>
          <h2
            id="cta-title"
            className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.015em]"
          >
            <span className="block">{t("title1")}</span>
            <span className="block">{t.rich("title2", richTags)}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-[52ch] text-[17px] leading-relaxed text-muted-foreground">
            {t("sub")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#report"
              className="rounded-full bg-primary px-7 py-3.5 text-[14.5px] font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              {t("ctaPrimary")}
            </a>
            <RepoStatus />
          </div>

          <div className="mx-auto mt-14 max-w-[520px]">
            <div className="ruler h-[13px]" aria-hidden="true" />
            <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
              {t("note")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
