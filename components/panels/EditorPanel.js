'use client';
import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function EditorPanel() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(`${API}/content/posts`, { credentials: "include" });
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function createPost() {
    if (!title.trim() || !body.trim()) return;
    setLoading(true);
    await fetch(`${API}/content/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, body })
    });
    setTitle(""); setBody(""); await load();
  }

  async function updatePost(id) {
    const post = posts.find(p => p._id === id);
    const newTitle = prompt("New title?", post?.title);
    const newBody = prompt("New body?", post?.body);
    if (newTitle && newBody) {
      setLoading(true);
      await fetch(`${API}/content/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: newTitle, body: newBody })
      });
      await load();
    }
  }

  async function deletePost(id) {
    if (!window.confirm("Delete this post?")) return;
    setLoading(true);
    await fetch(`${API}/content/posts/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  }

  return (
    <section id="content" style={{ maxWidth: 600, margin: "0 auto", color: "#eee" }}>
      <h3 style={{ marginBottom: 16, color: "#a855f7", textShadow: "0 0 8px rgba(168,85,247,0.8)" }}>
        Content <span style={{ color: "#888", fontWeight: 400 }}>(Editor)</span>
      </h3>

      {/* Input Form */}
      <div style={{
        display: "grid",
        gap: 10,
        maxWidth: 520,
        background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 0 15px rgba(128,0,255,0.3)",
        marginBottom: 24
      }}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid rgba(128,0,255,0.3)",
            fontSize: 15,
            background: "#111",
            color: "#eee",
            boxShadow: "0 0 6px rgba(128,0,255,0.2)"
          }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={4}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid rgba(128,0,255,0.3)",
            fontSize: 15,
            resize: "vertical",
            background: "#111",
            color: "#eee",
            boxShadow: "0 0 6px rgba(128,0,255,0.2)"
          }}
        />
        <button
          onClick={createPost}
          disabled={loading || !title.trim() || !body.trim()}
          style={{
            padding: "8px 0",
            borderRadius: 6,
            border: "none",
            background: "rgba(168,85,247,0.2)",
            color: "#a855f7",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
            boxShadow: "0 0 10px rgba(168,85,247,0.3)"
          }}
          onMouseOver={e => {
            e.target.style.background = "rgba(168,85,247,0.4)";
            e.target.style.boxShadow = "0 0 15px rgba(168,85,247,0.7)";
          }}
          onMouseOut={e => {
            e.target.style.background = "rgba(168,85,247,0.2)";
            e.target.style.boxShadow = "0 0 10px rgba(168,85,247,0.3)";
          }}
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </div>

      {/* Posts */}
      <h4 style={{ marginTop: 16, marginBottom: 12, color: "#a855f7", textShadow: "0 0 6px rgba(168,85,247,0.6)" }}>
        Posts
      </h4>
      {loading ? <p>Loading posts...</p> : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map(p => (
            <li key={p._id} style={{
              marginBottom: 16,
              background: "#111",
              borderRadius: 8,
              boxShadow: "0 0 12px rgba(128,0,255,0.2)",
              padding: 12,
              border: "1px solid rgba(128,0,255,0.3)",
              color: "#eee"
            }}>
              <strong style={{ fontSize: 16, color: "#a855f7", textShadow: "0 0 5px rgba(168,85,247,0.6)" }}>{p.title}</strong>
              <p style={{ margin: "8px 0", color: "#bbb" }}>{p.body}</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => updatePost(p._id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 5,
                    border: "1px solid rgba(128,0,255,0.3)",
                    background: "rgba(128,0,255,0.1)",
                    color: "#a855f7",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    boxShadow: "0 0 8px rgba(128,0,255,0.2)"
                  }}
                  onMouseOver={e => {
                    e.target.style.background = "rgba(168,85,247,0.3)";
                    e.target.style.boxShadow = "0 0 12px rgba(168,85,247,0.7)";
                  }}
                  onMouseOut={e => {
                    e.target.style.background = "rgba(128,0,255,0.1)";
                    e.target.style.boxShadow = "0 0 8px rgba(128,0,255,0.2)";
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(p._id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 5,
                    border: "1px solid rgba(255,0,128,0.3)",
                    background: "rgba(255,0,128,0.1)",
                    color: "#ff4d88",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    boxShadow: "0 0 8px rgba(255,0,128,0.3)"
                  }}
                  onMouseOver={e => {
                    e.target.style.background = "rgba(255,0,128,0.3)";
                    e.target.style.boxShadow = "0 0 12px rgba(255,0,128,0.7)";
                  }}
                  onMouseOut={e => {
                    e.target.style.background = "rgba(255,0,128,0.1)";
                    e.target.style.boxShadow = "0 0 8px rgba(255,0,128,0.3)";
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
