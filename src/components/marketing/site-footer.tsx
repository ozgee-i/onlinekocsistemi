import { Mail } from "lucide-react";
import Link from "next/link";

import { InstagramIcon } from "@/components/brand/instagram-icon";
import { Wordmark } from "@/components/brand/logo";
import { instagramUrl, legalNav, mainNav, siteConfig } from "@/config/site";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Wordmark />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Eğitim koçları ve özel ders öğretmenleri için öğrenci, veli ve deneme takibini tek yerde
            toplayan platform.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex w-fit items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden />
              {siteConfig.contact.email}
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <InstagramIcon className="size-4" aria-hidden />@{siteConfig.contact.instagram}
            </a>
          </div>
        </div>

        <nav aria-label="Site">
          <h2 className="text-sm font-semibold">Platform</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/basvuru" className="text-muted-foreground hover:text-foreground">
                Koç başvurusu
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Yasal">
          <h2 className="text-sm font-semibold">Yasal</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {year} {siteConfig.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
