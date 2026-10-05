import { Reveal } from "@/components/reveal";
import { richTags } from "@/lib/rich-tags";
import { getTranslations } from "next-intl/server";

export async function Workflow() {
  const t = await getTranslations("Work");

  return (
    <section
      id="how-it-works"
      aria-labelledby="workflow-title"
      className="border-t border-line px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-accent-text uppercase">
            {t("eyebrow")}
          </p>
          <h2
            id="workflow-title"
            className="mt-6 max-w-[16ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]"
          >
            {t.rich("title", richTags)}
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <li key={i} className="bg-raised p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="tabular font-mono text-[44px] leading-none text-faint-foreground/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-faint-foreground uppercase">
                  {t(`steps.${i}.meta`)}
                </span>
              </div>
              <h3 className="mt-10 text-[20px] font-semibold">{t(`steps.${i}.title`)}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {t(`steps.${i}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}