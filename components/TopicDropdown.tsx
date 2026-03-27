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
    router.push(`/yazilar?${params.toString()}`);
  };

  return (
    <select
      value={activeTopic || ""}
      onChange={handleChange}
      className="bg-transparent border-b-2 border-ink pb-2 font-sans text-sm text-ink focus:outline-none focus:border-action transition-colors appearance-none cursor-pointer pr-8"
    >
      <option value="">Tüm Konular</option>
      {topics.map((topic) => (
        <option key={topic.slug} value={topic.slug}>
          {topic.title}
        </option>
      ))}
    </select>
  );
}
