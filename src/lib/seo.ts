import type { Metadata } from "next";
import { ROUTES, hrefFor, routeByKey, type RouteKey } from "@/config/routes";
import { SERVICES } from "@/content/services";
import { SITE } from "@/config/site";
import { LOCALES, HTML_LANG, type Locale, type Localized } from "@/lib/i18n";

/**
 * Sayfa başına başlık ve açıklama. Arama sonucunda görünen metin budur.
 *
 * Başlıklara kök düzendeki şablon " | Durmazlar Hurdacılık" (23 karakter)
 * eklenir. Google ~60 karakterden sonrasını kestiği için buradaki başlıklar
 * 40 karakterin altında tutulmuştur; anahtar kelimeler açıklamada taşınır.
 * Ana sayfa şablonu atlar (`absolute`) ve marka adını kendi içinde barındırır.
 */
const META: Record<RouteKey, { title: Localized; description: Localized }> = {
  home: {
    title: {
      tr: "Durmazlar Hurdacılık | Soma Hurda Alımı",
      en: "Durmazlar Hurdacılık | Scrap Dealer in Soma",
    },
    description: {
      tr: "Soma / Manisa'da endüstriyel hurda alımı, tesis sökümü ve ikinci el makine satışı. Fotoğrafınızı WhatsApp'tan gönderin, aynı gün fiyat alın.",
      en: "Industrial scrap purchasing, plant dismantling and used machinery sales in Soma / Manisa. Send a photo on WhatsApp and get a price the same day.",
    },
  },
  services: {
    title: {
      tr: "Hurda Alımı ve Tesis Sökümü",
      en: "Scrap Purchasing & Dismantling",
    },
    description: {
      tr: "Endüstriyel hurda alımı, ikinci el makine satışı, tesis sökümü ve demontaj, araç ile konteyner temini. Kesim, yükleme ve nakliye dahil.",
      en: "Industrial scrap purchasing, used machinery sales, plant dismantling and container supply. Cutting, loading and haulage included.",
    },
  },
  materials: {
    title: {
      tr: "Aldığımız Malzemeler",
      en: "Materials We Buy",
    },
    description: {
      tr: "Hurda demir, bakır, alüminyum, pirinç, paslanmaz, kablo, elektrik motoru, konveyör ve komple tesis hurdası alıyoruz. Güncel fiyat için yazın.",
      en: "We buy scrap iron, copper, aluminium, brass, stainless, cable, electric motors, conveyors and complete plant scrap. Message us for today's price.",
    },
  },
  gallery: {
    title: {
      tr: "Galeri — Hurda ve Ekipman",
      en: "Gallery — Scrap & Equipment",
    },
    description: {
      tr: "Sahamızdaki hurda metal, konveyör tamburu, redüktör, tank, çelik boru ve konstrüksiyon fotoğrafları. İlgilendiğiniz parçayı WhatsApp'tan sorun.",
      en: "Photos of scrap metal, conveyor drums, gearboxes, tanks, steel pipe and structures in our yard. Ask about any piece over WhatsApp.",
    },
  },
  about: {
    title: {
      tr: "Hakkımızda",
      en: "About Us",
    },
    description: {
      tr: "Soma sanayisinde çalışan bir hurda ve ikinci el ekipman işletmesi. Çalışma prensiplerimiz, geri dönüşüm yaklaşımımız ve sık sorulan sorular.",
      en: "A scrap and used-equipment business working in Soma's industrial district. How we work, our approach to recycling, and frequently asked questions.",
    },
  },
  contact: {
    title: {
      tr: "İletişim ve Teklif",
      en: "Contact & Quote Request",
    },
    description: {
      tr: `Hürriyet Mahallesi, Rüzgar Sokak No: 11, Soma / Manisa. Telefon ${SITE.phone.display}. Teklif formunu doldurun, bilgiler WhatsApp'ta açılsın.`,
      en: `Hürriyet Mahallesi, Rüzgar Sokak No: 11, Soma / Manisa. Phone ${SITE.phone.display}. Fill in the quote form and it opens as a WhatsApp message.`,
    },
  },
};

/** Sayfa + dil için tam metadata; hreflang ve canonical dahil. */
export function buildMetadata(key: RouteKey, locale: Locale): Metadata {
  const meta = META[key];
  const path = hrefFor(key, locale);

  // Her sayfanın iki dildeki adresi — arama motoru doğru sürümü göstersin.
  const languages = Object.fromEntries(
    LOCALES.map((candidate) => [
      HTML_LANG[candidate],
      `${SITE.url}${hrefFor(key, candidate)}`,
    ]),
  );

  return {
    // Ana sayfa başlığı marka adını zaten içeriyor; şablonun ikinci kez
    // eklemesini engellemek için mutlak başlık kullanılır.
    title:
      key === "home"
        ? { absolute: meta.title[locale] }
        : meta.title[locale],
    description: meta.description[locale],
    alternates: {
      canonical: `${SITE.url}${path}`,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: meta.title[locale],
      description: meta.description[locale],
      url: `${SITE.url}${path}`,
      locale: HTML_LANG[locale].replace("-", "_"),
      images: [
        {
          /*
           * Paylaşım kapağı kurumsal kimlikten üretildi: lacivert degrade
           * zemin, beyaz logo. WhatsApp ve Google'da ilk görünen şey bu —
           * saha fotoğrafı yerine markanın kendisi duruyor.
           */
          url: `${SITE.url}/brand/og.jpg`,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title[locale],
      description: meta.description[locale],
      images: [`${SITE.url}/brand/og.jpg`],
    },
  };
}

/**
 * Google'a işletmeyi tanıtan yapılandırılmış veri.
 * Yerel aramada ("soma hurdacı") görünürlük için en etkili tek parça.
 */
export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    /*
     * İki tip birden: Google için genel `LocalBusiness`, sektör için
     * `RecyclingCenter`. İkincisi schema.org'da LocalBusiness'ın alt tipidir
     * ve "hurdacı / geri dönüşüm" aramalarında işletmenin ne yaptığını
     * arama motoruna tahmin ettirmek yerine doğrudan söyler.
     */
    "@type": ["LocalBusiness", "RecyclingCenter"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: META.home.description[locale],
    url: `${SITE.url}${hrefFor("home", locale)}`,
    telephone: SITE.phone.e164,
    image: `${SITE.url}/images/konveyor-sasi-2.webp`,
    /* Google'ın işletme kartında marka işareti olarak gösterilir. */
    logo: `${SITE.url}/brand/ikon-512.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.district,
      addressRegion: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: SITE.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    openingHoursSpecification: SITE.hours.schema.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    knowsLanguage: ["tr", "en"],
    /*
     * Hizmet kataloğu — arama motoru "ne yapıyorlar" sorusunu sayfa metnini
     * ayrıştırarak değil, listeyi okuyarak yanıtlar.
     */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "tr" ? "Hizmetler" : "Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title[locale],
          description: service.summary[locale],
          areaServed: SITE.serviceAreas,
        },
        url: `${SITE.url}${hrefFor("services", locale)}#${service.id}`,
      })),
    },
  };
}

/**
 * Kırıntı yolu — arama sonucunda adres satırı yerine
 * "Durmazlar Hurdacılık › Hizmetler" biçiminde bir iz gösterir.
 * Ana sayfada anlamı yok; yalnızca alt sayfalarda üretilir.
 */
export function breadcrumbJsonLd(key: RouteKey, locale: Locale) {
  const route = routeByKey(key);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE.name,
        item: `${SITE.url}${hrefFor("home", locale)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: route.label[locale],
        item: `${SITE.url}${hrefFor(key, locale)}`,
      },
    ],
  };
}

/** Menüyü Google'a bildirir — arama sonucunda alt bağlantı olarak çıkabilir. */
export function siteNavigationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: ROUTES.map((route, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: route.label[locale],
      url: `${SITE.url}${hrefFor(route.key, locale)}`,
    })),
  };
}

/** SSS zengin sonucu — hakkımızda sayfasındaki sorulardan üretilir. */
export function faqJsonLd(
  items: { question: Localized; answer: Localized }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: { "@type": "Answer", text: item.answer[locale] },
    })),
  };
}
