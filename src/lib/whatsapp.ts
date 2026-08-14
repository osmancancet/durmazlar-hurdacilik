/**
 * WhatsApp bağlantı üreticisi.
 *
 * Sitedeki HİÇBİR yerde elle "wa.me/..." yazılmaz; her buton bu dosyadan geçer.
 * Numara değişince yalnızca src/config/site.ts düzenlenir.
 */
import { SITE } from "@/config/site";

/**
 * Ön doldurulmuş mesajla WhatsApp sohbetini açan adres.
 *
 * `encodeURIComponent` satır sonlarını %0A olarak kodlar; WhatsApp bunu
 * çok satırlı mesaj olarak gösterir.
 */
export function waHref(message?: string): string {
  const base = `https://wa.me/${SITE.phone.raw}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Tıkla-ara bağlantısı. */
export function telHref(): string {
  return `tel:${SITE.phone.e164}`;
}

/** Bir bağlantının yeni sekmede güvenle açılması için ortak nitelikler. */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
