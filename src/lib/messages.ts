/**
 * WhatsApp mesaj şablonları.
 *
 * Her butonun bağlamına göre ön doldurulmuş metin üretir. Amaç, müşterinin
 * "Merhaba" yazıp beklemesi yerine ne sorduğunun ilk mesajda belli olması —
 * böylece işletme tek bakışta konuyu görür ve doğrudan fiyat verebilir.
 */
import { SITE } from "@/config/site";
import type { Locale } from "@/lib/i18n";

const INTRO: Record<Locale, string> = {
  tr: `Merhaba, ${SITE.name} — web sitenizden yazıyorum.`,
  en: `Hello ${SITE.name}, I am writing from your website.`,
};

/** Header, hero ve kayan buton gibi bağlamı olmayan yerler. */
export function generalMessage(locale: Locale): string {
  return locale === "tr"
    ? `${INTRO.tr}\nBilgi almak istiyorum.`
    : `${INTRO.en}\nI would like some information.`;
}

/** Bir hizmet kartı / hizmet bölümü. */
export function serviceMessage(locale: Locale, serviceTitle: string): string {
  return locale === "tr"
    ? `${INTRO.tr}\n"${serviceTitle}" hizmetiniz hakkında bilgi almak istiyorum.`
    : `${INTRO.en}\nI would like information about your "${serviceTitle}" service.`;
}

/** Malzeme listesindeki bir satır. */
export function materialMessage(locale: Locale, materialName: string): string {
  return locale === "tr"
    ? `${INTRO.tr}\n"${materialName}" için güncel fiyat bilgisi alabilir miyim?`
    : `${INTRO.en}\nCould I get a current price for "${materialName}"?`;
}

/** Galerideki bir görsel. */
export function galleryMessage(
  locale: Locale,
  itemTitle: string,
  file: string,
): string {
  const url = `${SITE.url}/images/${file}.webp`;
  return locale === "tr"
    ? `${INTRO.tr}\nGalerideki "${itemTitle}" görseli hakkında bilgi almak istiyorum.\n${url}`
    : `${INTRO.en}\nI would like information about the "${itemTitle}" photo in your gallery.\n${url}`;
}

/** Fotoğraf göndermeye davet eden kısa yol (ana sayfa / iletişim). */
export function sendPhotosMessage(locale: Locale): string {
  return locale === "tr"
    ? `${INTRO.tr}\nHurdamın fotoğraflarını göndermek ve fiyat öğrenmek istiyorum.`
    : `${INTRO.en}\nI would like to send photos of my scrap and get a price.`;
}

/** İkinci el ekipman arayanlar için. */
export function stockRequestMessage(locale: Locale): string {
  return locale === "tr"
    ? `${INTRO.tr}\nSatılık ikinci el makine / ekipman arıyorum. Aradığım parça:`
    : `${INTRO.en}\nI am looking for used machinery / equipment. The part I need is:`;
}

/** Teklif formunun ürettiği çok satırlı özet. */
export type QuoteFormValues = {
  name: string;
  phone: string;
  location: string;
  materials: string[];
  quantity: string;
  dismantling: "evet" | "hayir" | "";
  note: string;
};

export function quoteMessage(
  locale: Locale,
  values: QuoteFormValues,
): string {
  const labels =
    locale === "tr"
      ? {
          header: `${SITE.name} — web sitesinden teklif talebi:`,
          name: "Ad Soyad",
          phone: "Telefon",
          location: "Konum",
          materials: "Malzeme",
          quantity: "Miktar",
          dismantling: "Söküm",
          note: "Not",
          yes: "Evet, yerinde söküm gerekiyor",
          no: "Hayır, yükleme hazır",
        }
      : {
          header: `${SITE.name} — quote request from your website:`,
          name: "Name",
          phone: "Phone",
          location: "Location",
          materials: "Material",
          quantity: "Quantity",
          dismantling: "Dismantling",
          note: "Note",
          yes: "Yes, on-site dismantling needed",
          no: "No, ready for loading",
        };

  // Boş alanlar mesaja hiç girmez; işletme yalnızca dolu bilgiyi görür.
  const rows: [string, string][] = [
    ["👤", `${labels.name}: ${values.name}`],
    ["📞", `${labels.phone}: ${values.phone}`],
  ];

  if (values.location) rows.push(["📍", `${labels.location}: ${values.location}`]);
  if (values.materials.length)
    rows.push(["♻️", `${labels.materials}: ${values.materials.join(", ")}`]);
  if (values.quantity) rows.push(["⚖️", `${labels.quantity}: ${values.quantity}`]);
  if (values.dismantling)
    rows.push([
      "🔧",
      `${labels.dismantling}: ${
        values.dismantling === "evet" ? labels.yes : labels.no
      }`,
    ]);
  if (values.note) rows.push(["📝", `${labels.note}: ${values.note}`]);

  const body = rows.map(([icon, text]) => `${icon} ${text}`).join("\n");
  const greeting = locale === "tr" ? "Merhaba," : "Hello,";

  return `${greeting} ${labels.header}\n\n${body}`;
}
