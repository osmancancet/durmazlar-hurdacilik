import { expect, test } from "@playwright/test";
import { ROUTES, hrefFor } from "@/config/routes";
import { UI } from "@/content/ui";
import { ALL_PAGES } from "./helpers";

/**
 * Mobil davranış.
 *
 * Bu sektörde trafiğin ezici çoğunluğu telefondan gelir; alt aksiyon çubuğu
 * sitenin en yüksek dönüşümlü öğesi. Yatay taşma ve küçük dokunma hedefleri
 * de burada yakalanır.
 */

// Yalnızca mobil projede anlamlı.
test.skip(({ isMobile }) => !isMobile, "yalnızca mobil görünüm");

test("alt aksiyon çubuğu her sayfada durur", async ({ page }) => {
  for (const { path } of ALL_PAGES.filter((entry) => entry.locale === "tr")) {
    await page.goto(path);

    const bar = page.locator("body > div").filter({ hasText: UI.call.tr }).last();
    const whatsapp = page.locator(`a[href*="wa.me"]`).last();

    await expect(whatsapp).toBeAttached();
    await expect(bar).toBeVisible();
  }
});

test("dokunma hedefleri yeterince büyük", async ({ page }) => {
  await page.goto(hrefFor("home", "tr"));

  // Alt çubuktaki iki aksiyon ve menü düğmesi
  const menuButton = page.getByRole("button", { name: UI.menu.tr });
  const box = await menuButton.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(36);
  expect(box!.width).toBeGreaterThanOrEqual(36);

  const callLink = page.locator('a[href^="tel:"]').last();
  const callBox = await callLink.boundingBox();
  expect(callBox!.height).toBeGreaterThanOrEqual(44);
});

test("menü kapalıyken içindeki bağlantılar erişilemez", async ({ page }) => {
  await page.goto(hrefFor("home", "tr"));

  // inert sayesinde menü kapalıyken bağlantılar erişilebilirlik ağacında
  // olmamalı — görünmeyen ama sekmeyle odaklanılabilen içerik bırakmıyoruz.
  const menu = page.locator("#mobil-menu");
  await expect(menu.getByRole("link")).toHaveCount(0);
});

test("menü açılır, gezinir ve kapanır", async ({ page }) => {
  await page.goto(hrefFor("home", "tr"));

  const menu = page.locator("#mobil-menu");
  await page.getByRole("button", { name: UI.menu.tr }).click();

  const closeButton = menu.getByRole("button", { name: UI.close.tr });
  await expect(closeButton).toBeVisible();

  // Menüdeki bağlantıyla gezinme. Bağlantının erişilebilir adı sıra
  // numarasını da içerdiği için ("01 Galeri") tam eşleşme aranmıyor.
  const target = ROUTES.find((route) => route.key === "gallery")!;
  await menu.getByRole("link", { name: target.label.tr }).click();

  await page.waitForURL(
    (url) => new URL(url).pathname === hrefFor("gallery", "tr"),
  );

  // Gezindikten sonra menü kapanmış olmalı.
  await expect(closeButton).toBeHidden();
});

test("hiçbir sayfa yatay kaymıyor", async ({ page }) => {
  for (const { path } of ALL_PAGES.filter((entry) => entry.locale === "tr")) {
    await page.goto(path);
    await page.waitForTimeout(200);

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - root.clientWidth;
    });

    // 1px yuvarlama payı bırakılıyor.
    expect(overflow, `${path} yatay taşıyor`).toBeLessThanOrEqual(1);
  }
});
