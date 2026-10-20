import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section, SectionHeading } from "@/components/marketing/section";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { features } from "@/content/marketing";

export function FeatureGrid() {
  return (
    <Section id="ozellikler" className="bg-muted/40">
      <SectionHeading
        eyebrow="Modüller"
        title="Sınav koçluğunun ihtiyaç duyduğu her şey"
        description="Deneme analizinden veli iletişimine, seans planlamasından ödeme takibine kadar."
      />
      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ slug, icon: Icon, title, summary }) => (
          <StaggerItem key={slug}>
            <Link
              href={`/ozellikler#${slug}`}
              className="group flex h-full flex-col rounded-xl border border-neutral-200 bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 dark:border-neutral-800"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-neutral-200 bg-primary-soft text-primary dark:border-neutral-800">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Detaylar
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
