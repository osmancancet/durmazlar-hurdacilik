import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/pages/BlogIndexPage";
import { BLOG_LOCALE, BLOG_POSTS } from "@/content/blog";
import { blogBreadcrumbJsonLd, blogIndexJsonLd, buildBlogIndexMetadata } from "@/lib/seo";

/**
 * Rehber listesi — /tr/blog/
 *
 * `generateStaticParams` YALNIZCA Türkçeyi döndürür; /en/blog/, /ru/blog/ ve
 * /ar/blog/ hiç üretilmez. Rehber tek dilli (bkz. src/content/blog.ts) ve
 * boş bir çeviri kabuğu üretmek, arama motoruna içeriksiz üç adres sunmak
 * olurdu.
 *
 * Bu klasör, kardeşi olan `[locale]/[slug]` dinamik rotasıyla ÇAKIŞMAZ:
 * Next statik segmenti dinamik olana tercih eder ve `[slug]` zaten "blog"u
 * kendi parametre listesine yazmaz.
 */
export function generateStaticParams() {
  return [{ locale: BLOG_LOCALE }];
}

export function generateMetadata(): Metadata {
  return buildBlogIndexMetadata();
}

export default function Page() {
  return (
    <>
      <BlogIndexPage />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            blogIndexJsonLd(BLOG_POSTS),
            blogBreadcrumbJsonLd(),
          ]),
        }}
      />
    </>
  );
}
