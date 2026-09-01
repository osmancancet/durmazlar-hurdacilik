import Link from "next/link";
import { CtaBand } from "@/components/ui/CtaBand";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icons";
import { Rule, Section } from "@/components/ui/Section";
import { ContactMenu } from "@/components/whatsapp/ContactMenu";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { hrefFor, routeByKey } from "@/config/routes";
import {
  AREA_LOCALE,
  areaBySlug,
  areaHref,
  areaIndexHref,
  districtsOf,
  type Area,
} from "@/content/areas";
import { blogPostHref, postBySlug } from "@/content/blog";
import { SERVICES } from "@/content/services";
import { UI } from "@/content/ui";
import { areaMessage } from "@/lib/messages";
import { AREA_INDEX } from "@/lib/seo";

/**
 * Tek bir bölge sayfası.
 *
 * Sayfanın gövdesi bu bölgeye ÖZGÜ metinden oluşur (profil, çıkan kalemler,
 * lojistik, o bölgenin soruları). Ortak olan tek şey hizmet listesi ve
 * aksiyonlar — onlar da veriden basılır, kopyalanmış paragraf olarak değil.
 * Kapı sayfası (doorway) üretmemenin yolu bu ayrım.
 */
export function AreaPage({ area }: { area: Area }) {
  const locale = AREA_LOCALE;
  const province = area.provinceSlug ? areaBySlug(area.provinceSlug) : undefined;

  /* İl sayfasında kendi ilçeleri, ilçe sayfasında kardeş ilçeler. */
  const siblings = (
    area.kind === "il" ? districtsOf(area.slug) : districtsOf(area.provinceSlug ?? "")
  ).filter((other) => other.slug !== area.slug);

  const posts = (area.posts ?? [])
    .map((slug) => postBySlug(slug))
    .filter((post) => post !== undefined);

  return (
    <>
      <article>
        <header className="border-b border-zinc px-5 pt-32 pb-14 md:px-8 lg:pt-40 lg:pb-20">
          <div className="mx-auto max-w-[84rem]">
            <nav aria-label="Kırıntı yolu" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-steel">
                <li>
                  <Link
                    href={hrefFor("home", locale)}
                    className="transition-colors hover:text-brand"
                  >
                    Anasayfa
                  </Link>
                </li>
                <li aria-hidden className="text-zinc">
                  ›
                </li>
                <li>
                  <Link
                    href={areaIndexHref()}
                    className="transition-colors hover:text-brand"
                  >
                    {AREA_INDEX.title}
                  </Link>
                </li>
                {province && (
                  <>
                    <li aria-hidden className="text-zinc">
                      ›
                    </li>
                    <li>
                      <Link
                        href={areaHref(province.slug)}
                        className="transition-colors hover:text-brand"
                      >
                        {province.name}
                      </Link>
                    </li>
                  </>
                )}
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[10rem_1fr_auto] lg:gap-12">
              <p className="label lg:pt-4">
                {area.kind === "il" ? "İl" : area.province}
              </p>

              <div className="measure">
                <h1 className="display text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]">
                  {area.title}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-pretty text-steel">
                  {area.lead}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <WhatsAppButton
                    message={areaMessage(locale, area.name)}
                    locale={locale}
                    size="lg"
                  >
                    {UI.sendPhotos[locale]}
                  </WhatsAppButton>

                  <ContactMenu mode="tel" locale={locale}>
                    <span className="inline-flex cursor-pointer items-center gap-2.5 border border-zinc px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
                      <PhoneIcon className="size-4 text-brand" />
                      {UI.callUs[locale]}
                    </span>
                  </ContactMenu>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Bölgenin profili — bu sayfanın kendine ait metni. */}
        <Section ruled={false}>
          <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
            <p className="label lg:pt-2">{area.name}&apos;da Ne Çıkıyor</p>

            <div className="measure space-y-5">
              {area.profile.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-lg leading-relaxed text-pretty text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Section>

        <Section tone="raised">
          <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
            <p className="label lg:pt-2">Aldığımız Kalemler</p>

            <div>
              <ul className="measure border-t border-zinc">
                {area.materials.map((item) => (
                  <li
                    key={item.slice(0, 40)}
                    className="relative border-b border-zinc py-3.5 ps-5 text-pretty text-ink-soft before:absolute before:-ms-5 before:text-brand before:content-['—']"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={hrefFor("materials", locale)}
                className="mt-7 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {routeByKey("materials").label[locale]}
                <ArrowRightIcon className="rtl-flip size-4" />
              </Link>
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
            <p className="label lg:pt-2">Nasıl Çalışıyoruz</p>

            <div>
              <p className="measure text-lg leading-relaxed text-pretty text-ink-soft">
                {area.logistics}
              </p>

              {/*
                Hizmetler burada paragraf olarak TEKRARLANMAZ; kayıt
                defterinden basılan bağlantı listesi olarak durur. Yirmi bir
                bölge sayfasında yirmi bir kez yazılmış aynı hizmet metni,
                sayfaları birbirinin kopyası hâline getirirdi.
              */}
              <ul className="mt-9 grid gap-x-10 gap-y-4 border-t border-zinc pt-7 sm:grid-cols-2">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`${hrefFor("services", locale)}#${service.id}`}
                      className="group inline-flex items-baseline gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
                    >
                      <span className="font-mono text-xs text-brand">—</span>
                      {service.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section tone="raised">
          <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
            <p className="label lg:pt-2">{area.name} — Sık Sorulanlar</p>

            <div className="measure border-t border-zinc">
              {area.faq.map((item, index) => (
                <details key={item.question} className="group border-b border-zinc">
                  <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 text-start [&::-webkit-details-marker]:hidden">
                    <span className="tabular shrink-0 font-mono text-xs font-medium text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-semibold text-ink transition-colors group-hover:text-brand">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 font-mono text-lg leading-none text-steel"
                    >
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>

                  <p className="pb-6 ps-[2.5rem] leading-relaxed text-pretty text-steel">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {(siblings.length > 0 || posts.length > 0) && (
          <Section>
            <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
              <p className="label lg:pt-2">Devamı</p>

              <div>
                {siblings.length > 0 && (
                  <>
                    <h2 className="display text-[1.25rem]">
                      {area.kind === "il"
                        ? `${area.name} ilçeleri`
                        : `${area.province}'da diğer ilçeler`}
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
                      {siblings.map((other) => (
                        <li key={other.slug}>
                          <Link
                            href={areaHref(other.slug)}
                            className="inline-flex min-h-6 items-center py-1 text-sm text-steel transition-colors hover:text-brand"
                          >
                            {other.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {posts.length > 0 && (
                  <>
                    <Rule className="mt-10" />
                    <h2 className="display mt-10 text-[1.25rem]">
                      İşinize yarayabilir
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {posts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={blogPostHref(post.slug)}
                            className="group inline-flex items-baseline gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
                          >
                            <ArrowRightIcon className="rtl-flip size-4 text-brand" />
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Rule className="mt-10" />
                <Link
                  href={areaIndexHref()}
                  className="mt-10 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  Tüm hizmet bölgeleri
                  <ArrowRightIcon className="rtl-flip size-4" />
                </Link>
              </div>
            </div>
          </Section>
        )}
      </article>

      <CtaBand locale={locale} />
    </>
  );
}
