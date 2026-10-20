import { ArrowRight, ShieldCheck } from "lucide-react";

import { MeshBackground } from "@/components/marketing/backgrounds";
import { CoachPreview } from "@/components/marketing/previews/panel-previews";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
      <MeshBackground />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="primary" className="mb-6 animate-fade-up">
            YKS · LGS · YDT koçları için
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Öğrencilerinizin gelişimi, <span className="text-primary">tek panelde.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-pretty text-muted-foreground [animation-delay:80ms]">
            Deneme netleri, ödevler, konu eksikleri, seanslar ve veli raporları… Excel tabloları ve
            WhatsApp gruplarıyla uğraşmadan, hepsini SınavKocStudio ile tek yerden yönetin.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:160ms] sm:flex-row">
            <LinkButton href="/basvuru" size="lg" className="w-full sm:w-auto">
              Koç olarak başvur
              <ArrowRight className="size-4" aria-hidden />
            </LinkButton>
            <LinkButton
              href="/ozellikler"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Özellikleri incele
            </LinkButton>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-success" aria-hidden />
            Her koçun verisi birbirinden tamamen ayrı tutulur.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl animate-fade-up [animation-delay:240ms]">
          <CoachPreview />
        </div>
      </div>
    </section>
  );
}
