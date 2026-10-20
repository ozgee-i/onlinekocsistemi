# SınavKocStudio — Claude Çalışma Kılavuzu

Eğitim koçları ve özel ders öğretmenleri için çok kiracılı (multi-tenant) koçluk + CRM SaaS platformu.
Faz planı ve ilerleme: `docs/PLAN.md`.

**Next.js 16.4 kullanılıyor; eğitim verindeki Next.js'ten farklı.** Bir Next.js API'sini kullanmadan önce `node_modules/next/dist/docs/` altındaki ilgili dokümanı oku (bkz. `AGENTS.md`). `cacheComponents` ve `partialPrefetching` açık.
Mimari kararlar: `docs/PLAN.md` → "Kararlar" bölümü.

## Çalışma Kuralları (Claude için)

- **Faz faz ilerle.** Her faz: plan → kod → test → güvenlik kontrol listesi → kullanıcı onayı → sonraki faz. Onay almadan bir sonraki faza geçme.
- Fazı bitirirken `docs/PLAN.md` içindeki ilgili maddeleri işaretle.
- Kullanıcıyla **Türkçe** konuş. Arayüz metinleri ve URL yolları Türkçe; kod, değişken, tablo/sütun adları İngilizce.
- Commit'i yalnızca kullanıcı isterse at. Conventional Commits (`feat:`, `fix:`, `chore:` …).
- Bir paketi eklemeden önce gerçekten gerekli mi düşün; eklediğinde sürümü lockfile ile sabitle.
- Belirsizlik varsa varsayım yapma, sor. Güvenliği zayıflatan bir kısayolu asla "şimdilik" diye ekleme.

## Ürün Kuralları

- **Tek plan, tek fiyat.** Tanıtım sitesinde, koç sayfalarında, meta etiketlerinde **hiçbir yerde fiyat yazılmaz.** Kademeli plan (Free/Pro/Enterprise) yok.
- Ödeme şimdilik IBAN ile, admin panelinden manuel takip. Lemon Squeezy kodu hazır ama `BILLING_PROVIDER=manual` iken pasif.
- Koç hesabı admin onayıyla aktifleşir (`pending → active → suspended`).

## Teknoloji Yığını

| Katman             | Seçim                                                                      |
| ------------------ | -------------------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router, Turbopack), React 19, TypeScript `strict`          |
| Stil               | Tailwind CSS v4 (CSS-first `@theme`), `clsx` + `tailwind-merge` (`cn()`)   |
| Animasyon          | Motion (`motion/react`) — eski adıyla Framer Motion                        |
| İkon               | `lucide-react`                                                             |
| Form & doğrulama   | `react-hook-form` + `zod` (aynı şema hem istemcide hem sunucuda)           |
| Grafik             | Recharts                                                                   |
| Backend            | Supabase: Postgres + RLS, Auth, Storage, Realtime, `pg_cron`               |
| Supabase istemcisi | `@supabase/ssr` + `@supabase/supabase-js`                                  |
| E-posta            | Resend + React Email                                                       |
| AI                 | Claude API (rapor yorumu) — sunucu tarafı, kişisel veri anonimleştirilerek |
| Rate limit         | Upstash Redis (`@upstash/ratelimit`)                                       |
| Bot koruması       | Cloudflare Turnstile (herkese açık formlar + Supabase Auth captcha)        |
| Test               | Vitest (birim), Playwright (E2E), pgTAP (`supabase test db`, RLS testleri) |
| Barındırma         | Vercel (uygulama + domainler + SSL), Supabase Cloud (eu-central-1)         |

## Komutlar

```bash
npm run dev            # geliştirme sunucusu
npm run build          # üretim derlemesi
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
npm run test           # Vitest
npm run test:e2e       # Playwright
supabase start         # lokal Supabase (Docker gerekli)
supabase db reset      # migration + seed sıfırdan uygula
supabase test db       # pgTAP RLS/şema testleri
supabase gen types typescript --local > src/lib/supabase/database.types.ts
```

Bir işi "bitti" saymadan önce: `lint`, `typecheck`, `test` geçmeli; DB değiştiyse `supabase test db` de geçmeli.

## Host ve Rota Mimarisi

| Host                                        | İçerik                                             | Rota grubu                                                 |
| ------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| `sinavkocstudio.app`, `www.`                | Tanıtım sitesi                                     | `src/app/(marketing)`                                      |
| `app.sinavkocstudio.app`                    | Giriş + tüm paneller (koç/öğrenci/veli/admin)      | `src/app/(auth)`, `src/app/(app)/{koc,ogrenci,veli,admin}` |
| `{slug}.sinavkocstudio.app`, özel domainler | Koçun herkese açık tanıtım sayfası + başvuru formu | `src/app/sites/[slug]` (proxy rewrite)                     |

- Next.js 16'da `middleware.ts` → **`src/proxy.ts`** oldu. Host çözümleme orada yapılır.
- `_` ile başlayan klasörler Next.js'te **private folder**'dır, rota olmaz. Bu yüzden şartnamedeki `/_tenants/...` yerine `/sites/[slug]` kullanılır.
- Paneller tek bir hostta (`app.`) toplanır: auth cookie'leri, redirect URL allowlist'i ve CSRF tek yerde kalır. Koç sayfasındaki "Giriş" butonu `app.sinavkocstudio.app/giris?k=<slug>` adresine gider ve giriş ekranı o koçun markasıyla gösterilir.
- Rezerve slug'lar (tenant alamaz): `www, app, admin, api, auth, mail, cname, static, assets, cdn, status, docs, blog, destek, yardim` vb. Liste: `src/lib/tenant/reserved-slugs.ts`.
- Host → tenant eşlemesi önbelleklenir (her istekte DB'ye gidilmez). Proxy, istemciden gelen `x-tenant-*` header'larını **siler**, sonra kendisi set eder.

## Çok Kiracılık (Multi-Tenancy) Modeli

- `tenants` — bir koç ya da kurum. `tenant_members(tenant_id, user_id, role)`; roller: `owner | coach | assistant`. Altyapı ilk günden kurum (çok koçlu) yapısını destekler; arayüz önce tek koç içindir.
- `students` (tenant'a bağlı, `user_id` davet kabul edilince dolar), `student_guardians(student_id, guardian_user_id)` veli ilişkisi. Bir velinin birden fazla çocuğu olabilir.
- `platform_admins` — platform yöneticileri ayrı tabloda; tenant rolleriyle karışmaz.
- Domain tabloları (`leads, exams, exam_results, tasks, topic_progress, study_logs, packages, payments, resources, appointments, announcements, notifications` …) **her biri** `tenant_id uuid not null` taşır.

## GÜVENLİK KURALLARI (pazarlık konusu değil)

### Veritabanı / RLS

1. `public` şemasındaki **her tabloda RLS açık**. Bunu doğrulayan bir pgTAP testi var; RLS'siz tablo testi kırar.
2. `tenant_id` **asla istemciden alınmaz.** Sunucuda kullanıcının üyeliğinden türetilir; RLS de üyeliği kontrol eder.
3. Tenant'lar arası referansı DB seviyesinde engelle: bileşik FK kullan, ör. `foreign key (tenant_id, student_id) references students(tenant_id, id)`. Her ana tabloda `unique (tenant_id, id)`.
4. `tenant_id` güncellenemez (trigger ile engellenir).
5. Yetki yardımcı fonksiyonları `private` şemasında, `security definer`, `stable`, `set search_path = ''`: `private.is_tenant_staff(tid)`, `private.is_student_self(sid)`, `private.is_guardian_of(sid)`, `private.is_platform_admin()`. `private` şeması API'ye açılmaz.
6. Politikalarda `auth.uid()` yerine `(select auth.uid())` yaz (performans). Her `tenant_id` ve FK sütununa indeks.
7. View'lar `with (security_invoker = true)`.
8. Koç görüşme notlarında `visibility` alanı var (`private | guardian`). Veli yalnızca `guardian` olanları görür; öğrenci hiçbirini görmez (ayrı karar verilmedikçe).
9. Her migration ile birlikte, ilgili tablo için RLS testleri yazılır: kendi tenant'ı ✅, başka tenant ❌, öğrenci kendi verisi ✅ / başka öğrenci ❌, veli kendi çocuğu ✅ / başka çocuk ❌, anonim ❌.

### Supabase anahtarları

10. Tarayıcıda yalnızca **publishable** anahtar. **Secret** (eski adıyla service_role) anahtar yalnızca `src/lib/supabase/admin.ts` içinde, dosyanın başında `import "server-only"`. Kullanıcı bağlamıyla yapılabilecek hiçbir iş için admin istemcisi kullanılmaz.
11. Sunucuda kimlik doğrulama `supabase.auth.getClaims()` / `getUser()` ile; **`getSession()` sunucuda güvenilir değildir, yetki kararı için kullanılmaz.**

### Server Actions / Route Handlers

12. Her Server Action herkese açık bir HTTP endpoint'idir. Her birinde sırayla: (a) zod ile girdi doğrula, (b) oturumu doğrula, (c) yetkiyi kontrol et (RLS + gerekiyorsa rol kontrolü), (d) hata mesajında iç detay sızdırma.
13. Ortak sarmalayıcı kullan: `src/lib/actions/safe-action.ts` (doğrulama + auth + rate limit + hata normalize).
14. `redirect`/`next` parametreleri yalnızca aynı origin'deki göreli yollara izin verir (open redirect yok).

### Kimlik ve davetler

15. Öğrenci/veli yalnızca **davetle** katılır. Davet token'ı: 32 bayt rastgele, DB'de **SHA-256 hash'i** saklanır, 72 saat geçerli, tek kullanımlık, kabulde e-posta eşleşmesi kontrol edilir.
16. Koç ve admin için MFA (TOTP). Admin rotaları `aal2` olmadan açılmaz.
17. Giriş, kayıt, şifre sıfırlama, davet, başvuru formu ve AI endpoint'lerinde rate limit + Turnstile.

### Dosyalar (Storage)

18. Bucket'lar **private**. Yol şeması: `{tenant_id}/{...}`; storage politikaları ilk klasörü tenant üyeliğiyle eşleştirir. Erişim kısa ömürlü signed URL ile.
19. Yüklemede boyut sınırı ve izinli MIME listesi (PDF, PNG, JPG, WEBP). **SVG ve HTML yüklenemez** (XSS).

### Web güvenliği

20. CSP (`src/lib/security/headers.ts`; tanıtım sitesi nonce'suz, `app.` hostu Faz 2'den itibaren nonce'lu — PLAN K14), HSTS, `frame-ancestors 'none'`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-Content-Type-Options: nosniff`. `src/proxy.ts` + `next.config.ts`.
21. Zod daima `@/lib/validation/zod` üzerinden içe aktarılır (`jitless` — CSP `eval`e izin vermez). Kullanıcı içeriği için `dangerouslySetInnerHTML` yasak. Zengin metin gerekirse sunucuda sanitize edilir.
22. Webhook'larda (ödeme, Vercel) imza doğrulaması + idempotency tablosu.
23. Cron endpoint'leri `CRON_SECRET` ile korunur.

### Veri ve KVKK

24. Kullanıcıların çoğu reşit değil. Loglara kişisel veri (ad, e-posta, telefon, not içeriği) yazılmaz.
25. AI'ya giden veride ad/soyad/iletişim bilgisi bulunmaz; öğrenci takma kimlikle temsil edilir.
26. Hassas işlemler (rol değişikliği, silme, dışa aktarma, domain ekleme, admin işlemleri) `audit_logs` tablosuna yazılır.
27. Hesap silme ve veri dışa aktarma (KVKK md. 11) desteklenir. Silinen tenant'ın özel domaini Vercel'den de kaldırılır (subdomain takeover önlemi).

### Gizli bilgiler ve bağımlılıklar

28. `.env*` dosyaları commit edilmez; `.env.example` güncel tutulur. `NEXT_PUBLIC_` önekine yalnızca gerçekten herkese açık değerler girer.
29. Yeni bağımlılık sonrası `npm audit`. Sürümler lockfile ile sabit.

## Klasör Yapısı (hedef)

```
src/
  app/
    (marketing)/         # tanıtım sitesi
    (auth)/              # giris, kayit, davet/[token], sifre-sifirla
    (app)/koc|ogrenci|veli|admin/
    sites/[slug]/        # tenant herkese açık sayfası
    api/                 # webhooks, cron
  components/
    ui/                  # temel bileşenler (Button, Input, Card, Dialog, Tabs…)
    motion/              # animasyon primitive'leri
    marketing/  panels/  charts/
  lib/
    supabase/            # server.ts, client.ts, admin.ts, database.types.ts
    tenant/  actions/  validation/  security/  utils.ts
  proxy.ts
supabase/
  migrations/  tests/  seed.sql
docs/PLAN.md
```

## Tasarım Sistemi

- Estetik: Manus.im / Watermelon UI tarzı — ince belirgin kenarlıklar (`border-neutral-200 dark:border-neutral-800`), minimalist kartlar, bol mikro boşluk, yüksek okunabilirlik.
- Renkler `@theme` içinde token olarak (`--color-primary` …); açık/koyu tema zorunlu.
- Form odak durumu: `focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200`.
- Animasyon: sekme/modal/adımlı formda `layout` animasyonları, hata ve yükleniyor durumlarında `AnimatePresence`. `prefers-reduced-motion`'a saygı göster.
- Arka plan: Haikei tarzı düşük opaklıklı SVG mesh/blob dokular; inline SVG, büyük raster görsel yok.
- Erişilebilirlik: klavye ile gezinme, görünür odak, yeterli kontrast, form alanlarında `label` + hata için `aria-describedby`.
- Font Türkçe karakterleri (ş, ğ, ı, İ) tam desteklemeli; `next/font` ile self-host.

## Alan Bilgisi (sınav koçluğu)

- Net hesabı: **YKS (TYT/AYT/YDT): net = doğru − yanlış/4**, **LGS: net = doğru − yanlış/3**. Net sunucuda/DB'de hesaplanır, istemciden gelen net'e güvenilmez.
- Sınav ve bölüm yapıları (ders, soru sayısı) koda gömülmez; `exam_types` / `exam_sections` tablolarında veri olarak tutulur ve yıllara göre sürümlenir.
- Konu listeleri (müfredat) seed verisi olarak gelir, yıl/sürüm bilgisi taşır; koç kendi tenant'ında özelleştirebilir.
- Puanlar yayınevi/ÖSYM raporundan girilir; resmi puan formülü taklit edilmez (tahmini puan ayrıca etiketlenir).
