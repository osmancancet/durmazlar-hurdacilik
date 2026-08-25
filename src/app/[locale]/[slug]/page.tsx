import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { MaterialsPage } from "@/components/pages/MaterialsPage";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { SUB_ROUTES, routeBySlug } from "@/config/routes";
import { FAQ } from "@/content/faq";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

/**
 * Ana sayfa dışındaki beş sayfa.
 *
 * Adres parçası dile göre değişir (/tr/hizmetler/ ↔ /en/services/); eşleşme
 * config/routes.ts'teki kayıt defterinden yapılır.
 */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SUB_ROUTES.map((route) => ({ locale, slug: route.slug[locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const route = routeBySlug(slug, locale);
  if (!route) return {};

  return buildMetadata(route.key, locale);
}

const PAGES: Record<string, (props: { locale: Locale }) => React.ReactNode> = {
  services: ServicesPage,
  materials: MaterialsPage,
  gallery: GalleryPage,
  about: AboutPage,
  contact: ContactPage,
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const route = routeBySlug(slug, locale);
  if (!route || route.key === "home") notFound();

  const Component = PAGES[route.key];
  if (!Component) notFound();

  return (
    <>
      <Component locale={locale} />

      {/* Kırıntı yolu — her alt sayfa kendi izini bildirir. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(route.key, locale)),
        }}
      />

      {/* SSS yalnızca hakkımızda sayfasında; zengin sonuç için. */}
      {route.key === "about" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(FAQ, locale)),
          }}
        />
      )}
    </>
  );
}
