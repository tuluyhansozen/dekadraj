import { Suspense } from "react";
import { getArticlesByCategory, getCategories, getTopics } from "@/sanity/client";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { TopicDropdown } from "@/components/TopicDropdown";

export const metadata = {
  title: "Arşiv — Dekadraj",
  description: "Dekadraj Sinema Kolektifi yazı arşivi.",
};

export default async function YazilarPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; topic?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category || null;
  const topicSlug = params.topic || null;

  const [articles, categories, topics] = await Promise.all([
    getArticlesByCategory(categorySlug, topicSlug),
    getCategories(),
    getTopics(),
  ]);

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-24">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-12">
        Arşiv
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <Suspense fallback={null}>
          <CategoryFilter categories={categories} />
        </Suspense>
        <Suspense fallback={null}>
          <TopicDropdown topics={topics} />
        </Suspense>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {articles.map(
            (article: {
              _id: string;
              title: string;
              slug: string;
              excerpt?: string;
              coverImage?: { asset: { _ref: string }; alt?: string };
              category?: { title: string; slug: string };
              author?: { name: string; slug: string };
              publishedAt?: string;
              topics?: { title: string; slug: string }[];
            }) => (
              <ArticleCard key={article._id} article={article} />
            )
          )}
        </div>
      ) : (
        <p className="font-sans text-meta text-center py-24">
          Bu filtrelere uygun yazı bulunamadı.
        </p>
      )}
    </section>
  );
}
