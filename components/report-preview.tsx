"use client";

import { Reveal } from "@/components/reveal";
import { richTags } from "@/lib/rich-tags";
import { SPECIMEN } from "@/lib/specimen";
import { useTranslations } from "next-intl";

const SEVERITY = ["critical", "warning", "info"] as const;

const SEVERITY_CLASS: Record<string, string> = {
  critical: "text-critical border-critical/45",
  warning: "text-warning border-warning/45",
  info: "text-info border-info/45",
};

/* Fixed specimen marks for the evidence measures (decorative). */
const TICKS = Array.from({ length: 21 }, (_, i) => i);

export function ReportPreview() {
  const t = useTranslations("Report");
  const tc = useTranslations("Common");

  return (
    <section id="report" aria-labelledby="report-title" className="scroll-mt-24 border-b border-line px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-accent-text uppercase">
            {t("eyebrow")}
          </p>
          <h2
            id="report-title"
            className="mt-6 max-w-[18ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]"
          >
            {t.rich("title", richTags)}
          </h2>
          <p className="mt-8 max-w-[56ch] text-[17px] leading-relaxed text-muted-foreground">
            {t("body")}
          </p>
          <p className="mt-4 max-w-[68ch] text-[13.5px] leading-relaxed text-faint-foreground">
            {t("excerptNote")}
          </p>
        </Reveal>

        <div className="mt-16 space-y-px border border-line bg-line">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={0.07 * i}>
              <article className="bg-raised p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="tabular font-mono text-[11px] tracking-[0.18em] text-accent-text uppercase">
                    {t(`findings.${i}.ref`)}
                  </span>
                  <h3 className="text-[21px] font-semibold">{t(`findings.${i}.title`)}</h3>
                  <span
                    className={`ms-auto rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase ${SEVERITY_CLASS[SEVERITY[i]]}`}
                  >
                    {tc(`severity.${SEVERITY[i]}`)}
                  </span>
                </div>
                <p className="mt-4 max-w-[68ch] text-[15.5px] leading-relaxed text-muted-foreground">
                  {t(`findings.${i}.body`)}
                </p>

                <div className="mt-8 grid gap-10 border-t border-line pt-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                  {/* Evidence measure */}
                  <div>
                    <p className="font-mono text-[10.5px] tracking-[0.22em] text-faint-foreground uppercase">
                      {t("evidence")}
                    </p>
                    {i === 0 && (
                      <figure className="mt-5">
                        <div className="flex items-end gap-[3px]" aria-hidden="true">
                          {TICKS.map((tick) => (
                            <span
                              key={tick}
                              className={
                                tick === TICKS.length - 1
                                  ? "h-8 w-full bg-accent"
                                  : "h-4 w-full bg-[rgb(var(--veil-rgb)/0.14)]"
                              }
                            />
                          ))}
                        </div>
                        <figcaption className="mt-3 flex justify-between font-mono text-[10.5px] tracking-[0.14em] text-faint-foreground uppercase">
                          <span>{t("leakLabels.0")}</span>
                          <span>{t("leakLabels.1")}</span>
                        </figcaption>
                      </figure>
                    )}
                    {i === 1 && (
                      <figure className="mt-5">
                        <div className="flex h-3 overflow-hidden" aria-hidden="true">
                          <span className="h-full bg-[rgb(var(--veil-rgb)/0.28)]" style={{ width: `${SPECIMEN.classes.majorityPercent}%` }} />
                          <span className="h-full bg-accent" style={{ width: `${SPECIMEN.classes.minorityPercent}%` }} />
                        </div>
                        <figcaption className="mt-3 flex justify-between font-mono text-[10.5px] tracking-[0.14em] text-faint-foreground uppercase">
                          <span>{t("findings.1.distLabelA")} · {SPECIMEN.classes.majorityPercent}%</span>
                          <span>{t("findings.1.distLabelB")} · {SPECIMEN.classes.minorityPercent}%</span>
                        </figcaption>
                      </figure>
                    )}
                    {i === 2 && (
                      <figure className="mt-4">
                        <p className="tabular font-serif text-[52px] leading-none">
                          {t("findings.2.statValue")}
                        </p>
                        <figcaption className="mt-2 font-mono text-[10.5px] tracking-[0.14em] text-faint-foreground uppercase">
                          {t("findings.2.statCaption")}
                        </figcaption>
                      </figure>
                    )}
                  </div>

                  {/* Suggested action */}
                  <div>
                    <p className="font-mono text-[10.5px] tracking-[0.22em] text-faint-foreground uppercase">
                      {t("actionLabel")}
                    </p>
                    <p className="mt-5 border-s border-accent ps-5 text-[15.5px] leading-relaxed">
                      {t(`findings.${i}.action`)}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}