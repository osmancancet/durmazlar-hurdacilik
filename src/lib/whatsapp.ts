/**
 * WhatsApp ve arama bağlantısı üreticisi.
 *
 * Sitedeki HİÇBİR yerde elle "wa.me/..." veya "tel:" yazılmaz; her buton bu
 * dosyadan geçer. Numara değişince yalnızca src/config/site.ts düzenlenir.
 */
import { SITE, type Contact } from "@/config/site";

/**
 * Ön doldurulmuş mesajla WhatsApp sohbetini açan adres.
 *
 * `encodeURIComponent` satır sonlarını %0A olarak kodlar; WhatsApp bunu
 * çok satırlı mesaj olarak gösterir.
 */
export function waHref(contact: Contact, message?: string): string {
  const base = `https://wa.me/${contact.raw}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Tıkla-ara bağlantısı. */
export function telHref(contact: Contact): string {
  return `tel:${contact.e164}`;
}

/** Ekranda gösterilen sırayla iletişim kişileri. */
export const CONTACTS = SITE.contacts;

/** Bir bağlantının yeni sekmede güvenle açılması için ortak nitelikler. */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
