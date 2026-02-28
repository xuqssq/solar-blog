"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Share2,
} from "lucide-react";
import ShareLinks from "./ShareLinks";
import { siteConfig } from "@/data/posts";

export default function PostActions({ post, prevPost, nextPost, toc }) {
  const [menuVisible, setMenuVisible] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [showTabletMenu, setShowTabletMenu] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const topDistance = window.scrollY;
      if (menuVisible && topDistance < 10) {
        setShowNav(true);
      } else if (menuVisible && topDistance > 10) {
        setShowNav(false);
      }
      if (topDistance < 10) {
        setShowTabletMenu(true);
      } else {
        setShowTabletMenu(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuVisible]);

  const postUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  return (
    <div id="header-post">
      <a
        id="menu-icon"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setMenuVisible(!menuVisible);
        }}
      >
        <Menu size={20} className={menuVisible ? "active" : ""} />
      </a>
      <a
        id="menu-icon-tablet"
        href="#"
        style={{ display: showTabletMenu ? "block" : "none" }}
        onClick={(e) => {
          e.preventDefault();
          setMenuVisible(!menuVisible);
        }}
      >
        <Menu size={20} />
      </a>
      <a
        id="top-icon-tablet"
        href="#"
        style={{ display: showTabletMenu ? "none" : "block" }}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ChevronUp size={20} />
      </a>
      {menuVisible && (
        <span id="menu">
          <span id="nav" style={{ display: showNav ? "block" : "none" }}>
            <ul>
              {Object.entries(siteConfig.nav).map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("http") ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  ) : (
                    <Link href={href}>{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </span>
          <br />
          <span id="actions">
            <ul>
              {prevPost && (
                <li>
                  <Link className="icon" href={`/posts/${prevPost.slug}`}>
                    <ChevronLeft size={16} />
                  </Link>
                </li>
              )}
              {nextPost && (
                <li>
                  <Link className="icon" href={`/posts/${nextPost.slug}`}>
                    <ChevronRight size={16} />
                  </Link>
                </li>
              )}
              <li>
                <a
                  className="icon"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <ChevronUp size={16} />
                </a>
              </li>
              <li>
                <a
                  className="icon"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowShare(!showShare);
                  }}
                >
                  <Share2 size={16} />
                </a>
              </li>
            </ul>
          </span>
          <br />
          {showShare && (
            <div id="share">
              <ShareLinks url={postUrl} title={post.title} />
            </div>
          )}
          {toc && toc.length > 0 && (
            <div id="toc">
              <ul>
                {toc.map((item, i) => (
                  <li key={i} className={`toc-level-${item.level}`}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </span>
      )}
    </div>
  );
}
