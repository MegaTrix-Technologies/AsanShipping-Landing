import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const publishedDate = formatDate(article.publishedAt || article.createdAt);
  const authorName = article.author?.name || "AsanShipping Team";

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 hover:border-primary/60 transition-all duration-200 shadow-sm hover:shadow-md">
      <div className="space-y-4">
        {/* Featured Image */}
        <Link href={`/articles/${article.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.imageAlt || article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 text-center">
              <span className="font-display font-black text-lg text-primary tracking-tight">
                AsanShipping Insights
              </span>
            </div>
          )}
        </Link>

        {/* Category & Meta */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
            {article.category || "Ecommerce"}
          </span>
          {publishedDate && (
            <div className="flex items-center gap-1 text-muted-foreground font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{publishedDate}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* Footer / Read Link */}
      <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <User className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium text-[11px] truncate max-w-[140px]">{authorName}</span>
        </div>

        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary/80 transition-colors"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
