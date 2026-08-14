import { PageHero } from "@/components/pages/PageHero";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { WhatsAppQuoteForm } from "@/components/whatsapp/WhatsAppQuoteForm";
import { MAPS_EMBED_URL, MAPS_LINK_URL, SITE } from "@/config/site";
import { CONTACT, PAGE_HEADERS, UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { generalMessage, stockRequestMessage } from "@/lib/messages";
import { EXTERNAL_LINK_PROPS, telHref } from "@/lib/whatsapp";

export function ContactPage({ locale }: { locale: Locale }) {
  const header = PAGE_HEADERS.contact;

  return (
    <>
      <PageHero
        label={header.eyebrow[locale]}
        title={header.title[locale]}
        lead={header.lead[locale]}
        aside={
          <a href={telHref()} className="block">
            <span className="label">{UI.phone[locale]}</span>
            <span className="tabular mt-2 block font-display text-xl font-extrabold whitespace-nowrap text-ink transition-colors hover:text-oxide">
              {SITE.phone.display}
            </span>
          </a>
        }
      />

      <Section ruled={false}>
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div>
            <p className="label">
              {locale === "tr" ? "Form" : "Form"}
            </p>
            <h2 className="display mt-3 text-[1.75rem] sm:text-[2.25rem]">
              {CONTACT.formTitle[locale]}
            </h2>
            <p className="measure mt-4 leading-relaxed text-steel">
              {CONTACT.formLead[locale]}
            </p>

            <div className="mt-10">
              <WhatsAppQuoteForm locale={locale} />
            </div>
          </div>

          <aside className="space-y-10">
            {/* Formu doldurmak istemeyenler için doğrudan kanallar. */}
            <div className="border-t-2 border-whatsapp pt-6">
              <h2 className="display text-lg">
                {CONTACT.photoHint.title[locale]}
              </h2>
              <p className="mt-3 leading-relaxed text-steel">
                {CONTACT.photoHint.text[locale]}
              </p>

              <div className="mt-6 space-y-2.5">
                <WhatsAppButton
                  message={generalMessage(locale)}
                  size="md"
                  fullWidth
                >
                  {UI.whatsappWrite[locale]}
                </WhatsAppButton>

                <WhatsAppButton
                  message={stockRequestMessage(locale)}
                  variant="outline"
                  size="md"
                  fullWidth
                >
                  {locale === "tr" ? "Ekipman Arıyorum" : "I Need Equipment"}
                </WhatsAppButton>
              </div>
            </div>

            {/* İletişim künyesi */}
            <dl className="border-t border-zinc">
              <div className="border-b border-zinc py-4">
                <dt className="label">{UI.address[locale]}</dt>
                <dd className="mt-2 leading-relaxed text-ink">
                  {SITE.address.street}
                  <br />
                  {SITE.address.district} / {SITE.address.city}
                  <br />
                  <a
                    href={MAPS_LINK_URL}
                    {...EXTERNAL_LINK_PROPS}
                    className="mt-2 inline-block text-sm font-semibold text-oxide underline-offset-4 hover:underline"
                  >
                    {UI.openInMaps[locale]} →
                  </a>
                </dd>
              </div>

              <div className="border-b border-zinc py-4">
                <dt className="label">{UI.phone[locale]}</dt>
                <dd className="mt-2">
                  <a
                    href={telHref()}
                    className="tabular font-mono font-medium text-ink transition-colors hover:text-oxide"
                  >
                    {SITE.phone.display}
                  </a>
                </dd>
              </div>

              <div className="border-b border-zinc py-4">
                <dt className="label">{UI.workingHours[locale]}</dt>
                <dd className="tabular mt-2 space-y-1 font-mono text-sm">
                  <span className="flex justify-between gap-4 text-ink">
                    <span>{SITE.hours.weekdays[locale]}</span>
                    <span>{SITE.hours.weekdayHours}</span>
                  </span>
                  <span className="flex justify-between gap-4 text-steel">
                    <span>{SITE.hours.sunday[locale]}</span>
                    <span>{SITE.hours.sundayHours[locale]}</span>
                  </span>
                </dd>
              </div>

              <div className="py-4">
                <dt className="label">{UI.serviceArea[locale]}</dt>
                <dd className="mt-2 leading-relaxed text-ink">
                  {SITE.serviceAreas.join(", ")}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>

      <section aria-label={UI.address[locale]} className="border-t border-zinc">
        <iframe
          src={MAPS_EMBED_URL}
          title={`${SITE.name} — ${UI.address[locale]}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[26rem] w-full border-0 grayscale-[0.55]"
        />
      </section>
    </>
  );
}
