"use client";

import { Reveal } from "@/components/reveal";
import { SPECIMEN } from "@/lib/specimen";
import { useTranslations } from "next-intl";

const LINE_TONE = ["text-ok", "text-ok", "text-warning", "text-critical", "text-ok"];

export function DeveloperSection() {
  const t = useTranslations("Dev");

  const lines: Array<{ tone: string; text: string; ltr?: true }> = [
    { tone: "", ltr: true, text: "$ dataset-doctor inspect dataset.csv" },
    { tone: "text-faint-foreground", text: t("analyzing") },
    { tone: LINE_TONE[0], text: `✓ ${t("rowsOk", { count: SPECIMEN.rows })}` },
    { tone: LINE_TONE[1], text: `✓ ${t("colsOk", { count: SPECIMEN.columns })}` },
    { tone: LINE_TONE[2], text: `! ${t("warnings", { count: 3 })}` },
    { tone: LINE_TONE[3], text: `✕ ${t("critical", { count: 2 })}` },
    { tone: "", text: `${t("healthLabel")} ${SPECIMEN.health.overall} / 100` },
    { tone: LINE_TONE[4], text: `✓ ${t("generated")}` },
  ];

  return (
    <section aria-labelledby="dev-title" className="border-b border-line px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)]">
        <Reveal>
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent-text uppercase">
              {t("eyebrow")}
            </p>
            <h2
              id="dev-title"
              className="mt-6 max-w-[18ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]"
            >
              {t("title")}
            </h2>
            <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-muted-foreground">
              {t("body")}
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-faint-foreground uppercase">
              {t("apiNote")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="border border-line bg-deep">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="veil-25 block size-2.5 rounded-full" />
                <span className="veil-14 block size-2.5 rounded-full" />
                <span className="veil-6 block size-2.5 rounded-full" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-faint-foreground uppercase">
                {t("termTag")}
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-6 font-mono text-[12.5px] leading-loose">
              <code>
                {lines.map((line, i) => (
                  <span key={i} dir={line.ltr ? "ltr" : undefined} className={`block ${line.tone} ${i === 6 ? "mt-2 text-[13px] font-medium" : ""}`}>
                    {i === 6 ? (
                      <>
                        {t("healthLabel")}{" "}
                        <bdi dir="ltr" className="text-accent-text tabular">{`${SPECIMEN.health.overall} / 100`}</bdi>
                      </>
                    ) : (
                      line.text
                    )}
                  </span>
                ))}
                <span className="veil-25 mt-1 inline-block h-[14px] w-[8px] align-middle" aria-hidden="true" />
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}