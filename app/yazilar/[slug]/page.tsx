import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticleBySlug, getAllArticleSlugs } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { ShareSidebar } from "@/components/ShareSidebar";
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

  return (
    <article className="max-w-[1400px] mx-auto px-8 py-24">
      {/* Header */}
      <header className="max-w-[800px] mx-auto text-center mb-16 space-y-6">
        {article.category ? (
          <p className="font-sans text-[10px] font-bold text-action uppercase tracking-wider">
            {article.category.title}
          </p>
        ) : null}

        <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-ink leading-[1.1]">
          {article.title}
        </h1>

        {article.excerpt ? (
          <p className="font-serif italic text-xl text-ink opacity-80 leading-relaxed">
            {article.excerpt}
          </p>
        ) : null}

        <div className="font-sans text-sm text-meta space-x-4">
          {article.author ? <span>Yazan: {article.author.name}</span> : null}
          {article.publishedAt ? (
            <span>{formatDate(article.publishedAt)}</span>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Share Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <ShareSidebar title={article.title} slug={article.slug} />
        </aside>

        {/* Article Body */}
        <div className="lg:col-span-8">
          {article.body ? (
            <PortableTextRenderer value={article.body} />
          ) : null}

          {/* Topics */}
          {article.topics && article.topics.length > 0 ? (
            <div className="mt-16 pt-8 border-t border-meta/20">
              <div className="flex flex-wrap gap-3">
                {article.topics.map(
                  (topic: { title: string; slug: string }) => (
                    <span
                      key={topic.slug}
                      className="font-sans text-[9px] font-bold uppercase tracking-wider text-meta border border-meta px-3 py-2"
                    >
                      {topic.title}
                    </span>
                  )
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
