import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  AREAS,
  AREA_LOCALE,
  areaHref,
  districtsOf,
} from "@/content/areas";
import { SITE } from "@/config/site";
import { AREA_INDEX } from "@/lib/seo";

/**
 * Bölge dizini.
 *
 * İl → ilçe sırasıyla, iç içe değil yan yana: her il bir blok, altında o ilin
 * ilçeleri. Ziyaretçinin aradığı şey tek bir yer adı; onu bir açılır menüde
 * saklamak yerine sayfanın üstünde okunur hâlde bırakıyoruz.
 */
export function AreasIndexPage() {
  const provinces = AREAS.filter((area) => area.kind === "il");

  return (
    <>
      <PageHero
        label={AREA_INDEX.eyebrow}
        title={AREA_INDEX.title}
        lead={AREA_INDEX.lead}
        aside={
          <dl className="lg:w-44">
            <dt className="label">Merkez</dt>
            <dd className="mt-2 font-mono text-sm text-ink">
              {SITE.address.district} / {SITE.address.city}
            </dd>
            <dt className="label mt-5">Bölge</dt>
            <dd className="tabular mt-2 font-mono text-sm text-ink">
              {SITE.serviceAreas.length} il · {AREAS.length} sayfa
            </dd>
          </dl>
        }
      />

      {provinces.map((province, index) => {
        const districts = districtsOf(province.slug);

        return (
          <Section
            key={province.slug}
            ruled={index > 0}
            tone={index % 2 === 1 ? "raised" : "paper"}
          >
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-12">
                <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
                  <span className="tabular font-mono text-sm font-medium text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="label">İl</span>
                </div>

                <div>
                  <Link
                    href={areaHref(province.slug)}
                    className="group inline-flex items-baseline gap-3"
                  >
                    <h2 className="display text-[1.75rem] text-ink transition-colors group-hover:text-brand sm:text-[2.25rem]">
                      {province.name}
                    </h2>
                    <ArrowRightIcon className="rtl-flip size-4 text-brand" />
                  </Link>

                  <p className="measure mt-4 leading-relaxed text-pretty text-steel">
                    {province.description}
                  </p>

                  {districts.length > 0 && (
                    <ul className="mt-8 border-t border-zinc">
                      {districts.map((district) => (
                        <li key={district.slug} className="group border-b border-zinc">
                          <Link
                            href={areaHref(district.slug)}
                            className="grid items-baseline gap-x-8 gap-y-1.5 py-4 sm:grid-cols-[9rem_1fr]"
                          >
                            <span className="display text-base text-ink transition-colors group-hover:text-brand">
                              {district.name}
                            </span>
                            <span className="text-sm leading-relaxed text-steel">
                              {district.lead}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/*
                    Kendi sayfası olmayan ilçeler burada düz metin olarak
                    durur. Bilerek: hakkında somut bir şey yazamadığımız yer
                    için sayfa açmak kapı sayfası üretmek olurdu.
                  */}
                  {province.alsoCovers && province.alsoCovers.length > 0 && (
                    <p className="mt-6 text-sm leading-relaxed text-steel-light">
                      <span className="label">Ayrıca gidiyoruz</span>{" "}
                      <span className="ms-1">
                        {province.alsoCovers.join(" · ")}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          </Section>
        );
      })}

      <CtaBand locale={AREA_LOCALE} />
    </>
  );
}
