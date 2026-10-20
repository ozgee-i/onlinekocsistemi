import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-card text-card-foreground dark:border-neutral-800",
        className,
      )}
      {...props}
    />
  );
}
