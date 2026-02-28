import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Bookmark,
} from "lucide-react";

export default function ShareLinks({ url, title, iconSize = 16 }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      href: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      label: "Facebook",
    },
    {
      href: `https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
      label: "Twitter",
    },
    {
      href: `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`,
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
      icon: Mail,
      label: "Email",
    },
    {
      href: `https://getpocket.com/save?url=${encodedUrl}&title=${encodedTitle}`,
      icon: Bookmark,
      label: "Pocket",
    },
  ];

  return (
    <ul>
      {links.map(({ href, icon: Icon, label }) => (
        <li key={label}>
          <a
            className="icon"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
          >
            <Icon size={iconSize} />
          </a>
        </li>
      ))}
    </ul>
  );
}
