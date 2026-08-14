/**
 * SİTENİN TEK YAPILANDIRMA DOSYASI
 *
 * Telefon numarası, adres ve çalışma saatleri yalnızca burada tanımlıdır.
 * Buradaki bir satırı değiştirmek; WhatsApp butonlarını, kayan butonu, mobil
 * alt çubuğu, iletişim sayfasını, altbilgiyi ve Google için üretilen
 * yapılandırılmış veriyi (JSON-LD) aynı anda günceller.
 */

export const SITE = {
  name: "Durmazlar Hurdacılık",
  legalName: "Durmazlar Hurdacılık",

  /**
   * Telefon.
   * `raw` -> yalnızca rakam, ülke kodu dahil (wa.me adresleri bunu kullanır).
   * `display` -> ekranda gösterilen biçim.
   */
  phone: {
    raw: "905340882679",
    display: "+90 534 088 26 79",
    e164: "+905340882679",
  },

  email: "",

  address: {
    street: "Hürriyet Mahallesi, Rüzgar Sokak, No: 11",
    district: "Soma",
    city: "Manisa",
    country: "Türkiye",
    countryCode: "TR",
    postalCode: "45520",
  },

  /** Çalışma saatleri. Metin alanları ekranda, `schema` alanı JSON-LD'de kullanılır. */
  hours: {
    weekdays: { tr: "Pazartesi – Cumartesi", en: "Monday – Saturday" },
    weekdayHours: "08:00 – 19:00",
    sunday: { tr: "Pazar", en: "Sunday" },
    sundayHours: { tr: "Kapalı", en: "Closed" },
    /** JSON-LD openingHoursSpecification için */
    schema: [
      {
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
    ],
  },

  /** Hizmet verilen iller — JSON-LD areaServed ve yerel SEO metinleri için. */
  serviceAreas: ["Manisa", "Balıkesir", "İzmir", "Kütahya"],

  /**
   * Sitenin canlı adresi (sonunda / olmadan).
   *
   * Canonical adresler, hreflang etiketleri, site haritası ve sosyal medya
   * önizlemeleri bu değerden üretilir; var olmayan bir adres yazılırsa
   * arama motorları siteyi indekslemez.
   *
   * Kendi alan adınızı aldığınızda (ör. https://durmazlarhurdacilik.com)
   * Vercel'de alan adını projeye ekleyin ve burayı tek satırda güncelleyin.
   */
  url: "https://durmazlar-hurdacilik.vercel.app",

  /** Sosyal medya hesapları (boş bırakılanlar arayüzde gösterilmez). */
  social: {
    instagram: "",
    facebook: "",
  },
} as const;

/** Google Haritalar gömme adresi — iletişim sayfasındaki harita bunu kullanır. */
export const MAPS_QUERY = encodeURIComponent(
  `${SITE.address.street}, ${SITE.address.district} / ${SITE.address.city}`,
);

export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&hl=tr&z=15&output=embed`;

export const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
