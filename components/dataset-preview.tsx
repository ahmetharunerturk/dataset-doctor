"use client";

import { SPECIMEN } from "@/lib/specimen";
import { useTranslations } from "next-intl";

const SEVERITIES = ["warning", "info", "warning", "critical"] as const;

const SEVERITY_CLASS: Record<string, string> = {
  critical: "text-critical border-critical/45",
  warning: "text-warning border-warning/45",
  info: "text-info border-info/45",
};

/**
 * Static sample report specimen — decorative product mock-up bound to the
 * Preview catalogue strings. Numbers are fixed specimens, never computed.
 */
export function DatasetPreview() {
  const t = useTranslations("Preview");
  const tc = useTranslations("Common");

  return (
    <figure className="report-shadow relative mx-auto w-full max-w-[540px] border border-line bg-panel">
      {/* report chrome */}
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <span className="text-[15px] font-semibold">{t("reportChrome")}</span>
        <span className="veil-6 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
          {t("sampleTag")}
        </span>
      </figcaption>

      {/* specimen meta rail */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line px-5 py-3 font-mono text-[11.5px] tracking-[0.08em] text-faint-foreground uppercase">
        <span className="tabular">{t("specimenStats", { rows: SPECIMEN.rows, columns: SPECIMEN.columns })}</span>
        <span aria-hidden="true">·</span>
        <span className="tabular">{t("analyzedIn", { seconds: SPECIMEN.analyzedSeconds })}</span>
      </div>

      {/* findings table */}
      <div className="px-5 pt-4 pb-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-x-5 border-b border-line pb-2.5 font-mono text-[10px] tracking-[0.22em] text-faint-foreground uppercase">
          <span>{t("headFinding")}</span>
          <span className="hidden text-right sm:block">{t("headDetail")}</span>
          <span className="min-w-[86px] text-right">{t("headSeverity")}</span>
        </div>
        <ul>
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-x-5 border-b border-line py-3 last:border-b-0"
            >
              <span className="col-start-1 row-start-1 min-w-0 break-words text-[13.5px] font-medium">{t(`issues.${i}.name`)}</span>
              <span className="tabular col-span-2 col-start-1 row-start-2 break-words font-mono text-[11.5px] text-muted-foreground sm:col-span-1 sm:col-start-2 sm:row-start-1">
                {t(`issues.${i}.detail`)}
              </span>
              <span
                className={`col-start-2 row-start-1 min-w-[86px] rounded-full border px-2 sm:col-start-3 py-0.5 text-center font-mono text-[10px] tracking-[0.14em] uppercase ${SEVERITY_CLASS[SEVERITIES[i]]}`}
              >
                {tc(`severity.${SEVERITIES[i]}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* health footer */}
      <div className="border-t border-line px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
            {t("healthScore")}
          </span>
          <div className="flex items-center gap-2.5">
            {/* 68 sits in the 50-79 watch band (Meter contract) — warning tone, like the chip. */}
            <span className="tabular font-mono text-[12.5px] font-semibold text-warning">
              {`${SPECIMEN.health.overall} / 100`}
            </span>
          <span className="veil-6 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-warning uppercase">
              {t("chip")}
            </span>
          </div>
        </div>
        <div className="mt-3 h-[6px] w-full bg-[rgb(var(--veil-rgb)/0.1)]" aria-hidden="true">
          <div className="h-full bg-warning" style={{ width: `${SPECIMEN.health.overall}%` }} />
        </div>
      </div>

      <p className="border-t border-line px-5 py-2.5 font-mono text-[10px] tracking-[0.14em] text-faint-foreground uppercase">
        {t("generatedBy")}
      </p>

      {/* stacked-pages edge */}
      <div aria-hidden="true" className="mx-3 -mb-2 h-2 border-x border-b border-line veil-6" />
      <div aria-hidden="true" className="mx-6 -mb-3 h-2 border-x border-b border-line veil-2" />
    </figure>
  );
}
