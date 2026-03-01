"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages }) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function buildHref(page) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const qs = params.toString();
    return `/archives${qs ? `?${qs}` : ""}`;
  }

  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination">
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)}>←</Link>
      ) : (
        <span className="disabled">←</span>
      )}

      {start > 1 && (
        <>
          <Link href={buildHref(1)}>1</Link>
          {start > 2 && <span style={{ border: "none", padding: "0 0.2rem" }}>…</span>}
        </>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={p === currentPage ? "active" : ""}
        >
          {p}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span style={{ border: "none", padding: "0 0.2rem" }}>…</span>}
          <Link href={buildHref(totalPages)}>{totalPages}</Link>
        </>
      )}

      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)}>→</Link>
      ) : (
        <span className="disabled">→</span>
      )}
    </nav>
  );
}
