import type { MetadataRoute } from "next";
import { ROUTES, hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { HTML_LANG, LOCALES } from "@/lib/i18n";

// Statik export, metadata rotalarının derleme anında üretilmesini ister.
export const dynamic = "force-static";

/** 12 adres (6 sayfa × 2 dil), her biri diğer dildeki karşılığıyla eşleşmiş. */
export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${SITE.url}${hrefFor(route.key, locale)}`,
      lastModified: new Date("2026-08-12"),
      changeFrequency: "monthly" as const,
      priority: route.key === "home" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((candidate) => [
            HTML_LANG[candidate],
            `${SITE.url}${hrefFor(route.key, candidate)}`,
          ]),
        ),
      },
    })),
  );
}
