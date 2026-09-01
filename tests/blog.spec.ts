import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { BLOG_POSTS, blogIndexHref, blogPostHref } from "@/content/blog";
import { LOCALES } from "@/lib/i18n";
import { BLOG_PAGES, watchForProblems } from "./helpers";

/**
 * Türkçe rehber (/tr/blog/).
 *
 * Buradaki testlerin çoğu tek bir şeyi koruyor: rehber TEK DİLLİ. Sitenin
 * geri kalanı dört dilli olduğu için bu kural sessizce bozulabilir —
 * biri rehberi ROUTES'a taşır, biri hreflang üreticisine bağlar ve site
 * arama motoruna var olmayan üç çeviri bildirmeye başlar.
 */

test.describe("rehber sayfaları", () => {
  for (const { path } of BLOG_PAGES) {
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
      expect(description, `açıklama yok: ${path}`).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);

      const canonical = await page.getAttribute('link[rel="canonical"]', "href");
      expect(canonical).toBe(`${SITE.url}${path}`);

      expect(problems, problems.join("\n")).toEqual([]);
    });
  }
});

test("rehber tek dillidir: hreflang bildirmez", async ({ page }) => {
  for (const { path } of BLOG_PAGES) {
    await page.goto(path);
    await expect(
      page.locator('link[rel="alternate"][hreflang]'),
      `${path} hreflang taşıyor — rehber yalnızca Türkçe yayımlanıyor`,
    ).toHaveCount(0);
  }
});

test("rehber yalnızca Türkçe üretilir", async ({ request }) => {
  for (const locale of LOCALES) {
    const response = await request.get(`/${locale}/blog/`);
    if (locale === "tr") {
      expect(response.status()).toBe(200);
    } else {
      expect(
        response.status(),
        `/${locale}/blog/ üretilmiş — rehber tek dilli olmalı`,
      ).toBe(404);
    }
  }
});

test("yazılar BlogPosting, kırıntı yolu ve SSS verisi taşır", async ({
  page,
}) => {
  const post = BLOG_POSTS[0];
  await page.goto(blogPostHref(post.slug));

  const parsed = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  ).flatMap((block) => {
    const data = JSON.parse(block); // geçersiz JSON burada patlar
    return Array.isArray(data) ? data : [data];
  });

  const article = parsed.find((entry) => entry["@type"] === "BlogPosting");
  expect(article, "BlogPosting verisi yok").toBeTruthy();
  expect(article.headline).toBe(post.title);
  expect(article.datePublished).toBe(post.published);
  // Yayıncı, düzendeki işletme kaydına bağlanmalı — ayrı bir kurum sanılmasın.
  expect(article.publisher["@id"]).toBe(`${SITE.url}/#business`);

  const crumbs = parsed.find((entry) => entry["@type"] === "BreadcrumbList");
  expect(crumbs.itemListElement.length).toBe(3);
  expect(crumbs.itemListElement[2].name).toBe(post.title);

  const faq = parsed.find((entry) => entry["@type"] === "FAQPage");
  expect(faq, "FAQPage verisi yok").toBeTruthy();
  expect(faq.mainEntity.length).toBe(post.faq!.length);
});

test("rehber listesi her yazıya bağlanır", async ({ page }) => {
  await page.goto(blogIndexHref());

  for (const post of BLOG_POSTS) {
    await expect(
      page.locator(`a[href="${blogPostHref(post.slug)}"]`).first(),
      `listede bağlantı yok: ${post.slug}`,
    ).toBeVisible();
  }
});

test("altbilgi rehberi yalnızca Türkçe sayfalarda gösterir", async ({
  page,
}) => {
  await page.goto(hrefFor("home", "tr"));
  await expect(
    page.locator(`footer a[href="${blogPostHref(BLOG_POSTS[0].slug)}"]`),
  ).toHaveCount(1);

  await page.goto(hrefFor("home", "en"));
  await expect(page.locator('footer a[href*="/blog/"]')).toHaveCount(0);
});
