import { Check, Globe, LockKeyhole } from "lucide-react";

import { Section, SectionHeading } from "@/components/marketing/section";
import { FadeIn } from "@/components/motion/fade-in";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { features, highlights } from "@/content/marketing";

/** Kendi adresiniz + öne çıkanlar. */
export function Highlights() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Size özel"
            title="Öğrencileriniz sizi kendi adresinizden bulsun"
            description="Her koça özel bir tanıtım sayfası ve başvuru formu. Dilerseniz kendi alan adınızı bağlayın; güvenli bağlantı (SSL) otomatik kurulur."
          />
          <ul className="mt-8 grid gap-4">
            {highlights.map(({ icon: Icon, title, text }) => (
              <FadeIn key={title} as="li" className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-card text-primary dark:border-neutral-800">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </FadeIn>
            ))}
          </ul>
        </div>
        <FadeIn delay={0.1}>
          <Card className="p-6 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-muted/60 px-3 py-2 font-mono text-sm dark:border-neutral-800">
              <LockKeyhole className="size-4 text-success" aria-hidden />
              <span className="text-muted-foreground">https://</span>
              <span className="font-semibold text-foreground">aysehoca</span>
              <span className="text-muted-foreground">.sinavkocstudio.app</span>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-neutral-300 px-3 py-2 font-mono text-sm dark:border-neutral-700">
              <Globe className="size-4 text-primary" aria-hidden />
              <span className="text-foreground">www.aysehoca.com</span>
              <span className="ml-auto text-xs text-success">bağlandı</span>
            </div>
            <div className="mt-6 rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
              <p className="text-lg font-semibold">Ayşe Yılmaz</p>
              <p className="text-sm text-muted-foreground">YKS Matematik Koçu · 8 yıllık deneyim</p>
              <div className="mt-4 h-2 w-3/4 rounded-full bg-muted" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-muted" />
              <div className="mt-5 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
                Ön görüşme talep et
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}

/** Tek plan bölümü — bilinçli olarak fiyat içermez (CLAUDE.md → Ürün Kuralları). */
export function SinglePlan() {
  return (
    <Section className="bg-muted/40">
      <FadeIn>
        <Card className="relative mx-auto max-w-4xl overflow-hidden p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <p className="text-sm font-medium text-primary">Tek plan</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">
                Bütün özellikler, herkes için
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Paket karşılaştırması ya da kilitli özellik yok. Öğrenci ve veli hesapları ücretsiz.
                Başvurunuzdan sonra size uygun koşulları birlikte konuşalım.
              </p>
              <LinkButton href="/basvuru" size="lg" className="mt-8">
                Başvuru yap
              </LinkButton>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
              {[
                ...features.map((f) => f.title),
                "Kendi alan adı desteği",
                "Öğrenci ve veli hesapları ücretsiz",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </FadeIn>
    </Section>
  );
}
