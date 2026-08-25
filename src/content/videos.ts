import type { Localized } from "@/lib/i18n";

/**
 * Sahanın havadan çekilmiş görüntüleri.
 *
 * Üç klip de aynı gün, tek uçuşta çekilmiş ham drone kaydından kesildi.
 * Amaç gösteriş değil ölçek kanıtı: bu işte müşterinin ilk sorduğu şey
 * "sahanız ne kadar büyük, bu tonajı kaldırır mısınız" oluyor. Fotoğraf
 * bunu anlatamıyor, havadan görüntü anlatıyor.
 *
 * Klipler sessiz — drone motor sesinin taşıdığı bilgi yok, üstelik otomatik
 * oynayan sesli video her tarayıcıda engellenir.
 */

export type SiteVideo = {
  /** public/videos/ altındaki dosya adı (uzantısız). */
  file: string;
  title: Localized;
  /** Künye satırı — ne görüldüğünü söyler. */
  caption: Localized;
  /** Ekran okuyucu için görüntünün metin karşılığı. */
  alt: Localized;
};

export const VIDEOS: SiteVideo[] = [
  {
    file: "saha-sehpa",
    title: {
      tr: "Konveyör sehpa stoğu",
      en: "Conveyor idler stock",
      ru: "Запас конвейерных роликоопор",
      ar: "مخزون حوامل السيور الناقلة",
    },
    caption: {
      tr: "Saha — sökülmüş konveyör sehpaları, Soma",
      en: "The yard — dismantled conveyor idlers, Soma",
      ru: "Площадка — демонтированные роликоопоры, Сома",
      ar: "الساحة — حوامل سيور مفكّكة، صوما",
    },
    alt: {
      tr: "Havadan çekim: sahada sıra sıra dizilmiş yüzlerce konveyör bant sehpası ve çelik konstrüksiyon.",
      en: "Aerial view: hundreds of conveyor belt idler frames lined up in rows across the yard, with steel structures alongside.",
      ru: "Аэросъёмка: сотни роликоопор конвейерных лент, выстроенных рядами по площадке, рядом стальные конструкции.",
      ar: "لقطة جوية: مئات من حوامل السيور الناقلة مصفوفة في صفوف عبر الساحة، وإلى جانبها هياكل فولاذية.",
    },
  },
  {
    file: "saha-yukleme",
    title: {
      tr: "Boru ve profil sahası",
      en: "Pipe and profile yard",
      ru: "Площадка труб и профиля",
      ar: "ساحة الأنابيب والمقاطع",
    },
    caption: {
      tr: "Saha — boru, profil ve yükleme alanı",
      en: "The yard — pipe, profile and the loading area",
      ru: "Площадка — трубы, профиль и зона погрузки",
      ar: "الساحة — أنابيب ومقاطع ومنطقة التحميل",
    },
    alt: {
      tr: "Havadan çekim: istiflenmiş çelik boru ve profil yığınları, aralarında kamyonlar ve yükleyici.",
      en: "Aerial view: stacked steel pipe and profile piles with trucks and a loader working between them.",
      ru: "Аэросъёмка: штабеля стальных труб и профиля, между ними грузовики и погрузчик.",
      ar: "لقطة جوية: أكوام من الأنابيب والمقاطع الفولاذية المكدّسة، وبينها شاحنات ولودر.",
    },
  },
  {
    file: "saha-genel",
    title: {
      tr: "Tesisin geneli",
      en: "The whole facility",
      ru: "Общий вид площадки",
      ar: "المنشأة بالكامل",
    },
    caption: {
      tr: "Saha — tesisin geneli, Soma",
      en: "The yard — the whole facility, Soma",
      ru: "Площадка — общий вид, Сома",
      ar: "الساحة — المنشأة بالكامل، صوما",
    },
    alt: {
      tr: "Havadan geniş çekim: kapalı hangarlar, ayrıştırılmış hurda yığınları, kamyonlar ve tesisin tamamı.",
      en: "Wide aerial view: covered sheds, sorted scrap piles, trucks and the full extent of the facility.",
      ru: "Широкая аэросъёмка: крытые ангары, рассортированные штабеля лома, грузовики и вся территория.",
      ar: "لقطة جوية واسعة: حظائر مغطاة وأكوام خردة مفروزة وشاحنات وكامل أرض المنشأة.",
    },
  },
];
