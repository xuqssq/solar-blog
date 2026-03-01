import { Suspense } from "react";
import Link from "next/link";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import Pagination from "@/components/Pagination";
import { getCategories, getArticlesPaginated } from "@/lib/queries";

export const metadata = {
  title: "Archives | Solar Blog",
};

function ArticleListSkeleton() {
  return (
    <ul className="post-list">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="post-item">
          <div className="meta">
            <div className="skeleton" style={{ width: 100, height: 16 }} />
          </div>
          <div className="skeleton" style={{ width: `${60 + Math.random() * 30}%`, height: 16 }} />
        </li>
      ))}
    </ul>
  );
}

async function ArticleList({ categoryId, page }) {
  const { articles, totalPages, currentPage } = await getArticlesPaginated({
    categoryId,
    page,
  });

  if (articles.length === 0) {
    return (
      <div className="empty-state">
        <p>No articles found.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="post-list">
        {articles.map((article) => (
          <li key={article.id} className="post-item">
            <div className="meta">
              <time dateTime={article.publish_time}>
                {new Date(article.publish_time).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            <span>
              <Link href={`/posts/${article.id}`}>{article.title}</Link>
            </span>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

export default async function ArchivesPage({ searchParams }) {
  const sp = await searchParams;
  const categoryId = sp?.category || "";
  const page = parseInt(sp?.page || "1", 10);
  const categories = await getCategories();
  const suspenseKey = `${categoryId}-${page}`;

  return (
    <>
      <Banner />
      <div className="background">
        <div className="content index w-full max-w-200 mx-auto px-4 my-16">
          <Header />
          <CategoryTabs categories={categories} />
          <Suspense key={suspenseKey} fallback={<ArticleListSkeleton />}>
            <ArticleList categoryId={categoryId} page={page} />
          </Suspense>
        </div>
        <Footer />
      </div>
    </>
  );
}
