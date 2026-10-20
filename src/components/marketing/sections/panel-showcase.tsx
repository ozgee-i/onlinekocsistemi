import { Section, SectionHeading } from "@/components/marketing/section";
import {
  CoachPreview,
  ParentPreview,
  previewTabs,
  StudentPreview,
} from "@/components/marketing/previews/panel-previews";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

const contents = {
  koc: <CoachPreview />,
  ogrenci: <StudentPreview />,
  veli: <ParentPreview />,
};

export function PanelShowcase() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Üç panel, tek sistem"
        title="Herkes ihtiyacı olanı görür, fazlasını değil"
        description="Koç her şeyi yönetir; öğrenci görevlerine ve gelişimine odaklanır; veli yalnızca kendi çocuğunu izler."
      />
      <AnimatedTabs
        className="mx-auto mt-12 max-w-5xl"
        tabs={previewTabs.map(({ id, label, icon: Icon }) => ({
          id,
          label,
          icon: <Icon className="size-4" aria-hidden />,
          content: contents[id],
        }))}
      />
    </Section>
  );
}
