import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { GALLERY, GALLERY_CATEGORIES } from "@/content/gallery";
import { UI } from "@/content/ui";

/**
 * Galeri: filtreler ve lightbox.
 *
 * Lightbox harici kütüphane olmadan yazıldığı için klavye davranışı
 * (ESC, ok tuşları) elle kuruldu — kırılırsa fark edilmesi zor, bu yüzden
 * ayrıca test ediliyor.
 */

const GALLERY_PATH = hrefFor("gallery", "tr");

test("bütün plakalar listelenir", async ({ page }) => {
  await page.goto(GALLERY_PATH);
  await expect(page.locator("main figure")).toHaveCount(GALLERY.length);
});

test("kategori filtresi listeyi daraltır", async ({ page }) => {
  await page.goto(GALLERY_PATH);

  for (const option of GALLERY_CATEGORIES) {
    if (option.id === "tumu") continue;

    const expected = GALLERY.filter(
      (item) => item.category === option.id,
    ).length;

    await page.getByRole("button", { name: option.label.tr }).click();
    await expect(page.locator("main figure")).toHaveCount(expected);
  }

  // "Tümü" geri döndürür.
  await page.getByRole("button", { name: GALLERY_CATEGORIES[0].label.tr }).click();
  await expect(page.locator("main figure")).toHaveCount(GALLERY.length);
});

test.describe("lightbox", () => {
  test("açılır, gezinir ve ESC ile kapanır", async ({ page }) => {
    await page.goto(GALLERY_PATH);

    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveCount(0);

    // İlk plakayı aç.
    await page.locator("main figure button").first().click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute(
      "aria-label",
      GALLERY[0].title.tr,
    );

    // Sağ ok bir sonraki fotoğrafa geçmeli.
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toHaveAttribute("aria-label", GALLERY[1].title.tr);

    // Sol ok geri almalı.
    await page.keyboard.press("ArrowLeft");
    await expect(dialog).toHaveAttribute("aria-label", GALLERY[0].title.tr);

    // Baştan sola gitmek sona sarmalı.
    await page.keyboard.press("ArrowLeft");
    await expect(dialog).toHaveAttribute(
      "aria-label",
      GALLERY[GALLERY.length - 1].title.tr,
    );

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("kapatma düğmesiyle de kapanır", async ({ page }) => {
    await page.goto(GALLERY_PATH);

    await page.locator("main figure button").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: UI.close.tr }).click();
    await expect(dialog).toHaveCount(0);
  });

  test("açıkken kendi WhatsApp bağlantısını taşır", async ({ page }) => {
    await page.goto(GALLERY_PATH);

    await page.locator("main figure button").first().click();
    const dialog = page.getByRole("dialog");

    const href = await dialog
      .locator('a[href*="wa.me"]')
      .first()
      .getAttribute("href");

    expect(href).toContain(encodeURIComponent(GALLERY[0].title.tr));
  });
});
