import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, getAllTags } from "../lib/posts";
import { formatDate } from "../lib/format";

export default function Blog() {
  const allPosts = useMemo(() => getAllPosts(), []);
  const allTags = useMemo(() => getAllTags(), []);
  const [activeTag, setActiveTag] = useState(null);

  const posts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  return (
    <section
      style={{
        background: "#e8e0d5",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        padding: "140px 20px 120px",
        boxSizing: "border-box",
        // top: "100px"
      }}
    >
      {/* Heading block — mirrors the hero */}
      <div style={{ textAlign: "center", width: "100%", marginBottom: "60px" }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(70px, 15vw, 200px)",
            fontWeight: 900,
            lineHeight: 0.88,
            color: "#0f0f0f",
            letterSpacing: "-1px",
            margin: 0,
            display: "block",
          }}
        >
          THE
        </div>

        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(70px, 15vw, 200px)",
            fontWeight: 900,
            lineHeight: 0.88,
            color: "#0f0f0f",
            letterSpacing: "-1px",
            margin: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <span>BLOG</span>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(60px, 10vw, 180px)",
              color: "#e03a1e",
              fontWeight: 700,
              marginLeft: "-20px",
              position: "relative",
              top: "-10px",
              lineHeight: 1,
              fontStyle: "italic",
            }}
          >
            ({allPosts.length})
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            color: "#0f0f0f",
            letterSpacing: "0.5px",
            marginTop: "16px",
          }}
        >
          Notes on what I'm learning each week.
        </p>
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            maxWidth: "760px",
            margin: "0 auto 48px",
          }}
        >
          <FilterButton
            label="All"
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {allTags.map((tag) => (
            <FilterButton
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>
      )}

      {/* Post list */}
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {posts.length === 0 ? (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              color: "#0f0f0f",
            }}
          >
            No posts yet.
          </p>
        ) : (
          posts.map((post) => <PostRow key={post.slug} post={post} />)
        )}
      </div>
    </section>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        letterSpacing: "0.5px",
        padding: "8px 16px",
        borderRadius: "999px",
        cursor: "pointer",
        border: "1px solid #0f0f0f",
        background: active ? "#0f0f0f" : "transparent",
        color: active ? "#e8e0d5" : "#0f0f0f",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );
}

function PostRow({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{
        display: "block",
        textDecoration: "none",
        padding: "32px 0",
        borderTop: "1px solid rgba(15, 15, 15, 0.2)",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          color: "#0f0f0f",
          letterSpacing: "0.5px",
          opacity: 0.7,
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min read</span>
      </div>

      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 900,
          lineHeight: 0.95,
          color: "#0f0f0f",
          letterSpacing: "-0.5px",
          margin: "10px 0 0",
        }}
      >
        {post.title}
      </h2>

      {post.excerpt && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#0f0f0f",
            opacity: 0.85,
            margin: "12px 0 0",
            maxWidth: "620px",
          }}
        >
          {post.excerpt}
        </p>
      )}

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
    </Link>
  );
}