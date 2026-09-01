import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FullBleedPlate, Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceAreaValue } from "@/components/ui/ServiceAreaValue";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SITE } from "@/config/site";
import { ABOUT, LABELS, PAGE_HEADERS, UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export function AboutPage({ locale }: { locale: Locale }) {
  const header = PAGE_HEADERS.about;

  return (
    <>
      <PageHero
        label={header.eyebrow[locale]}
        title={header.title[locale]}
        lead={header.lead[locale]}
        aside={
          <dl className="lg:w-44">
            <dt className="label">{LABELS.basedIn[locale]}</dt>
            <dd className="mt-2 font-mono text-sm text-ink">
              {SITE.address.district} / {SITE.address.city}
            </dd>
            <dt className="label mt-5">
              {UI.serviceArea[locale]}
            </dt>
            <dd className="mt-2 font-mono text-sm leading-relaxed text-ink">
              <ServiceAreaValue locale={locale} separator=" · " />
            </dd>
          </dl>
        }
      />

      {/* Hikâye — tek sütun akış, çok sütuna bölünmez. */}
      <Section ruled={false}>
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
          <p className="label lg:pt-2">
            {LABELS.story[locale]}
          </p>

          <div className="measure">
            <h2 className="display text-[1.75rem] sm:text-[2.25rem]">
              {ABOUT.story.title[locale]}
            </h2>

            <div className="mt-6 space-y-5 text-lg">
              {ABOUT.story.paragraphs[locale].map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="leading-relaxed text-pretty text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <FullBleedPlate
        src="/images/maden-delici-1.webp"
        alt={
          locale === "tr"
            ? "Sahamıza gelen yeraltı maden delici makinesi"
            : "An underground mining drill rig received into our yard"
        }
        caption={
          locale === "tr"
            ? "Maden delici — söküm için gelen ekipman"
            : "Drill rig — equipment received for dismantling"
        }
      />

      <Section ruled={false}>
        <SectionHeading
          label={LABELS.howWeWork[locale]}
          title={ABOUT.principles.title[locale]}
        />

        <ul className="mt-12 border-t border-ink">
          {ABOUT.principles.items.map((item, index) => (
            <Reveal key={item.title.tr} delay={index * 0.06}>
              <li className="grid gap-x-10 gap-y-3 border-b border-zinc py-7 lg:grid-cols-[10rem_1fr]">
                <span className="tabular font-mono text-xs font-medium text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-lg">{item.title[locale]}</h3>
                  <p className="measure mt-2.5 leading-relaxed text-pretty text-steel">
                    {item.text[locale]}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="label">
                {LABELS.recycling[locale]}
              </p>
              <h2 className="display mt-4 text-[1.75rem] sm:text-[2.25rem]">
                {ABOUT.environment.title[locale]}
              </h2>
              <div className="mt-6 space-y-5">
                {ABOUT.environment.paragraphs[locale].map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="leading-relaxed text-pretty text-steel"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Plate
              src="/images/platform-izgarasi-1.webp"
              alt={
                locale === "tr"
                  ? "Ayrıştırılmak üzere istiflenmiş galvaniz platform ızgaraları"
                  : "Galvanised platform grating stacked for sorting"
              }
              ratio="4/3"
              caption={
                locale === "tr"
                  ? "Platform ızgarası"
                  : "Platform grating"
              }
              meta={
                locale === "tr"
                  ? "Ayrıştırılmak üzere istiflendi"
                  : "Stacked for sorting"
              }
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading
          label={LABELS.faqLabel[locale]}
          title={
            LABELS.faqTitle[locale]
          }
        />

        <div className="mt-12 lg:ps-[13rem]">
          <FaqAccordion locale={locale} />
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
