import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { AREAS, areaHref, areaIndexHref } from "@/content/areas";
import { LOCALES } from "@/lib/i18n";
import { AREA_PAGES, watchForProblems } from "./helpers";

/**
 * Bölge sayfaları (/tr/hurdaci/).
 *
 * Buradaki en önemli test kapı sayfası (doorway) denetimi: aynı metnin yer
 * adı değiştirilerek yirmi bir kez basılması Google'ın cezalandırdığı
 * şeydir. `içerik her bölgede özgün` testi, bunun sessizce olmasını
 * engelliyor — biri hızlıca bir bölge eklemek için başkasının metnini
 * kopyalarsa test düşer.
 */

test.describe("bölge sayfaları", () => {
  for (const { path } of AREA_PAGES) {
    test(`${path}`, async ({ page }) => {
      const problems = watchForProblems(page);
      await page.goto(path);

      await expect(page.locator("h1")).toHaveCount(1);

      const title = await page.title();
      expect(
        title.length,
        `başlık çok uzun (${title.length}): "${title}"`,
      ).toBeLessThanOrEqual(62);

      const description = await page.getAttribute(
        'meta[name="description"]',
        "content",
      );
      expect(description!.length).toBeGreaterThan(50);

      const canonical = await page.getAttribute('link[rel="canonical"]', "href");
      expect(canonical).toBe(`${SITE.url}${path}`);

      // Rehberle aynı kural: tek dilli, hreflang yok.
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);

      expect(problems, problems.join("\n")).toEqual([]);
    });
  }
});

test("bölgeler yalnızca Türkçe üretilir", async ({ request }) => {
  for (const locale of LOCALES) {
    const response = await request.get(`/${locale}/hurdaci/`);
    expect(
      response.status(),
      `/${locale}/hurdaci/ beklenmedik durum`,
    ).toBe(locale === "tr" ? 200 : 404);
  }
});

/*
 * KAPI SAYFASI DENETİMİ
 *
 * Her bölgenin `lead`, `logistics`, profil metni, kalem listesi ve soruları
 * kendine ait olmalı. Tekrar eden tek bir metin bile buraya düşer.
 */
test("içerik her bölgede özgün", async () => {
  const seen = new Map<string, string>();

  const record = (field: string, value: string, slug: string) => {
    const key = `${field}::${value.trim()}`;
    const owner = seen.get(key);
    expect(
      owner,
      `"${slug}" ile "${owner}" aynı ${field} metnini paylaşıyor — kapı sayfası riski`,
    ).toBeUndefined();
    seen.set(key, slug);
  };

  for (const area of AREAS) {
    record("lead", area.lead, area.slug);
    record("logistics", area.logistics, area.slug);
    record("description", area.description, area.slug);
    for (const paragraph of area.profile) record("profile", paragraph, area.slug);
    for (const item of area.faq) record("faq", item.question, area.slug);
    for (const item of area.faq) record("faq-answer", item.answer, area.slug);
  }
});

/*
 * Kalem listelerinde madde madde tekrar DOĞALDIR — traktör her ilçede
 * traktördür ve listeyi zorla farklılaştırmak sayfayı yalancı yapar.
 * Denetlenen şey listenin bir bütün olarak kopyalanmamış olması: iki bölge
 * üçten fazla ortak madde taşıyorsa liste düşünülerek değil, kopyalanarak
 * yazılmış demektir.
 */
test("kalem listeleri kopyalanmamış", () => {
  for (let i = 0; i < AREAS.length; i += 1) {
    for (let j = i + 1; j < AREAS.length; j += 1) {
      const shared = AREAS[i].materials.filter((item) =>
        AREAS[j].materials.includes(item),
      );
      expect(
        shared.length,
        `"${AREAS[i].slug}" ile "${AREAS[j].slug}" ${shared.length} ortak kalem taşıyor: ${shared.join(" | ")}`,
      ).toBeLessThanOrEqual(3);
    }
  }
});

/*
 * Bölge sayfası olan her ilçe, işletme verisindeki hizmet alanı listesinde de
 * bulunmalı. İkisi ayrışırsa site bir yerde "geliyoruz" derken Google'a
 * başka bir liste bildirmiş olur.
 */
test("bölge sayfaları hizmet alanı listesiyle tutarlı", () => {
  const districts = AREAS.filter((area) => area.kind === "ilce");

  for (const district of districts) {
    expect(
      SITE.serviceDistricts as readonly string[],
      `${district.name} bölge sayfası var ama SITE.serviceDistricts içinde yok`,
    ).toContain(district.name);
  }

  for (const province of AREAS.filter((area) => area.kind === "il")) {
    expect(SITE.serviceAreas as readonly string[]).toContain(province.name);
  }
});

test("bölge sayfası Service verisi ve kırıntı yolu taşır", async ({ page }) => {
  const district = AREAS.find((area) => area.slug === "kirkagac")!;
  await page.goto(areaHref(district.slug));

  const parsed = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  ).flatMap((block) => {
    const data = JSON.parse(block);
    return Array.isArray(data) ? data : [data];
  });

  const service = parsed.find((entry) => entry["@type"] === "Service");
  expect(service, "Service verisi yok").toBeTruthy();
  expect(service.areaServed.name).toBe(district.name);
  expect(service.areaServed.containedInPlace.name).toBe(district.province);
  // Sayfa başına AYRI işletme kaydı üretilmemeli; tek kayda işaret edilmeli.
  expect(service.provider["@id"]).toBe(`${SITE.url}/#business`);
  expect(
    parsed.filter((entry) =>
      JSON.stringify(entry["@type"]).includes("LocalBusiness"),
    ).length,
    "bölge sayfasında ikinci bir LocalBusiness kaydı var",
  ).toBe(1);

  // Ana sayfa › bölgeler › il › ilçe
  const crumbs = parsed.find((entry) => entry["@type"] === "BreadcrumbList");
  expect(crumbs.itemListElement.length).toBe(4);
  expect(crumbs.itemListElement[2].name).toBe(district.province);
  expect(crumbs.itemListElement[3].name).toBe(district.name);

  const faq = parsed.find((entry) => entry["@type"] === "FAQPage");
  expect(faq.mainEntity.length).toBe(district.faq.length);
});

test("dizin her bölgeye bağlanır", async ({ page }) => {
  await page.goto(areaIndexHref());

  for (const area of AREAS) {
    await expect(
      page.locator(`a[href="${areaHref(area.slug)}"]`).first(),
      `dizinde bağlantı yok: ${area.slug}`,
    ).toBeVisible();
  }
});

test("menü ve altbilgi bölgelere bağlanır, yalnızca Türkçede", async ({
  page,
}) => {
  await page.goto(hrefFor("home", "tr"));
  /*
   * `toBeVisible` değil `toHaveCount`: masaüstü menüsü mobil genişlikte
   * gizli, mobil menü ise kapalı duruyor. Aranan şey bağlantının BELGEDE
   * olması — arama motoru da onu böyle görüyor.
   */
  await expect(
    page.locator(`header a[href="${areaIndexHref()}"]`),
  ).not.toHaveCount(0);
  await expect(
    page.locator(`footer a[href="${areaHref("manisa")}"]`),
  ).toHaveCount(1);

  await page.goto(hrefFor("home", "en"));
  await expect(page.locator('a[href*="/hurdaci/"]')).toHaveCount(0);
});
