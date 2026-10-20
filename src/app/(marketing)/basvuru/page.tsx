import { Check } from "lucide-react";
import type { Metadata } from "next";

import { MeshBackground } from "@/components/marketing/backgrounds";
import { Card } from "@/components/ui/card";

import { ApplicationForm } from "./application-form";

export const metadata: Metadata = {
  title: "Koç Başvurusu",
  description: "SınavKocStudio'yu kullanmak için başvurun; hesabınızı birlikte kuralım.",
  alternates: { canonical: "/basvuru" },
};

const perks = [
  "Hesabınızı sizinle birlikte kuruyoruz",
  "Tüm özellikler tek planda",
  "Öğrenci ve veli hesapları ücretsiz",
  "Size özel tanıtım sayfası ve adres",
];

export default function ApplicationPage() {
  return (
    <section className="relative isolate px-4 py-16 sm:px-6 sm:py-24">
      <MeshBackground className="opacity-70" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-medium text-primary">Koç başvurusu</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance">
            SınavKocStudio ile çalışmaya başlayın
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Formu doldurun, sizinle iletişime geçelim. Kısa bir tanışma görüşmesinin ardından
            hesabınızı açıyoruz.
          </p>
          <ul className="mt-8 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" aria-hidden />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <Card className="relative p-6 shadow-xl shadow-primary/5 sm:p-8">
          <ApplicationForm />
        </Card>
      </div>
    </section>
  );
}
