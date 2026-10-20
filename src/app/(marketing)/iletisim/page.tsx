import { ArrowRight, Mail } from "lucide-react";
import type { Metadata } from "next";

import { InstagramIcon } from "@/components/brand/instagram-icon";
import { MeshBackground } from "@/components/marketing/backgrounds";
import { LinkButton } from "@/components/ui/link-button";
import { instagramUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: "SınavKocStudio ekibine e-posta veya Instagram üzerinden ulaşın.",
  alternates: { canonical: "/iletisim" },
};

const channels = [
  {
    icon: Mail,
    title: "E-posta",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    note: "Genellikle bir iş günü içinde yanıtlıyoruz.",
    external: false,
  },
  {
    icon: InstagramIcon,
    title: "Instagram",
    value: `@${siteConfig.contact.instagram}`,
    href: instagramUrl,
    note: "Duyurular ve güncellemeler için bizi takip edin.",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <MeshBackground className="opacity-70" />
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">İletişim</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance">Bize ulaşın</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Sorularınız, önerileriniz veya iş birliği talepleriniz için bize yazabilirsiniz.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {channels.map(({ icon: Icon, title, value, href, note, external }) => (
            <a
              key={title}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group rounded-xl border border-neutral-200 bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 dark:border-neutral-800"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="mt-4 text-sm text-muted-foreground">{title}</p>
              <p className="mt-1 font-semibold break-all group-hover:text-primary">{value}</p>
              <p className="mt-3 text-sm text-muted-foreground">{note}</p>
            </a>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-dashed border-neutral-300 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-700">
          <div>
            <p className="font-semibold">Koç olarak katılmak mı istiyorsunuz?</p>
            <p className="text-sm text-muted-foreground">
              Başvuru formuyla daha hızlı dönüş yapabiliriz.
            </p>
          </div>
          <LinkButton href="/basvuru" variant="secondary">
            Başvuru formu
            <ArrowRight className="size-4" aria-hidden />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
