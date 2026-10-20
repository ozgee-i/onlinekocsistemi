import { Check, X } from "lucide-react";

import { Section, SectionHeading } from "@/components/marketing/section";
import { FadeIn } from "@/components/motion/fade-in";
import { Card } from "@/components/ui/card";

const before = [
  "Deneme sonuçları dağınık Excel dosyalarında",
  "Ödev takibi WhatsApp mesajlarında kayboluyor",
  "Veliler her hafta aynı soruları soruyor",
  "Kimin ödeme yaptığı, kaç seans kaldığı belirsiz",
];

const after = [
  "Netler otomatik hesaplanır, gelişim grafikte",
  "Ödev ve konu durumu tek çizelgede",
  "Veliler kendi panelinden izler, rapor her hafta gider",
  "Paket, seans ve tahsilat bir bakışta",
];

export function Problem() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Neden SınavKocStudio?"
        title="Koçluğa ayırmanız gereken zamanı tablolara harcamayın"
        description="Öğrenci sayınız arttıkça takip zorlaşır. SınavKocStudio rutin işleri sizin yerinize düzenler; siz öğrencinize odaklanırsınız."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <FadeIn>
          <Card className="h-full p-6">
            <p className="text-sm font-semibold text-muted-foreground">Bugün</p>
            <ul className="mt-5 space-y-3.5">
              {before.map((text) => (
                <li key={text} className="flex gap-3 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                    <X className="size-3" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card className="h-full border-primary/30 bg-primary-soft/40 p-6 dark:border-primary/30">
            <p className="text-sm font-semibold text-primary">SınavKocStudio ile</p>
            <ul className="mt-5 space-y-3.5">
              {after.map((text) => (
                <li key={text} className="flex gap-3 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}
