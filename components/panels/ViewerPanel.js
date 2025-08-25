'use client';
import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function ViewerPanel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch(`${API}/content/posts`, { credentials: "include" });
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  return (
    <section id="content" style={{ maxWidth: 600, margin: "0 auto", color: "#eee" }}>
      <h3
        style={{
          marginBottom: 16,
          color: "#a855f7",
          textShadow: "0 0 8px rgba(168,85,247,0.8)"
        }}
      >
        Posts <span style={{ color: "#888", fontWeight: 400 }}>(Read-Only)</span>
      </h3>

      <div
        style={{
          maxWidth: 520,
          background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 0 15px rgba(128,0,255,0.3)",
          marginBottom: 24
        }}
      >
        {loading ? (
          <p style={{ color: "#bbb" }}>Loading posts...</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.map((p) => (
              <li
                key={p._id}
                style={{
                  marginBottom: 16,
                  background: "#111",
                  borderRadius: 8,
                  boxShadow: "0 0 12px rgba(128,0,255,0.2)",
                  padding: 12,
                  border: "1px solid rgba(128,0,255,0.3)",
                  color: "#eee"
                }}
              >
                <strong
                  style={{
                    fontSize: 16,
                    color: "#a855f7",
                    textShadow: "0 0 6px rgba(168,85,247,0.6)"
                  }}
                >
                  {p.title}
                </strong>
                <p style={{ margin: "8px 0", color: "#bbb" }}>{p.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
