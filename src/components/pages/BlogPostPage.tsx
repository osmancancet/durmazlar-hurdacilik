import Link from "next/link";
import { CtaBand } from "@/components/ui/CtaBand";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Rule, Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { hrefFor, routeByKey } from "@/config/routes";
import {
  BLOG_LOCALE,
  BLOG_POSTS,
  blogIndexHref,
  blogPostHref,
  type BlogPost,
} from "@/content/blog";
import { areaBySlug, areaHref, areaIndexHref } from "@/content/areas";
import { UI } from "@/content/ui";
import { formatTrDate } from "@/lib/date";
import { sendPhotosMessage } from "@/lib/messages";
import { BLOG_INDEX } from "@/lib/seo";

/**
 * Tek bir rehber yazısı.
 *
 * Yazı gövdesi tek sütun ve `measure` genişliğinde (~62 karakter) akar;
 * solda kalan sütun künye için ayrılmıştır — tarih, konu, bağlantılar.
 * Sitedeki diğer sayfalarla aynı ızgara: 10rem künye + içerik.
 */
export function BlogPostPage({ post }: { post: BlogPost }) {
  const locale = BLOG_LOCALE;

  /* Bu yazı hariç, listedeki diğerlerinden ilk ikisi. */
  const others = BLOG_POSTS.filter((other) => other.slug !== post.slug).slice(
    0,
    3,
  );

  const areas = (post.areas ?? [])
    .map((slug) => areaBySlug(slug))
    .filter((area) => area !== undefined);

  return (
    <>
      <article>
        <header className="border-b border-zinc px-5 pt-32 pb-14 md:px-8 lg:pt-40 lg:pb-20">
          <div className="mx-auto max-w-[84rem]">
            {/*
              Kırıntı yolu görünür biçimde de basılır — yalnızca JSON-LD'de
              kalsaydı ziyaretçi rehbere dönmek için tarayıcı geri tuşuna
              mahkûm olurdu.
            */}
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
                    href={blogIndexHref()}
                    className="transition-colors hover:text-brand"
                  >
                    {BLOG_INDEX.title}
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[10rem_1fr_auto] lg:gap-12">
              <p className="label lg:pt-4">{post.eyebrow}</p>

              <div className="measure">
                <h1 className="display text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]">
                  {post.title}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-pretty text-steel">
                  {post.lead}
                </p>
              </div>

              <dl className="lg:w-40 lg:pt-3">
                <dt className="label">Güncelleme</dt>
                <dd className="tabular mt-2 font-mono text-sm text-ink">
                  <time dateTime={post.updated}>
                    {formatTrDate(post.updated)}
                  </time>
                </dd>
              </dl>
            </div>
          </div>
        </header>

        <Section ruled={false}>
          <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
            <p className="label lg:pt-2">Yazı</p>

            <div className="measure space-y-12">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="display text-[1.5rem] sm:text-[1.75rem]">
                    {section.heading}
                  </h2>

                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-lg leading-relaxed text-pretty text-ink-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets && (
                    <ul className="mt-6 border-t border-zinc">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.slice(0, 40)}
                          className="border-b border-zinc py-3.5 ps-5 text-pretty text-steel before:absolute before:-ms-5 before:text-brand before:content-['—'] relative"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </Section>

        {post.faq && (
          <Section tone="raised">
            <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
              <p className="label lg:pt-2">Sık Sorulanlar</p>

              <div className="measure">
                <div className="border-t border-zinc">
                  {post.faq.map((item, index) => (
                    <details
                      key={item.question}
                      className="group border-b border-zinc"
                    >
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
            </div>
          </Section>
        )}

        {/* Yazıdan aksiyona geçiş — okuyan kişi zaten fiyat arıyor. */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-12">
            <p className="label lg:pt-2">Sırada</p>

            <div>
              <div className="measure">
                <h2 className="display text-[1.5rem] sm:text-[1.75rem]">
                  Elinizdeki yükün fiyatını sorun
                </h2>
                <p className="mt-4 leading-relaxed text-pretty text-steel">
                  Fotoğrafı, yaklaşık tonajı ve bulunduğunuz yeri yazın; aynı
                  gün ön fiyat söyleyelim.
                </p>

                <WhatsAppButton
                  message={sendPhotosMessage(locale)}
                  locale={locale}
                  size="lg"
                  className="mt-7"
                >
                  {UI.sendPhotos[locale]}
                </WhatsAppButton>
              </div>

              {areas.length > 0 && (
                <>
                  <Rule className="mt-12" />
                  <p className="label mt-12">Bölgeniz</p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
                    {areas.map((area) => (
                      <li key={area.slug}>
                        <Link
                          href={areaHref(area.slug)}
                          className="inline-flex min-h-6 items-center py-1 text-sm text-steel transition-colors hover:text-brand"
                        >
                          {area.name} hurda alımı
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={areaIndexHref()}
                        className="inline-flex min-h-6 items-center py-1 text-sm font-semibold text-ink transition-colors hover:text-brand"
                      >
                        Tüm bölgeler
                      </Link>
                    </li>
                  </ul>
                </>
              )}

              {post.related && post.related.length > 0 && (
                <>
                  <Rule className="mt-12" />
                  <p className="label mt-12">İlgili Sayfalar</p>
                  <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                    {post.related.map((key) => (
                      <li key={key}>
                        <Link
                          href={hrefFor(key, locale)}
                          className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                        >
                          {routeByKey(key).label[locale]}
                          <ArrowRightIcon className="rtl-flip size-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </Section>

        {others.length > 0 && (
          <Section tone="raised">
            <p className="label">Rehberdeki Diğer Yazılar</p>

            <ul className="mt-8 border-t border-zinc">
              {others.map((other) => (
                <li key={other.slug} className="group border-b border-zinc">
                  <Link
                    href={blogPostHref(other.slug)}
                    className="grid items-baseline gap-x-10 gap-y-2 py-6 lg:grid-cols-[10rem_1fr]"
                  >
                    <span className="label">{other.eyebrow}</span>
                    <span className="display text-lg text-ink transition-colors group-hover:text-brand">
                      {other.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={blogIndexHref()}
              className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Tüm rehber yazıları
              <ArrowRightIcon className="rtl-flip size-4" />
            </Link>
          </Section>
        )}
      </article>

      <CtaBand locale={locale} />
    </>
  );
}
