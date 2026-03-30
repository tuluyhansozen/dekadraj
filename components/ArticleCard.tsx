import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { formatDate, stripQuotes } from "@/lib/utils";

interface ArticleCardProps {
  article: {
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt?: string;
    coverImage?: { asset: { _ref: string }; alt?: string };
    category?: { title: string; slug: string };
    author?: { name: string; slug: string };
    topics?: { title: string; slug: string }[];
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group cursor-pointer">
      <Link href={`/yazilar/${article.slug}`}>
        {/* Image */}
        {article.coverImage ? (
          <div className="overflow-hidden mb-4">
            <Image
              src={urlFor(article.coverImage).width(600).height(400).url()}
              alt={article.coverImage.alt || article.title}
              width={600}
              height={400}
              loading="lazy"
              className="w-full aspect-[3/2] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full aspect-[3/2] bg-secondary mb-4" />
        )}
      </Link>

      {/* Category */}
      {article.category ? (
        <Link
          href={`/yazilar?category=${article.category.slug}`}
          className="font-sans text-xs font-bold text-action uppercase tracking-wider mb-3 block hover:opacity-70 transition-opacity duration-300"
        >
          {article.category.title}
        </Link>
      ) : null}

      <Link href={`/yazilar/${article.slug}`}>
        {/* Title */}
        <h3 className="font-serif text-[24px] font-medium text-ink leading-[1.2] tracking-[-0.48px] mb-3 group-hover:text-action transition-colors duration-300">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.excerpt ? (
          <p className="font-sans text-sm text-ink leading-relaxed mb-4 opacity-80">
            {stripQuotes(article.excerpt)}
          </p>
        ) : null}
      </Link>

      {/* Topics */}
      {article.topics && article.topics.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {article.topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/yazilar?topic=${topic.slug}`}
              className="font-sans text-xs font-bold text-meta uppercase tracking-wider border border-meta px-2 py-1 hover:border-action hover:text-action transition-colors duration-300"
            >
              {topic.title}
            </Link>
          ))}
        </div>
      ) : null}

      {/* Meta */}
      <p className="font-sans text-sm text-meta">
        {article.author ? (
          <Link
            href={`/yazarlar/${article.author.slug}`}
            className="hover:text-action transition-colors duration-300"
          >
            {article.author.name}
          </Link>
        ) : null}
        {article.author?.name && article.publishedAt ? " \u2022 " : ""}
        {article.publishedAt ? formatDate(article.publishedAt) : ""}
      </p>
    </article>
  );
}
