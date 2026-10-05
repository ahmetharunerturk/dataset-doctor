"use client";

import { Reveal } from "@/components/reveal";
import { richTags } from "@/lib/rich-tags";
import { SPECIMEN } from "@/lib/specimen";
import { useTranslations } from "next-intl";

/* Fixed specimen textures for the diagnostic diagrams (decorative marks). */
const CELLS_A = "11110111110111111111111101110111111011111111011111111110111101111101111111111111011101111111";
const BAR_W = [92, 88, 95, 84, 90, 97, 86, 91, 89, 94, 87, 93];
const CORR_ON = [7, 20, 33, 44, 45, 46, 55, 56, 68, 79, 90, 103, 114, 125, 126];

/* Fixed illustrative figures derive from the specimen fixture — passed as
 * numbers so the active locale decides grouping and decimal separators. */
const NULL_COLUMNS = SPECIMEN.nulls.columns;
const TOTAL_COLUMNS = SPECIMEN.columns;
const CELL_NULL_SHARE = SPECIMEN.nulls.cellSharePercent;
const DUPLICATE_ROWS = SPECIMEN.duplicates.rowsInvolved;
const UNIQUE_ROWS = SPECIMEN.duplicates.pairs;
const RHO = SPECIMEN.leak.rho;
const SUMMARY_VALUES: ReadonlyArray<Record<string, number>> = [
  { rows: SPECIMEN.rows },
  { columns: SPECIMEN.columns },
  { numeric: SPECIMEN.types.numeric },
  { categorical: SPECIMEN.types.categorical },
  { size: SPECIMEN.sizeMb },
];

export function FeatureSection() {
  const t = useTranslations("Features");

  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto max-w-[1200px] px-6 pt-24 md:pt-32">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-accent-text uppercase">
            {t("eyebrow")}
          </p>
          <h2
            id="features-title"
            className="mt-6 max-w-[22ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]"
          >
            {t.rich("title", richTags)}
          </h2>
          <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-muted-foreground">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1200px] gap-px overflow-hidden border-y border-line bg-line px-0 md:grid-cols-12">
        {/* Pass 01 — completeness matrix */}
        <Reveal className="md:col-span-7">
          <article className="h-full bg-raised p-10">
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent-text uppercase">
              {t("big1.label")}
            </p>
            <h3 className="mt-5 text-[24px] font-semibold">{t("big1.title")}</h3>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
              {t("big1.body")}
            </p>
            <div className="mt-8 grid grid-cols-10 gap-1.5" aria-hidden="true">
              {CELLS_A.split("").map((cell, i) =>
                cell === "1" ? (
                  <span key={i} className="aspect-square bg-[rgb(var(--veil-rgb)/0.24)]" />
                ) : (
                  <span key={i} className="aspect-square border border-critical/55" />
                ),
              )}
            </div>
            <p className="mt-6 font-mono text-[10.5px] leading-relaxed tracking-[0.12em] text-faint-foreground uppercase">
              {t("big1.caption", { nulls: NULL_COLUMNS, cols: TOTAL_COLUMNS, share: CELL_NULL_SHARE })}
            </p>
          </article>
        </Reveal>

        {/* Pass 02 — duplicate fingerprint bars */}
        <Reveal delay={0.06} className="md:col-span-5">
          <article className="h-full bg-raised p-10">
            <div className="flex items-center gap-4">
              <p className="font-mono text-[11px] tracking-[0.18em] text-accent-text uppercase">
                {t("big2.label")}
              </p>
              <span className="veil-6 rounded-full border border-line px-2 py-0.5 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                {t("big2.dupTag")}
              </span>
            </div>
            <h3 className="mt-5 text-[24px] font-semibold">{t("big2.title")}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{t("big2.body")}</p>
            <div className="mt-8 space-y-1.5" aria-hidden="true">
              {BAR_W.map((w, i) => (
                <div key={i} className="h-2 bg-[rgb(var(--veil-rgb)/0.08)]">
                  <div
                    className={i === 3 || i === 7 ? "h-full bg-warning/70" : "h-full bg-[rgb(var(--veil-rgb)/0.3)]"}
                    style={{ width: `${w}%` }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10.5px] leading-relaxed tracking-[0.12em] text-faint-foreground uppercase">
              {t("big2.caption", { rows: DUPLICATE_ROWS, unique: UNIQUE_ROWS })}
            </p>
          </article>
        </Reveal>

        {/* four compact passes */}
        {[0, 1, 2, 3].map((i) => (
          <Reveal key={i} delay={0.05 * i} className="md:col-span-3">
            <article className="flex h-full flex-col bg-raised p-8">
              <p className="font-mono text-[11px] tracking-[0.18em] text-accent-text uppercase">
                {t(`compact.${i}.label`)}
              </p>
              <h3 className="mt-5 text-[17px] font-semibold">{t(`compact.${i}.title`)}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                {t(`compact.${i}.body`)}
              </p>
            </article>
          </Reveal>
        ))}

        {/* Pass 07 — correlation lattice */}
        <Reveal className="md:col-span-7">
          <article className="h-full bg-raised p-10">
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent-text uppercase">
              {t("corr.label")}
            </p>
            <h3 className="mt-5 text-[24px] font-semibold">{t("corr.title")}</h3>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
              {t("corr.body")}
            </p>
            <div className="mt-8 grid w-fit grid-cols-[repeat(11,12px)] gap-1" aria-hidden="true">
              {Array.from({ length: 121 }, (_, i) => (
                <span
                  key={i}
                  className={
                    CORR_ON.includes(i)
                      ? "size-3 bg-accent/85"
                      : "size-3 bg-[rgb(var(--veil-rgb)/0.12)]"
                  }
                />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
              <span className="font-mono text-[10.5px] tracking-[0.14em] text-faint-foreground uppercase">
                {t("corr.legend")}
              </span>
              <span className="max-w-[42ch] text-[13.5px] leading-relaxed text-muted-foreground">
                {t.rich("corr.note", { ...richTags, rho: RHO })}
              </span>
            </div>
          </article>
        </Reveal>

        {/* Overview — factual summary */}
        <Reveal delay={0.06} className="md:col-span-5">
          <article className="h-full bg-raised p-10">
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent-text uppercase">
              {t("summary.label")}
            </p>
            <h3 className="mt-5 text-[24px] font-semibold">{t("summary.title")}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {t("summary.body")}
            </p>
            <dl className="mt-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-baseline justify-between gap-6 border-b border-line py-3 last:border-b-0">
                  <dt className="font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
                    {t(`summary.rows.${i}.term`)}
                  </dt>
                  <dd className="tabular text-[17px] font-medium">
                    {t(`summary.rows.${i}.value`, SUMMARY_VALUES[i] ?? {})}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:pb-32" />
    </section>
  );
}
