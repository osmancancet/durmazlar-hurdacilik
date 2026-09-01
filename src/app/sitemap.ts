import type { MetadataRoute } from "next";
import { ROUTES, hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { AREAS, areaHref, areaIndexHref } from "@/content/areas";
import { BLOG_POSTS, blogIndexHref, blogPostHref } from "@/content/blog";
import { HTML_LANG, LOCALES } from "@/lib/i18n";

// Statik export, metadata rotalarının derleme anında üretilmesini ister.
export const dynamic = "force-static";

/*
 * İçeriğin son güncellendiği tarih.
 *
 * Derleme zamanı KULLANILMAZ: her yayında değişirdi ve Google, hiçbir şey
 * değişmediği hâlde "güncellendi" diyen lastmod değerlerini dikkate almayı
 * bırakır. Burası elle tutulan bir tarih — sayfa metinlerinde gerçek bir
 * değişiklik yaptığınızda güncelleyin.
 */
const CONTENT_UPDATED = new Date("2026-09-01");

/**
 * Site haritası iki bölümden oluşur:
 *
 *  1. Dört dilli sayfalar — her biri diğer üç dildeki karşılığıyla eşleşmiş.
 *  2. Türkçe rehber (/tr/blog/) ve bölge sayfaları (/tr/hurdaci/) —
 *     TEK DİLLİ, bu yüzden `alternates` YOK. Olmayan bir çeviriyi bildirmek
 *     Google'ı 404'e gönderirdi.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${SITE.url}${hrefFor(route.key, locale)}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: route.key === "home" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.map((candidate) => [
              HTML_LANG[candidate],
              `${SITE.url}${hrefFor(route.key, candidate)}`,
            ]),
          ),
          /* Hiçbir dile uymayan ziyaretçi Türkçe sürüme düşer. */
          "x-default": `${SITE.url}${hrefFor(route.key, "tr")}`,
        },
      },
    })),
  );

  /*
   * Rehber. `lastModified` yazının kendi güncelleme tarihinden gelir —
   * sayfaların elle tutulan ortak tarihinden değil, çünkü bir yazı
   * güncellendiğinde diğerleri güncellenmiş olmaz.
   *
   * Öncelik 0.7: rehber, hizmet ve malzeme sayfalarından sonra gelir.
   * Yazıların işi ziyaretçiyi o sayfalara taşımak.
   */
  const blog: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}${blogIndexHref()}`,
      lastModified: new Date(
        BLOG_POSTS.reduce(
          (latest, post) => (post.updated > latest ? post.updated : latest),
          BLOG_POSTS[0].updated,
        ),
      ),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE.url}${blogPostHref(post.slug)}`,
      lastModified: new Date(post.updated),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  /*
   * Bölge sayfaları. Öncelik dizini için 0.8, tek tek bölgeler için 0.7:
   * bunlar rehber yazılarından daha ticari sayfalar — arama sonucunda
   * görünmeleri doğrudan iş getiriyor.
   */
  const areas: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}${areaIndexHref()}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...AREAS.map((area) => ({
      url: `${SITE.url}${areaHref(area.slug)}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...pages, ...areas, ...blog];
}
