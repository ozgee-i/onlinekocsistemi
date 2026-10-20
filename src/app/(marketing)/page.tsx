import { Faq, CtaBand } from "@/components/marketing/sections/faq-cta";
import { FeatureGrid } from "@/components/marketing/sections/feature-grid";
import { Hero } from "@/components/marketing/sections/hero";
import { Highlights, SinglePlan } from "@/components/marketing/sections/highlights";
import { HowItWorks } from "@/components/marketing/sections/how-it-works";
import { PanelShowcase } from "@/components/marketing/sections/panel-showcase";
import { Problem } from "@/components/marketing/sections/problem";
import { Security } from "@/components/marketing/sections/security";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/marketing";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: siteConfig.name,
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            description: siteConfig.description,
            url: siteConfig.url,
            inLanguage: "tr",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <Hero />
      <Problem />
      <FeatureGrid />
      <PanelShowcase />
      <HowItWorks />
      <Highlights />
      <SinglePlan />
      <Security />
      <Faq />
      <CtaBand />
    </>
  );
}
