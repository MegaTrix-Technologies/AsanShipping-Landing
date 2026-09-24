import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { fetchPublishedArticles, fetchArticleCategories } from "@/lib/api";
import { BookOpen, Sparkles, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Articles & E-Commerce Logistics Guides",
  description:
    "Insights, strategies, and playbooks to reduce COD RTO, optimize courier delivery rates, and scale Pakistani e-commerce operations.",
  openGraph: {
    title: "AsanShipping Articles & Guides",
    description:
      "Actionable playbooks on reducing COD failed deliveries, courier API integration, and ecommerce logistics in Pakistan.",
    url: "/articles",
  },
};

interface ArticlesPageProps {
  searchParams: {
    page?: string;
    category?: string;
  };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const selectedCategory = searchParams.category || "all";

  const [articlesData, categories] = await Promise.all([
    fetchPublishedArticles({ page, limit: 12, category: selectedCategory }),
    fetchArticleCategories(),
  ]);

  const { data: articles, totalPages } = articlesData;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Section */}
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              RESOURCES &amp; STRATEGY
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-display">
              AsanShipping Articles
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Insights, guides, and practical resources to help Pakistani e-commerce businesses reduce COD RTO, optimize multi-carrier logistics, and protect gross margins.
            </p>
          </div>

          {/* Category Filter Bar */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/80 scrollbar-none">
              <Link
                href="/articles"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                All Articles
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/articles?category=${encodeURIComponent(cat)}`}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}

          {/* Articles Grid or Empty State */}
          {articles.length > 0 ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article._id || article.slug} article={article} />
                ))}
              </div>

              {/* Simple Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-6">
                  {page > 1 && (
                    <Link
                      href={`/articles?page=${page - 1}${selectedCategory !== "all" ? `&category=${encodeURIComponent(selectedCategory)}` : ""}`}
                      className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:bg-accent transition-colors"
                    >
                      &larr; Previous Page
                    </Link>
                  )}
                  <span className="text-xs font-mono text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <Link
                      href={`/articles?page=${page + 1}${selectedCategory !== "all" ? `&category=${encodeURIComponent(selectedCategory)}` : ""}`}
                      className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:bg-accent transition-colors"
                    >
                      Next Page &rarr;
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-4 max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-foreground">No Published Articles Yet</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We are currently preparing in-depth guides on Pakistani e-commerce logistics, courier APIs, and RTO reduction strategies. Check back soon!
              </p>
              <Link
                href="/"
                className="inline-block px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
