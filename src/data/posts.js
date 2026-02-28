export const siteConfig = {
  title: "Solar Blog",
  description:
    "Welcome to my corner of the internet. I write about technology, programming, and the occasional thought experiment.",
  author: "Solar",
  nav: {
    Home: "/",
    About: "/about",
    Writing: "/archives",
    Projects: "https://github.com",
  },
  socialLinks: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
};

export const posts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    date: "2026-02-25",
    author: "Solar",
    tags: ["nextjs", "react", "web"],
    excerpt: "A comprehensive guide to building modern web applications with Next.js.",
    content: `
      <h2>Why Next.js?</h2>
      <p>Next.js has become the go-to framework for building React applications. It provides server-side rendering, static site generation, and a great developer experience out of the box.</p>
      <h2>Getting Started</h2>
      <p>To create a new Next.js project, you can use <code>create-next-app</code>:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      <p>This will set up a new project with all the defaults configured for you.</p>
      <h3>Project Structure</h3>
      <p>The app directory is where your routes live. Each folder represents a route segment, and <code>page.js</code> files define the UI for that route.</p>
      <blockquote><p>The beauty of Next.js is that it makes the hard things easy while keeping the easy things easy.</p></blockquote>
      <h2>Conclusion</h2>
      <p>Next.js is an excellent choice for building modern web applications. Its combination of performance, developer experience, and flexibility makes it stand out from the crowd.</p>
    `,
  },
  {
    slug: "css-animations-deep-dive",
    title: "CSS Animations: A Deep Dive",
    date: "2026-02-20",
    author: "Solar",
    tags: ["css", "animation", "frontend"],
    excerpt: "Exploring the power of CSS animations and transforms for creating stunning visual effects.",
    content: `
      <h2>The Power of CSS</h2>
      <p>CSS animations allow you to create complex visual effects without JavaScript. From simple transitions to full 3D transformations, CSS has you covered.</p>
      <h2>Keyframe Animations</h2>
      <p>The <code>@keyframes</code> rule lets you define the stages of an animation:</p>
      <pre><code>@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}</code></pre>
      <h2>3D Transforms</h2>
      <p>With <code>perspective</code> and <code>transform-style: preserve-3d</code>, you can create convincing 3D effects. The solar system animation on this blog is a great example of what's possible with pure CSS.</p>
      <h2>Performance Tips</h2>
      <p>Stick to animating <code>transform</code> and <code>opacity</code> for the best performance. These properties can be handled by the GPU compositor, avoiding layout and paint operations.</p>
    `,
  },
  {
    slug: "understanding-react-server-components",
    title: "Understanding React Server Components",
    date: "2026-02-15",
    author: "Solar",
    tags: ["react", "rsc", "performance"],
    excerpt: "How React Server Components change the way we think about React applications.",
    content: `
      <h2>What Are Server Components?</h2>
      <p>React Server Components (RSC) are a new paradigm that allows components to run on the server. They can access server-side resources directly and send only the rendered output to the client.</p>
      <h2>Benefits</h2>
      <ul>
        <li>Zero bundle size impact - server components don't add to your JS bundle</li>
        <li>Direct access to backend resources</li>
        <li>Automatic code splitting</li>
        <li>Streaming rendering</li>
      </ul>
      <h2>Client vs Server</h2>
      <p>Use the <code>"use client"</code> directive when you need interactivity, browser APIs, or React hooks like <code>useState</code> and <code>useEffect</code>.</p>
      <blockquote><p>Server Components are not a replacement for Client Components — they complement each other.</p></blockquote>
    `,
  },
  {
    slug: "tailwind-css-best-practices",
    title: "Tailwind CSS Best Practices",
    date: "2026-02-10",
    author: "Solar",
    tags: ["css", "tailwind", "design"],
    excerpt: "Tips and patterns for writing maintainable Tailwind CSS code.",
    content: `
      <h2>Why Tailwind?</h2>
      <p>Tailwind CSS provides utility classes that let you build designs directly in your markup. It's a different approach from traditional CSS, but it can be incredibly productive.</p>
      <h2>Component Extraction</h2>
      <p>When you find yourself repeating the same utility combinations, extract them into components rather than using <code>@apply</code>:</p>
      <pre><code>function Button({ children }) {
  return (
    &lt;button className="px-4 py-2 bg-blue-500 text-white rounded"&gt;
      {children}
    &lt;/button&gt;
  );
}</code></pre>
      <h2>Design Tokens</h2>
      <p>Use Tailwind's configuration to define your design tokens. This ensures consistency across your application and makes global changes easy.</p>
    `,
  },
  {
    slug: "the-art-of-debugging",
    title: "The Art of Debugging",
    date: "2026-02-05",
    author: "Solar",
    tags: ["debugging", "programming", "tips"],
    excerpt: "Strategies and techniques for effective debugging in any language.",
    content: `
      <h2>Debugging is a Skill</h2>
      <p>Debugging is not just about finding bugs — it's about understanding systems. The best debuggers are those who can form mental models of how code executes.</p>
      <h2>Strategies</h2>
      <h3>Binary Search</h3>
      <p>When facing a large codebase, use binary search to narrow down the problem. Comment out half the code, see if the bug persists, and repeat.</p>
      <h3>Rubber Duck Debugging</h3>
      <p>Explain the problem to someone (or something). The act of articulating the issue often reveals the solution.</p>
      <h3>Read the Error Message</h3>
      <p>It sounds obvious, but carefully reading error messages — including stack traces — is the fastest path to resolution.</p>
      <blockquote><p>Everyone knows that debugging is twice as hard as writing a program in the first place. — Brian Kernighan</p></blockquote>
    `,
  },
];

export const projects = [
  {
    name: "Solar Theme",
    url: "https://github.com",
    desc: "A solar system themed blog built with Next.js and Tailwind CSS",
  },
  {
    name: "React Components",
    url: "https://github.com",
    desc: "A collection of reusable React components",
  },
  {
    name: "CLI Tools",
    url: "https://github.com",
    desc: "Command line utilities for daily development",
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug) {
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
