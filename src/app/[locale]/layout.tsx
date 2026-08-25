import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Poppins, Source_Sans_3 } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/whatsapp/FloatingWhatsApp";
import { MobileCallBar } from "@/components/whatsapp/MobileCallBar";
import { SITE } from "@/config/site";
import { HTML_LANG, LOCALES, isLocale } from "@/lib/i18n";
import { localBusinessJsonLd, siteNavigationJsonLd } from "@/lib/seo";
import "../globals.css";

/*
 * Üç rol, üç yüz. Hepsi `latin-ext` alt kümesiyle yüklenir — Türkçe'nin
 * ş/ğ/ı/İ/ö/ü/ç karakterleri bu kümede. next/font derleme anında dosyaları
 * projeye gömer; tarayıcı harici bir sunucuya istek atmaz.
 */

/**
 * Başlık ve etiket: kimliğin yazı karakteri.
 *
 * Kurumsal kimlik Poppins'in Bold ve Medium kesimlerini belirtiyor; kelime
 * markası 700, kartvizitteki harf aralıklı alt satır 500. Sitede de aynı iki
 * ağırlık kullanılır, üçüncü bir kesim eklenmez.
 */
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/** Gövde: hümanist, küçük puntoda okunaklı, başlıkla yarışmaz. */
const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-source",
  display: "swap",
});

/** Veri: kantar fişi sesi — etiketler, telefon, tonaj, künyeler, indeksler. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  applicationName: SITE.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f2f5f9",
  width: "device-width",
  initialScale: 1,
};

/** Statik export: her dil için bir kabuk üretilir. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Kök düzen — [locale] altında durur ki <html lang> gerçekten dile göre
 * değişsin. (Next 16'nın önerdiği yapı: kök düzen dinamik dil segmentinin
 * içinde yer alır.)
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${poppins.variable} ${sourceSans.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Beliriş efekti JavaScript'e bağlı; JS kapalıysa bölümler
            gizli kalmasın diye efekt tamamen devre dışı bırakılır. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-paper"
        >
          {locale === "tr" ? "İçeriğe geç" : "Skip to content"}
        </a>

        <Header locale={locale} />

        {/* pb-16: mobil alt aksiyon çubuğu son satırı örtmesin. */}
        <main id="main" className="pb-16 md:pb-0">
          {children}
        </main>

        <Footer locale={locale} />

        <FloatingWhatsApp locale={locale} />
        <MobileCallBar locale={locale} />

        <script
          type="application/ld+json"
          // Google'a işletmeyi ve menüyü tanıtan yapılandırılmış veri.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              localBusinessJsonLd(locale),
              siteNavigationJsonLd(locale),
            ]),
          }}
        />
      </body>
    </html>
  );
}
