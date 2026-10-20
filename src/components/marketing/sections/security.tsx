import { DatabaseZap, FileLock2, KeyRound, ShieldCheck } from "lucide-react";

import { Section, SectionHeading } from "@/components/marketing/section";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";

const items = [
  {
    icon: DatabaseZap,
    title: "Veritabanı seviyesinde ayrım",
    text: "Her koçun verisi satır düzeyinde güvenlik kurallarıyla ayrılır; uygulamada bir hata olsa bile başka bir koçun verisi görünmez.",
  },
  {
    icon: KeyRound,
    title: "Davetle giriş",
    text: "Öğrenci ve veliler yalnızca koçun gönderdiği tek kullanımlık, süreli davet bağlantısıyla katılır.",
  },
  {
    icon: FileLock2,
    title: "Özel dosya depolama",
    text: "Föyler ve belgeler herkese açık değildir; kısa süreli, kişiye özel bağlantılarla açılır.",
  },
  {
    icon: ShieldCheck,
    title: "KVKK'ya uygun tasarım",
    text: "Gereğinden fazla veri toplanmaz, işlemler kayıt altına alınır, verilerinizi dışa aktarabilir veya sildirebilirsiniz.",
  },
];

export function Security() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Güvenlik"
        title="Öğrenci verisi emanettir"
        description="Kullanıcılarımızın çoğu reşit değil. Bu yüzden güvenliği sonradan eklenen bir özellik olarak değil, temel olarak kurduk."
      />
      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
        {items.map(({ icon: Icon, title, text }) => (
          <StaggerItem key={title}>
            <div className="flex h-full gap-4 rounded-xl border border-neutral-200 bg-card p-5 dark:border-neutral-800">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
