import Link from "next/link";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  articles: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt: string;
    coverImage?: { asset: { _ref: string }; alt?: string };
    category?: { title: string; slug: string };
    author?: { name: string; slug: string };
    translators?: { name: string; slug: string }[];
    topics?: { title: string; slug: string }[];
  }[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      {/* Archive Button */}
      <div className="flex justify-center mt-16">
        <Link
          href="/yazilar"
          className="font-sans text-[11px] font-bold text-ink border-2 border-ink px-7 py-3.5 uppercase tracking-[1px] hover:bg-ink hover:text-canvas transition-colors duration-300"
        >
          Daha Fazlası →
        </Link>
      </div>
    </section>
  );
}
