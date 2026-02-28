import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/posts";

export const metadata = {
  title: "About | Solar Blog",
};

export default function AboutPage() {
  return (
    <>
      <Banner />
      <div className="background">
        <div className="content index w-full max-w-[50rem] mx-auto px-4 my-16">
          <Header />
          <article className="post">
            <div className="content">
              <h2>About</h2>
              <p>
                Welcome to {siteConfig.title}. This is a personal blog about
                technology, programming, and the occasional thought experiment.
              </p>
              <p>
                The theme is inspired by our solar system — a reminder that we
                are all just tiny specks in an vast universe, yet capable of
                creating remarkable things.
              </p>
              <h2>Contact</h2>
              <p>
                Feel free to reach out through any of the social links on the
                homepage.
              </p>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    </>
  );
}
