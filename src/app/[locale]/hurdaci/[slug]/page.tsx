import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaPage } from "@/components/pages/AreaPage";
import { AREAS, AREA_LOCALE, areaBySlug } from "@/content/areas";
import {
  areaBreadcrumbJsonLd,
  areaServiceJsonLd,
  plainFaqJsonLd,
  buildAreaMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return AREAS.map((area) => ({ locale: AREA_LOCALE, slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) return {};

  return buildAreaMetadata(area);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  const province = area.provinceSlug ? areaBySlug(area.provinceSlug) : undefined;

  return (
    <>
      <AreaPage area={area} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            areaServiceJsonLd(area),
            areaBreadcrumbJsonLd(area, province),
            /* Bölgenin kendi soruları — sayfa başına ayrı SSS zengin sonucu. */
            plainFaqJsonLd(area.faq),
          ]),
        }}
      />
    </>
  );
}
