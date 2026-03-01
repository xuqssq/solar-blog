"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function getHeadingId(children) {
  const text = typeof children === "string"
    ? children
    : Array.isArray(children)
      ? children.map((c) => (typeof c === "string" ? c : "")).join("")
      : "";
  return text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "");
}

const components = {
  h2: ({ children, ...props }) => (
    <h2 id={getHeadingId(children)} {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 id={getHeadingId(children)} {...props}>{children}</h3>
  ),
};

export default function ArticleContent({ markdown }) {
  return (
    <div className="prose max-w-none" itemProp="articleBody">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
