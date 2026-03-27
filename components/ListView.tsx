import Link from "next/link";
import { formatDateShort } from "@/lib/utils";

interface ListViewProps {
  articles: {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    author?: { name: string };
  }[];
}

export function ListView({ articles }: ListViewProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="max-w-[1100px] mx-auto px-8 py-24">
      <div className="space-y-0">
        {articles.map((article) => (
          <Link key={article._id} href={`/yazilar/${article.slug}`}>
            <article className="group border-b border-ink py-6 grid grid-cols-12 gap-6 items-center hover:bg-footer transition-colors duration-300 px-4 cursor-pointer">
              {/* Date */}
              <div className="col-span-2">
                <p className="font-mono text-xs text-meta uppercase tracking-wider">
                  {formatDateShort(article.publishedAt)}
                </p>
              </div>

              {/* Title */}
              <div className="col-span-7">
                <h4 className="font-serif text-xl font-semibold text-ink group-hover:text-action transition-colors duration-300">
                  {article.title}
                </h4>
              </div>

              {/* Author */}
              <div className="col-span-3 text-right">
                <p className="font-sans text-sm text-meta">
                  {article.author?.name}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
