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
        <body>{children}</body>
    </html>
  );
}
