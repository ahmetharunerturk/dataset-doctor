"use client";

import { Meter } from "@/components/meter";
import { Reveal } from "@/components/reveal";
import { richTags } from "@/lib/rich-tags";
import { SPECIMEN } from "@/lib/specimen";
import { useTranslations } from "next-intl";

const OVERALL = SPECIMEN.health.overall;

const TONE_TEXT = ["text-ok", "text-warning", "text-critical"];

export function HealthScore() {
  const t = useTranslations("Health");

  return (
    <section
      id="health"
      aria-labelledby="health-title"
      className="border-b border-line bg-raised px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-accent-text uppercase">
            {t("eyebrow")}
          </p>
          <h2
            id="health-title"
            className="mt-6 max-w-[20ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]"
          >
            {t("title")}
          </h2>
          <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-muted-foreground">
            {t("body")}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-y border-line-strong py-10">
            <div className="flex items-baseline gap-3">
              {/* Fixed LTR pair (68 / 100); the label beside it re-flows with the script. */}
              <bdi dir="ltr" className="flex items-baseline gap-3">
                <span className="tabular font-serif text-[clamp(4.5rem,10vw,7.5rem)] leading-[0.8]">
                  {OVERALL}
                </span>
                <span className="tabular font-mono text-[13px] tracking-[0.14em] text-faint-foreground uppercase">
                  {t("ofTotal")}
                </span>
              </bdi>
              <span className="ms-3 font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
                {t("overall")}
              </span>
            </div>
            <span className="rounded-full border border-warning/50 px-3 py-1 font-mono text-[10.5px] tracking-[0.16em] text-warning uppercase">
              {t("chip")}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10">
            <div className="flex items-baseline justify-between border-b border-line pb-3 font-mono text-[10.5px] tracking-[0.22em] text-faint-foreground uppercase">
              <span>{t("catsHeadL")}</span>
              <span>{t("catsHeadR")}</span>
            </div>
            {[0, 1, 2, 3, 4].map((i) => {
              const value = SPECIMEN.health.scores[i] ?? 0;
              return (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-2 border-b border-line py-5 last:border-b-0 md:grid-cols-[220px_1fr_auto]"
                >
                  <div>
                    <p className="text-[15px] font-medium">{t(`categories.${i}.label`)}</p>
                    <p className="mt-1 text-[12.5px] text-muted-foreground">
                      {t.rich(`categories.${i}.note`, richTags)}
                    </p>
                  </div>
                  <div className="col-span-2 md:col-span-1 md:order-none order-last">
                    <Meter value={value} delay={0.15 * i} />
                  </div>
                  <span className={`tabular text-[18px] font-semibold ${TONE_TEXT[value >= 80 ? 0 : value >= 50 ? 1 : 2]}`}>
                    {t(`categories.${i}.value`)}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-faint-foreground uppercase"
              >
                <span
                  className={`block size-2 rounded-full ${
                    i === 0 ? "bg-ok" : i === 1 ? "bg-warning" : "bg-critical"
                  }`}
                />
                {t(`legend.${i}`)}
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[68ch] border-t border-line pt-6 text-[13.5px] leading-relaxed text-faint-foreground">
            {t.rich("disclaimer", richTags)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}