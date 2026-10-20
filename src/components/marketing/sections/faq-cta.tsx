import { ArrowRight } from "lucide-react";

import { WaveTexture } from "@/components/marketing/backgrounds";
import { Section, SectionHeading } from "@/components/marketing/section";
import { FadeIn } from "@/components/motion/fade-in";
import { Accordion } from "@/components/ui/accordion";
import { LinkButton } from "@/components/ui/link-button";
import { faqs } from "@/content/marketing";

export function Faq() {
  return (
    <Section id="sss" className="bg-muted/40">
      <SectionHeading eyebrow="SSS" title="Sık sorulan sorular" />
      <FadeIn className="mx-auto mt-12 max-w-3xl">
        <Accordion items={[...faqs]} />
      </FadeIn>
    </Section>
  );
}

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-24 sm:px-6">
      <WaveTexture />
      <FadeIn className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Koçluğunuzu bir sonraki seviyeye taşıyın
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-muted-foreground">
          Başvurunuzu bırakın, hesabınızı birlikte kuralım.
        </p>
        <LinkButton href="/basvuru" size="lg" className="mt-8">
          Hemen başvur
          <ArrowRight className="size-4" aria-hidden />
        </LinkButton>
      </FadeIn>
    </section>
  );
}
