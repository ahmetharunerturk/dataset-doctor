import { RepoStatus } from "@/components/repo-status";

import { Reveal } from "@/components/reveal";
import { getTranslations } from "next-intl/server";

const PILLAR_TINT = ["ok", "critical", "info"];

export async function OpenSource() {
  const t = await getTranslations("OSS");

  return (
    <section
      id="open-source"
      aria-labelledby="oss-title"
      className="scroll-mt-24 border-t border-line px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-accent-text uppercase">
            {t("eyebrow")}
          </p>
          <h2
            id="oss-title"
            className="mt-6 max-w-[20ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]"
          >
            {t("title")}
          </h2>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-muted-foreground">
            {t("body")}
          </p>
        </Reveal>

        <div className="mt-14 flex min-w-0">
          <RepoStatus variant="block" showHint />
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <article key={i} className="bg-raised p-8">
                <span
                  className="mb-6 flex size-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: `var(--${PILLAR_TINT[i]})` }}
                >
                  <span className="block size-2 rounded-full bg-primary" />
                </span>
                <h3 className="text-[17px] font-semibold">{t(`pillars.${i}.title`)}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {t(`pillars.${i}.body`)}
                </p>
                <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
                  {t(`pillars.${i}.meta`)}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
