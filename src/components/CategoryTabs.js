"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryTabs({ categories }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  return (
    <div className="category-tabs">
      <Link
        href="/archives"
        className={`category-tab ${!activeCategory ? "active" : ""}`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/archives?category=${cat.id}`}
          className={`category-tab ${activeCategory === cat.id ? "active" : ""}`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
