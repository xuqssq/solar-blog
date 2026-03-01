import Link from "next/link";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/posts";
import { getLatestArticles } from "@/lib/queries";

export default async function Home() {
  const latestArticles = await getLatestArticles(5);

  return (
    <>
      <Banner />
      <div className="background">
        <div className="content index w-full max-w-200 mx-auto px-4 my-16">
          <Header />

          <section id="about">
            <p>{siteConfig.description}</p>
          </section>

          <section id="writing" className="mt-8">
            <span className="h1">
              <Link href="/archives">Writing</Link>
            </span>
            <ul className="post-list">
              {latestArticles.map((article) => (
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
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
