import { Section, SectionHeading } from "@/components/marketing/section";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { steps } from "@/content/marketing";

export function HowItWorks() {
  return (
    <Section id="nasil-calisir" className="bg-muted/40">
      <SectionHeading eyebrow="Nasıl çalışır?" title="Üç adımda başlayın" />
      <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <StaggerItem key={step.title}>
            <div className="relative h-full rounded-xl border border-neutral-200 bg-card p-6 dark:border-neutral-800">
              <span className="font-mono text-sm font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
