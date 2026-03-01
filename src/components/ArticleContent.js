"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export default function ArticleContent({ html }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [html]);

  return (
    <div
      ref={contentRef}
      className="prose max-w-none"
      itemProp="articleBody"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
