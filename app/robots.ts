import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asanshipping.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/articles', '/articles/*'],
      disallow: ['/api/*'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
