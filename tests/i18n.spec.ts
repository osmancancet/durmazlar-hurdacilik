import { expect, test } from "@playwright/test";
import { ROUTES, hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { HTML_LANG, LOCALES } from "@/lib/i18n";

/**
 * Dört dillilik.
 *
 * En kolay bozulan yer dil değiştirici: çoğu sitede kullanıcıyı ana sayfaya
 * atar. Burada her sayfanın *karşılığına* gitmesi gerekiyor
 * (/tr/aldigimiz-malzemeler/ → /ru/materialy/).
 *
 * Değiştirici bir <details> açılır listesi. Bağlantılar kapalıyken de
 * belgede duruyor (JavaScript'siz çalışsın diye) — bu yüzden href her
 * durumda okunabiliyor, ama tıklamadan önce liste açılmalı.
 */

test.describe("dil değiştirici aynı sayfanın karşılığına gider", () => {
  for (const route of ROUTES) {
    for (const from of LOCALES) {
      for (const to of LOCALES) {
        if (to === from) continue;

        test(`${hrefFor(route.key, from)} → ${to}`, async ({ page }) => {
          await page.goto(hrefFor(route.key, from));

          const link = page.locator(`header a[hreflang="${to}"]`).first();
          const expected = hrefFor(route.key, to);

          // Bağlantı liste kapalıyken bile belgede olmalı.
          await expect(link).toHaveAttribute("href", expected);

          await page.locator("header details > summary").first().click();
          await link.click();
          await page.waitForURL(
            (url) => new URL(url).pathname === expected,
            { timeout: 10_000 },
          );

          expect(new URL(page.url()).pathname).toBe(expected);
        });
      }
    }
  }
});

test.describe("belge dili", () => {
  for (const locale of LOCALES) {
    test(`${locale} sayfaları doğru lang taşır`, async ({ page }) => {
      await page.goto(hrefFor("home", locale));
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        HTML_LANG[locale],
      );
    });
  }
});

test.describe("hreflang etiketleri", () => {
  for (const route of ROUTES) {
    test(`${route.key} her iki dili de bildirir`, async ({ page }) => {
      await page.goto(hrefFor(route.key, "tr"));

      for (const locale of LOCALES) {
        const alternate = page.locator(
          `link[rel="alternate"][hreflang="${HTML_LANG[locale]}"]`,
        );
        await expect(alternate).toHaveAttribute(
          "href",
          `${SITE.url}${hrefFor(route.key, locale)}`,
        );
      }
    });
  }
});
