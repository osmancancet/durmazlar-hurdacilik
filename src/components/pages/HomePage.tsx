import Link from "next/link";
import { CtaBand } from "@/components/ui/CtaBand";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icons";
import { ContactMenu } from "@/components/whatsapp/ContactMenu";
import { Reveal } from "@/components/ui/Reveal";
import { Rule, Section, SectionHeading } from "@/components/ui/Section";
import { SpecStrip } from "@/components/ui/SpecStrip";
import { VideoSlider } from "@/components/ui/VideoSlider";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { hrefFor } from "@/config/routes";
import { GALLERY_PREVIEW } from "@/content/gallery";
import { SERVICES } from "@/content/services";
import { HOME, UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { sendPhotosMessage, serviceMessage } from "@/lib/messages";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Services locale={locale} />
      <Process locale={locale} />
      <GalleryPreview locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

/**
 * Hero — sayfanın tezi.
 *
 * Başlık fotoğrafın üstüne binmiyor: önce kâğıt üzerinde kurulan bir beyan,
 * sonra onu kanıtlayan tam genişlik plaka, sonra künye şeridi. Belge önce,
 * kanıt sonra. Bu, "fotoğrafın üstüne beyaz yazı" kalıbından bilinçli kopuş.
 */
function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="pt-32 lg:pt-40">
      <div className="mx-auto max-w-[84rem] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="label">{HOME.hero.eyebrow[locale]}</p>

            <h1 className="display mt-6 text-[2.75rem] sm:text-[4rem] lg:text-[5.25rem]">
              {HOME.hero.title[locale]}
            </h1>
          </div>

          <div className="measure-tight lg:pb-3">
            <p className="text-lg leading-relaxed text-pretty text-ink-soft">
              {HOME.hero.lead[locale]}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <WhatsAppButton
                message={sendPhotosMessage(locale)}
                locale={locale}
                size="lg"
              >
                {UI.sendPhotos[locale]}
              </WhatsAppButton>

              {/* İki yetkili var; numara yerine seçim açılır. */}
              <ContactMenu mode="tel" locale={locale}>
                <span className="inline-flex cursor-pointer items-center gap-2.5 border border-zinc px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
                  <PhoneIcon className="size-4 text-brand" />
                  {UI.callUs[locale]}
                </span>
              </ContactMenu>
            </div>

            <p className="mt-4 text-sm text-steel">{HOME.hero.note[locale]}</p>
          </div>
        </div>
      </div>

      {/*
        Tezin kanıtı. Tek bir sabit fotoğraf sahanın ölçeğini anlatamıyordu;
        havadan çekilmiş üç klip anlatıyor. Bu işte müşterinin ilk sorusu
        "bu tonajı kaldırır mısınız" — cevabı burada, iddia olarak değil
        görüntü olarak duruyor.
      */}
      <div className="mt-14 lg:mt-20">
        <VideoSlider locale={locale} />
      </div>

      <div className="mx-auto max-w-[84rem] px-5 md:px-8">
        <SpecStrip
          items={HOME.specs.map((spec) => ({
            label: spec.label[locale],
            value: spec.value[locale],
            note: spec.note[locale],
          }))}
        />
      </div>
    </section>
  );
}

/**
 * Hizmetler — kart değil, saç teli çizgilerle ayrılmış satırlar.
 * Her satır kendi WhatsApp bağlantısını taşır.
 */
function Services({ locale }: { locale: Locale }) {
  return (
    <Section ruled={false} className="pt-16 lg:pt-24">
      <SectionHeading
        label={HOME.servicesSection.eyebrow[locale]}
        title={HOME.servicesSection.title[locale]}
        lead={HOME.servicesSection.lead[locale]}
        action={
          <Link
            href={hrefFor("services", locale)}
            className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            {UI.allServices[locale]}
            <ArrowRightIcon className="rtl-flip size-4" />
          </Link>
        }
      />

      <ul className="mt-14 border-t border-zinc">
        {SERVICES.map((service) => (
          <Reveal key={service.id}>
            <li className="group border-b border-zinc">
              <div className="grid items-baseline gap-x-10 gap-y-4 py-8 lg:grid-cols-[10rem_1fr_auto]">
                <Link
                  href={`${hrefFor("services", locale)}#${service.id}`}
                  className="display text-xl text-ink transition-colors group-hover:text-brand lg:col-start-2"
                >
                  {service.title[locale]}
                </Link>

                <p className="measure text-steel lg:col-start-2">
                  {service.summary[locale]}
                </p>

                <div className="lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-center">
                  <WhatsAppButton
                    message={serviceMessage(locale, service.title[locale])}
                    locale={locale}
                    align="end"
                    variant="outline"
                    size="sm"
                    ariaLabel={`${service.title[locale]} — ${UI.whatsappWrite[locale]}`}
                  >
                    {UI.whatsappShort[locale]}
                  </WhatsAppButton>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/** Süreç — numaralandırma burada gerçek bir sıra bildirir. */
function Process({ locale }: { locale: Locale }) {
  return (
    <Section tone="raised">
      <SectionHeading
        label={HOME.processSection.eyebrow[locale]}
        title={HOME.processSection.title[locale]}
      />

      <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {HOME.processSection.steps.map((step, index) => (
          <Reveal key={step.title.tr} delay={index * 0.07}>
            <li className="border-t border-ink pt-5">
              <span className="tabular font-mono text-sm font-medium text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-3 text-lg">{step.title[locale]}</h3>
              <p className="mt-2.5 leading-relaxed text-steel">
                {step.text[locale]}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function GalleryPreview({ locale }: { locale: Locale }) {
  return (
    <Section>
      <SectionHeading
        label={HOME.gallerySection.eyebrow[locale]}
        title={HOME.gallerySection.title[locale]}
        lead={HOME.gallerySection.lead[locale]}
        action={
          <Link
            href={hrefFor("gallery", locale)}
            className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            {UI.allPhotos[locale]}
            <ArrowRightIcon className="rtl-flip size-4" />
          </Link>
        }
      />

      <Rule className="mt-12" />

      <div className="mt-12">
        <GalleryGrid
          items={GALLERY_PREVIEW}
          locale={locale}
          showFilters={false}
          startIndex={1}
        />
      </div>
    </Section>
  );
}
