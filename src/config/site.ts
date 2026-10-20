export const siteConfig = {
  name: "SınavKocStudio",
  description:
    "Eğitim koçları ve özel ders öğretmenleri için deneme takibi, ödev ve konu yönetimi, veli portalı ve randevu sistemini tek panelde toplayan platform.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "tr_TR",
  // GEÇİCİ: yayından önce gerçek bilgilerle değiştirilecek (docs/PLAN.md → "Yayından önce").
  contact: {
    email: "iletisim@sinavkocstudio.app",
    instagram: "sinavkocstudio",
  },
} as const;

export const instagramUrl = `https://www.instagram.com/${siteConfig.contact.instagram}/`;

export const mainNav = [
  { href: "/ozellikler", label: "Özellikler" },
  { href: "/#nasil-calisir", label: "Nasıl çalışır?" },
  { href: "/#sss", label: "SSS" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const legalNav = [
  { href: "/yasal/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/yasal/gizlilik", label: "Gizlilik Politikası" },
  { href: "/yasal/cerez", label: "Çerez Politikası" },
  { href: "/yasal/kullanim-kosullari", label: "Kullanım Koşulları" },
] as const;
