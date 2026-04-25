import Link from "next/link";
import { formatDateShort } from "@/lib/utils";

interface ListViewProps {
  articles: {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    author?: { name: string };
    coAuthors?: { name: string }[];
  }[];
}

export function ListView({ articles }: ListViewProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-24">
      <div className="space-y-0">
        {articles.map((article) => (
          <Link key={article._id} href={`/yazilar/${article.slug}`}>
            <article className="group border-b border-ink py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center hover:bg-footer transition-colors duration-300 px-4 cursor-pointer">
              {/* Date */}
              <div className="md:col-span-2">
                <p className="font-mono text-[13px] font-medium text-meta uppercase tracking-[0.26px] tabular-nums">
                  {formatDateShort(article.publishedAt)}
                </p>
              </div>

              {/* Title */}
              <div className="md:col-span-7">
                <h4 className="font-serif text-[22px] font-medium text-ink tracking-[-0.44px] group-hover:text-action transition-colors duration-300">
                  {article.title}
                </h4>
              </div>

              {/* Author */}
              <div className="md:col-span-3 md:text-right">
                <p className="font-sans text-sm text-meta">
                  {[article.author?.name, ...(article.coAuthors?.map((ca) => ca.name) ?? [])].filter(Boolean).join(", ")}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
