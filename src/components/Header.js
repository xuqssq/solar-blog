"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Header() {
  const [responsive, setResponsive] = useState(false);

  return (
    <header id="header">
      <Link href="/">
        <div id="logo" style={{ backgroundImage: "url(/images/logo.png)" }} />
        <div id="title">
          <h1>{siteConfig.title}</h1>
        </div>
      </Link>
      <div id="nav" className="mt-1">
        <ul className={responsive ? "responsive" : ""}>
          <li className="icon">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setResponsive(!responsive);
              }}
            >
              <Menu size={24} />
            </a>
          </li>
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
    </header>
  );
}
