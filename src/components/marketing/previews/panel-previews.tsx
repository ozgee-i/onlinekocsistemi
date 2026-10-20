import {
  BookOpenCheck,
  CalendarClock,
  ChartNoAxesCombined,
  Check,
  Flame,
  FolderLock,
  HeartHandshake,
  LayoutDashboard,
  ListChecks,
  Timer,
  Users,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { NetChart } from "./net-chart";
import { WindowFrame } from "./window-frame";

// Tüm isimler ve sayılar örnektir; gerçek kullanıcı verisi değildir.

function MiniCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-card p-3 dark:border-neutral-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <MiniCard>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight">{value}</p>
      {delta && <p className="text-[11px] font-medium text-success">{delta}</p>}
    </MiniCard>
  );
}

const sidebar = [
  { icon: LayoutDashboard, label: "Genel bakış", active: true },
  { icon: Users, label: "Öğrenciler" },
  { icon: ChartNoAxesCombined, label: "Denemeler" },
  { icon: ListChecks, label: "Ödevler" },
  { icon: CalendarClock, label: "Takvim" },
  { icon: Wallet, label: "Ödemeler" },
  { icon: FolderLock, label: "Materyaller" },
];

export function CoachPreview() {
  return (
    <WindowFrame url="app.sinavkocstudio.app/koc">
      <div className="flex min-h-[22rem] text-left">
        <aside className="hidden w-44 shrink-0 border-r border-neutral-200 p-3 sm:block dark:border-neutral-800">
          <p className="px-2 pb-3 text-xs font-semibold">Ayşe Hoca</p>
          <ul className="flex flex-col gap-0.5">
            {sidebar.map(({ icon: Icon, label, active }) => (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                  active ? "bg-primary-soft font-medium text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-3.5" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1 space-y-3 p-4">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Aktif öğrenci" value="24" />
            <Stat label="Bu hafta deneme" value="31" delta="+6 geçen haftaya göre" />
            <Stat label="Bekleyen ödeme" value="3" />
          </div>
          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr]">
            <MiniCard>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Ortalama TYT neti</p>
                <Badge tone="success">+14,5</Badge>
              </div>
              <NetChart
                values={[62.5, 66, 71.25, 70, 76.5, 81, 84.75]}
                target={90}
                max={120}
                labels={["Eyl", "", "Eki", "", "Kas", "", "Ara"]}
                className="mt-2 h-32 w-full"
              />
            </MiniCard>
            <MiniCard>
              <p className="text-xs font-medium">Bugünkü seanslar</p>
              <ul className="mt-2 space-y-2 text-[11px]">
                {[
                  ["14:00", "Elif K.", "TYT Matematik"],
                  ["16:30", "Mert A.", "LGS Fen"],
                  ["19:00", "Zeynep D.", "AYT Edebiyat"],
                ].map(([time, name, topic]) => (
                  <li key={time} className="flex items-center gap-2">
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono">{time}</span>
                    <span className="font-medium">{name}</span>
                    <span className="truncate text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </MiniCard>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

export function StudentPreview() {
  const tasks = [
    { label: "Türev — 40 soru", done: true },
    { label: "Paragraf — 30 soru", done: true },
    { label: "Organik kimya tekrar", done: false },
    { label: "TYT deneme analizi", done: false },
  ];
  return (
    <WindowFrame url="app.sinavkocstudio.app/ogrenci">
      <div className="grid min-h-[22rem] gap-3 p-4 text-left md:grid-cols-[1fr_1.2fr]">
        <MiniCard className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Bugünün görevleri</p>
            <Badge tone="warning">
              <Flame className="size-3" aria-hidden />
              12 gün seri
            </Badge>
          </div>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.label} className="flex items-center gap-2 text-xs">
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded border",
                    task.done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-neutral-300 dark:border-neutral-700",
                  )}
                >
                  {task.done && <Check className="size-3" aria-hidden />}
                </span>
                <span className={cn(task.done && "text-muted-foreground line-through")}>
                  {task.label}
                </span>
              </li>
            ))}
          </ul>
          <div>
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Haftalık soru hedefi</span>
              <span className="font-medium text-foreground">420 / 600</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[70%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs">
            <Timer className="size-4 text-primary" aria-hidden />
            Pomodoro <span className="ml-auto font-mono font-semibold">18:42</span>
          </div>
        </MiniCard>
        <div className="space-y-3">
          <MiniCard>
            <p className="text-xs font-medium">Net gelişimim</p>
            <NetChart
              values={[48, 52.5, 51, 58.75, 63, 67.5]}
              target={75}
              max={100}
              className="mt-2 h-28 w-full"
            />
          </MiniCard>
          <MiniCard>
            <p className="text-xs font-medium">Konu haritası — Matematik</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                ["Fonksiyonlar", "success"],
                ["Polinomlar", "success"],
                ["Logaritma", "primary"],
                ["Diziler", "primary"],
                ["Limit", "neutral"],
                ["Türev", "primary"],
                ["İntegral", "neutral"],
              ].map(([label, tone]) => (
                <Badge key={label} tone={tone as "success" | "primary" | "neutral"}>
                  {label}
                </Badge>
              ))}
            </div>
          </MiniCard>
        </div>
      </div>
    </WindowFrame>
  );
}

export function ParentPreview() {
  return (
    <WindowFrame url="app.sinavkocstudio.app/veli">
      <div className="grid min-h-[22rem] gap-3 p-4 text-left md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <MiniCard>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">Elif&apos;in haftalık özeti</p>
              <Badge tone="primary">Haftalık rapor</Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat label="Çözülen soru" value="512" />
              <Stat label="Çalışma" value="14 sa" />
              <Stat label="Son TYT" value="84,75" delta="+3,75 net" />
            </div>
          </MiniCard>
          <MiniCard>
            <p className="text-xs font-medium">Koçun yorumu</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Bu hafta matematikte istikrarlı bir artış var. Türev konusunda soru sayısını biraz
              daha artırmasını öneriyorum; paragraf hızı hedefe çok yakın.
            </p>
          </MiniCard>
        </div>
        <MiniCard className="space-y-2.5">
          <p className="text-xs font-medium">Ödev durumu</p>
          {[
            ["Matematik", 90],
            ["Türkçe", 75],
            ["Fen", 60],
            ["Sosyal", 45],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="flex justify-between text-[11px]">
                <span>{label}</span>
                <span className="text-muted-foreground">%{value}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
          <div className="mt-3 flex items-center gap-2 rounded-md border border-neutral-200 p-2 text-[11px] dark:border-neutral-800">
            <CalendarClock className="size-3.5 text-primary" aria-hidden />
            Sonraki seans: Perşembe 16:30
          </div>
        </MiniCard>
      </div>
    </WindowFrame>
  );
}

export const previewTabs = [
  { id: "koc", label: "Koç paneli", icon: BookOpenCheck },
  { id: "ogrenci", label: "Öğrenci paneli", icon: ListChecks },
  { id: "veli", label: "Veli paneli", icon: HeartHandshake },
] as const;
