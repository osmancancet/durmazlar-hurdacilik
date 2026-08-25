import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { ALL_PAGES, watchForProblems } from "./helpers";

/**
 * Temel sağlık: 12 sayfanın hepsi açılıyor, tek bir h1 taşıyor, konsolda
 * hata üretmiyor ve hiçbir kaynağı 404 dönmüyor.
 */
test.describe("sayfalar açılıyor", () => {
  for (const { locale, key, path } of ALL_PAGES) {
    test(`${path} (${locale}/${key})`, async ({ page }) => {
      const problems = watchForProblems(page);

      const response = await page.goto(path);
      expect(response?.status(), `${path} durum kodu`).toBe(200);

      // Her sayfada tam olarak bir h1 olmalı — belge yapısının temeli.
      await expect(page.locator("h1")).toHaveCount(1);

      // Ana içerik ve gezinme yerinde mi?
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();

      expect(problems, `${path} sorunları`).toEqual([]);
    });
  }
});

test("kök adres Türkçe sürüme yönlendirir", async ({ page }) => {
  await page.goto("/");
  await page.waitForURL(/\/tr\/$/, { timeout: 10_000 });
  expect(new URL(page.url()).pathname).toBe("/tr/");
});

/*
 * Kayan WhatsApp butonu ekranın alt köşesine sabitlenmeli.
 *
 * Bir kez şöyle kırıldı: konum sınıfları (`fixed end-6 bottom-6`) doğrudan
 * ContactMenu'ye geçiriliyordu, ama o bileşenin kökü açılır listeyi
 * hizalamak için `relative` taşıyor. İki konum sınıfı aynı elemanda
 * çakışınca `relative` kazandı; buton sabitlenmek yerine sayfa akışında
 * kaldı ve `end-6` onu ekranın soluna (x = -24px) itti.
 *
 * Sağdan sola dillerde karşı köşeye geçmesi de burada ölçülüyor.
 */
for (const [locale, kenar] of [
  ["tr", "sag"],
  ["ar", "sol"],
] as const) {
  test(`kayan WhatsApp butonu ${locale} sayfasında alt köşede sabit`, async ({
    page,
    isMobile,
  }) => {
    // Buton tasarım gereği yalnızca masaüstünde var; mobilde alt aksiyon
    // çubuğu bu işi görüyor (`hidden md:block`).
    test.skip(isMobile, "kayan buton mobilde gösterilmiyor");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(hrefFor("home", locale));

    // Buton yalnızca sayfa aşağı kaydırılınca görünür.
    await page.evaluate(() => window.scrollTo(0, 1200));

    const kap = page.locator("div.fixed.bottom-6").first();
    await expect(kap).toBeVisible();

    const olcum = await kap.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return {
        position: getComputedStyle(node).position,
        sol: Math.round(rect.x),
        sag: Math.round(window.innerWidth - rect.right),
        alt: Math.round(window.innerHeight - rect.bottom),
      };
    });

    expect(olcum.position, "buton sabitlenmeli").toBe("fixed");
    expect(olcum.alt).toBe(24);
    // Okuma yönüne göre doğru köşe.
    expect(kenar === "sag" ? olcum.sag : olcum.sol).toBe(24);
    // Karşı kenardan uzakta olmalı — soluna yapışmış olmamalı.
    expect(kenar === "sag" ? olcum.sol : olcum.sag).toBeGreaterThan(500);
  });
}
