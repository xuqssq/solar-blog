import Link from "next/link";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig, posts, projects } from "@/data/posts";

export default function Home() {
  const latestPosts = posts.slice(0, 5);

  return (
    <>
      {/* <Banner /> */}
      <div className="h-[20vh]"/>
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
              {latestPosts.map((post) => (
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
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
