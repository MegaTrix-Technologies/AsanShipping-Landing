import { Article, ArticleListResponse, ArticleDetailResponse } from './types';

const API_BASE_URL = process.env.ASANSHIPPING_API_URL || (process.env.NODE_ENV === 'production' ? 'https://api-core.asanshipping.com' : 'http://localhost:5000');

export async function fetchPublishedArticles(options: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
} = {}): Promise<ArticleListResponse> {
  const { page = 1, limit = 12, category, tag } = options;
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category && category !== 'all') {
    params.set('category', category);
  }
  if (tag) {
    params.set('tag', tag);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/public/articles?${params.toString()}`, {
      next: { revalidate: 60 }, // ISR: revalidate cache every 60 seconds
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`[Articles API] Fetch failed with status: ${res.status}`);
      return { success: false, count: 0, total: 0, page: 1, totalPages: 1, data: [] };
    }

    const data: ArticleListResponse = await res.json();
    return data;
  } catch (error) {
    console.error('[Articles API Error] Failed to fetch articles:', error);
    return { success: false, count: 0, total: 0, page: 1, totalPages: 1, data: [] };
  }
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleDetailResponse | null> {
  if (!slug) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/public/articles/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`[Articles API] Fetch slug '${slug}' failed with status: ${res.status}`);
      return null;
    }

    const data: ArticleDetailResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`[Articles API Error] Failed to fetch article '${slug}':`, error);
    return null;
  }
}

export async function fetchArticleCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/articles/categories`, {
      next: { revalidate: 300 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('[Articles API Error] Failed to fetch categories:', error);
    return [];
  }
}
