import {
  BellRing,
  CalendarClock,
  ChartNoAxesCombined,
  FileSpreadsheet,
  FolderLock,
  Globe,
  HeartHandshake,
  Kanban,
  ListChecks,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  slug: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  points: string[];
};

/** Tanıtım sitesindeki modüller. Sıra, ana sayfa ve /ozellikler sayfasında aynıdır. */
export const features: Feature[] = [
  {
    slug: "deneme-takibi",
    icon: ChartNoAxesCombined,
    title: "Deneme ve net takibi",
    summary:
      "TYT, AYT, LGS ve YDT denemelerini ders ders girin; netler otomatik hesaplansın, gelişim grafikte görünsün.",
    points: [
      "Doğru/yanlış/boş girişi, net otomatik hesaplanır",
      "Ders bazlı ve toplam net grafikleri",
      "Hedef net/puan çizgisiyle karşılaştırma",
      "Yayınevi sonuçlarını Excel/CSV ile toplu içe aktarma",
    ],
  },
  {
    slug: "odev-konu-takibi",
    icon: ListChecks,
    title: "Ödev, soru ve konu takibi",
    summary: "Günlük ve haftalık soru hedefleri atayın, konu eksiklerini tek çizelgede izleyin.",
    points: [
      "Günlük/haftalık soru hedefi ve çalışma programı",
      "Konu durumu: eksik, çalışılıyor, tamamlandı",
      "Öğrencinin kendi çalışma süresi ve kaynak kaydı",
      "Seri, rozet ve pomodoro sayacıyla motivasyon",
    ],
  },
  {
    slug: "veli-portali",
    icon: HeartHandshake,
    title: "Veli portalı ve haftalık rapor",
    summary:
      "Veliler çocuklarının gelişimini güvenle izlesin; her hafta anlaşılır bir özet e-postası alsın.",
    points: [
      "Velilere özel, salt okunur panel",
      "Yalnızca sizin paylaştığınız görüşme notları",
      "Otomatik haftalık net ve çalışma özeti",
      "Yapay zekâ destekli, sade Türkçe rapor yorumu",
    ],
  },
  {
    slug: "ogrenci-crm",
    icon: Kanban,
    title: "Başvuru ve öğrenci yönetimi",
    summary: "Size ulaşan aday öğrencileri ilk görüşmeden kayda kadar bir panoda takip edin.",
    points: [
      "Tanıtım sayfanızdaki başvuru formu doğrudan panoya düşer",
      "Görüşme, deneme dersi, kayıt aşamaları",
      "Tek tıkla adayı öğrenciye dönüştürme",
      "Öğrenci ve veli davetleri güvenli bağlantıyla",
    ],
  },
  {
    slug: "finans",
    icon: Wallet,
    title: "Paket ve ödeme takibi",
    summary:
      "Aylık, seans paketli veya dönemlik koçluklarınızı ve tahsilatlarınızı karışıklık olmadan izleyin.",
    points: [
      "Öğrenciye özel paket tanımı",
      "Kalan seans hakkı sayacı",
      "Ödendi / bekliyor / gecikti durumu",
      "Aylık gelir özeti",
    ],
  },
  {
    slug: "randevu",
    icon: CalendarClock,
    title: "Randevu ve takvim",
    summary:
      "Müsait saatlerinizi tanımlayın; öğrenci ve veliler uygun saati seçip seans oluştursun.",
    points: [
      "Haftalık müsaitlik ve tatil günleri",
      "Çakışmasız otomatik rezervasyon",
      "Seans paketinden otomatik düşme",
      "Google Takvim senkronizasyonu",
    ],
  },
  {
    slug: "materyal",
    icon: FolderLock,
    title: "Materyal kütüphanesi",
    summary:
      "PDF föyleri, formül kâğıtları ve video bağlantılarını yalnızca ilgili öğrencilerle paylaşın.",
    points: [
      "Öğrenciye veya gruba özel paylaşım",
      "Özel depolama, süreli ve güvenli erişim bağlantıları",
      "Video bağlantıları ve notlar",
    ],
  },
  {
    slug: "duyurular",
    icon: BellRing,
    title: "Duyuru ve bildirim merkezi",
    summary:
      "WhatsApp gruplarında kaybolan mesajlara son; duyuru ve hatırlatmaları tek tıkla gönderin.",
    points: [
      "Öğrencilere, velilere veya gruplara toplu duyuru",
      "Ödev hatırlatmaları ve motivasyon mesajları",
      "Okundu bilgisi, telefona bildirim",
    ],
  },
];

export const highlights = [
  {
    icon: Globe,
    title: "Kendi adresiniz",
    text: "Size özel adkoc.sinavkocstudio.app adresi; dilerseniz kendi alan adınız.",
  },
  {
    icon: FileSpreadsheet,
    title: "Toplu içe aktarma",
    text: "Deneme sonuçlarını tek tek yazmak yerine dosyayla yükleyin.",
  },
  {
    icon: Sparkles,
    title: "Yapay zekâ özetleri",
    text: "Haftalık gelişim, veliler için sade ve anlaşılır bir dille özetlenir.",
  },
] as const;

export const steps = [
  {
    title: "Başvurun",
    text: "Kısa formu doldurun. Sizinle iletişime geçip hesabınızı birlikte açalım.",
  },
  {
    title: "Öğrencilerinizi davet edin",
    text: "Öğrenci ve velilere güvenli davet bağlantısı gönderin; herkes kendi panelinden girsin.",
  },
  {
    title: "Takibe başlayın",
    text: "Denemeleri, ödevleri ve seansları tek panelden yönetin; raporlar kendiliğinden hazırlansın.",
  },
] as const;

export const faqs = [
  {
    question: "SınavKocStudio kimler için?",
    answer:
      "YKS ve LGS'ye hazırlanan öğrencilerle çalışan bağımsız eğitim koçları, özel ders öğretmenleri ve birden fazla koçu olan etüt merkezleri için tasarlandı.",
  },
  {
    question: "Ücretlendirme nasıl?",
    answer:
      "Tek bir plan var ve bütün özellikler bu plana dahil. Paket karşılaştırması ya da gizli ek ücret yok. Ayrıntıları başvurunuzdan sonra sizinle paylaşıyoruz.",
  },
  {
    question: "Öğrencilerim ve veliler ayrıca bir şey ödüyor mu?",
    answer: "Hayır. Öğrenci ve veli hesapları ücretsizdir; onları siz davet edersiniz.",
  },
  {
    question: "Veliler neleri görebilir?",
    answer:
      "Veliler yalnızca kendi çocuklarının deneme gelişimini, ödev durumunu ve sizin veliyle paylaşmayı seçtiğiniz notları görür. Diğer öğrencilerin hiçbir verisine erişemez.",
  },
  {
    question: "Verilerim güvende mi?",
    answer:
      "Her koçun verisi veritabanı seviyesinde birbirinden ayrılır; bir koç başka bir koçun verisini teknik olarak göremez. Bağlantılar şifrelidir, dosyalar özel depolamada tutulur ve süreli bağlantılarla açılır.",
  },
  {
    question: "Kendi alan adımı kullanabilir miyim?",
    answer:
      "Evet. Size özel bir alt alan adı (ör. adkoc.sinavkocstudio.app) verilir. Dilerseniz kendi alan adınızı bağlayabilirsiniz; gereken DNS kayıtlarını panel size adım adım gösterir.",
  },
  {
    question: "Telefondan kullanılabilir mi?",
    answer:
      "Evet. Tüm paneller mobil uyumludur ve öğrenciler uygulamayı telefonlarına ana ekran uygulaması olarak ekleyebilir.",
  },
] as const;
