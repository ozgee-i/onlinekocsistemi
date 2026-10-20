# SınavKocStudio — Geliştirme Planı

Durum işaretleri: `[ ]` yapılacak · `[~]` sürüyor · `[x]` bitti
Her faz sonunda: lint + typecheck + testler geçer, güvenlik kontrol listesi gözden geçirilir, kullanıcı onay verir.

---

## Kararlar

| #   | Konu                   | Karar                                                                                                                                                                                                               |
| --- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| K1  | Tenant modeli          | Kurum (çok koçlu) yapısı altyapıda baştan var (`tenant_members`); arayüz önce bireysel koç için.                                                                                                                    |
| K2  | Öğrenci/veli girişi    | Koç davet eder → tek kullanımlık, süreli link → e-posta + şifre. SMS sonra eklenebilir.                                                                                                                             |
| K3  | Geliştirme ortamı      | Lokal Supabase (Docker), bulut projesi yayına yakın açılır (ayrı dev + prod projesi).                                                                                                                               |
| K4  | Panel hostu            | Tüm paneller `app.sinavkocstudio.app`; subdomain/özel domain yalnızca koçun tanıtım sayfası.                                                                                                                        |
| K5  | Proxy                  | Next.js 16 `src/proxy.ts`; rewrite hedefi `/sites/[slug]` (`_tenants` private folder olduğu için çalışmaz).                                                                                                         |
| K6  | DNS/SSL                | `sinavkocstudio.app` nameserver'ları **Vercel**'e verilir (wildcard SSL için şart). SSL'i Vercel verir; Cloudflare SSL zincirinde yer almaz.                                                                        |
| K7  | Özel domain            | `www.kocadi.com` → CNAME; kök domain (`kocadi.com`) CNAME alamaz → A kaydı (Vercel IP) + www'ye yönlendirme.                                                                                                        |
| K8  | Ek modüller            | Lead/CRM hunisi, deneme toplu içe aktarma (Excel/CSV), AI haftalık rapor yorumu, PWA + oyunlaştırma plana alındı.                                                                                                   |
| K9  | Fiyatlandırma          | **Tek plan, tek fiyat.** Free/Pro/Enterprise yok. Sitede **hiçbir yerde fiyat yazmaz**; fiyat sayfası yok, CTA "Başvur / Demo talep et".                                                                            |
| K10 | Ödeme (şimdilik)       | Koçlar IBAN'a havale/EFT ile öder. Admin panelinde manuel abonelik takibi: koç, dönem, tutar, ödendi/bekliyor/gecikti, dekont notu.                                                                                 |
| K11 | Ödeme (ileride)        | Lemon Squeezy entegrasyonu kodda hazır ama `BILLING_PROVIDER=manual` iken **pasif**. Şirket kurulunca env ile açılır. Manuel ve otomatik ödeme aynı `subscriptions` / `subscription_payments` tablolarını kullanır. |
| K12 | Koç hesabı aktivasyonu | Koç kayıt olur → tenant `pending` → admin ödemeyi görüp `active` yapar. Ödeme gecikirse admin `suspended` yapar (veri silinmez, panel salt okunur/kapalı).                                                          |
| K14 | CSP                    | Tanıtım sitesi statik (Cache Components/PPR) → nonce'suz CSP (`script-src 'self' 'unsafe-inline'`). Oturumlu `app.` hostunda nonce'lu sıkı CSP Faz 2'de uygulanıp test edilecek.                                    |
| K13 | KVKK                   | Yasal sayfaların taslağı hazırlanır; kullanıcı hukukçuyla netleştirip son metni verir. Hukukçu onayı olmadan canlıya çıkılmaz.                                                                                      |

### Açık sorular (ilgili fazdan önce cevaplanmalı)

- [x] ~~Fiyatlandırma~~ → K9
- [x] ~~Ödeme sağlayıcı~~ → K10/K11
- [ ] **KVKK** (yayından önce): taslak metinler hukukçu onayından geçecek (aydınlatma, açık rıza/veli onayı, VERBİS, yurt dışına aktarım).
- [ ] **Öğrenci görüşme notlarını görebilir mi?** (Faz 6) Varsayılan: hayır.

---

## Yayından önce değiştirilecekler (geçici değerler)

- [ ] **Logo:** şimdilik yazı logosu (`src/components/brand/logo.tsx`). Gerçek logo gelince değişecek; favicon ve OG görseli de güncellenecek.
- [ ] **E-posta:** geçici `iletisim@sinavkocstudio.app` (`src/config/site.ts`)
- [ ] **Instagram:** geçici `@sinavkocstudio` (`src/config/site.ts`)
- [ ] **WhatsApp:** şimdilik yok; eklenecekse `siteConfig.contact`'a eklenecek
- [ ] **Yasal metinler:** KVKK, gizlilik, çerez, kullanım koşulları taslak; hukukçu onayı gerekli (K13). Veri sorumlusu ünvanı/adresi şirket kurulunca yazılacak.

## Faz 0 — Temel Kurulum ✅

- [x] `git init`, `.gitignore`, `.env.example`
- [x] Next.js 16.4 + React 19.3 + TypeScript strict + Tailwind v4 + ESLint + Prettier
- [x] `src/` klasör yapısı, `cn()` yardımcısı, yol takma adları (`@/`)
- [x] Güvenlik header'ları + CSP (`src/lib/security/headers.ts`) — nonce'lu sıkı CSP `app.` hostu için Faz 2'ye (bkz. K14)
- [x] Vitest + Playwright (masaüstü + mobil) kurulumu, `npm run` script'leri
- [x] Tasarım token'ları (oklch renkler, radius, açık/koyu tema), Geist font (latin-ext → Türkçe)
- **Sonuç:** ana sayfa statik üretiliyor; lint, typecheck, 7 birim + 8 E2E testi geçiyor; üretim paketlerinde 0 açık.

## Faz 1 — Tanıtım Sitesi (sinavkocstudio.app) ✅

- [x] UI temel bileşenleri: Button (yükleniyor animasyonlu), LinkButton, Input, Textarea, Select, Field (animasyonlu hata), Card, Badge, Accordion, AnimatedTabs (klavye destekli)
- [ ] Dialog, Toast → panel kabuğuyla birlikte Faz 3'e taşındı (sitede ihtiyaç yok)
- [x] Motion primitive'leri: FadeIn, Stagger; `prefers-reduced-motion`; JS kapalıyken `<noscript>` ile içerik görünür
- [x] Haikei tarzı arka planlar (radial-gradient mesh + dalga SVG; blur filtresi yok)
- [x] Header (mobil menü, Esc ile kapanır), Footer, tema değiştirici, "İçeriğe geç" bağlantısı
- [x] Ana sayfa: Hero · problem/çözüm · 8 modül · panel önizlemeleri (koç/öğrenci/veli sekmeleri) · nasıl çalışır · kendi adresiniz · tek plan (**fiyatsız**) · güvenlik · SSS · CTA
- [x] Sayfalar: `/ozellikler`, `/basvuru`, `/hakkimizda`, `/iletisim`, `/yasal/{kvkk,gizlilik,cerez,kullanim-kosullari}` (taslak metinler), 404 ve hata sayfası
- [x] SEO: sayfa başına metadata + canonical, OG görseli, `sitemap.xml`, `robots.txt`, JSON-LD (SoftwareApplication + FAQPage)
- [x] Başvuru formu: Server Action'a doğrudan bağlı (JS'siz çalışır), istemci + sunucu zod doğrulaması, bot tuzağı. **Veri saklamaz**; "çok yakında" mesajı verir → kayıt Faz 2'de
- [x] Lighthouse (mobil): erişilebilirlik / best practices / SEO 100; performans 94–97 (simülasyonda ana sayfa 94 — /basvuru prefetch'inin JS'i sayılıyor; devtools throttling ile 97). Masaüstü 100.
- **Sonuç:** 14 statik rota; 15 birim + 39 E2E testi geçiyor; "sitede fiyat yok" kuralı her sayfada testle korunuyor.

## Faz 2 — Supabase Çekirdeği, Auth ve Çok Kiracılık _(Docker gerekli)_

- [ ] Supabase CLI + lokal ortam, `server/client/admin` istemcileri
- [ ] Migration: `tenants`, `tenant_members`, `profiles`, `platform_admins`, `students`, `student_guardians`, `invitations`, `audit_logs`, `contact_requests`
- [ ] `private` şeması yetki fonksiyonları, RLS politikaları, `tenant_id` değişmezlik trigger'ı
- [ ] pgTAP: "RLS'siz tablo yok" testi + her tablo için çapraz tenant testleri
- [ ] Koç kaydı → onboarding (koç/kurum adı, slug seçimi, rezerve slug kontrolü)
- [ ] Giriş, çıkış, şifre sıfırlama, e-posta doğrulama, MFA (TOTP)
- [ ] Davet sistemi (öğrenci & veli), davet kabul akışı
- [ ] `src/proxy.ts`: host çözümleme (marketing / app / tenant), rol bazlı panel yönlendirmesi
- [ ] `safe-action` sarmalayıcısı, Upstash rate limit, Turnstile
- [ ] Faz 1 başvuru formunun backend bağlantısı: `contact_requests` tablosu + Turnstile + rate limit + admin bildirimi (`basvuru/actions.ts` içindeki TODO)
- **Bitti sayılır:** iki farklı koç birbirinin hiçbir verisini göremiyor (pgTAP + E2E ile kanıtlı).

## Faz 3 — Koç Paneli Çekirdeği + Lead/CRM

- [ ] Panel kabuğu: sidebar, üst bar, komut paleti, boş durumlar, iskelet yükleyiciler
- [ ] Öğrenci listesi / detay / ekle / arşivle, veli bağlama
- [ ] Lead hunisi: kanban (yeni → görüşüldü → deneme dersi → kazanıldı/kaybedildi), lead → öğrenci dönüşümü
- [ ] Koç tanıtım sayfası ayarları (biyografi, fotoğraf, hizmetler) + başvuru formu → lead
- [ ] Görüşme notları (`private | guardian` görünürlük)

## Faz 4 — Deneme Sınavı ve Net Takibi (çekirdek modül)

- [ ] `exam_types`, `exam_sections` (TYT/AYT/LGS/YDT) seed verisi, yıllara göre sürümlü
- [ ] Doğru/yanlış/boş girişi → net DB'de hesaplanır; puan alanları
- [ ] Zaman eksenli net grafikleri (ders bazlı + toplam), hedef çizgisi, kıyaslama paneli
- [ ] Excel/CSV toplu içe aktarma: şablon indir, önizleme, satır bazlı doğrulama hataları
- [ ] Öğrencinin kendi deneme girişi (koç onayı opsiyonel)

## Faz 5 — Ödev, Konu Takibi ve Öğrenci Paneli

- [ ] Müfredat/konu seed verisi, tenant bazlı özelleştirme
- [ ] Konu durumu çizelgesi (eksik / çalışılıyor / tamamlandı)
- [ ] Günlük/haftalık soru hedefi ve çalışma programı atama
- [ ] Çalışma loglama (süre, kaynak, çözülen soru)
- [ ] Öğrenci paneli: bugünün görevleri, haftalık hedef, net grafiği, konu haritası
- [ ] PWA (manifest, kurulum, offline kabuk) + oyunlaştırma (seri, rozet, pomodoro sayacı)

## Faz 6 — Veli Portalı ve Raporlama

- [ ] Veli paneli (salt okunur): net gelişimi, ödev durumu, paylaşılan notlar, birden fazla çocuk
- [ ] Haftalık rapor e-postası (`pg_cron`/Vercel Cron + Resend), rapor tercihleri
- [ ] AI rapor yorumu (Claude API): anonimleştirilmiş veri, koç onayı sonrası gönderim seçeneği, kullanım limiti

## Faz 7 — Koçun Finansal Takibi

- [ ] Paket tanımları (aylık, 8'li seans, dönemlik), öğrenciye atama
- [ ] Seans sayacı, tahsilat kayıtları (ödendi/bekliyor/gecikti), gelir özeti

## Faz 8 — Materyal Kütüphanesi

- [ ] Private bucket + storage politikaları, öğrenci/grup bazlı paylaşım
- [ ] Yükleme doğrulaması (boyut, MIME), signed URL ile görüntüleme, video linkleri

## Faz 9 — Randevu ve Takvim

- [ ] Haftalık müsaitlik, istisna günler, saat dilimi (Europe/Istanbul)
- [ ] Öğrenci/veli rezervasyonu, çakışma kontrolü (DB exclusion constraint), seans paketinden düşme
- [ ] Google Calendar senkronizasyonu (OAuth, token'lar şifreli), Outlook sonra

## Faz 10 — Bildirim ve Duyuru Merkezi

- [ ] Panel içi bildirimler (Supabase Realtime, private channel + RLS)
- [ ] Toplu duyuru (öğrenciler/veliler/grup), e-posta kopyası, okundu bilgisi
- [ ] Ödev hatırlatmaları (zamanlanmış), PWA push bildirimleri

## Faz 11 — Platform Abonelikleri (Billing)

- [ ] `subscriptions`, `subscription_payments` tabloları (tek plan; `provider: manual | lemonsqueezy`)
- [ ] **Admin → Koçlar & Ödemeler sayfası:** koç listesi, abonelik durumu, dönem başı/sonu, ödendi/bekliyor/gecikti, manuel ödeme kaydı (tutar, tarih, açıklama), filtreler, gecikenler uyarısı, audit log
- [ ] Koç panelinde "Aboneliğim": durum, sonraki ödeme tarihi, IBAN bilgisi (admin ayarından)
- [ ] Lemon Squeezy adapter'ı + webhook (imza doğrulama, idempotency) — `BILLING_PROVIDER=manual` iken devre dışı
- [ ] Durum değişimine göre tenant `active / suspended` geçişi

> Not: Admin paneli iskeleti ve "Koçlar & Ödemeler" sayfası Faz 2/3 ile birlikte erken gelebilir; koç kaydı başladığı anda takip ihtiyacı doğar.

## Faz 12 — Özel Domain ve Tenant Sayfaları

- [ ] Wildcard subdomain (`*.sinavkocstudio.app`) canlıda
- [ ] Vercel Domains API: domain ekle, doğrulama kayıtlarını göster, durum sorgula, kaldır
- [ ] Domain sahipliği doğrulanmadan aktif etme yok; tenant silinince domain kaldırma

## Faz 13 — Admin Paneli, Sertleştirme ve Yayın

- [ ] Admin: tenant listesi, plan yönetimi, destek amaçlı salt okunur görünüm (audit'li), duyurular
- [ ] KVKK: veri dışa aktarma, hesap silme, rıza kayıtları
- [ ] Bağımsız güvenlik incelemesi, bağımlılık taraması, yük testi, yedekleme/geri yükleme provası
- [ ] Hata izleme (Sentry, PII filtreli), uptime izleme, prod Supabase + Vercel kurulumu
