import { Suspense } from "react";
import { getArticlesByCategory, getCategories, getTopics } from "@/sanity/client";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { TopicDropdown } from "@/components/TopicDropdown";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";

export const metadata = {
  title: "Arşiv — Dekadraj",
  description: "Dekadraj Sinema Kolektifi yazı arşivi.",
};

const PAGE_SIZE = 18;

export default async function YazilarPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; topic?: string; page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category || null;
  const topicSlug = params.topic || null;
  const search = params.q || null;
  const page = Math.max(1, parseInt(params.page || "1", 10));

  const [{ articles, total }, categories, topics] = await Promise.all([
    getArticlesByCategory(categorySlug, topicSlug, search, page, PAGE_SIZE),
    getCategories(),
    getTopics(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-16 md:py-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-meta/30">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-ink">
          Arşiv
        </h1>
        <div className="flex items-center gap-3">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
          <Suspense fallback={null}>
            <TopicDropdown topics={topics} />
          </Suspense>
        </div>
      </div>

      <div className="mb-12">
        <Suspense fallback={null}>
          <CategoryFilter categories={categories} />
        </Suspense>
      </div>

      {articles.length > 0 ? (
        <>
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
                translators?: { name: string; slug: string }[];
                publishedAt?: string;
                topics?: { title: string; slug: string }[];
              }) => (
                <ArticleCard key={article._id} article={article} />
              )
            )}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      ) : (
        <p className="font-sans text-meta text-center py-24">
          Bu filtrelere uygun yazı bulunamadı.
        </p>
      )}
    </section>
  );
}
