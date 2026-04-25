import { createClient } from "next-sanity";
import { cache } from "react";
import { projectId, dataset, apiVersion, isConfigured } from "./env";

// Client is only created when projectId is configured (e.g. on Vercel with env vars set).
// During local build without .env.local, queries return null/[] gracefully.
export const client = isConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

// --- Cached GROQ query helpers (per-request deduplication) ---

const articleFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  coverImage,
  "category": category->{ title, "slug": slug.current },
  "author": authors[0]->{ name, "slug": slug.current, photo, bio },
  "coAuthors": authors[1..20]->{ name, "slug": slug.current, photo, bio },
  "translators": translators[]->{ name, "slug": slug.current, photo, bio },
  "topics": topics[]->{ title, "slug": slug.current }
`;

const articleBodyFields = `
  ${articleFields},
  body
`;

export const getFeaturedArticle = cache(async () => {
  if (!client) return null;
  return client.fetch(
    `*[_type == "article" && featured == true] | order(publishedAt desc)[0]{ ${articleFields} }`
  );
});

export const getRecentArticles = cache(async (limit: number) => {
  if (!client) return [];
  return client.fetch(
    `*[_type == "article" && featured != true] | order(publishedAt desc)[0...${limit}]{ ${articleFields} }`
  );
});

export const getListArticles = cache(async (limit: number) => {
  if (!client) return [];
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc)[0...${limit}]{ _id, title, "slug": slug.current, publishedAt, "author": authors[0]->{ name }, "coAuthors": authors[1..20]->{ name } }`
  );
});

export const getArticleBySlug = cache(async (slug: string) => {
  if (!client) return null;
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0]{ ${articleBodyFields} }`,
    { slug }
  );
});

export const getAllArticleSlugs = cache(async () => {
  if (!client) return [];
  return client.fetch(`*[_type == "article"]{ "slug": slug.current }`);
});

export const getArticlesByCategory = cache(
  async (
    categorySlug: string | null,
    topicSlug: string | null,
    search: string | null = null,
    page: number = 1,
    pageSize: number = 18
  ) => {
    if (!client) return { articles: [], total: 0 };
    const filters = ['_type == "article"'];
    if (categorySlug) filters.push(`category->slug.current == $categorySlug`);
    if (topicSlug) filters.push(`$topicSlug in topics[]->slug.current`);
    if (search) {
      filters.push(
        `(title match $search || excerpt match $search || pt::text(body) match $search)`
      );
    }

    const filterStr = filters.join(" && ");
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const [articles, total] = await Promise.all([
      client.fetch(
        `*[${filterStr}] | order(publishedAt desc)[${start}...${end}]{ ${articleFields} }`,
        { categorySlug, topicSlug, search: search ? `${search}*` : null }
      ),
      client.fetch(
        `count(*[${filterStr}])`,
        { categorySlug, topicSlug, search: search ? `${search}*` : null }
      ),
    ]);

    return { articles, total };
  }
);

export const getCategories = cache(async () => {
  if (!client) return [];
  return client.fetch(
    `*[_type == "category"] | order(title asc){ title, "slug": slug.current }`
  );
});

export const getTopics = cache(async () => {
  if (!client) return [];
  return client.fetch(
    `*[_type == "topic"] | order(title asc){ title, "slug": slug.current }`
  );
});

export const getAuthorBySlug = cache(async (slug: string) => {
  if (!client) return null;
  return client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{ name, "slug": slug.current, bio, photo }`,
    { slug }
  );
});

export const getArticlesByAuthor = cache(async (authorSlug: string) => {
  if (!client) return [];
  return client.fetch(
    `*[_type == "article" && $authorSlug in authors[]->slug.current] | order(publishedAt desc){ ${articleFields} }`,
    { authorSlug }
  );
});

export const getAllAuthorSlugs = cache(async () => {
  if (!client) return [];
  return client.fetch(`*[_type == "author"]{ "slug": slug.current }`);
});

export const getAllAuthors = cache(async () => {
  if (!client) return [];
  return client.fetch(
    `*[_type == "author" && hidden != true] | order(name asc){ name, "slug": slug.current, bio, photo, role }`
  );
});

export const getRelatedArticles = cache(
  async (categorySlug: string | null, excludeId: string) => {
    if (!client) return [];

    // First try same category
    let articles = categorySlug
      ? await client.fetch(
          `*[_type == "article" && category->slug.current == $categorySlug && _id != $excludeId] | order(publishedAt desc)[0...3]{ ${articleFields} }`,
          { categorySlug, excludeId }
        )
      : [];

    // Fill remaining slots with recent articles
    if (articles.length < 3) {
      const existingIds = [excludeId, ...articles.map((a: { _id: string }) => a._id)];
      const filler = await client.fetch(
        `*[_type == "article" && !(_id in $existingIds)] | order(publishedAt desc)[0...${3 - articles.length}]{ ${articleFields} }`,
        { existingIds }
      );
      articles = [...articles, ...filler];
    }

    return articles;
  }
);

export const getSiteSettings = cache(async () => {
  if (!client) return null;
  return client.fetch(
    `*[_type == "siteSettings"][0]{ aboutContent, manifestoQuote, manifestoAttribution, instagramUrl, twitterUrl, letterboxdUrl }`
  );
});
