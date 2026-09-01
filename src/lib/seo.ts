import type { Metadata } from "next";
import { ROUTES, hrefFor, routeByKey, type RouteKey } from "@/config/routes";
import { SERVICES } from "@/content/services";
import { MAPS_LINK_URL, SITE } from "@/config/site";
import {
  AREA_LOCALE,
  areaHref,
  areaIndexHref,
  type Area,
} from "@/content/areas";
import {
  BLOG_LOCALE,
  blogIndexHref,
  blogPostHref,
  type BlogPost,
} from "@/content/blog";
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
      ru: "Durmazlar Hurdacılık | Приём лома в Соме",
      ar: "Durmazlar Hurdacılık | شراء الخردة في صوما",
    },
    description: {
      tr: "Soma / Manisa'da endüstriyel hurda alımı, tesis sökümü ve ikinci el makine satışı. Fotoğrafınızı WhatsApp'tan gönderin, aynı gün fiyat alın.",
      en: "Industrial scrap purchasing, plant dismantling and used machinery sales in Soma / Manisa. Send a photo on WhatsApp and get a price the same day.",
      ru: "Приём промышленного лома, демонтаж производств и продажа б/у техники в Соме (Маниса). Пришлите фото в WhatsApp и получите цену в тот же день.",
      ar: "شراء الخردة الصناعية وتفكيك المنشآت وبيع الآلات المستعملة في صوما / مانيسا. أرسلوا صورتكم عبر واتساب واحصلوا على السعر في اليوم نفسه.",
    },
  },
  services: {
    title: {
      tr: "Hurda Alımı ve Tesis Sökümü",
      en: "Scrap Purchasing & Dismantling",
      ru: "Приём лома и демонтаж производств",
      ar: "شراء الخردة وتفكيك المنشآت",
    },
    description: {
      tr: "Endüstriyel hurda alımı, ikinci el makine satışı, tesis sökümü ve demontaj, araç ile konteyner temini. Kesim, yükleme ve nakliye dahil.",
      en: "Industrial scrap purchasing, used machinery sales, plant dismantling and container supply. Cutting, loading and haulage included.",
      ru: "Приём промышленного лома, продажа б/у техники, демонтаж производств, контейнеры и транспорт. Резка, погрузка и перевозка включены.",
      ar: "شراء الخردة الصناعية وبيع الآلات المستعملة وتفكيك المنشآت وتوفير الحاويات والنقل. القصّ والتحميل والنقل مشمولة.",
    },
  },
  materials: {
    title: {
      tr: "Aldığımız Malzemeler",
      en: "Materials We Buy",
      ru: "Что мы покупаем",
      ar: "المواد التي نشتريها",
    },
    description: {
      tr: "Hurda demir, bakır, alüminyum, pirinç, paslanmaz, kablo, elektrik motoru, konveyör ve komple tesis hurdası alıyoruz. Güncel fiyat için yazın.",
      en: "We buy scrap iron, copper, aluminium, brass, stainless, cable, electric motors, conveyors and complete plant scrap. Message us for today's price.",
      ru: "Покупаем стальной лом, медь, алюминий, латунь, нержавейку, кабель, электродвигатели, конвейеры и лом целых производств. Напишите — назовём актуальную цену.",
      ar: "نشتري حديد الخردة والنحاس والألمنيوم والنحاس الأصفر والستانلس والكابلات والمحركات الكهربائية والسيور وخردة المنشآت الكاملة. راسلونا لمعرفة السعر الحالي.",
    },
  },
  gallery: {
    title: {
      tr: "Galeri — Hurda ve Ekipman",
      en: "Gallery — Scrap & Equipment",
      ru: "Галерея — лом и оборудование",
      ar: "معرض الصور — خردة ومعدات",
    },
    description: {
      tr: "Sahamızdaki hurda metal, konveyör tamburu, redüktör, tank, çelik boru ve konstrüksiyon fotoğrafları. İlgilendiğiniz parçayı WhatsApp'tan sorun.",
      en: "Photos of scrap metal, conveyor drums, gearboxes, tanks, steel pipe and structures in our yard. Ask about any piece over WhatsApp.",
      ru: "Фотографии металлолома, барабанов конвейеров, редукторов, ёмкостей, стальных труб и конструкций с нашей площадки. Спросите о нужной позиции в WhatsApp.",
      ar: "صور للخردة المعدنية وأسطوانات السيور وعلب التروس والخزانات والأنابيب والهياكل الفولاذية في ساحتنا. اسألوا عن القطعة التي تهمكم عبر واتساب.",
    },
  },
  about: {
    title: {
      tr: "Hakkımızda",
      en: "About Us",
      ru: "О нас",
      ar: "من نحن",
    },
    description: {
      tr: "Soma sanayisinde çalışan bir hurda ve ikinci el ekipman işletmesi. Çalışma prensiplerimiz, geri dönüşüm yaklaşımımız ve sık sorulan sorular.",
      en: "A scrap and used-equipment business working in Soma's industrial district. How we work, our approach to recycling, and frequently asked questions.",
      ru: "Предприятие по приёму лома и продаже б/у оборудования в промзоне Сомы. Наши принципы работы, подход к переработке и частые вопросы.",
      ar: "منشأة لشراء الخردة وبيع المعدات المستعملة في صناعة صوما. مبادئ عملنا ونهجنا في إعادة التدوير والأسئلة الشائعة.",
    },
  },
  contact: {
    title: {
      tr: "İletişim ve Teklif",
      en: "Contact & Quote Request",
      ru: "Контакты и запрос цены",
      ar: "اتصل بنا وطلب عرض سعر",
    },
    description: {
      tr: `Hürriyet Mahallesi, Rüzgar Sokak No: 11, Soma / Manisa. Telefon ${SITE.contacts[0].display}. Teklif formunu doldurun, bilgiler WhatsApp'ta açılsın.`,
      en: `Hürriyet Mahallesi, Rüzgar Sokak No: 11, Soma / Manisa. Phone ${SITE.contacts[0].display}. Fill in the quote form and it opens as a WhatsApp message.`,
      ru: `Hürriyet Mahallesi, Rüzgar Sokak No: 11, Сома / Маниса. Телефон ${SITE.contacts[0].display}. Заполните форму — данные откроются сообщением в WhatsApp.`,
      ar: `Hürriyet Mahallesi, Rüzgar Sokak No: 11، صوما / مانيسا. الهاتف ${SITE.contacts[0].display}. املأوا نموذج الطلب لتُفتح البيانات كرسالة واتساب.`,
    },
  },
};

/** Sayfa + dil için tam metadata; hreflang ve canonical dahil. */
export function buildMetadata(key: RouteKey, locale: Locale): Metadata {
  const meta = META[key];
  const path = hrefFor(key, locale);

  // Her sayfanın dört dildeki adresi — arama motoru doğru sürümü göstersin.
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((candidate) => [
      HTML_LANG[candidate],
      `${SITE.url}${hrefFor(key, candidate)}`,
    ]),
  );

  /*
   * x-default: listedeki hiçbir dile uymayan bir ziyaretçi (örn. Almanya'dan
   * Almanca tarayıcı) hangi sürümü görsün? Tanımlanmazsa karar Google'ın
   * tahminine kalır. İşletme Türkiye'de, birincil pazar Türkçe.
   */
  languages["x-default"] = `${SITE.url}${hrefFor(key, "tr")}`;

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
      /* Paylaşım önizlemesinde diğer dil sürümlerinin de var olduğunu bildirir. */
      alternateLocale: LOCALES.filter((other) => other !== locale).map((other) =>
        HTML_LANG[other].replace("-", "_"),
      ),
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
    /*
     * İki yetkili de bildirilir. schema.org `telephone` tek değer beklediği
     * için ilki oraya, ikisi birden `contactPoint` listesine yazılır —
     * Google'ın işletme kartında ikisi de görünebilsin.
     */
    telephone: SITE.contacts[0].e164,
    ...(SITE.email ? { email: SITE.email } : {}),
    contactPoint: SITE.contacts.map((contact) => ({
      "@type": "ContactPoint",
      name: contact.name,
      telephone: contact.e164,
      contactType: "sales",
      availableLanguage: ["tr", "en", "ru", "ar"],
    })),
    image: `${SITE.url}/images/konveyor-sasi-2.webp`,
    /* Google'ın işletme kartında marka işareti olarak gösterilir. */
    logo: `${SITE.url}/brand/ikon-512.png`,
    priceRange: "$$",
    /* Arama motorunu adresi metinden çözmeye bırakmak yerine harita
       kaydına doğrudan bağlar. */
    hasMap: MAPS_LINK_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.district,
      addressRegion: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.countryCode,
    },
    /*
     * Hizmet alanı iki düzeyde bildirilir.
     *
     * Yalnızca il yazmak, yerel aramanın gerçekte nasıl yapıldığını
     * karşılamıyordu: kimse "manisa hurdacı" yazmıyor, "kırkağaç hurdacı"
     * yazıyor. İl `AdministrativeArea`, ilçe `City` olarak verilir; ikisi
     * `SITE` içindeki listelerden türetilir, burada elle sayılmaz.
     */
    areaServed: [
      ...SITE.serviceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      ...SITE.serviceDistricts.map((district) => ({
        "@type": "City",
        name: district,
      })),
    ],
    openingHoursSpecification: SITE.hours.schema.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    /*
     * Elle yazılmaz: dil eklendiğinde bu satırın güncellenmesi unutuluyordu
     * (Rusça ve Arapça eklendikten sonra veri hâlâ "tr, en" diyordu).
     * LOCALES tek kaynak — liste kendiliğinden doğru kalır.
     */
    knowsLanguage: [...LOCALES],
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


/* ------------------------------------------------------------------ *
 * REHBER (/tr/blog/)
 *
 * Rehber tek dilli olduğu için buradaki üstveri, sitenin geri kalanından
 * bir noktada AYRILIR: `languages` (hreflang) verilmez. Bir sayfanın
 * olmayan bir çevirisini bildirmek, Google'ın o adresi tarayıp 404 alması
 * demektir. Kendi kendine canonical yeterli.
 * ------------------------------------------------------------------ */

/** Rehber listesinin başlığı ve açıklaması — tek yerde durur. */
export const BLOG_INDEX = {
  /*
   * `<title>` yer adını taşır, H1 taşımaz. Sebep: arama sonucunda görünen
   * satır title'dır ve aranan şey "soma hurda" — sayfanın kendi başlığında
   * ise yer adını tekrarlamak gereksiz, ziyaretçi zaten sitede.
   */
  seoTitle: "Soma Hurda Rehberi",
  title: "Hurda Rehberi",
  eyebrow: "Rehber",
  description:
    "Soma ve çevresinde hurda satmadan önce bilinmesi gerekenler: fiyatın nasıl belirlendiği, metallerin nasıl ayrıştırıldığı, kantar ve ödeme usulü, tesis sökümünün adımları.",
  lead: "Hurda satarken tartışma çıkan yerler bellidir: fiyatın neye göre belirlendiği, tartının nasıl yapıldığı, teklifin içinde neyin olduğu. Bu yazıları, aynı soruları sahada defalarca cevapladığımız için yazdık.",
};

/** Rehber listesinin üstverisi. */
export function buildBlogIndexMetadata(): Metadata {
  const url = `${SITE.url}${blogIndexHref()}`;

  return {
    title: BLOG_INDEX.seoTitle,
    description: BLOG_INDEX.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: BLOG_INDEX.title,
      description: BLOG_INDEX.description,
      url,
      locale: HTML_LANG[BLOG_LOCALE].replace("-", "_"),
      images: [
        { url: `${SITE.url}/brand/og.jpg`, width: 1200, height: 630, alt: SITE.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: BLOG_INDEX.title,
      description: BLOG_INDEX.description,
      images: [`${SITE.url}/brand/og.jpg`],
    },
  };
}

/** Tek bir rehber yazısının üstverisi. */
export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const url = `${SITE.url}${blogPostHref(post.slug)}`;

  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      /* Yazı sayfası `article` — paylaşımda tarih ve yazar alanları taşınır. */
      type: "article",
      siteName: SITE.name,
      title: post.title,
      description: post.description,
      url,
      locale: HTML_LANG[BLOG_LOCALE].replace("-", "_"),
      publishedTime: post.published,
      modifiedTime: post.updated,
      images: [
        { url: `${SITE.url}/brand/og.jpg`, width: 1200, height: 630, alt: SITE.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE.url}/brand/og.jpg`],
    },
  };
}

/**
 * Yazı için `BlogPosting` verisi.
 *
 * `publisher` işletmeye `@id` ile bağlanır — düzendeki LocalBusiness kaydını
 * yeniden yazmak yerine ona işaret eder. Böylece Google yazıyı işletmenin
 * yayınladığı bir metin olarak görür; ikisi ayrı iki kurum sanılmaz.
 */
export function blogPostJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}${blogPostHref(post.slug)}#article`,
    mainEntityOfPage: `${SITE.url}${blogPostHref(post.slug)}`,
    headline: post.title,
    description: post.description,
    inLanguage: HTML_LANG[BLOG_LOCALE],
    datePublished: post.published,
    dateModified: post.updated,
    image: `${SITE.url}/brand/og.jpg`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@id": `${SITE.url}/#business` },
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE.url}${blogIndexHref()}#blog`,
      name: BLOG_INDEX.title,
    },
  };
}

/** Rehber listesi için `Blog` verisi — yazıları tek listede bildirir. */
export function blogIndexJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE.url}${blogIndexHref()}#blog`,
    name: BLOG_INDEX.title,
    description: BLOG_INDEX.description,
    url: `${SITE.url}${blogIndexHref()}`,
    inLanguage: HTML_LANG[BLOG_LOCALE],
    publisher: { "@id": `${SITE.url}/#business` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${SITE.url}${blogPostHref(post.slug)}#article`,
      headline: post.title,
      url: `${SITE.url}${blogPostHref(post.slug)}`,
      datePublished: post.published,
      dateModified: post.updated,
    })),
  };
}

/**
 * Rehberin kırıntı yolu. `post` verilirse üç basamak (ana sayfa › rehber ›
 * yazı), verilmezse iki basamak üretir.
 */
export function blogBreadcrumbJsonLd(post?: BlogPost) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE.name,
      item: `${SITE.url}${hrefFor("home", BLOG_LOCALE)}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: BLOG_INDEX.title,
      item: `${SITE.url}${blogIndexHref()}`,
    },
  ];

  if (post) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: post.title,
      item: `${SITE.url}${blogPostHref(post.slug)}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Tek dilli sorulardan SSS zengin sonucu.
 *
 * Yukarıdaki `faqJsonLd` dört dilli `Localized` bekliyor; rehber yazıları ve
 * bölge sayfaları ise düz Türkçe dize taşıyor. İkisi ayrı fonksiyon çünkü
 * tek bir imzada birleştirmek her çağrıda tür dönüşümü gerektirirdi.
 */
export function plainFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}


/* ------------------------------------------------------------------ *
 * BÖLGE SAYFALARI (/tr/hurdaci/)
 *
 * Rehberle aynı kural: tek dilli, hreflang yok, kendi kendine canonical.
 * ------------------------------------------------------------------ */

export const AREA_INDEX = {
  seoTitle: "Hurda Alımı Yaptığımız Bölgeler",
  title: "Hizmet bölgelerimiz",
  eyebrow: "Bölgeler",
  description:
    "Soma merkezli hurda alımı ve tesis sökümü: Manisa, Balıkesir, İzmir ve Kütahya'da hangi ilçelere gidiyoruz, nakliye kimin üzerinde, hangi bölgede ne çıkıyor?",
  lead: "Hurdada mesafe doğrudan fiyattır: nakliyeye harcanmayan para yükün rakamına gider. Merkezimiz Soma; aşağıda hangi ile ve ilçeye gittiğimizi, oralarda ne tür iş yaptığımızı tek tek yazdık.",
};

export function buildAreaIndexMetadata(): Metadata {
  const url = `${SITE.url}${areaIndexHref()}`;

  return {
    title: AREA_INDEX.seoTitle,
    description: AREA_INDEX.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: AREA_INDEX.title,
      description: AREA_INDEX.description,
      url,
      locale: HTML_LANG[AREA_LOCALE].replace("-", "_"),
      images: [
        { url: `${SITE.url}/brand/og.jpg`, width: 1200, height: 630, alt: SITE.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: AREA_INDEX.title,
      description: AREA_INDEX.description,
      images: [`${SITE.url}/brand/og.jpg`],
    },
  };
}

export function buildAreaMetadata(area: Area): Metadata {
  const url = `${SITE.url}${areaHref(area.slug)}`;

  return {
    title: area.seoTitle,
    description: area.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: area.title,
      description: area.description,
      url,
      locale: HTML_LANG[AREA_LOCALE].replace("-", "_"),
      images: [
        { url: `${SITE.url}/brand/og.jpg`, width: 1200, height: 630, alt: SITE.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: area.title,
      description: area.description,
      images: [`${SITE.url}/brand/og.jpg`],
    },
  };
}

/**
 * Bölge sayfasının yapılandırılmış verisi.
 *
 * Sayfa başına AYRI bir `LocalBusiness` kaydı ÜRETİLMEZ. Bu, yerel SEO'da
 * sık yapılan ve zarar veren bir hata: yirmi bir sayfada yirmi bir işletme
 * kaydı, Google'a yirmi bir ayrı şube gibi görünür ve hiçbirinin adresi
 * doğrulanamaz. Bunun yerine tek işletme kaydına (`#business`) işaret eden
 * bir `Service` yayımlanır; hizmetin verildiği yer `areaServed` ile
 * bildirilir. İşletme bir tane, hizmet alanı çok.
 */
export function areaServiceJsonLd(area: Area) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}${areaHref(area.slug)}#service`,
    name: `${area.name} hurda alımı ve tesis sökümü`,
    description: area.description,
    serviceType: "Hurda alımı, tesis sökümü ve ikinci el ekipman",
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: {
      "@type": area.kind === "il" ? "AdministrativeArea" : "City",
      name: area.name,
      ...(area.kind === "ilce"
        ? {
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: area.province,
            },
          }
        : {}),
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE.url}${areaHref(area.slug)}`,
      servicePhone: SITE.contacts[0].e164,
    },
  };
}

/** Bölge listesi — hangi sayfaların olduğunu tek listede bildirir. */
export function areaIndexJsonLd(areas: Area[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}${areaIndexHref()}#areas`,
    name: AREA_INDEX.title,
    itemListElement: areas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: area.name,
      url: `${SITE.url}${areaHref(area.slug)}`,
    })),
  };
}

/**
 * Bölgelerin kırıntı yolu.
 *
 * İlçe sayfalarında dört basamak olur: ana sayfa › bölgeler › il › ilçe.
 * Bu, Google'a hiyerarşiyi anlatmanın yanı sıra ziyaretçiye de "bu ilçe
 * hangi ilin altında" bilgisini veriyor.
 */
export function areaBreadcrumbJsonLd(area?: Area, province?: Area) {
  const items: {
    "@type": string;
    position: number;
    name: string;
    item: string;
  }[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE.name,
      item: `${SITE.url}${hrefFor("home", AREA_LOCALE)}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: AREA_INDEX.title,
      item: `${SITE.url}${areaIndexHref()}`,
    },
  ];

  if (area && province) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: province.name,
      item: `${SITE.url}${areaHref(province.slug)}`,
    });
  }

  if (area) {
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: area.name,
      item: `${SITE.url}${areaHref(area.slug)}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}
