/**
 * TASLAK yasal metinler — hukukçu onayından geçmeden yayına alınmaz (docs/PLAN.md → K13).
 * [KÖŞELİ PARANTEZ] içindeki alanlar şirket kurulunca doldurulacak.
 */

import { siteConfig } from "@/config/site";

export type LegalBlock = { heading: string; paragraphs?: string[]; list?: string[] };
export type LegalDocument = {
  title: string;
  description: string;
  updatedAt: string;
  intro: string;
  blocks: LegalBlock[];
};

const controller = "[VERİ SORUMLUSU ADI / ŞİRKET UNVANI]";
const address = "[ADRES]";
const email = siteConfig.contact.email;

export const kvkk: LegalDocument = {
  title: "KVKK Aydınlatma Metni",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
  updatedAt: "15 Ekim 2026",
  intro: `Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("KVKK") 10. maddesi uyarınca, ${controller} ("SınavKocStudio") tarafından kişisel verilerinizin hangi amaçlarla ve nasıl işlendiği hakkında sizi bilgilendirmek için hazırlanmıştır.`,
  blocks: [
    {
      heading: "1. Veri sorumlusu ve rollerin ayrımı",
      paragraphs: [
        `Tanıtım sitesi ziyaretçileri, koç başvuruları ve platformu kullanan koçların hesap bilgileri bakımından veri sorumlusu ${controller}'dır (Adres: ${address}).`,
        "Koçların platforma kaydettiği öğrenci ve veli verileri (deneme sonuçları, ödevler, görüşme notları vb.) bakımından veri sorumlusu ilgili koç veya kurumdur. SınavKocStudio bu veriler için koç adına ve onun talimatlarıyla veri işleyen sıfatıyla hareket eder.",
      ],
    },
    {
      heading: "2. İşlenen kişisel veriler",
      list: [
        "Kimlik: ad, soyad",
        "İletişim: e-posta adresi, telefon numarası",
        "Eğitim: sınav türü, deneme sonuçları, ödev ve konu takibi, çalışma kayıtları",
        "Müşteri işlem: başvuru içeriği, randevu ve seans kayıtları, paket ve ödeme durumu",
        "İşlem güvenliği: oturum bilgileri, IP adresi, işlem kayıtları (log)",
      ],
    },
    {
      heading: "3. İşleme amaçları",
      list: [
        "Koç başvurularının değerlendirilmesi ve başvuru sahipleriyle iletişim",
        "Hesapların oluşturulması, kimlik doğrulama ve hizmetin sunulması",
        "Koç, öğrenci ve veli arasında eğitim takibinin sağlanması",
        "Abonelik ve ödeme takibinin yapılması",
        "Bilgi güvenliğinin sağlanması, kötüye kullanımın önlenmesi",
        "Mevzuattan doğan yükümlülüklerin yerine getirilmesi",
      ],
    },
    {
      heading: "4. Hukuki sebepler",
      paragraphs: [
        "Kişisel verileriniz KVKK'nın 5. maddesinde yer alan; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi, bir hakkın tesisi, kullanılması veya korunması ve ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati hukuki sebeplerine dayanılarak işlenir. Bu sebeplerin bulunmadığı hâllerde açık rızanıza başvurulur.",
        "18 yaşından küçük kullanıcılara ait veriler, velinin bilgisi ve onayı dâhilinde işlenir.",
      ],
    },
    {
      heading: "5. Aktarım",
      paragraphs: [
        "Kişisel verileriniz yalnızca hizmetin sunulması için gerekli olduğu ölçüde; barındırma ve veritabanı, e-posta gönderimi ve (anonimleştirilmiş veriyle) rapor özetleme gibi hizmetleri sağlayan tedarikçilere aktarılabilir. Bu tedarikçilerin sunucuları yurt dışında bulunabilir; yurt dışına aktarımlar KVKK'nın 9. maddesine uygun olarak gerçekleştirilir.",
        "Yetkili kamu kurum ve kuruluşlarına, kanunen yetkili oldukları hâllerde aktarım yapılabilir.",
      ],
    },
    {
      heading: "6. Toplama yöntemi",
      paragraphs: [
        "Kişisel verileriniz internet sitesindeki formlar, platform içindeki ekranlar ve koçunuzun sizin adınıza yaptığı kayıtlar aracılığıyla elektronik ortamda toplanır.",
      ],
    },
    {
      heading: "7. Saklama süresi",
      paragraphs: [
        "Kişisel verileriniz işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen süreler kadar saklanır; sürenin sona ermesiyle silinir, yok edilir veya anonim hâle getirilir.",
      ],
    },
    {
      heading: "8. Haklarınız",
      paragraphs: ["KVKK'nın 11. maddesi uyarınca;"],
      list: [
        "Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme,",
        "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
        "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
        "Eksik veya yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini veya yok edilmesini isteme,",
        "Bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
        "Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme,",
        "Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
      ],
    },
    {
      heading: "9. Başvuru",
      paragraphs: [
        `Haklarınıza ilişkin taleplerinizi ${email} adresine e-posta göndererek iletebilirsiniz. Talepleriniz en geç otuz gün içinde ücretsiz olarak sonuçlandırılır. Koçunuzun veri sorumlusu olduğu veriler için talebinizi doğrudan koçunuza da iletebilirsiniz.`,
      ],
    },
  ],
};

export const privacy: LegalDocument = {
  title: "Gizlilik Politikası",
  description: "SınavKocStudio'nun kişisel verileri nasıl koruduğuna ilişkin politika.",
  updatedAt: "15 Ekim 2026",
  intro:
    "Gizliliğiniz bizim için önemlidir. Bu politika, SınavKocStudio'yu kullanırken bilgilerinizin nasıl korunduğunu açıklar. Kişisel verilerin işlenmesine ilişkin ayrıntılar için KVKK Aydınlatma Metni'ni inceleyebilirsiniz.",
  blocks: [
    {
      heading: "Veri ayrımı",
      paragraphs: [
        "Her koçun (kiracının) verisi veritabanı seviyesindeki erişim kurallarıyla diğerlerinden ayrılır. Öğrenciler yalnızca kendi verilerini, veliler yalnızca bağlı oldukları öğrencinin koç tarafından paylaşılan verilerini görebilir.",
      ],
    },
    {
      heading: "Güvenlik önlemleri",
      list: [
        "Tüm bağlantılar şifreli (HTTPS) kurulur.",
        "Parolalar geri döndürülemez şekilde saklanır; koç hesapları için iki adımlı doğrulama desteklenir.",
        "Dosyalar herkese açık olmayan depolamada tutulur ve süreli bağlantılarla açılır.",
        "Hassas işlemler kayıt altına alınır.",
        "Erişimler gereklilik ilkesine göre sınırlandırılır.",
      ],
    },
    {
      heading: "Yapay zekâ ile özetleme",
      paragraphs: [
        "Haftalık rapor özetleri oluşturulurken yapay zekâ hizmetine öğrencinin adı, iletişim bilgileri veya kimliğini doğrudan belirleyen bilgiler gönderilmez; yalnızca anonimleştirilmiş sayısal gelişim verileri kullanılır.",
      ],
    },
    {
      heading: "Satış ve reklam",
      paragraphs: [
        "Kişisel verileriniz hiçbir şekilde satılmaz, reklam amacıyla kullanılmaz veya üçüncü kişilerle pazarlama amacıyla paylaşılmaz.",
      ],
    },
    {
      heading: "Veri taşıma ve silme",
      paragraphs: [
        "Koçlar verilerini dışa aktarabilir ve hesaplarını kapatabilir. Hesabın kapatılmasının ardından veriler, mevzuatta öngörülen saklama süreleri saklı kalmak kaydıyla silinir.",
      ],
    },
    {
      heading: "İletişim",
      paragraphs: [`Gizlilikle ilgili sorularınız için: ${email}`],
    },
  ],
};

export const cookies: LegalDocument = {
  title: "Çerez Politikası",
  description: "SınavKocStudio'da kullanılan çerezler ve benzeri teknolojiler.",
  updatedAt: "15 Ekim 2026",
  intro:
    "Bu politika, sitemizde ve platformumuzda kullanılan çerezleri ve tarayıcı depolama teknolojilerini açıklar.",
  blocks: [
    {
      heading: "Kullandığımız çerezler",
      paragraphs: [
        "Şu anda yalnızca hizmetin çalışması için zorunlu olan çerezler ve tarayıcı depolaması kullanılmaktadır. Reklam veya üçüncü taraf izleme çerezi kullanılmaz.",
      ],
      list: [
        "Oturum çerezleri: platforma giriş yaptığınızda oturumunuzun güvenli şekilde sürdürülmesi için (yalnızca giriş yapan kullanıcılar).",
        "Tema tercihi: açık/koyu tema seçiminiz tarayıcınızın yerel depolamasında tutulur; sunucuya gönderilmez.",
      ],
    },
    {
      heading: "Analitik",
      paragraphs: [
        "İleride site kullanımını anlamak için analitik araçlar kullanılırsa, bu araçlar yalnızca onayınızla etkinleştirilir ve bu politika güncellenir.",
      ],
    },
    {
      heading: "Çerezleri yönetme",
      paragraphs: [
        "Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Zorunlu çerezleri engellemeniz hâlinde platforma giriş yapamayabilirsiniz.",
      ],
    },
  ],
};

export const terms: LegalDocument = {
  title: "Kullanım Koşulları",
  description: "SınavKocStudio platformunun kullanım koşulları.",
  updatedAt: "15 Ekim 2026",
  intro: `Bu koşullar, ${controller} tarafından sunulan SınavKocStudio platformunun kullanımını düzenler. Platformu kullanarak bu koşulları kabul etmiş olursunuz.`,
  blocks: [
    {
      heading: "1. Hizmet",
      paragraphs: [
        "SınavKocStudio; eğitim koçlarının ve özel ders öğretmenlerinin öğrenci, veli, deneme, ödev, randevu ve ödeme takibini yapabildiği çevrimiçi bir yazılım hizmetidir.",
      ],
    },
    {
      heading: "2. Hesaplar",
      list: [
        "Koç hesapları başvuru ve onay sonrasında açılır.",
        "Öğrenci ve veli hesapları yalnızca koçun daveti ile oluşturulur.",
        "Hesap bilgilerinizin gizliliğinden ve hesabınız üzerinden yapılan işlemlerden siz sorumlusunuz.",
        "Şüpheli bir erişim fark ederseniz derhâl bize bildirmelisiniz.",
      ],
    },
    {
      heading: "3. Koçun sorumlulukları",
      paragraphs: [
        "Koç, platforma kaydettiği öğrenci ve veli verileri bakımından veri sorumlusudur. Bu verileri hukuka uygun şekilde topladığını, gerekli aydınlatmayı yaptığını ve 18 yaşından küçük öğrenciler için veli onayını aldığını kabul eder.",
      ],
    },
    {
      heading: "4. Ücretlendirme",
      paragraphs: [
        "Koçlar için tek bir abonelik planı sunulur. Abonelik koşulları ve ödeme yöntemi hesap açılışında koçla paylaşılır. Ödemenin zamanında yapılmaması hâlinde hesap, veriler silinmeden askıya alınabilir.",
      ],
    },
    {
      heading: "5. Kabul edilemez kullanım",
      list: [
        "Platformun güvenliğini aşmaya, başka kullanıcıların verilerine erişmeye çalışmak",
        "Hukuka aykırı, zararlı veya üçüncü kişilerin haklarını ihlal eden içerik yüklemek",
        "Hizmeti aşırı yükleyecek otomatik istekler göndermek",
      ],
    },
    {
      heading: "6. Hizmetin sürekliliği",
      paragraphs: [
        "Hizmeti kesintisiz sunmak için makul özeni gösteririz; ancak bakım, güncelleme veya öngörülemeyen teknik sebeplerle geçici kesintiler yaşanabilir.",
      ],
    },
    {
      heading: "7. Fesih",
      paragraphs: [
        "Koç dilediği zaman hesabını kapatabilir. Bu koşulların ihlali hâlinde hesap askıya alınabilir veya kapatılabilir. Hesap kapatılmadan önce verilerin dışa aktarılması için makul süre tanınır.",
      ],
    },
    {
      heading: "8. Değişiklikler ve uygulanacak hukuk",
      paragraphs: [
        "Bu koşullar güncellenebilir; önemli değişiklikler kullanıcılara bildirilir. Bu koşullara Türkiye Cumhuriyeti hukuku uygulanır.",
      ],
    },
  ],
};
