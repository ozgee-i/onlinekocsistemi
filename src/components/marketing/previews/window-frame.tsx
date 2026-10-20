import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Önizlemeleri saran tarayıcı penceresi çerçevesi. */
export function WindowFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-neutral-200 bg-card shadow-2xl shadow-primary/5 dark:border-neutral-800 dark:shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-neutral-200 bg-muted/50 px-4 py-2.5 dark:border-neutral-800">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </div>
        <div className="mx-auto max-w-xs flex-1 truncate rounded-md border border-neutral-200 bg-card px-3 py-1 text-center font-mono text-[11px] text-muted-foreground dark:border-neutral-800">
          {url}
        </div>
        <div className="w-10" aria-hidden />
      </div>
      {children}
    </div>
  );
}
