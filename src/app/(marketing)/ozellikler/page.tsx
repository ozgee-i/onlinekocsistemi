import { Check } from "lucide-react";
import type { Metadata } from "next";

import { MeshBackground } from "@/components/marketing/backgrounds";
import { CtaBand } from "@/components/marketing/sections/faq-cta";
import { FadeIn } from "@/components/motion/fade-in";
import { features, highlights } from "@/content/marketing";

export const metadata: Metadata = {
  title: "Özellikler",
  description:
    "Deneme ve net takibi, ödev ve konu çizelgesi, veli portalı, randevu, materyal kütüphanesi ve daha fazlası.",
  alternates: { canonical: "/ozellikler" },
};

export default function FeaturesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <MeshBackground className="opacity-70" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">Özellikler</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Koçluğun her adımı için bir modül
          </h1>
          <p className="mt-5 text-lg text-pretty text-muted-foreground">
            Bütün modüller tek planda, birbirine bağlı çalışır: bir deneme sonucu girdiğinizde
            öğrenci panelinde, veli raporunda ve sizin istatistiklerinizde aynı anda görünür.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="grid gap-4">
          {features.map(({ slug, icon: Icon, title, summary, points }, index) => (
            <FadeIn key={slug} as="article">
              <div
                id={slug}
                className="grid scroll-mt-24 gap-6 rounded-2xl border border-neutral-200 bg-card p-6 sm:p-8 md:grid-cols-[1fr_1.2fr] dark:border-neutral-800"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-neutral-200 bg-primary-soft text-primary dark:border-neutral-800">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{summary}</p>
                </div>
                <ul className="grid content-center gap-3">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-sm dark:border-neutral-800"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <FadeIn key={title}>
              <div className="h-full rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
                <Icon className="size-5 text-primary" aria-hidden />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
