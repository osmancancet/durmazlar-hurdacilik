import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { VIDEOS } from "@/content/videos";
import { UI } from "@/content/ui";

/**
 * Anasayfa hero'sundaki havadan saha slider'ı.
 *
 * Üç şey kırılırsa fark edilmesi zor, üçü de burada tutuluyor:
 *
 *  1. VERİ — aynı anda tek klip inmeli. Üçü birden inerse mobil ziyaretçi
 *     ilk ekranda ~10 MB indirir; bu sitenin en pahalı hatası olurdu.
 *  2. OTOMATİK GEÇİŞ — klip bitince sıradakine geçmeli.
 *  3. AZALTILMIŞ HAREKET — tercihi açık olanda video kendiliğinden oynamamalı.
 *     Bu, ilk render'da tercih bilinmediği için bir kez kırılmıştı.
 */

const HOME = hrefFor("home", "tr");

test("yalnızca görünen klip indirilir", async ({ page }) => {
  const indirilen = new Set<string>();
  page.on("response", (response) => {
    const name = response.url().split("/").pop() ?? "";
    if (name.endsWith(".mp4")) indirilen.add(name);
  });

  await page.goto(HOME);
  await page.waitForTimeout(1500);

  expect([...indirilen]).toEqual([`${VIDEOS[0].file}.mp4`]);

  // İleri basılınca ikinci klip iner; üçüncü hâlâ inmemeli.
  await page.getByRole("button", { name: UI.next.tr }).click();
  await page.waitForTimeout(1500);

  expect([...indirilen].sort()).toEqual(
    [`${VIDEOS[0].file}.mp4`, `${VIDEOS[1].file}.mp4`].sort(),
  );
  expect(indirilen.has(`${VIDEOS[2].file}.mp4`)).toBe(false);
});

test("ileri ve geri düğmeleri klip değiştirir, başa sarar", async ({ page }) => {
  await page.goto(HOME);
  const video = page.locator("video");
  const gosterge = page.locator('[aria-live="polite"]').first();

  /*
   * `currentSrc` doğrudan okunmaz, poll edilir: React yeni <video>'yu
   * kurduktan sonra tarayıcının kaynağı çözmesi bir kare sürüyor. Tek
   * seferlik okuma, paralel koşan dolu bir test paketinde yarışa giriyordu.
   */
  const kaynakOlmali = async (dosya: string) =>
    expect
      .poll(() =>
        video.evaluate((node: HTMLVideoElement) =>
          node.currentSrc.split("/").pop(),
        ),
      )
      .toBe(dosya);

  await expect(gosterge).toContainText("01");
  await kaynakOlmali(`${VIDEOS[0].file}.mp4`);

  await page.getByRole("button", { name: UI.next.tr }).click();
  await expect(gosterge).toContainText("02");
  await kaynakOlmali(`${VIDEOS[1].file}.mp4`);

  // Baştan geriye gitmek sona sarmalı.
  await page.getByRole("button", { name: UI.previous.tr }).click();
  await page.getByRole("button", { name: UI.previous.tr }).click();
  await expect(gosterge).toContainText(String(VIDEOS.length).padStart(2, "0"));
  await kaynakOlmali(`${VIDEOS[VIDEOS.length - 1].file}.mp4`);
});

test("klip bitince kendiliğinden sıradakine geçer", async ({ page }) => {
  await page.goto(HOME);
  const video = page.locator("video");
  await page.waitForTimeout(1200);

  // Sonuna sar; 15 saniye beklemek yerine bitişi tetikle.
  await video.evaluate((node: HTMLVideoElement) => {
    node.currentTime = node.duration - 0.3;
  });

  await expect
    .poll(
      () =>
        video.evaluate((node: HTMLVideoElement) =>
          node.currentSrc.split("/").pop(),
        ),
      { timeout: 8000 },
    )
    .toBe(`${VIDEOS[1].file}.mp4`);
});

test("her klibin kapak karesi ve metin karşılığı var", async ({ page }) => {
  await page.goto(HOME);
  const video = page.locator("video");

  for (let i = 0; i < VIDEOS.length; i += 1) {
    await expect(video).toHaveAttribute(
      "poster",
      `/videos/${VIDEOS[i].file}.webp`,
    );
    // Ekran okuyucu için görüntünün ne olduğu yazılı olmalı.
    await expect(video).toHaveAttribute("aria-label", VIDEOS[i].alt.tr);
    if (i < VIDEOS.length - 1) {
      await page.getByRole("button", { name: UI.next.tr }).click();
    }
  }
});

test.describe("azaltılmış hareket", () => {
  test("video kendiliğinden oynamaz, oynat düğmesi çıkar", async ({ page }) => {
    // Tercih sayfa açılmadan önce kurulmalı; bileşen ilk boyamada okuyor.
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto(HOME);
    await page.waitForTimeout(1800);

    const durdu = await page
      .locator("video")
      .evaluate((node: HTMLVideoElement) => node.paused);
    expect(durdu, "hareket azaltılmışken video oynamamalı").toBe(true);

    const oynat = page.getByRole("button", { name: UI.playVideo.tr });
    await expect(oynat).toBeVisible();

    // Elle başlatılabilmeli; başlayınca düğme çekilmeli.
    await oynat.click();
    await expect
      .poll(() =>
        page.locator("video").evaluate((node: HTMLVideoElement) => node.paused),
      )
      .toBe(false);
    await expect(oynat).toHaveCount(0);
  });
});
