export interface ArticleAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  contentHtml?: string;
  featuredImage?: string;
  imageAlt?: string;
  category: string;
  tags?: string[];
  author?: ArticleAuthor;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
  project: string;
  externalId?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  schema?: Record<string, any>;
}

export interface ArticleListResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: Article[];
}

export interface ArticleDetailResponse {
  success: boolean;
  data: Article;
  related?: Article[];
}
