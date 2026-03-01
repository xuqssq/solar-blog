import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="footer-left">
        Copyright &copy; {year} {siteConfig.author}
      </div>
      <div className="footer-right">
        <nav>
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
        </nav>
      </div>
    </footer>
  );
}
