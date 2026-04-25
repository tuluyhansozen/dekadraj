import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { formatDate, stripQuotes } from "@/lib/utils";

interface FeaturedEssayProps {
  article: {
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt?: string;
    coverImage?: { asset: { _ref: string }; alt?: string };
    category?: { title: string; slug: string };
    author?: { name: string; slug: string };
    coAuthors?: { name: string; slug: string }[];
    translators?: { name: string; slug: string }[];
  } | null;
}

export function FeaturedEssay({ article }: FeaturedEssayProps) {
  if (!article) return null;

  const articleHref = `/yazilar/${article.slug}`;

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center group">
        {/* Image Section - 60% */}
        <Link href={articleHref} className="lg:col-span-3 overflow-hidden block">
          {article.coverImage ? (
            <Image
              src={urlFor(article.coverImage).width(900).height(506).url()}
              alt={article.coverImage.alt || article.title}
              width={900}
              height={506}
              priority
              className="w-full aspect-[16/9] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full aspect-[16/9] bg-secondary" />
          )}
        </Link>

        {/* Typography Section - 40% */}
        <div className="lg:col-span-2 space-y-6">
          {article.category ? (
            <Link
              href={`/yazilar?category=${article.category.slug}`}
              className="font-sans text-xs font-bold text-action uppercase tracking-wider block hover:opacity-70 transition-opacity duration-300"
            >
              {article.category.title}
            </Link>
          ) : null}

          <Link href={articleHref} className="block">
            <h2 className="font-serif text-3xl md:text-[48px] lg:text-[60px] font-medium text-ink leading-[1.1] tracking-[-1.2px] group-hover:text-action transition-colors duration-300">
              {article.title}
            </h2>

            {article.excerpt ? (
              <p className="font-serif italic text-lg text-ink leading-relaxed opacity-[0.85] mt-6">
                {stripQuotes(article.excerpt)}
              </p>
            ) : null}
          </Link>

          {(article.author || article.publishedAt) ? (
            <div className="font-sans text-sm text-meta space-y-1">
              <p>
                {article.author ? (
                  <>
                    Yazar:{" "}
                    <Link
                      href={`/yazarlar/${article.author.slug}`}
                      className="hover:text-action transition-colors duration-300"
                    >
                      {article.author.name}
                    </Link>
                    {article.coAuthors && article.coAuthors.length > 0
                      ? article.coAuthors.map((ca) => (
                          <span key={ca.slug}>
                            {", "}
                            <Link
                              href={`/yazarlar/${ca.slug}`}
                              className="hover:text-action transition-colors duration-300"
                            >
                              {ca.name}
                            </Link>
                          </span>
                        ))
                      : null}
                  </>
                ) : null}
                {article.author && article.publishedAt ? " · " : null}
                {article.publishedAt ? formatDate(article.publishedAt) : null}
              </p>
              {article.translators && article.translators.length > 0 ? (
                <p>
                  Çeviren:{" "}
                  {article.translators.map((t, i) => (
                    <span key={t.slug}>
                      <Link
                        href={`/yazarlar/${t.slug}`}
                        className="hover:text-action transition-colors duration-300"
                      >
                        {t.name}
                      </Link>
                      {i < article.translators!.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
