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
    <form onSubmit={handleSubmit} className="relative flex items-center group">
      <label htmlFor="archive-search" className="sr-only">
        Yazılarda ara
      </label>
      <span className="absolute left-3 text-meta group-focus-within:text-action transition-colors duration-200 pointer-events-none">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </span>
      <input
        id="archive-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ara..."
        className="pl-9 pr-8 py-2 border border-meta/40 bg-transparent font-sans text-sm text-ink placeholder:text-meta/60 focus:outline-none focus:border-action transition-colors duration-200 w-44 rounded-none"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 text-meta hover:text-action transition-colors duration-200"
          aria-label="Aramayı temizle"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
