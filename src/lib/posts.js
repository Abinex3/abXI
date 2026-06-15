// Vite reads every .md file in src/posts at build time as raw text.
// Add a new .md file to src/posts and it shows up automatically.
const files = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Browser-safe frontmatter parser (no Node Buffer / gray-matter needed).
// Parses the block between the leading "---" fences into a data object,
// and returns the remaining markdown as content.
function parseFrontmatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, frontmatter, content] = match;
  const data = {};

  frontmatter.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (!key) return;

    // Array syntax: ["a", "b"]  or  [a, b]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      // Strip surrounding quotes from plain strings
      value = value.replace(/^["']|["']$/g, "");
    }

    data[key] = value;
  });

  return { data, content };
}

function slugFromPath(path) {
  return path
    .split("/")
    .pop()
    .replace(/\.md$/, "");
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      slug: data.slug || slugFromPath(path),
      title: data.title || "Untitled",
      date: data.date || "1970-01-01",
      excerpt: data.excerpt || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: readingTime(content),
      content,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getAllTags() {
  const set = new Set();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}