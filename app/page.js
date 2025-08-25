"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        padding: 24,
        maxWidth: 1600,
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a0a, #1a0b2e)", // black-purple gradient
      }}
    >
      <div
        style={{
          background: "rgba(20, 20, 30, 0.9)",
          padding: 36,
          borderRadius: 16,
          boxShadow: "0 0 25px rgba(128, 0, 255, 0.35)", // purple glow
          marginBottom: 32,
          color: "#eee",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#a855f7",
            fontWeight: 800,
            fontSize: 36,
            marginBottom: 12,
            textShadow: "0 0 12px rgba(168, 85, 247, 0.8)",
            letterSpacing: "1px",
          }}
        >
          Role-Based Dashboard
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#bbb",
            marginBottom: 20,
            fontSize: 16,
          }}
        >
          Demo of role-based UI with Next.js + Express.
        </p>

        {/* Login Button */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link
            href="/login"
            style={{
              display: "inline-block",
              padding: "12px 40px",
              borderRadius: 8,
              background: "linear-gradient(135deg,#7e22ce,#a855f7)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              textDecoration: "none",
              boxShadow: "0 0 15px rgba(168, 85, 247, 0.6)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.boxShadow = "0 0 25px rgba(168, 85, 247, 1)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = "0 0 15px rgba(168, 85, 247, 0.6)";
              e.target.style.transform = "scale(1)";
            }}
          >
            Login
          </Link>
        </div>

        {/* Roles Section */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
            boxShadow: "0 0 12px rgba(168,85,247,0.15)",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 10, color: "#a855f7" }}>
            List of roles and credentials:
          </div>
          <ul style={{ paddingLeft: 20, marginBottom: 0, lineHeight: 1.6 }}>
            <li>
              <b>Admin</b>: <br />Email:{" "}
              <span style={{ color: "#a855f7" }}>admin@example.com</span>
              <br />
              Password: <span style={{ color: "#a855f7" }}>admin123</span>
            </li>
            <li>
              <b>Editor</b>: <br />Email:{" "}
              <span style={{ color: "#a855f7" }}>editor@example.com</span>
              <br />
              Password: <span style={{ color: "#a855f7" }}>editor123</span>
            </li>
            <li>
              <b>Viewer</b>: <br />Email:{" "}
              <span style={{ color: "#a855f7" }}>viewer@example.com</span>
              <br />
              Password: <span style={{ color: "#a855f7" }}>viewer123</span>
            </li>
          </ul>
        </div>

        {/* Disclaimer Section */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
            boxShadow: "0 0 12px rgba(168,85,247,0.15)",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 10, color: "#a855f7" }}>
            DISCLAIMER
          </div>
          <p style={{ marginBottom: 0, color: "#ccc", fontSize: 15 }}>
            Run this command first to register with all the above different
            credentials:
            <br />
            <code
              style={{
                background: "#111",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 15,
                margin: "4px 0",
                display: "inline-block",
                color: "#a855f7",
              }}
            >
              npm install in both api and web2 folders
            </code>
            <br />
            <code
              style={{
                background: "#111",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 15,
                margin: "4px 0",
                display: "inline-block",
                color: "#a855f7",
              }}
            >
              cd api && npm run seed
            </code>
          </p>
        </div>

        {/* Description Section */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0 0 12px rgba(168,85,247,0.15)",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 10,
              color: "#a855f7",
            }}
          >
            Description
          </h2>
          <ul style={{ paddingLeft: 20, marginBottom: 0, color: "#ddd" }}>
            <li>This is an illustrative example of role-based authorization.</li>
            <li>
              Users are assigned a role: <b>admin</b>, <b>editor</b>, or{" "}
              <b>viewer</b>.
            </li>
            <li>
              <b>Admin</b> can update user&apos;s role, see posts and delete
              users.
            </li>
            <li>
              <b>Editor</b> can create and edit posts and delete them.
            </li>
            <li>
              <b>Viewer</b> can only view posts.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
