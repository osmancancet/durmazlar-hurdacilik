/**
 * Basit, bağımlılıksız iki dil desteği.
 *
 * Tüm metinler `{ tr, en }` çiftleri hâlinde src/content/ altında durur.
 * İki dil yan yana yazıldığı için eksik çeviri gözle hemen görülür ve
 * TypeScript zaten her iki alanı da zorunlu tutar.
 */

export const LOCALES = ["tr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

/** İki dilli metin. */
export type Localized = { tr: string; en: string };

/** İki dilli metin listesi (madde işaretleri, açıklama satırları vb.). */
export type LocalizedList = { tr: string[]; en: string[] };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** İki dilli değerden aktif dile ait metni seçer. */
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
};
