import { expect, test } from "@playwright/test";

test.describe("başvuru formu", () => {
  test("boş gönderimde alan hatalarını gösterir", async ({ page }) => {
    await page.goto("/basvuru");
    await page.getByRole("button", { name: "Başvuruyu gönder" }).click();

    await expect(page.getByText("Adınızı ve soyadınızı yazın.")).toBeVisible();
    await expect(page.getByText("Geçerli bir e-posta adresi yazın.")).toBeVisible();
    await expect(page.getByText("Bir sınav türü seçin.")).toBeVisible();
    await expect(page.getByText("aydınlatma metnini onaylamalısınız")).toBeVisible();
    await expect(page.getByLabel("Ad soyad")).toHaveAttribute("aria-invalid", "true");
  });

  test("geçerli gönderimde henüz aktif olmadığını dürüstçe söyler ve girilenleri korur", async ({
    page,
  }) => {
    await page.goto("/basvuru");
    await page.getByLabel("Ad soyad").fill("Ayşe Yılmaz");
    await page.getByLabel("E-posta").fill("ayse@example.com");
    await page.getByLabel("Hangi sınava hazırlıyorsunuz?").selectOption("YKS");
    await page.getByLabel("Yaklaşık öğrenci sayınız").selectOption("6-15");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Başvuruyu gönder" }).click();

    await expect(page.getByText("Çevrimiçi başvuru çok yakında açılıyor")).toBeVisible();
    await expect(page.getByLabel("Ad soyad")).toHaveValue("Ayşe Yılmaz");
  });
});

test("SSS akordeonu açılıp kapanır", async ({ page }) => {
  await page.goto("/#sss");
  const question = page.getByRole("button", { name: "Ücretlendirme nasıl?" });
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Tek bir plan var")).toBeVisible();
});

test("panel sekmeleri klavyeyle değişir", async ({ page }) => {
  await page.goto("/");
  const coachTab = page.getByRole("tab", { name: "Koç paneli" });
  await coachTab.scrollIntoViewIfNeeded();
  await coachTab.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Öğrenci paneli" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByText("Bugünün görevleri")).toBeVisible();
});

test("mobil menü açılır ve bağlantıyla kapanır", async ({ page, isMobile }) => {
  test.skip(!isMobile, "yalnızca mobil");
  await page.goto("/");
  await page.getByRole("button", { name: "Menüyü aç" }).click();
  const menu = page.getByRole("navigation", { name: "Mobil menü" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Hakkımızda" }).click();
  await expect(page).toHaveURL(/\/hakkimizda$/);
  await expect(menu).toBeHidden();
});

test.describe("JavaScript kapalıyken", () => {
  test.use({ javaScriptEnabled: false });

  test("içerik görünür ve başvuru formu sunucuda doğrulanır", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Sık sorulan sorular" })).toBeVisible();

    await page.goto("/basvuru");
    await page.getByRole("button", { name: "Başvuruyu gönder" }).click();
    await expect(page.getByText("Adınızı ve soyadınızı yazın.")).toBeVisible();
  });
});
