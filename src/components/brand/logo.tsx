import Link from "next/link";

import { cn } from "@/lib/utils";

/** GEÇİCİ yazı logosu — gerçek logo gelince değişecek (docs/PLAN.md). */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline text-[1.05rem] tracking-tight", className)}>
      <span className="font-semibold text-foreground">Sınav</span>
      <span className="font-semibold text-primary">Koc</span>
      <span className="ml-0.5 font-light text-muted-foreground">Studio</span>
      <span aria-hidden className="ml-0.5 size-1.5 self-end rounded-full bg-accent" />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SınavKocStudio ana sayfa"
      className={cn("inline-flex rounded-md", className)}
    >
      <Wordmark />
    </Link>
  );
}
