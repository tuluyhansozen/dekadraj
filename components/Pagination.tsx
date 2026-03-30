"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    router.replace(`/yazilar?${params.toString()}`);
  };

  // Build page numbers to display
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-meta/20"
      aria-label="Sayfa navigasyonu"
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="font-sans text-sm text-ink px-3 py-2 hover:text-action transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Önceki sayfa"
      >
        &larr;
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="font-sans text-sm text-meta px-2"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`font-sans text-sm px-3 py-2 transition-colors duration-300 ${
              p === currentPage
                ? "bg-action text-canvas font-bold"
                : "text-ink hover:text-action"
            }`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="font-sans text-sm text-ink px-3 py-2 hover:text-action transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Sonraki sayfa"
      >
        &rarr;
      </button>
    </nav>
  );
}
