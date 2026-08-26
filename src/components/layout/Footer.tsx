import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { ROUTES, hrefFor } from "@/config/routes";
import { MAPS_LINK_URL, SITE } from "@/config/site";
import { SERVICES } from "@/content/services";
import { FOOTER, UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { generalMessage } from "@/lib/messages";
import { CONTACTS, EXTERNAL_LINK_PROPS, telHref } from "@/lib/whatsapp";

/**
 * Altbilgi — künye plakası.
 *
 * Dört sütunlu klasik footer yerine, bir belgenin sonundaki künye gibi:
 * alan adı etiketle, değeri altında. Adres ve telefon burada veri olarak
 * durur, süs olarak değil.
 *
 * Kimlikten iki aygıt taşındı: üst kenardaki lacivert→mavi degrade şerit
 * (kartvizitin arka yüzündeki dikey bant) ve sağ alt köşedeki soluk amblem
 * filigranı. İkisi de kartvizitin birebir karşılığı.
 */
export function Footer({ locale }: { locale: Locale }) {
  /*
   * Site statik olarak dışa aktarıldığı için bu değer derleme anında
   * sabitlenir — ama elle yazılmış bir yıl gibi eskimez: her yayında
   * kendini günceller.
   */
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-paper-raised">
      {/* Kimliğin degrade şeridi — altbilgiyi sayfadan ayıran kenar. */}
      <div className="brand-gradient h-1 w-full" />

      {/*
        Amblem filigranı. Süs değil, kartvizitin arka yüzündeki aygıtın aynısı.
        aria-hidden: ekran okuyucuya taşıyacak bir bilgisi yok.

        Taşan kısım altbilginin değil, filigranın KENDİ kabında kırpılır:
        altbilgiye `overflow-hidden` verilseydi içindeki iletişim listesi
        açıldığında kırpılırdı.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <Image
          src="/brand/ikon.svg"
          alt=""
          width={340}
          height={340}
          className="absolute -end-16 -bottom-16 opacity-[0.05]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[84rem] px-5 py-14 md:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="measure">
            <Wordmark />

            <p className="mt-6 leading-relaxed text-steel">
              {FOOTER.blurb[locale]}
            </p>

            <WhatsAppButton
              message={generalMessage(locale)}
              locale={locale}
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
                  className="text-sm leading-relaxed text-ink transition-colors hover:text-brand"
                >
                  {SITE.address.street}
                  <br />
                  {SITE.address.district} / {SITE.address.city}
                </a>
              </dd>
            </div>

            <div>
              <dt className="label">{UI.phone[locale]}</dt>
              {/*
                Künye bir veri listesi, aksiyon değil — burada seçim menüsü
                açmak gereksiz. İki yetkili adıyla birlikte yazılır.
              */}
              <dd className="mt-2 space-y-2">
                {CONTACTS.map((contact) => (
                  <a
                    key={contact.id}
                    href={telHref(contact)}
                    className="block"
                  >
                    <span className="block text-sm font-semibold text-ink">
                      {contact.name}
                    </span>
                    <span className="tabular block font-mono text-sm text-steel transition-colors hover:text-brand">
                      {contact.display}
                    </span>
                  </a>
                ))}
              </dd>
            </div>

            {/*
              E-posta künyede tam satır kaplar: adres 30 karakter, iki
              sütunlu ızgarada bir sütuna sığmaz ve ortasından bölünürdü.
              `SITE.email` boşsa satır hiç basılmaz.
            */}
            {SITE.email && (
              <div className="sm:col-span-2">
                <dt className="label">{UI.email[locale]}</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-mono text-sm break-all text-steel transition-colors hover:text-brand"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
            )}

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
          <nav aria-label={FOOTER.pages[locale]}>
            <h2 className="label">{FOOTER.pages[locale]}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
              {ROUTES.map((route) => (
                <li key={route.key}>
                  <Link
                    href={hrefFor(route.key, locale)}
                    className="inline-flex min-h-6 items-center py-1 text-sm text-steel transition-colors hover:text-brand"
                  >
                    {route.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label">{FOOTER.services[locale]}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={`${hrefFor("services", locale)}#${service.id}`}
                    className="inline-flex min-h-6 items-center py-1 text-sm text-steel transition-colors hover:text-brand"
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
          {FOOTER.rights[locale]}
        </p>
      </div>
    </footer>
  );
}
