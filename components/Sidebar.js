import { useRouter } from "next/navigation";

export default function Sidebar({ role, name }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    router.push("/login");
  }

  return (
    <aside
      style={{
        width: 220,
        background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        borderRight: "1px solid rgba(128,0,255,0.3)",
        boxShadow: "0 0 20px rgba(128,0,255,0.2)"
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 20,
            color: "#a855f7",
            textShadow: "0 0 8px rgba(168,85,247,0.8)"
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "#ccc",
            fontSize: 15,
            marginTop: 2,
            fontWeight: 500
          }}
        >
          {role}
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <a
          href="/dashboard"
          style={{
            padding: "10px 12px",
            borderRadius: 6,
            background: "rgba(128,0,255,0.1)",
            color: "#eee",
            fontWeight: 500,
            textDecoration: "none",
            boxShadow: "0 0 10px rgba(128,0,255,0.2)",
            transition: "all 0.3s"
          }}
          onMouseOver={e => {
            e.target.style.background = "rgba(168,85,247,0.3)";
            e.target.style.boxShadow = "0 0 15px rgba(168,85,247,0.7)";
          }}
          onMouseOut={e => {
            e.target.style.background = "rgba(128,0,255,0.1)";
            e.target.style.boxShadow = "0 0 10px rgba(128,0,255,0.2)";
          }}
        >
          Dashboard
        </a>
        {/* Add more links with same style */}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          padding: "10px 0",
          width: "100%",
          borderRadius: 6,
          border: "none",
          background: "rgba(255,0,128,0.1)",
          color: "#ff4d88",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(255,0,128,0.3)",
          transition: "all 0.3s"
        }}
        onMouseOver={e => {
          e.target.style.background = "rgba(255,0,128,0.3)";
          e.target.style.boxShadow = "0 0 15px rgba(255,0,128,0.7)";
        }}
        onMouseOut={e => {
          e.target.style.background = "rgba(255,0,128,0.1)";
          e.target.style.boxShadow = "0 0 10px rgba(255,0,128,0.3)";
        }}
      >
        Logout
      </button>
    </aside>
  );
}
