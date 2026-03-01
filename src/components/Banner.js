"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/config";

export default function Banner() {
  useEffect(() => {
    const $ = window.jQuery;
    if (!$) return;

    $(".solar-wrapper").fadeTo("slow", 1);
    $(".solar-blogtitel").fadeOut(2000);

    function handleScroll() {
      const banner = $(".solar-banner")[0];
      const wrapper = $(".solar-wrapper")[0];
      if (!banner || !wrapper) return;

      var z =
        banner.getBoundingClientRect().bottom /
        (banner.getBoundingClientRect().bottom -
          banner.getBoundingClientRect().top);

      if (z < 0) {
        z = 0.01;
      }

      wrapper.style.zoom = z;
      wrapper.style.MozTransform = "scale(" + z + ")";
    }

    $(window).on("scroll", handleScroll);

    return () => {
      $(window).off("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="solar-banner">
      <div className="solar-blogtitel">{siteConfig.title}</div>
      <ul className="solar-wrapper">
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
      </ul>
    </div>
  );
}
