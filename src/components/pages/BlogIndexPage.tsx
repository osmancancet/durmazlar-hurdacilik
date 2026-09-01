import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { BLOG_LOCALE, BLOG_POSTS, blogPostHref } from "@/content/blog";
import { BLOG_INDEX } from "@/lib/seo";
import { formatTrDate } from "@/lib/date";

/**
 * Rehber listesi.
 *
 * Kart ızgarası değil — hizmetler listesiyle aynı saç teli satır düzeni.
 * Sitenin geri kalanı belge dilinde konuşuyor; blog da bir yazı dizini gibi
 * durur, "son yazılar" kutucukları gibi değil.
 */
export function BlogIndexPage() {
  const locale = BLOG_LOCALE;

  return (
    <>
      <PageHero
        label={BLOG_INDEX.eyebrow}
        title={BLOG_INDEX.title}
        lead={BLOG_INDEX.lead}
        aside={
          <dl className="lg:w-44">
            <dt className="label">Yazı</dt>
            <dd className="tabular mt-2 font-mono text-sm text-ink">
              {String(BLOG_POSTS.length).padStart(2, "0")}
            </dd>
          </dl>
        }
      />

      <Section ruled={false}>
        <ul className="border-t border-zinc">
          {BLOG_POSTS.map((post, index) => (
            <Reveal key={post.slug}>
              <li className="group border-b border-zinc">
                <Link
                  href={blogPostHref(post.slug)}
                  className="grid items-baseline gap-x-10 gap-y-3 py-9 lg:grid-cols-[10rem_1fr_auto]"
                >
                  <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
                    <span className="tabular font-mono text-sm font-medium text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="label">{post.eyebrow}</span>
                  </div>

                  <div className="lg:col-start-2">
                    <h2 className="display text-xl text-ink transition-colors group-hover:text-brand sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="measure mt-3 leading-relaxed text-pretty text-steel">
                      {post.description}
                    </p>
                    <p className="tabular mt-3 font-mono text-xs text-steel-light">
                      {formatTrDate(post.updated)}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-brand lg:col-start-3 lg:self-center">
                    Oku
                    <ArrowRightIcon className="rtl-flip size-4" />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
