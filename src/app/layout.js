import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Solar Blog",
  description: "A solar system themed blog",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
