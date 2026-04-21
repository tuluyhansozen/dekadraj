import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { ShareSidebar } from "@/components/ShareSidebar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedArticles } from "@/components/RelatedArticles";
import { BackToTop } from "@/components/BackToTop";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Yazı Bulunamadı — Dekadraj" };

  return {
    title: `${article.title} — Dekadraj`,
    description: article.excerpt || "",
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      type: "article",
      ...(article.coverImage
        ? { images: [urlFor(article.coverImage).width(1200).height(630).url()] }
        : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(
    article.category?.slug ?? null,
    article._id
  );

  return (
    <article className="max-w-[1400px] mx-auto px-8 py-24">
      {/* Header */}
      <header className="max-w-[800px] mx-auto text-center mb-16 space-y-6">
        {article.category ? (
          <Link
            href={`/yazilar?category=${article.category.slug}`}
            className="font-sans text-xs font-bold text-action uppercase tracking-wider hover:opacity-70 transition-opacity duration-300"
          >
            {article.category.title}
          </Link>
        ) : null}

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-ink leading-[1.1]">
          {article.title}
        </h1>

        {article.excerpt ? (
          <p className="font-serif italic text-xl text-ink opacity-80 leading-relaxed">
            {article.excerpt}
          </p>
        ) : null}

        <div className="font-sans text-sm text-meta space-y-2">
          <div className="space-x-4">
            {article.author ? (
              <span>
                Yazan:{" "}
                <Link
                  href={`/yazarlar/${article.author.slug}`}
                  className="hover:text-action transition-colors duration-300"
                >
                  {article.author.name}
                </Link>
              </span>
            ) : null}
            {article.publishedAt ? (
              <span>{formatDate(article.publishedAt)}</span>
            ) : null}
          </div>
          {article.translators && article.translators.length > 0 ? (
            <p>
              Çeviren:{" "}
              {article.translators.map(
                (t: { name: string; slug: string }, i: number) => (
                  <span key={t.slug}>
                    <Link
                      href={`/yazarlar/${t.slug}`}
                      className="hover:text-action transition-colors duration-300"
                    >
                      {t.name}
                    </Link>
                    {i < article.translators.length - 1 ? ", " : ""}
                  </span>
                )
              )}
            </p>
          ) : null}
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage ? (
        <div className="mb-16">
          <Image
            src={urlFor(article.coverImage).width(1400).height(788).url()}
            alt={article.coverImage.alt || article.title}
            width={1400}
            height={788}
            priority
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      ) : null}

      {/* Body + Sidebar */}
      <div className="relative max-w-[800px] mx-auto">
        {/* Share Sidebar — desktop only */}
        <aside className="hidden lg:block absolute -left-20 top-0">
          <ShareSidebar title={article.title} slug={article.slug} />
        </aside>

        {/* Article Body */}
        <div>
          {article.body ? (
            <PortableTextRenderer value={article.body} />
          ) : null}

          {/* Topics */}
          {article.topics && article.topics.length > 0 ? (
            <div className="mt-16 pt-8 border-t border-meta/20">
              <div className="flex flex-wrap gap-3">
                {article.topics.map(
                  (topic: { title: string; slug: string }) => (
                    <Link
                      key={topic.slug}
                      href={`/yazilar?topic=${topic.slug}`}
                      className="font-sans text-xs font-bold uppercase tracking-wider text-meta border border-meta px-3 py-2 hover:border-action hover:text-action transition-colors duration-300"
                    >
                      {topic.title}
                    </Link>
                  )
                )}
              </div>
            </div>
          ) : null}

          {/* Share — mobile only */}
          <div className="lg:hidden">
            <ShareSidebar title={article.title} slug={article.slug} />
          </div>

          {/* Author / Translator Bio */}
          {article.translators && article.translators.length > 0 ? (
            article.translators.map(
              (t: {
                name: string;
                slug: string;
                bio?: string;
                photo?: { asset: { _ref: string } };
              }) => (
                <AuthorBio key={t.slug} author={t} label="Çevirmen" />
              )
            )
          ) : (
            <AuthorBio author={article.author} />
          )}
        </div>
      </div>

      {/* Related Articles */}
      <RelatedArticles articles={relatedArticles} />

      <BackToTop />
    </article>
  );
}
