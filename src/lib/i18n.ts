/**
 * Bağımlılıksız dört dil desteği.
 *
 * Tüm metinler `{ tr, en, ru, ar }` dörtlüsü hâlinde src/content/ altında
 * durur. Diller yan yana yazıldığı için eksik çeviri gözle hemen görülür ve
 * TypeScript zaten dördünü birden zorunlu tutar — yeni bir metin eklenip
 * çevirisi unutulduğunda derleme durur.
 *
 * Diller neden bunlar: Türkçe ve İngilizce dışındaki ikisi işin alıcı
 * pazarları. Rusça Orta Asya, Kafkasya ve Rusya'daki madencilik alıcıları;
 * Arapça Ortadoğu ve Kuzey Afrika'daki ikinci el sanayi ekipmanı pazarı için.
 */

export const LOCALES = ["tr", "en", "ru", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

/** Dört dilli metin. */
export type Localized = Record<Locale, string>;

/** Dört dilli metin listesi (madde işaretleri, açıklama satırları vb.). */
export type LocalizedList = Record<Locale, string[]>;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Çok dilli değerden aktif dile ait metni seçer. */
export function t(value: Localized, locale: Locale): string;
export function t(value: LocalizedList, locale: Locale): string[];
export function t(
  value: Localized | LocalizedList,
  locale: Locale,
): string | string[] {
  return value[locale];
}

/** `<html lang>` ve hreflang için tam dil etiketi. */
export const HTML_LANG: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en-US",
  ru: "ru-RU",
  ar: "ar",
};

/**
 * Yazı yönü. Arapça sağdan sola akar; `<html dir>` bunu belirler ve sayfa
 * boyunca kullanılan mantıksal CSS özellikleri (ps/pe, ms/me, start/end)
 * kendiliğinden aynalanır.
 */
export const DIR: Record<Locale, "ltr" | "rtl"> = {
  tr: "ltr",
  en: "ltr",
  ru: "ltr",
  ar: "rtl",
};

/** Dil değiştiricideki kısa kod. */
export const LOCALE_LABEL: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  ru: "RU",
  ar: "AR",
};

/**
 * Dilin kendi adı, kendi alfabesiyle.
 *
 * "Rusça" yerine "Русский" yazılır: dil değiştiriciyi kullanan kişi zaten o
 * dili arıyordur ve kendi dilinin adını okuyabildiği anda bulur.
 */
export const LOCALE_NAME: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
  ar: "العربية",
};
