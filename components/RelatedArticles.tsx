import { ArticleCard } from "@/components/ArticleCard";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
  category?: { title: string; slug: string };
  author?: { name: string; slug: string };
  topics?: { title: string; slug: string }[];
}

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-24 pt-16 border-t border-meta/20">
      <h2 className="font-serif text-3xl font-semibold text-ink mb-12">
        Benzer Yazılar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}
