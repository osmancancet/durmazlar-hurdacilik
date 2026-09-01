import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/pages/BlogPostPage";
import { BLOG_LOCALE, BLOG_POSTS, postBySlug } from "@/content/blog";
import {
  blogBreadcrumbJsonLd,
  plainFaqJsonLd,
  blogPostJsonLd,
  buildBlogPostMetadata,
} from "@/lib/seo";

/** Her yazı için tek adres: /tr/blog/<slug>/ */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ locale: BLOG_LOCALE, slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  return buildBlogPostMetadata(post);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <BlogPostPage post={post} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            blogPostJsonLd(post),
            blogBreadcrumbJsonLd(post),
            /* Yazının kendi soruları — sayfa başına ayrı SSS zengin sonucu. */
            ...(post.faq ? [plainFaqJsonLd(post.faq)] : []),
          ]),
        }}
      />
    </>
  );
}
