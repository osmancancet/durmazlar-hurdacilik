import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { Section } from "@/components/ui/Section";
import { GALLERY } from "@/content/gallery";
import { LABELS, PAGE_HEADERS } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export function GalleryPage({ locale }: { locale: Locale }) {
  const header = PAGE_HEADERS.gallery;

  return (
    <>
      <PageHero
        label={header.eyebrow[locale]}
        title={header.title[locale]}
        lead={header.lead[locale]}
        aside={
          <dl className="lg:w-40">
            <dt className="label">{LABELS.plates[locale]}</dt>
            <dd className="tabular mt-2 font-display text-3xl font-bold text-ink">
              {GALLERY.length}
            </dd>
          </dl>
        }
      />

      <Section ruled={false}>
        <GalleryGrid items={GALLERY} locale={locale} />
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
