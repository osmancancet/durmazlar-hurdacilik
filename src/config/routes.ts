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
  slug: Record<Locale, string>;
  /** Menüde görünen ad. */
  label: Localized;
  /** Menüde gösterilsin mi (tümü gösteriliyor, ileride ayrım gerekirse hazır). */
  inNav: boolean;
};

/*
 * Adres parçaları Latin harfleriyle yazılır — Rusça ve Arapça sayfalarda da.
 * Kiril veya Arap harfli bir adres tarayıcıda punycode/yüzde kodlamasına
 * dönüşür, WhatsApp'ta paylaşıldığında okunmaz bir dizi olur. Dilin kendisi
 * `/ru/` ve `/ar/` ön ekiyle zaten belli.
 */
export const ROUTES: Route[] = [
  {
    key: "home",
    slug: { tr: "", en: "", ru: "", ar: "" },
    label: { tr: "Anasayfa", en: "Home", ru: "Главная", ar: "الرئيسية" },
    inNav: true,
  },
  {
    key: "services",
    slug: { tr: "hizmetler", en: "services", ru: "uslugi", ar: "khadamat" },
    label: { tr: "Hizmetler", en: "Services", ru: "Услуги", ar: "خدماتنا" },
    inNav: true,
  },
  {
    key: "materials",
    slug: {
      tr: "aldigimiz-malzemeler",
      en: "materials",
      ru: "materialy",
      ar: "mawad",
    },
    label: {
      tr: "Aldığımız Malzemeler",
      en: "Materials We Buy",
      ru: "Что мы покупаем",
      ar: "المواد التي نشتريها",
    },
    inNav: true,
  },
  {
    key: "gallery",
    slug: { tr: "galeri", en: "gallery", ru: "galereya", ar: "maarid" },
    label: { tr: "Galeri", en: "Gallery", ru: "Галерея", ar: "معرض الصور" },
    inNav: true,
  },
  {
    key: "about",
    slug: { tr: "hakkimizda", en: "about", ru: "o-nas", ar: "man-nahnu" },
    label: {
      tr: "Hakkımızda",
      en: "About Us",
      ru: "О нас",
      ar: "من نحن",
    },
    inNav: true,
  },
  {
    key: "contact",
    slug: { tr: "iletisim", en: "contact", ru: "kontakty", ar: "ittisal" },
    label: {
      tr: "İletişim",
      en: "Contact",
      ru: "Контакты",
      ar: "اتصل بنا",
    },
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
