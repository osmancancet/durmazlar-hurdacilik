import { expect, test } from "@playwright/test";
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
