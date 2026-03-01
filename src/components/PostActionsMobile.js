"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { List, Share2, ChevronUp, Menu } from "lucide-react";
import ShareLinks from "./ShareLinks";
import { siteConfig } from "@/lib/config";

export default function PostActionsMobile({ post, toc }) {
  const [showNav, setShowNav] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const topDistance = window.scrollY;

      // Show/hide footer based on scroll direction
      if (topDistance > lastScrollRef.current) {
        setShowFooter(false);
      } else {
        setShowFooter(true);
      }
      lastScrollRef.current = topDistance;

      // Close all panels on scroll
      setShowNav(false);
      setShowToc(false);
      setShowShare(false);

      // Toggle top vs menu button
      if (topDistance < 50) {
        setShowTop(false);
      } else if (topDistance > 100) {
        setShowTop(true);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const postUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <div id="footer-post-container">
      <div
        id="footer-post"
        style={{ display: showFooter ? "block" : "none" }}
      >
        {showNav && (
          <div id="nav-footer">
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
          </div>
        )}

        {showToc && toc && toc.length > 0 && (
          <div id="toc-footer">
            <ol>
              {toc.map((item, i) => (
                <li key={i} className={`toc-level-${item.level}`}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ol>
          </div>
        )}

        {showShare && (
          <div id="share-footer">
            <ShareLinks url={postUrl} title={post.title} iconSize={20} />
          </div>
        )}

        <div id="actions-footer">
          <ul>
            <li id="toc">
              <a
                className="icon"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowToc(!showToc);
                  setShowShare(false);
                  setShowNav(false);
                }}
              >
                <List size={20} /> TOC
              </a>
            </li>
            <li id="share">
              <a
                className="icon"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowShare(!showShare);
                  setShowToc(false);
                  setShowNav(false);
                }}
              >
                <Share2 size={20} /> Share
              </a>
            </li>
            {showTop ? (
              <li id="top">
                <a
                  className="icon"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <ChevronUp size={20} /> Top
                </a>
              </li>
            ) : (
              <li id="menu">
                <a
                  className="icon"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowNav(!showNav);
                    setShowToc(false);
                    setShowShare(false);
                  }}
                >
                  <Menu size={20} /> Menu
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
