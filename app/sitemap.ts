import { MetadataRoute } from 'next';
import { fetchPublishedArticles } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asanshipping.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  try {
    const articlesData = await fetchPublishedArticles({ limit: 1000 });
    const articleRoutes: MetadataRoute.Sitemap = articlesData.data.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || article.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...articleRoutes];
  } catch (error) {
    console.error('[Sitemap Generator Error]:', error);
    return staticRoutes;
  }
}
