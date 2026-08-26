/**
 * WhatsApp mesaj şablonları.
 *
 * Her butonun bağlamına göre ön doldurulmuş metin üretir. Amaç, müşterinin
 * "Merhaba" yazıp beklemesi yerine ne sorduğunun ilk mesajda belli olması —
 * böylece işletme tek bakışta konuyu görür ve doğrudan fiyat verebilir.
 *
 * RUSÇA VE ARAPÇA MESAJLARDA TÜRKÇE SATIR
 * Ziyaretçi kendi dilinde yazdığını görmeli; ama sahadaki yetkili Rusça ya da
 * Arapça okumuyor. Bu yüzden bu iki dilde mesajın altına konuyu özetleyen bir
 * Türkçe satır ekleniyor. Ziyaretçi ne gönderdiğini biliyor, işletme de ilk
 * bakışta konuyu anlıyor — çeviri uygulamasına gerek kalmadan.
 */
import { SITE } from "@/config/site";
import type { Locale } from "@/lib/i18n";

const INTRO: Record<Locale, string> = {
  tr: `Merhaba, ${SITE.name} — web sitenizden yazıyorum.`,
  en: `Hello ${SITE.name}, I am writing from your website.`,
  ru: `Здравствуйте, ${SITE.name} — пишу с вашего сайта.`,
  ar: `مرحباً ${SITE.name}، أكتب إليكم من موقعكم الإلكتروني.`,
};

/** Rusça/Arapça mesajların altına eklenen Türkçe özet satırı. */
function withTurkishNote(body: string, locale: Locale, note: string): string {
  if (locale === "tr" || locale === "en") return body;
  return `${body}\n\n— ${note}`;
}

function build(
  locale: Locale,
  lines: Record<Locale, string>,
  turkishNote: string,
): string {
  return withTurkishNote(
    `${INTRO[locale]}\n${lines[locale]}`,
    locale,
    turkishNote,
  );
}

/** Header, hero ve kayan buton gibi bağlamı olmayan yerler. */
export function generalMessage(locale: Locale): string {
  return build(
    locale,
    {
      tr: "Bilgi almak istiyorum.",
      en: "I would like some information.",
      ru: "Хотел бы получить информацию.",
      ar: "أرغب في الحصول على معلومات.",
    },
    "Bilgi talebi",
  );
}

/** Bir hizmet kartı / hizmet bölümü. */
export function serviceMessage(locale: Locale, serviceTitle: string): string {
  return build(
    locale,
    {
      tr: `"${serviceTitle}" hizmetiniz hakkında bilgi almak istiyorum.`,
      en: `I would like information about your "${serviceTitle}" service.`,
      ru: `Хотел бы узнать об услуге «${serviceTitle}».`,
      ar: `أرغب في معلومات عن خدمة «${serviceTitle}».`,
    },
    `Hizmet sorgusu: ${serviceTitle}`,
  );
}

/** Malzeme listesindeki bir satır. */
export function materialMessage(locale: Locale, materialName: string): string {
  return build(
    locale,
    {
      tr: `"${materialName}" için güncel fiyat bilgisi alabilir miyim?`,
      en: `Could I get a current price for "${materialName}"?`,
      ru: `Подскажите, пожалуйста, актуальную цену на «${materialName}».`,
      ar: `هل يمكنني معرفة السعر الحالي لـ «${materialName}»؟`,
    },
    `Fiyat sorgusu: ${materialName}`,
  );
}

/** Galerideki bir görsel. */
export function galleryMessage(
  locale: Locale,
  itemTitle: string,
  file: string,
): string {
  const url = `${SITE.url}/images/${file}.webp`;
  const body = build(
    locale,
    {
      tr: `Galerideki "${itemTitle}" görseli hakkında bilgi almak istiyorum.\n${url}`,
      en: `I would like information about the "${itemTitle}" photo in your gallery.\n${url}`,
      ru: `Интересует позиция «${itemTitle}» из вашей галереи.\n${url}`,
      ar: `أستفسر عن «${itemTitle}» الموجود في معرض الصور.\n${url}`,
    },
    `Galeri sorgusu: ${itemTitle}`,
  );
  return body;
}

/** Fotoğraf göndermeye davet eden kısa yol (ana sayfa / iletişim). */
export function sendPhotosMessage(locale: Locale): string {
  return build(
    locale,
    {
      tr: "Hurdamın fotoğraflarını göndermek ve fiyat öğrenmek istiyorum.",
      en: "I would like to send photos of my scrap and get a price.",
      ru: "Хочу отправить фотографии лома и узнать цену.",
      ar: "أرغب في إرسال صور الخردة لديّ ومعرفة السعر.",
    },
    "Fotoğraf gönderecek, fiyat soruyor",
  );
}

/** İkinci el ekipman arayanlar için. */
export function stockRequestMessage(locale: Locale): string {
  return build(
    locale,
    {
      tr: "Satılık ikinci el makine / ekipman arıyorum. Aradığım parça:",
      en: "I am looking for used machinery / equipment. The part I need is:",
      ru: "Ищу б/у оборудование или запчасти. Мне нужно:",
      ar: "أبحث عن معدات أو آلات مستعملة. القطعة المطلوبة:",
    },
    "İkinci el ekipman arıyor",
  );
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

type QuoteLabels = {
  header: string;
  greeting: string;
  name: string;
  phone: string;
  location: string;
  materials: string;
  quantity: string;
  dismantling: string;
  note: string;
  yes: string;
  no: string;
};

const QUOTE_LABELS: Record<Locale, QuoteLabels> = {
  tr: {
    header: `${SITE.name} — web sitesinden teklif talebi:`,
    greeting: "Merhaba,",
    name: "Ad Soyad",
    phone: "Telefon",
    location: "Konum",
    materials: "Malzeme",
    quantity: "Miktar",
    dismantling: "Söküm",
    note: "Not",
    yes: "Evet, yerinde söküm gerekiyor",
    no: "Hayır, yükleme hazır",
  },
  en: {
    header: `${SITE.name} — quote request from your website:`,
    greeting: "Hello,",
    name: "Name",
    phone: "Phone",
    location: "Location",
    materials: "Material",
    quantity: "Quantity",
    dismantling: "Dismantling",
    note: "Note",
    yes: "Yes, on-site dismantling needed",
    no: "No, ready for loading",
  },
  ru: {
    header: `${SITE.name} — запрос цены с вашего сайта:`,
    greeting: "Здравствуйте,",
    name: "Имя",
    phone: "Телефон",
    location: "Местоположение",
    materials: "Материал",
    quantity: "Количество",
    dismantling: "Демонтаж",
    note: "Примечание",
    yes: "Да, нужен демонтаж на месте",
    no: "Нет, готово к погрузке",
  },
  ar: {
    header: `${SITE.name} — طلب عرض سعر من موقعكم:`,
    greeting: "مرحباً،",
    name: "الاسم",
    phone: "الهاتف",
    location: "الموقع",
    materials: "المادة",
    quantity: "الكمية",
    dismantling: "التفكيك",
    note: "ملاحظة",
    yes: "نعم، التفكيك في الموقع مطلوب",
    no: "لا، جاهز للتحميل",
  },
};

/**
 * E-posta konu satırı.
 *
 * Gövdedeki Türkçe not satırıyla aynı mantık: ziyaretçi kendi dilinde
 * yazdığını görür, ama gelen kutusunu tarayan yetkili Rusça/Arapça okumaz.
 * Bu iki dilde konunun sonuna Türkçe karşılığı eklenir.
 */
export function quoteSubject(locale: Locale, values: QuoteFormValues): string {
  const subject: Record<Locale, string> = {
    tr: `Teklif Talebi — ${values.name}`,
    en: `Quote Request — ${values.name}`,
    ru: `Запрос цены — ${values.name}`,
    ar: `طلب عرض سعر — ${values.name}`,
  };

  return locale === "tr" || locale === "en"
    ? subject[locale]
    : `${subject[locale]} / Teklif Talebi`;
}

export function quoteMessage(locale: Locale, values: QuoteFormValues): string {
  const labels = QUOTE_LABELS[locale];

  // Boş alanlar mesaja hiç girmez; işletme yalnızca dolu bilgiyi görür.
  const rows: [string, string][] = [
    ["👤", `${labels.name}: ${values.name}`],
    ["📞", `${labels.phone}: ${values.phone}`],
  ];

  if (values.location)
    rows.push(["📍", `${labels.location}: ${values.location}`]);
  if (values.materials.length)
    rows.push(["♻️", `${labels.materials}: ${values.materials.join(", ")}`]);
  if (values.quantity)
    rows.push(["⚖️", `${labels.quantity}: ${values.quantity}`]);
  if (values.dismantling)
    rows.push([
      "🔧",
      `${labels.dismantling}: ${
        values.dismantling === "evet" ? labels.yes : labels.no
      }`,
    ]);
  if (values.note) rows.push(["📝", `${labels.note}: ${values.note}`]);

  const body = rows.map(([icon, text]) => `${icon} ${text}`).join("\n");

  return withTurkishNote(
    `${labels.greeting} ${labels.header}\n\n${body}`,
    locale,
    "Web sitesinden teklif talebi",
  );
}
