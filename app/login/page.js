'use client';
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/dashboard";
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 1600,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)",
        color: "#eee"
      }}
    >
<h1 style={{ textAlign: "center", marginTop: "20px", color: "#a855f7", fontSize: "32px", fontWeight: "700", textShadow: "0 0 12px rgba(168,85,247,0.8)" }}>
  Role Based Authorization
</h1>
      <div
        style={{
          background: "#111",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 0 20px rgba(128,0,255,0.4)",
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
          border: "1px solid rgba(168,85,247,0.4)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            color: "#a855f7",
            fontWeight: 700,
            fontSize: 28,
            textShadow: "0 0 12px rgba(168,85,247,0.8)"
          }}
        >
          Login
        </h2>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid rgba(168,85,247,0.4)",
              fontSize: 16,
              background: "#1a1a1a",
              color: "#eee",
              boxShadow: "0 0 8px rgba(128,0,255,0.2)"
            }}
            autoFocus
            type="email"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid rgba(168,85,247,0.4)",
              fontSize: 16,
              background: "#1a1a1a",
              color: "#eee",
              boxShadow: "0 0 8px rgba(128,0,255,0.2)"
            }}
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 0",
              borderRadius: 6,
              border: "none",
              background: "#a855f7",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 12px rgba(168,85,247,0.6)",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#9333ea")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#a855f7")
            }
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p
              style={{
                color: "crimson",
                background: "#2a0000",
                border: "1px solid #f87171",
                borderRadius: 6,
                padding: "8px 12px",
                textAlign: "center",
                fontWeight: 500,
                marginTop: 4,
                boxShadow: "0 0 8px rgba(239,68,68,0.6)"
              }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
