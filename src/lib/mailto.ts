/**
 * E-posta bağlantısı üreticisi.
 *
 * Site statik olarak yayınlandığı için (`output: "export"`) arkada mail
 * gönderebilecek bir uç nokta yok. Bu yüzden e-posta gönderimi `mailto:` ile
 * yapılır: form alanları ziyaretçinin KENDİ e-posta uygulamasında hazır bir
 * taslağa dönüşür, göndermeyi o tamamlar. Mesaj işletmeye ziyaretçinin kendi
 * adresinden ulaşır, dolayısıyla doğrudan yanıtlanabilir.
 *
 * BİLİNEN SINIRI: e-posta uygulaması tanımlı olmayan bir masaüstü tarayıcıda
 * (Gmail'i sekmeden kullananların bir kısmı) bağlantı hiçbir şey açmaz.
 * Arayüz bu yüzden WhatsApp'ı birincil yol olarak tutar ve e-posta butonunun
 * altında ne olacağını yazar — kimse "gönderdim" sanıp beklemede kalmasın.
 */
import { SITE } from "@/config/site";

/**
 * Gövde üst sınırı.
 *
 * Tarayıcılar ve posta istemcileri mailto adresinin uzunluğunu sınırlar;
 * pratikte ~2000 karakterden sonrası sessizce kırpılır. Kırpma işini
 * istemciye bırakmak yerine burada yapıyoruz: uzun bir "not" alanı yüzünden
 * mesajın cümle ortasında kesilmesindense, kesildiği görünsün.
 */
const MAX_BODY = 1500;

/** Ön doldurulmuş taslakla e-posta uygulamasını açan adres. */
export function mailtoHref(subject: string, body: string): string {
  const trimmed =
    body.length > MAX_BODY ? `${body.slice(0, MAX_BODY)}…` : body;

  return (
    `mailto:${SITE.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(trimmed)}`
  );
}
