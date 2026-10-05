import { Reveal } from "@/components/reveal";
import { getTranslations } from "next-intl/server";

/** Technology roster — marks in the static rail; identical across locales. */
const TECHNOLOGY = [
  "PyTorch",
  "TensorFlow",
  "JAX",
  "scikit-learn",
  "pandas",
  "NumPy",
  "Polars",
  "Arrow",
  "Parquet",
];

export async function TechStrip() {
  const t = await getTranslations("Tech");

  return (
    <section aria-label={t("aria")} className="border-b border-line">
      {/* Rail — a quiet, static row of technology marks (no motion). */}
      <ul className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-5">
        {TECHNOLOGY.map((tech) => (
          <li
            key={tech}
            className="font-mono text-[12px] tracking-[0.18em] text-faint-foreground uppercase"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* Caption strip — sits beneath the rail */}
      <div className="border-t border-line">
        <div className="shell">
          <div className="-my-4 bg-background py-4">
            <Reveal>
              <p className="text-center text-[13px] text-muted-foreground">{t("caption")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
