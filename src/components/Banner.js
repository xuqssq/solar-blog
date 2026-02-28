"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/posts";

export default function Banner() {
  const bannerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    // Fade in the wrapper and fade out the title after mount
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    const titleTimer = setTimeout(() => {
      setShowTitle(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      clearTimeout(titleTimer);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const banner = bannerRef.current;
      const wrapper = wrapperRef.current;
      if (!banner || !wrapper) return;

      const rect = banner.getBoundingClientRect();
      let z = rect.bottom / (rect.bottom - rect.top);
      if (z < 0) z = 0.01;

      wrapper.style.zoom = z;
      wrapper.style.MozTransform = `scale(${z})`;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="solar-banner" ref={bannerRef}>
      <div
        className="solar-blogtitel"
        style={{ opacity: showTitle ? 1 : 0 }}
      >
        {siteConfig.title}
      </div>
      <div
        className={`solar-wrapper ${loaded ? "loaded" : ""}`}
        ref={wrapperRef}
      >
        <div className="solar-sun">
          <div className="star" />
        </div>
        <div className="solar-mercury">
          <div className="solar-planet">
            <div className="solar-shadow" />
          </div>
        </div>
        <div className="solar-venus">
          <div className="solar-planet">
            <div className="solar-shadow" />
          </div>
        </div>
        <div className="solar-earth">
          <div className="solar-planet">
            <div className="solar-shadow" />
          </div>
        </div>
        <div className="solar-mars">
          <div className="solar-planet">
            <div className="solar-shadow" />
          </div>
        </div>
        <div className="solar-jupiter">
          <div className="solar-planet">
            <div className="solar-shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}
