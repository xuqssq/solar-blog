import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import PostActions from "@/components/PostActions";
import PostActionsMobile from "@/components/PostActionsMobile";
import ArticleContent from "@/components/ArticleContent";
import { siteConfig } from "@/lib/config";
import { getArticleById, getAdjacentArticles } from "@/lib/queries";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleById(slug);
  if (!article) return { title: "Not Found" };
  return { title: `${article.title} | ${siteConfig.title}` };
}

function extractTocFromMarkdown(markdown) {
  const toc = [];
  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "");
      toc.push({ level, text, id });
    }
  }
  return toc;
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const article = await getArticleById(slug);
  if (!article) notFound();

  const { prev, next } = await getAdjacentArticles(slug);
  const markdown = article.content?.text || "";
  const toc = extractTocFromMarkdown(markdown);

  const post = {
    slug: article.id,
    title: article.title,
    date: article.publish_time,
    author: siteConfig.author,
    tags: article.categories ? [article.categories.name] : [],
  };

  return (
    <>
      <Banner />
      <div className="background">
        <PostActions post={post} prevPost={prev} nextPost={next} toc={toc} />
        <div className="content index w-full max-w-200 mx-auto px-4 my-16">
          <article className="post" itemScope itemType="http://schema.org/BlogPosting">
            <header>
              <h1 className="posttitle" itemProp="name headline">
                {article.title}
              </h1>
              <div className="meta">
                <span
                  className="author"
                  itemProp="author"
                  itemScope
                  itemType="http://schema.org/Person"
                >
                  <span itemProp="name">{siteConfig.author}</span>
                </span>{" "}
                <div className="postdate" style={{ display: "inline" }}>
                  <time dateTime={article.publish_time} itemProp="datePublished">
                    {new Date(article.publish_time).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                {article.categories && (
                  <div className="article-tag" style={{ display: "inline" }}>
                    {" "}
                    <span className="tag-link" style={{ marginRight: "8px" }}>
                      {article.categories.name}
                    </span>
                  </div>
                )}
                {article.url && (
                  <div style={{ display: "inline", marginLeft: "8px" }}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "0.85rem" }}
                    >
                      原文链接 ↗
                    </a>
                  </div>
                )}
              </div>
            </header>
            <ArticleContent markdown={markdown} />
          </article>
        </div>
        <PostActionsMobile post={post} toc={toc} />
        <Footer />
      </div>
    </>
  );
}
