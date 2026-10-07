"use client";

import { DatasetPreview } from "@/components/dataset-preview";
import { RepoStatus } from "@/components/repo-status";
import { Reveal } from "@/components/reveal";
import { richTags } from "@/lib/rich-tags";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-14%] start-[12%] h-[540px] w-[540px] rounded-full bg-accent/[0.045] blur-[130px]"
      />

      <div className="shell relative py-20 md:py-28">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,540px)] xl:gap-14">
          <Reveal>
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-accent-text uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-8 font-serif text-[clamp(3rem,7.4vw,6.4rem)] leading-[0.92] tracking-[-0.015em]">
                {t.rich("title", richTags)}
              </h1>

              <p className="mt-10 max-w-[54ch] text-[17px] leading-relaxed">
                <strong className="font-semibold">{t("ledeLead")}</strong>{" "}
                <span className="text-muted-foreground">{t("ledeRest")}</span>
              </p>

              <p className="mt-4 max-w-[52ch] text-[13.5px] leading-relaxed text-faint-foreground">
                {t("conceptNote")}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#report"
                  className="rounded-full bg-primary px-7 py-3.5 text-[14.5px] font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {t("ctaPrimary")}
                </a>
                <RepoStatus />
              </div>

              <div className="mt-14 max-w-[560px]">
                <div className="ruler h-[13px]" aria-hidden="true" />
                <dl className="mt-4 grid grid-cols-1 gap-2 font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase sm:grid-cols-3">
                  <div>{t("meta.source")}</div>
                  <div>{t("meta.python")}</div>
                  <div>{t("meta.builtFor")}</div>
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <DatasetPreview />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
