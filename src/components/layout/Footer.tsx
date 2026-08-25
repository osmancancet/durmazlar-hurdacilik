import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { ROUTES, hrefFor } from "@/config/routes";
import { MAPS_LINK_URL, SITE } from "@/config/site";
import { SERVICES } from "@/content/services";
import { UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { generalMessage } from "@/lib/messages";
import { EXTERNAL_LINK_PROPS, telHref } from "@/lib/whatsapp";

/**
 * Altbilgi — künye plakası.
 *
 * Dört sütunlu klasik footer yerine, bir belgenin sonundaki künye gibi:
 * alan adı mono etiketle, değeri altında. Adres ve telefon burada veri
 * olarak durur, süs olarak değil.
 */
export function Footer({ locale }: { locale: Locale }) {
  /*
   * Site statik olarak dışa aktarıldığı için bu değer derleme anında
   * sabitlenir — ama elle yazılmış bir yıl gibi eskimez: her yayında
   * kendini günceller.
   */
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc bg-paper-raised">
      <div className="mx-auto max-w-[84rem] px-5 py-14 md:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="measure">
            <Wordmark />

            <p className="mt-6 leading-relaxed text-steel">
              {locale === "tr"
                ? "Soma / Manisa merkezli endüstriyel hurda alımı, tesis sökümü ve ikinci el makine satışı. Fotoğrafınızı gönderin, aynı gün fiyat konuşalım."
                : "Industrial scrap purchasing, plant dismantling and used machinery sales based in Soma / Manisa. Send a photo and we will talk price the same day."}
            </p>

            <WhatsAppButton
              message={generalMessage(locale)}
              size="md"
              className="mt-7"
            >
              {UI.whatsappWrite[locale]}
            </WhatsAppButton>
          </div>

          {/* Künye plakası */}
          <dl className="grid gap-x-14 gap-y-7 sm:grid-cols-2 lg:min-w-[24rem]">
            <div>
              <dt className="label">{UI.address[locale]}</dt>
              <dd className="mt-2">
                <a
                  href={MAPS_LINK_URL}
                  {...EXTERNAL_LINK_PROPS}
                  className="text-sm leading-relaxed text-ink transition-colors hover:text-oxide"
                >
                  {SITE.address.street}
                  <br />
                  {SITE.address.district} / {SITE.address.city}
                </a>
              </dd>
            </div>

            <div>
              <dt className="label">{UI.phone[locale]}</dt>
              <dd className="mt-2">
                <a
                  href={telHref()}
                  className="tap tabular font-mono text-sm font-medium text-ink transition-colors hover:text-oxide"
                >
                  {SITE.phone.display}
                </a>
              </dd>
            </div>

            <div>
              <dt className="label">{UI.workingHours[locale]}</dt>
              <dd className="tabular mt-2 font-mono text-sm text-ink">
                {SITE.hours.weekdays[locale]}
                <br />
                {SITE.hours.weekdayHours}
              </dd>
            </div>

            <div>
              <dt className="label">{UI.serviceArea[locale]}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink">
                {SITE.serviceAreas.join(", ")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-14 grid gap-10 border-t border-zinc pt-10 sm:grid-cols-2">
          <nav aria-label={locale === "tr" ? "Sayfalar" : "Pages"}>
            <h2 className="label">{locale === "tr" ? "Sayfalar" : "Pages"}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
              {ROUTES.map((route) => (
                <li key={route.key}>
                  <Link
                    href={hrefFor(route.key, locale)}
                    className="inline-flex min-h-6 items-center py-1 text-sm text-steel transition-colors hover:text-oxide"
                  >
                    {route.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label">
              {locale === "tr" ? "Hizmetler" : "Services"}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={`${hrefFor("services", locale)}#${service.id}`}
                    className="inline-flex min-h-6 items-center py-1 text-sm text-steel transition-colors hover:text-oxide"
                  >
                    {service.title[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-zinc pt-6 font-mono text-xs text-steel-light">
          © {year} {SITE.name} ·{" "}
          {locale === "tr" ? "Tüm hakları saklıdır" : "All rights reserved"}
        </p>
      </div>
    </footer>
  );
}
