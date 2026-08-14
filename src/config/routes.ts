/**
 * Rota kayıt defteri.
 *
 * Her sayfanın Türkçe ve İngilizce adresi burada yan yana durur. Sayede:
 *  - İngilizce sayfalar İngilizce URL alır (SEO),
 *  - dil değiştirici, bulunduğu sayfanın diğer dildeki *karşılığını* bulur
 *    (ana sayfaya düşmez),
 *  - menü ve site haritası aynı kaynaktan üretilir.
 */
import type { Locale, Localized } from "@/lib/i18n";

export type RouteKey =
  | "home"
  | "services"
  | "materials"
  | "gallery"
  | "about"
  | "contact";

export type Route = {
  key: RouteKey;
  /** Adres parçası; ana sayfada boş. */
  slug: { tr: string; en: string };
  /** Menüde görünen ad. */
  label: Localized;
  /** Menüde gösterilsin mi (tümü gösteriliyor, ileride ayrım gerekirse hazır). */
  inNav: boolean;
};

export const ROUTES: Route[] = [
  {
    key: "home",
    slug: { tr: "", en: "" },
    label: { tr: "Anasayfa", en: "Home" },
    inNav: true,
  },
  {
    key: "services",
    slug: { tr: "hizmetler", en: "services" },
    label: { tr: "Hizmetler", en: "Services" },
    inNav: true,
  },
  {
    key: "materials",
    slug: { tr: "aldigimiz-malzemeler", en: "materials" },
    label: { tr: "Aldığımız Malzemeler", en: "Materials We Buy" },
    inNav: true,
  },
  {
    key: "gallery",
    slug: { tr: "galeri", en: "gallery" },
    label: { tr: "Galeri", en: "Gallery" },
    inNav: true,
  },
  {
    key: "about",
    slug: { tr: "hakkimizda", en: "about" },
    label: { tr: "Hakkımızda", en: "About Us" },
    inNav: true,
  },
  {
    key: "contact",
    slug: { tr: "iletisim", en: "contact" },
    label: { tr: "İletişim", en: "Contact" },
    inNav: true,
  },
];

/** Ana sayfa dışındaki sayfalar — `[locale]/[slug]` rotasını besler. */
export const SUB_ROUTES = ROUTES.filter((route) => route.key !== "home");

export function routeByKey(key: RouteKey): Route {
  const found = ROUTES.find((route) => route.key === key);
  if (!found) throw new Error(`Bilinmeyen rota: ${key}`);
  return found;
}

/** Verilen dildeki adres parçasından rotayı bulur. */
export function routeBySlug(slug: string, locale: Locale): Route | undefined {
  return ROUTES.find((route) => route.slug[locale] === slug);
}

/** Bir sayfanın verilen dildeki tam adresi. Sonunda / vardır (trailingSlash). */
export function hrefFor(key: RouteKey, locale: Locale): string {
  const slug = routeByKey(key).slug[locale];
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}
