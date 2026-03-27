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
  "author": author->{ name, "slug": slug.current, photo },
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
    `*[_type == "article"] | order(publishedAt desc)[0...${limit}]{ _id, title, "slug": slug.current, publishedAt, "author": author->{ name } }`
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
  async (categorySlug: string | null, topicSlug: string | null) => {
    if (!client) return [];
    const filters = ['_type == "article"'];
    if (categorySlug) filters.push(`category->slug.current == $categorySlug`);
    if (topicSlug) filters.push(`$topicSlug in topics[]->slug.current`);

    return client.fetch(
      `*[${filters.join(" && ")}] | order(publishedAt desc){ ${articleFields} }`,
      { categorySlug, topicSlug }
    );
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
    `*[_type == "article" && author->slug.current == $authorSlug] | order(publishedAt desc){ ${articleFields} }`,
    { authorSlug }
  );
});

export const getAllAuthorSlugs = cache(async () => {
  if (!client) return [];
  return client.fetch(`*[_type == "author"]{ "slug": slug.current }`);
});

export const getSiteSettings = cache(async () => {
  if (!client) return null;
  return client.fetch(
    `*[_type == "siteSettings"][0]{ aboutContent, manifestoQuote, manifestoAttribution, instagramUrl, twitterUrl, letterboxdUrl }`
  );
});
