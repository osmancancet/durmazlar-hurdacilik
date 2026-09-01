import Link from "next/link";
import { SITE } from "@/config/site";
import { AREA_LOCALE, areaIndexHref } from "@/content/areas";
import type { Locale } from "@/lib/i18n";

/**
 * Künyelerdeki "Hizmet Bölgesi" değeri.
 *
 * Türkçede bölge dizinine bağlanır, diğer dillerde düz metin kalır —
 * dizin yalnızca Türkçe yayımlanıyor.
 *
 * NEDEN VAR: bu satır zaten altbilgide, hakkımızda ve iletişim
 * sayfalarında üç kez basılıyordu ve üçü de aynı illeri sayıyordu. Menüde
 * "Bölgeler" girdisi bulunmadığına göre bölge sayfalarının site içinden
 * aldığı bağlantı önem kazanıyor; illeri okuyan kişinin zaten aradığı şey
 * "benim ilime geliyor musunuz" ve cevabın bulunduğu sayfa bir tık ötede
 * olmalı.
 */
export function ServiceAreaValue({
  locale,
  separator = ", ",
}: {
  locale: Locale;
  /** İller arasındaki ayraç — künyeden künyeye değişiyor. */
  separator?: string;
}) {
  const areas = SITE.serviceAreas.join(separator);

  if (locale !== AREA_LOCALE) return <>{areas}</>;

  return (
    <Link
      href={areaIndexHref()}
      className="underline decoration-zinc underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
    >
      {areas}
    </Link>
  );
}
