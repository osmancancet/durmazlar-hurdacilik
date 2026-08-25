import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { FAQ } from "@/content/faq";
import { SERVICES } from "@/content/services";
import { ALL_PAGES } from "./helpers";

/**
 * SEO ve yapılandırılmış veri.
 *
 * Bu iş için en değerli tek parça `LocalBusiness` verisi: "soma hurdacı"
 * aramasında görünürlüğü o sağlıyor. Başlık uzunluğu da denetleniyor —
 * Google ~60 karakterden sonrasını kesiyor.
 */

test.describe("sayfa üstverisi", () => {
  for (const { path, locale, key } of ALL_PAGES) {
    test(`${path}`, async ({ page }) => {
      await page.goto(path);

      const title = await page.title();
      expect(title.length, `başlık boş: ${path}`).toBeGreaterThan(10);
      expect(
        title.length,
        `başlık çok uzun (${title.length}): "${title}"`,
      ).toBeLessThanOrEqual(62);

      const description = await page.getAttribute(
        'meta[name="description"]',
        "content",
      );
      expect(description, `açıklama yok: ${path}`).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);

      const canonical = await page.getAttribute(
        'link[rel="canonical"]',
        "href",
      );
      expect(canonical).toBe(`${SITE.url}${hrefFor(key, locale)}`);

      // Sosyal paylaşım kartı
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    });
  }
});

test("işletme verisi (LocalBusiness) doğru ve eksiksiz", async ({ page }) => {
  await page.goto(hrefFor("home", "tr"));

  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  expect(blocks.length).toBeGreaterThan(0);

  const parsed = blocks.flatMap((block) => {
    const data = JSON.parse(block); // geçersiz JSON burada patlar
    return Array.isArray(data) ? data : [data];
  });

  /*
   * `@type` tek bir dize ya da dizi olabilir; işletme hem LocalBusiness hem
   * RecyclingCenter olarak bildiriliyor. Test iki biçimi de kabul eder.
   */
  const typesOf = (entry: { "@type"?: string | string[] }) =>
    Array.isArray(entry["@type"]) ? entry["@type"] : [entry["@type"]];

  const business = parsed.find((entry) =>
    typesOf(entry).includes("LocalBusiness"),
  );
  expect(business, "LocalBusiness verisi yok").toBeTruthy();

  // Sektör tipi de bildirilmeli — hurdacı aramalarında ayırt edici.
  expect(typesOf(business)).toContain("RecyclingCenter");

  expect(business.name).toBe(SITE.name);
  expect(business.telephone).toBe(SITE.contacts[0].e164);

  // İki yetkili de yapılandırılmış veride bildirilmeli.
  expect(business.contactPoint.map((point: { telephone: string }) => point.telephone)).toEqual(
    SITE.contacts.map((contact) => contact.e164),
  );
  expect(business.address.addressLocality).toBe(SITE.address.district);
  expect(business.address.addressRegion).toBe(SITE.address.city);
  expect(business.address.postalCode).toBe(SITE.address.postalCode);
  expect(business.openingHoursSpecification.length).toBeGreaterThan(0);
  expect(business.areaServed.length).toBe(SITE.serviceAreas.length);

  // Hizmet kataloğu, hizmet sayfasındaki dört başlığı taşır.
  expect(business.hasOfferCatalog.itemListElement.length).toBe(SERVICES.length);
});

test("alt sayfalar kırıntı yolu verisi taşır", async ({ page }) => {
  await page.goto(hrefFor("services", "tr"));

  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  const parsed = blocks.flatMap((block) => {
    const data = JSON.parse(block);
    return Array.isArray(data) ? data : [data];
  });

  const crumbs = parsed.find((entry) => entry["@type"] === "BreadcrumbList");
  expect(crumbs, "BreadcrumbList verisi yok").toBeTruthy();
  expect(crumbs.itemListElement.length).toBe(2);
  expect(crumbs.itemListElement[1].name).toBe("Hizmetler");
});

test("hakkımızda sayfası SSS verisi taşır", async ({ page }) => {
  await page.goto(hrefFor("about", "tr"));

  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  const parsed = blocks.flatMap((block) => {
    const data = JSON.parse(block);
    return Array.isArray(data) ? data : [data];
  });

  const faq = parsed.find((entry) => entry["@type"] === "FAQPage");
  expect(faq, "FAQPage verisi yok").toBeTruthy();
  expect(faq.mainEntity.length).toBe(FAQ.length);
});

test("site haritası tüm dillerdeki adresleri listeler", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);

  const xml = await response.text();
  const locations = xml.match(/<loc>/g) ?? [];
  // Beklenen sayı elle yazılmaz; rota × dil sayısından türetilir.
  expect(locations.length).toBe(ALL_PAGES.length);

  for (const { path } of ALL_PAGES) {
    expect(xml).toContain(`${SITE.url}${path}`);
  }
});

test("robots.txt site haritasını gösterir", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);

  const text = await response.text();
  expect(text).toContain(`${SITE.url}/sitemap.xml`);
  expect(text).toContain("Allow: /");
});
