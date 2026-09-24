import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { fetchArticleBySlug } from "@/lib/api";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, User, ArrowRight, ShieldCheck, Share2 } from "lucide-react";

interface ArticleDetailPageProps {
  params: {
    slug: string;
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asanshipping.com";

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const result = await fetchArticleBySlug(params.slug);
  if (!result || !result.data) {
    return {
      title: "Article Not Found | AsanShipping",
      description: "The requested logistics article could not be found.",
    };
  }

  const article = result.data;
  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt || "";
  const canonical = article.canonicalUrl || `${siteUrl}/articles/${article.slug}`;
  const imageUrl = article.ogImage || article.featuredImage || "/images/new-logo/full-logo/asan-logo-full-dark-bg.svg";

  return {
    title: `${title} | AsanShipping`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Asan Shipping",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author?.name || "AsanShipping Team"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const result = await fetchArticleBySlug(params.slug);

  if (!result || !result.data) {
    notFound();
  }

  const { data: article, related = [] } = result;
  const publishedDate = formatDate(article.publishedAt || article.createdAt);
  const readingTime = calculateReadingTime(article.contentHtml || article.content || "");
  const authorName = article.author?.name || "AsanShipping Team";
  const authorRole = article.author?.role || "Logistics & Ecommerce Specialist";
  const canonical = article.canonicalUrl || `${siteUrl}/articles/${article.slug}`;

  // Structured Data (JSON-LD) for Schema.org BlogPosting / Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription || article.excerpt || article.title,
    image: article.featuredImage || `${siteUrl}/images/new-logo/full-logo/asan-logo-full-dark-bg.svg`,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.publishedAt || article.createdAt,
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Asan Shipping",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/new-logo/full-logo/asan-logo-full-dark-bg.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Back Navigation */}
          <div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Article Header Metadata */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                {article.category || "Ecommerce Logistics"}
              </span>
              {publishedDate && (
                <div className="flex items-center gap-1 text-muted-foreground font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{publishedDate}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-muted-foreground font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>{readingTime}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-display leading-[1.2]">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Author Byline */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {authorName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">{authorName}</div>
                  <div className="text-[11px] text-muted-foreground">{authorRole}</div>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-lg">
              <Image
                src={article.featuredImage}
                alt={article.imageAlt || article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Article Main Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-foreground leading-relaxed">
            {article.contentHtml ? (
              <div
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                className="space-y-6 text-sm sm:text-base leading-relaxed [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_li]:text-muted-foreground [&_strong]:text-foreground [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground"
              />
            ) : (
              <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-muted-foreground">
                {article.content}
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground">Topics:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-muted text-[11px] font-mono text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Call to Action for AsanShipping */}
          <div className="rounded-3xl border border-primary/30 bg-primary/5 p-8 sm:p-10 space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                STREAMLINE YOUR OPERATION
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground font-display">
                Ready to cut your COD RTO rates in half?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Connect your Shopify store to AsanShipping in under 3 minutes. Automate WhatsApp buyer verification, flag serial rejecters, and route every parcel to the highest-performing carrier automatically.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-glow transition-all flex items-center gap-2"
              >
                <span>Explore AsanShipping Control Tower</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-10 border-t border-border space-y-6">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                  KEEP READING
                </div>
                <h3 className="text-xl font-black text-foreground font-display">
                  Related Insights &amp; Guides
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((rel) => (
                  <ArticleCard key={rel._id || rel.slug} article={rel} />
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
