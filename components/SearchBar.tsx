"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    router.replace(`/yazilar?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    router.replace(`/yazilar?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <label htmlFor="archive-search" className="sr-only">
        Yazılarda ara
      </label>
      <input
        id="archive-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ara..."
        className="bg-transparent border-b-2 border-ink pb-2 font-sans text-sm text-ink placeholder:text-meta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/30 focus:border-action transition-colors pr-8 w-40 sm:w-48"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-0 top-0 text-meta hover:text-action transition-colors p-1"
          aria-label="Aramayı temizle"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
