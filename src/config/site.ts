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
   * İletişim kişileri.
   *
   * İşletmede iki yetkili var ve kartvizitte ikisi de aynı unvanla duruyor:
   * aralarında "birincil" ayrımı yok. Bu yüzden site de birini öne
   * çıkarmıyor; her WhatsApp ve arama aksiyonu iki kişiyi birlikte sunuyor.
   *
   * `raw`     -> yalnızca rakam, ülke kodu dahil (wa.me adresleri bunu kullanır)
   * `display` -> ekranda gösterilen biçim
   * `e164`    -> tel: bağlantıları ve JSON-LD için
   *
   * Sıra ekranda göründükleri sıradır; değiştirmek listeyi her yerde
   * birlikte değiştirir.
   */
  contacts: [
    {
      id: "veysel",
      name: "Veysel Sırçancı",
      raw: "905340882679",
      display: "+90 534 088 26 79",
      e164: "+905340882679",
    },
    {
      id: "yusuf",
      name: "Yusuf Sırçancı",
      raw: "905318595395",
      display: "+90 531 859 53 95",
      e164: "+905318595395",
    },
  ],

  /**
   * Genel e-posta adresi.
   *
   * WhatsApp kullanmayan ya da yazılı kayıt isteyen kurumsal müşteriler için
   * ikinci kanal. Altbilgi, iletişim sayfası ve JSON-LD bu tek değeri okur.
   * Boş bırakılırsa arayüzde hiç gösterilmez; satırın kendisi kaybolur.
   */
  email: "durmazlarhurdacilik45@gmail.com",

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
    weekdays: {
      tr: "Pazartesi – Cumartesi",
      en: "Monday – Saturday",
      ru: "Понедельник – суббота",
      ar: "الاثنين – السبت",
    },
    weekdayHours: "08:00 – 19:00",
    sunday: {
      tr: "Pazar",
      en: "Sunday",
      ru: "Воскресенье",
      ar: "الأحد",
    },
    sundayHours: {
      tr: "Kapalı",
      en: "Closed",
      ru: "Закрыто",
      ar: "مغلق",
    },
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
   * Canonical adresler, hreflang etiketleri, site haritası, robots.txt ve
   * sosyal medya önizlemeleri bu tek değerden üretilir.
   *
   * NEDEN `www` VAR:
   * Vercel'de birincil (Production) alan adı www sürümü; www'suz hâli oraya
   * 308 ile yönlendiriliyor. Canonical adres, yönlendirmenin kendisini değil
   * HEDEFİNİ göstermeli — yoksa arama motoruna "asıl adresim burası" diye
   * her seferinde bir yönlendirme adımı tarif etmiş oluruz.
   *
   * Birincil alan adı ileride www'suz hâle çevrilirse burası da güncellenir;
   * ikisi her zaman aynı olmalı.
   */
  url: "https://www.durmazlarhurdacilik.com",

  /** Sosyal medya hesapları (boş bırakılanlar arayüzde gösterilmez). */
  social: {
    instagram: "",
    facebook: "",
  },
} as const;

/** Tek bir iletişim kişisi. */
export type Contact = (typeof SITE.contacts)[number];

/** Google Haritalar gömme adresi — iletişim sayfasındaki harita bunu kullanır. */
export const MAPS_QUERY = encodeURIComponent(
  `${SITE.address.street}, ${SITE.address.district} / ${SITE.address.city}`,
);

export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&hl=tr&z=15&output=embed`;

export const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
