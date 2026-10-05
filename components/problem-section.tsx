"use client";

import { Reveal } from "@/components/reveal";
import { useTranslations } from "next-intl";

export function ProblemSection() {
  const t = useTranslations("Problem");

  return (
    <section
      aria-labelledby="problem-title"
      className="border-b border-line px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20">
        <Reveal>
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent-text uppercase">
              {t("eyebrow")}
            </p>
            <h2
              id="problem-title"
              className="mt-6 max-w-[22ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]"
            >
              {t("title")}
            </h2>
            <p className="mt-8 max-w-[56ch] text-[17px] leading-relaxed text-muted-foreground">
              {t("body")}
            </p>

            <blockquote className="mt-14 border-l border-accent pl-8">
              <p className="max-w-[24ch] font-serif text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15] italic">
                “{t("quote")}”
              </p>
            </blockquote>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="border border-line bg-raised">
            <div className="flex items-baseline justify-between gap-3 border-b border-line px-6 py-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
                {t("indexLabel")}
              </span>
              <span className="tabular font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
                {t("indexRange")}
              </span>
            </div>
            <ol>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-line px-6 py-4 last:border-b-0"
                >
                  <span className="tabular font-mono text-[11px] text-faint-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium">{t(`symptoms.${i}.name`)}</span>
                    <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                      {t(`symptoms.${i}.gloss`)}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}