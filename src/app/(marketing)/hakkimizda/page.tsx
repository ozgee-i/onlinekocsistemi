import { Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { MeshBackground } from "@/components/marketing/backgrounds";
import { CtaBand } from "@/components/marketing/sections/faq-cta";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "SınavKocStudio'yu neden ve kimler için geliştirdiğimizi anlatıyoruz.",
  alternates: { canonical: "/hakkimizda" },
};

const values = [
  {
    icon: Compass,
    title: "Koça odaklı",
    text: "Her özelliği bir koçun gününü kolaylaştırıp kolaylaştırmadığına bakarak tasarlıyoruz.",
  },
  {
    icon: ShieldCheck,
    title: "Güvenlik önce",
    text: "Öğrenci verisi emanettir. Güvenliği her adımda baştan düşünüyoruz.",
  },
  {
    icon: HeartHandshake,
    title: "Şeffaf ilişki",
    text: "Tek plan, net koşullar. Sürpriz ücret ya da kilitli özellik yok.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-4 pt-16 pb-16 sm:px-6 sm:pt-24">
        <MeshBackground className="opacity-70" />
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-primary">Hakkımızda</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Koçlar öğrencilerine daha çok zaman ayırabilsin diye
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Sınav koçluğu emek isteyen bir iş: her öğrencinin denemelerini incelemek, eksik
              konularını takip etmek, ödevlerini planlamak, velileri bilgilendirmek, seansları ve
              ödemeleri düzenlemek… Bunların çoğu bugün tablolar, not defterleri ve mesajlaşma
              uygulamaları arasında dağınık şekilde yürüyor.
            </p>
            <p>
              SınavKocStudio bu dağınıklığı tek bir yerde topluyor. Amacımız koçların rutin işlere
              harcadığı zamanı azaltmak; öğrencinin gelişimini herkes için görünür ve anlaşılır
              kılmak.
            </p>
          </div>
        </div>
      </section>
      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <FadeIn key={title}>
              <div className="h-full rounded-xl border border-neutral-200 bg-card p-6 dark:border-neutral-800">
                <Icon className="size-5 text-primary" aria-hidden />
                <h2 className="mt-4 text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
