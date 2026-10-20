import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/ozellikler",
  "/basvuru",
  "/hakkimizda",
  "/iletisim",
  "/yasal/kvkk",
  "/yasal/gizlilik",
  "/yasal/cerez",
  "/yasal/kullanim-kosullari",
];

test("ana sayfa Türkçe olarak açılır", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("tek panelde");
});

test("üretim güvenlik başlıkları gönderilir", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["strict-transport-security"]).toContain("max-age=");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("tema sistem tercihini izler, seçim sayfa yenilenince korunur", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: "Açık temaya geç" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
});

for (const path of pages) {
  test(`${path} hatasız açılır ve fiyat içermez`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);

    // Ürün kuralı: sitede hiçbir yerde fiyat yazmaz.
    const text = await page.locator("body").innerText();
    // `\b` Türkçe harfleri tanımadığı için Unicode harf sınırı kullanılır ("yanıtlıyoruz" ≠ "TL").
    expect(text).not.toMatch(
      /₺|\$|€|(?<!\p{L})TL(?!\p{L})|\d\s?(lira|tl)(?!\p{L})|\/\s?ay(?!\p{L})/iu,
    );
  });
}

test("olmayan sayfa 404 döner", async ({ page }) => {
  const response = await page.goto("/boyle-bir-sayfa-yok");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Aradığınız sayfa bulunamadı" })).toBeVisible();
});

test("sitemap ve robots erişilebilir", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/basvuru");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
});
