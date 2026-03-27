import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getAuthorBySlug,
  getArticlesByAuthor,
  getAllAuthorSlugs,
} from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ArticleCard } from "@/components/ArticleCard";

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Yazar Bulunamadı — Dekadraj" };

  return {
    title: `${author.name} — Dekadraj`,
    description: author.bio || `${author.name} tarafından yazılan yazılar.`,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [author, articles] = await Promise.all([
    getAuthorBySlug(slug),
    getArticlesByAuthor(slug),
  ]);

  if (!author) notFound();

  return (
    <div>
      {/* Dark Header Section */}
      <section className="bg-ink py-24">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Author Photo */}
            {author.photo ? (
              <div className="lg:col-span-1">
                <Image
                  src={urlFor(author.photo).width(400).height(400).url()}
                  alt={author.name}
                  width={400}
                  height={400}
                  className="w-full max-w-[300px] aspect-square object-cover mx-auto"
                />
              </div>
            ) : null}

            {/* Author Info */}
            <div
              className={
                author.photo ? "lg:col-span-2 space-y-6" : "lg:col-span-3 space-y-6"
              }
            >
              <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-canvas leading-[1.1]">
                {author.name}
              </h1>
              {author.bio ? (
                <p className="font-serif italic text-lg text-canvas/80 leading-relaxed max-w-[600px]">
                  {author.bio}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-[1400px] mx-auto px-8 py-24">
        <h2 className="font-serif text-3xl font-semibold text-ink mb-12">
          Yazıları
        </h2>

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
          <p className="font-sans text-meta text-center py-12">
            Henüz yazı bulunmuyor.
          </p>
        )}
      </section>
    </div>
  );
}
