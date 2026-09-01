/**
 * Türkçe tarih biçimi — "1 Eylül 2026".
 *
 * `Intl.DateTimeFormat` KULLANILMIYOR: site statik olarak dışa aktarılıyor ve
 * bu metinler derleme anında HTML'e gömülüyor. Çıktının, derlemenin çalıştığı
 * makinedeki ICU sürümüne göre değişmesini istemiyoruz — aynı kaynak her
 * yerde aynı HTML üretmeli.
 */
const AYLAR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

/** ISO tarihini (YYYY-MM-DD) Türkçe okunur biçime çevirir. */
export function formatTrDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${AYLAR[month - 1]} ${year}`;
}
