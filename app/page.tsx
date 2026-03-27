import { Hero } from "@/components/Hero";
import { FeaturedEssay } from "@/components/FeaturedEssay";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ManifestoBreak } from "@/components/ManifestoBreak";
import { ListView } from "@/components/ListView";
import {
  getFeaturedArticle,
  getRecentArticles,
  getListArticles,
  getSiteSettings,
} from "@/sanity/client";

export default async function HomePage() {
  const [featured, articles, listArticles, settings] = await Promise.all([
    getFeaturedArticle(),
    getRecentArticles(6),
    getListArticles(5),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Separator */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="h-px bg-action" />
      </div>

      <FeaturedEssay article={featured} />

      <ArticleGrid articles={articles} />

      <ManifestoBreak
        quote={settings?.manifestoQuote ?? "Sinema, saniyede 24 kare gerçektir."}
        attribution={settings?.manifestoAttribution ?? "Jean-Luc Godard"}
      />

      <ListView articles={listArticles} />
    </div>
  );
}
