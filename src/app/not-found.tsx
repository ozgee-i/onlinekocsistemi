import type { Metadata } from "next";

import { Wordmark } from "@/components/brand/logo";
import { MeshBackground } from "@/components/marketing/backgrounds";
import { LinkButton } from "@/components/ui/link-button";

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <main className="relative isolate flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <MeshBackground className="opacity-60" />
      <Wordmark />
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Aradığınız sayfa bulunamadı</h1>
      <p className="max-w-md text-muted-foreground">
        Bağlantı hatalı olabilir ya da sayfa taşınmış olabilir.
      </p>
      <LinkButton href="/">Ana sayfaya dön</LinkButton>
    </main>
  );
}
