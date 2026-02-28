import Link from "next/link";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/data/posts";

export const metadata = {
  title: "Archives | Solar Blog",
};

export default function ArchivesPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      {/* <Banner /> */}
      <div className="h-[20vh]"/>
      <div className="background">
        <div className="content index w-full max-w-[50rem] mx-auto px-4 my-16">
          <Header />
          <ul className="post-list">
            {sortedPosts.map((post) => (
              <li key={post.slug} className="post-item">
                <div className="meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <span>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
}
