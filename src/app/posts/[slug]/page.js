import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import PostActions from "@/components/PostActions";
import PostActionsMobile from "@/components/PostActionsMobile";
import { posts, getPostBySlug, getAdjacentPosts, siteConfig } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return { title: `${post.title} | ${siteConfig.title}` };
}

function extractToc(html) {
  const headingRegex = /<h([2-3])[^>]*>([^<]+)<\/h[2-3]>/gi;
  const toc = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    toc.push({ level, text, id });
  }
  return toc;
}

function addIdsToHeadings(html) {
  return html.replace(/<h([2-3])([^>]*)>([^<]+)<\/h([2-3])>/gi, (match, level, attrs, text, closeLevel) => {
    const id = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const toc = extractToc(post.content);
  const contentWithIds = addIdsToHeadings(post.content);

  return (
    <>
      {/* <Banner /> */}
      <div className="h-[20vh]"/>
      <div className="background">
        <PostActions post={post} prevPost={prev} nextPost={next} toc={toc} />
        <div className="content index w-full max-w-[50rem] mx-auto px-4 my-16">
          <article className="post" itemScope itemType="http://schema.org/BlogPosting">
            <header>
              <h1 className="posttitle" itemProp="name headline">
                {post.title}
              </h1>
              <div className="meta">
                <span
                  className="author"
                  itemProp="author"
                  itemScope
                  itemType="http://schema.org/Person"
                >
                  <span itemProp="name">{post.author || siteConfig.author}</span>
                </span>
                {" "}
                <div className="postdate" style={{ display: "inline" }}>
                  <time dateTime={post.date} itemProp="datePublished">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="article-tag" style={{ display: "inline" }}>
                    {" "}
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag-link" style={{ marginRight: "8px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>
            <div
              className="content"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />
          </article>
        </div>
        <PostActionsMobile post={post} toc={toc} />
        <Footer />
      </div>
    </>
  );
}
