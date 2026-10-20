import { cn } from "@/lib/utils";

/**
 * Haikei tarzı organik "mesh" arka plan: yumuşak renk lekeleri + ince ızgara.
 * Blur filtresi yerine radial gradient kullanılır; yavaş cihazlarda bile boyama maliyeti düşüktür.
 */
export function MeshBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="absolute -top-48 left-1/2 h-[48rem] w-[88rem] -translate-x-1/2 opacity-[0.28] dark:opacity-[0.2]"
        style={{
          background: [
            "radial-gradient(38% 42% at 50% 38%, var(--color-primary), transparent 70%)",
            "radial-gradient(22% 28% at 78% 22%, var(--color-accent), transparent 70%)",
            "radial-gradient(20% 26% at 20% 20%, oklch(0.7 0.14 200), transparent 70%)",
          ].join(","),
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)] bg-[size:56px_56px] opacity-50" />
    </div>
  );
}

/** Bölüm başlıkları ve CTA bantları için yumuşak dalga dokusu. */
export function WaveTexture({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 w-full opacity-[0.12]",
        className,
      )}
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
    >
      <path
        fill="var(--color-primary)"
        d="M0 120c120-30 240-60 360-46s240 70 360 70 240-56 360-74 240 8 360 34v96H0Z"
      />
      <path
        fill="var(--color-accent)"
        opacity="0.6"
        d="M0 160c140-20 280-40 420-26s280 44 420 40 280-40 420-46 120 10 180 18v54H0Z"
      />
    </svg>
  );
}
