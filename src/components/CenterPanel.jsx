import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/CenterPanel.css";

function CenterPanel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [selectedPost, setSelectedPost] = useState(null);

  const panelRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://13.232.25.75:5000";

  /* ---------------- FETCH POSTS ---------------- */
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/api/blogs`, {
          signal: controller.signal,
          headers: { Accept: "application/json", "Cache-Control": "no-cache" },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Failed to load blogs.");
          setShowToast(true);
          setToastType("error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
    return () => controller.abort();
  }, [API_BASE]);

  /* ---------------- LOOPING DATA ---------------- */
  const items = useMemo(() => {
    const base = (posts || []).filter(Boolean).slice(0, 10);
    return [...base, ...base]; // duplicate for infinite loop
  }, [posts]);

  /* ---------------- SCROLL LOOP LOGIC ---------------- */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    function handleScroll() {
      const reachedBottom =
        panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 5;

      // Disable auto-looping to allow normal scrolling
      // if (reachedBottom) {
      //   panel.scrollTop = 0; // loop back to top
      // }
    }

    panel.addEventListener("scroll", handleScroll);
    return () => panel.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- UTIL ---------------- */
  function formatDate(value) {
    const d = new Date(value);
    return isNaN(d) ? "" : d.toDateString();
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div className="center-panel" ref={panelRef}>
      <h2>Latest Blogs</h2>

      {loading && <p>Loading blogs...</p>}
      {!loading && error && <p style={{ color: "#ffd7d7" }}>{error}</p>}
      {!loading && !error && items.length === 0 && <p>No posts found.</p>}

      {!loading &&
        !error &&
        items.map((post, index) => (
          <div
            key={`${post.link || index}-${index}`}
            className="blog-card"
            onClick={() => setSelectedPost(post)}
            role="button"
          >
            <h3>
              <a
                href={post.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {post.title || "Untitled"}
              </a>
            </h3>
            <p>
              {(post.contentSnippet || "").slice(0, 150)}
              {post.contentSnippet?.length > 150 ? "..." : ""}
            </p>
            <small>Published: {formatDate(post.pubDate)}</small>
          </div>
        ))}

      {/* Modal */}
      {selectedPost && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.contentSnippet}</p>
            <small>
              Published: {formatDate(selectedPost.pubDate)}
            </small>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className={`toast toast--${toastType}`}>
          <span>{error}</span>
          <button onClick={() => setShowToast(false)}>×</button>
        </div>
      )}
    </div>
  );
}

export default CenterPanel;
