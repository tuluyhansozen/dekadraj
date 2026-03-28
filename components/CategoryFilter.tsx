"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categories: { title: string; slug: string }[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const handleFilter = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.replace(`/yazilar?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => handleFilter(null)}
        className={`font-sans text-xs font-bold uppercase tracking-wider border px-3 py-2 transition-colors duration-300 ${
          !activeCategory
            ? "bg-action text-canvas border-action"
            : "text-meta border-meta hover:border-action hover:text-action"
        }`}
      >
        Tümü
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleFilter(cat.slug)}
          className={`font-sans text-xs font-bold uppercase tracking-wider border px-3 py-2 transition-colors duration-300 ${
            activeCategory === cat.slug
              ? "bg-action text-canvas border-action"
              : "text-meta border-meta hover:border-action hover:text-action"
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}
