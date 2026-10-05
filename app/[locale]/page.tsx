import { setRequestLocale } from "next-intl/server";

import { DeveloperSection } from "@/components/developer-section";
import { FeatureSection } from "@/components/feature-section";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { HealthScore } from "@/components/health-score";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { OpenSource } from "@/components/open-source";
import { ProblemSection } from "@/components/problem-section";
import { ReportPreview } from "@/components/report-preview";
import { SkipLink } from "@/components/skip-link";
import { TechStrip } from "@/components/tech-strip";
import { Workflow } from "@/components/workflow";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TechStrip />
        <ProblemSection />
        <FeatureSection />
        <HealthScore />
        <ReportPreview />
        <Workflow />
        <DeveloperSection />
        <OpenSource />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}