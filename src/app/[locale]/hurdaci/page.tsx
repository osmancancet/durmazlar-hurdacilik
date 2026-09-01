import type { Metadata } from "next";
import { AreasIndexPage } from "@/components/pages/AreasIndexPage";
import { AREAS, AREA_LOCALE } from "@/content/areas";
import {
  areaBreadcrumbJsonLd,
  areaIndexJsonLd,
  buildAreaIndexMetadata,
} from "@/lib/seo";

/**
 * Bölge dizini — /tr/hurdaci/
 *
 * Adres parçası bilerek "hurdaci": aranan şey "kırkağaç hurdacı" ve adres
 * satırının kendisi de bu eşleşmeye katkı veriyor. Rehberle aynı kural
 * geçerli — yalnızca Türkçe üretilir, hreflang bildirmez.
 */
export function generateStaticParams() {
  return [{ locale: AREA_LOCALE }];
}

export function generateMetadata(): Metadata {
  return buildAreaIndexMetadata();
}

export default function Page() {
  return (
    <>
      <AreasIndexPage />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            areaIndexJsonLd(AREAS),
            areaBreadcrumbJsonLd(),
          ]),
        }}
      />
    </>
  );
}
