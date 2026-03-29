import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { stripQuotes } from "@/lib/utils";

interface FeaturedEssayProps {
  article: {
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: { asset: { _ref: string }; alt?: string };
    category?: { title: string };
    author?: { name: string };
  } | null;
}

export function FeaturedEssay({ article }: FeaturedEssayProps) {
  if (!article) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-24">
      <Link href={`/yazilar/${article.slug}`}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center group">
          {/* Image Section - 60% */}
          <div className="lg:col-span-3 overflow-hidden">
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
          </div>

          {/* Typography Section - 40% */}
          <div className="lg:col-span-2 space-y-6">
            {article.category ? (
              <p className="font-sans text-xs font-bold text-action uppercase tracking-wider">
                {article.category.title}
              </p>
            ) : null}

            <h2 className="font-serif text-3xl md:text-[48px] lg:text-[60px] font-medium text-ink leading-[1.1] tracking-[-1.2px] group-hover:text-action transition-colors duration-300">
              {article.title}
            </h2>

            {article.excerpt ? (
              <p className="font-serif italic text-lg text-ink leading-relaxed opacity-[0.85]">
                {stripQuotes(article.excerpt)}
              </p>
            ) : null}

            {article.author ? (
              <p className="font-sans text-sm text-meta">
                Yazan: {article.author.name}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </section>
  );
}
