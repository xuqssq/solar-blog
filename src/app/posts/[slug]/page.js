import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import PostActions from "@/components/PostActions";
import PostActionsMobile from "@/components/PostActionsMobile";
import ArticleContent from "@/components/ArticleContent";
import { siteConfig } from "@/data/posts";
import { getArticleById, getAdjacentArticles } from "@/lib/queries";
import { textToHtml } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleById(slug);
  if (!article) return { title: "Not Found" };
  return { title: `${article.title} | ${siteConfig.title}` };
}

function extractToc(html) {
  const headingRegex = /<h([2-3])[^>]*>([^<]+)<\/h[2-3]>/gi;
  const toc = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-");
    toc.push({ level, text, id });
  }
  return toc;
}

function addIdsToHeadings(html) {
  return html.replace(
    /<h([2-3])([^>]*)>([^<]+)<\/h([2-3])>/gi,
    (match, level, attrs, text, closeLevel) => {
      const id = text.trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-");
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    }
  );
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const article = await getArticleById(slug);
  if (!article) notFound();

  const { prev, next } = await getAdjacentArticles(slug);
  const contentText = article.content?.text || "";
  const rawHtml = textToHtml(contentText);
  const contentWithIds = addIdsToHeadings(rawHtml);
  const toc = extractToc(contentWithIds);

  const post = {
    slug: article.id,
    title: article.title,
    date: article.publish_time,
    author: siteConfig.author,
    tags: article.categories ? [article.categories.name] : [],
    content: contentWithIds,
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
            <ArticleContent html={contentWithIds} />
          </article>
        </div>
        <PostActionsMobile post={post} toc={toc} />
        <Footer />
      </div>
    </>
  );
}
