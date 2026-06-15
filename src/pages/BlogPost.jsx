import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../lib/posts";
import { formatDate } from "../lib/format";

// Inline-style map so markdown matches the editorial theme (no Tailwind prose).
const mdComponents = {
  h2: (props) => (
    <h2
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 900,
        color: "#0f0f0f",
        letterSpacing: "-0.5px",
        margin: "48px 0 16px",
      }}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(22px, 3vw, 30px)",
        fontWeight: 900,
        color: "#0f0f0f",
        margin: "32px 0 12px",
      }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "18px",
        lineHeight: 1.7,
        color: "#0f0f0f",
        margin: "0 0 20px",
      }}
      {...props}
    />
  ),
  a: (props) => (
    <a
      style={{ color: "#e03a1e", textDecoration: "underline" }}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "18px",
        lineHeight: 1.7,
        color: "#0f0f0f",
        margin: "0 0 20px",
        paddingLeft: "24px",
      }}
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "18px",
        lineHeight: 1.7,
        color: "#0f0f0f",
        margin: "0 0 20px",
        paddingLeft: "24px",
      }}
      {...props}
    />
  ),
  li: (props) => <li style={{ margin: "6px 0" }} {...props} />,
  blockquote: (props) => (
    <blockquote
      style={{
        borderLeft: "3px solid #e03a1e",
        paddingLeft: "20px",
        margin: "0 0 20px",
        fontFamily: "'Inter', sans-serif",
        fontStyle: "italic",
        fontSize: "18px",
        color: "#0f0f0f",
        opacity: 0.85,
      }}
      {...props}
    />
  ),
  code: ({ inline, ...props }) =>
    inline ? (
      <code
        style={{
          fontFamily: "monospace",
          background: "rgba(15,15,15,0.08)",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "0.9em",
        }}
        {...props}
      />
    ) : (
      <code style={{ fontFamily: "monospace" }} {...props} />
    ),
  pre: (props) => (
    <pre
      style={{
        background: "#0f0f0f",
        color: "#e8e0d5",
        padding: "20px",
        borderRadius: "8px",
        overflowX: "auto",
        fontSize: "14px",
        lineHeight: 1.5,
        margin: "0 0 24px",
      }}
      {...props}
    />
  ),
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <section
        style={{
          background: "#e8e0d5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Inter', sans-serif",
          
        }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "48px",
            color: "#0f0f0f",
          }}
        >
          POST NOT FOUND
        </h1>
        <Link to="/blog" style={{ color: "#e03a1e", marginTop: "12px" }}>
          ← Back to blog
        </Link>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#e8e0d5",
        minHeight: "100vh",
        padding: "140px 20px 120px",
        boxSizing: "border-box",
      }}
    >
      <article style={{ maxWidth: "720px", margin: "0 auto" }}>
        <Link
          to="/blog"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: "#e03a1e",
            textDecoration: "none",
            letterSpacing: "0.5px",
          }}
        >
          ← Back to blog
        </Link>

        <header
          style={{
            margin: "32px 0 40px",
            paddingBottom: "32px",
            borderBottom: "1px solid rgba(15,15,15,0.2)",
          }}
        >
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(44px, 8vw, 88px)",
              fontWeight: 900,
              lineHeight: 0.92,
              color: "#0f0f0f",
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#0f0f0f",
              opacity: 0.7,
              letterSpacing: "0.5px",
              marginTop: "16px",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>

          {post.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    color: "#e03a1e",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {post.content}
        </ReactMarkdown>
      </article>
    </section>
  );
}