"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface TopicDropdownProps {
  topics: { title: string; slug: string }[];
}

export function TopicDropdown({ topics }: TopicDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTopic = searchParams.get("topic");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("topic", e.target.value);
    } else {
      params.delete("topic");
    }
    router.replace(`/yazilar?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center">
      <label htmlFor="topic-filter" className="sr-only">
        Konu seçin
      </label>
      <select
        id="topic-filter"
        value={activeTopic || ""}
        onChange={handleChange}
        className="appearance-none pl-3 pr-8 py-2 border border-meta/40 bg-canvas font-sans text-sm text-ink focus:outline-none focus:border-action transition-colors duration-200 cursor-pointer rounded-none"
      >
        <option value="">Tüm Konular</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.title}
          </option>
        ))}
      </select>
      <span className="absolute right-2.5 text-meta pointer-events-none">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}
