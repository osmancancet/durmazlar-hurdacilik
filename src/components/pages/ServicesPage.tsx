import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { CheckIcon } from "@/components/ui/Icons";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { SERVICES } from "@/content/services";
import { LABELS, PAGE_HEADERS, UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { serviceMessage } from "@/lib/messages";

export function ServicesPage({ locale }: { locale: Locale }) {
  const header = PAGE_HEADERS.services;

  return (
    <>
      <PageHero
        label={header.eyebrow[locale]}
        title={header.title[locale]}
        lead={header.lead[locale]}
        aside={
          // Gerçek bir içindekiler tablosu — numaralar burada bilgi taşıyor,
          // süs değil: her satır sayfadaki bölüme götürüyor.
          <nav
            aria-label={LABELS.onThisPage[locale]}
            className="lg:w-56"
          >
            <p className="label">
              {LABELS.contents[locale]}
            </p>
            <ol className="mt-3 border-t border-zinc">
              {SERVICES.map((service, index) => (
                <li key={service.id} className="border-b border-zinc">
                  <a
                    href={`#${service.id}`}
                    className="flex items-baseline gap-3 py-2.5 text-sm text-steel transition-colors hover:text-brand"
                  >
                    <span className="tabular font-mono text-xs text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {service.title[locale]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {SERVICES.map((service, index) => {
        const flipped = index % 2 === 1;

        return (
          <Section
            key={service.id}
            id={service.id}
            tone={flipped ? "raised" : "paper"}
            ruled={index > 0}
          >
            <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
              <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
                <span className="tabular font-mono text-sm font-medium text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="label">
                  {LABELS.service[locale]}
                </span>
              </div>

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal className={flipped ? "lg:order-2" : ""}>
                  <Plate
                    src={`/images/${service.image}.webp`}
                    alt={service.title[locale]}
                    ratio="4/3"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </Reveal>

                <Reveal delay={0.08}>
                  <div>
                    <h2 className="display text-[1.75rem] sm:text-[2.25rem]">
                      {service.title[locale]}
                    </h2>

                    <div className="mt-5 space-y-4">
                      {service.description[locale].map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="leading-relaxed text-pretty text-steel"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <p className="label mt-8">
                      {LABELS.scope[locale]}
                    </p>
                    <ul className="mt-3 border-t border-zinc">
                      {service.bullets[locale].map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 border-b border-zinc py-3"
                        >
                          <CheckIcon className="mt-1 size-4 shrink-0 text-brand" />
                          <span className="text-sm text-ink-soft">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <WhatsAppButton
                      message={serviceMessage(locale, service.title[locale])}
                      locale={locale}
                      size="lg"
                      className="mt-8"
                      ariaLabel={`${service.title[locale]} — ${UI.whatsappWrite[locale]}`}
                    >
                      {UI.getQuote[locale]}
                    </WhatsAppButton>
                  </div>
                </Reveal>
              </div>
            </div>
          </Section>
        );
      })}

      <CtaBand locale={locale} />
    </>
  );
}
