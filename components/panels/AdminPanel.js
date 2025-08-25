'use client';
import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  async function loadUsers() {
    setLoadingUsers(true);
    const res = await fetch(`${API}/users`, { credentials: "include" });
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
    setLoadingUsers(false);
  }

  async function loadLogs() {
    setLoadingLogs(true);
    const res = await fetch(`${API}/logs`, { credentials: "include" });
    const data = await res.json();
    setLogs(Array.isArray(data) ? data : []);
    setLoadingLogs(false);
  }

  async function loadPosts() {
    setLoadingPosts(true);
    const res = await fetch(`${API}/content/posts`, { credentials: "include" });
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoadingPosts(false);
  }

  useEffect(() => { loadUsers(); loadLogs(); loadPosts(); }, []);

  async function changeRole(id, role) {
    await fetch(`${API}/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role })
    });
    await loadUsers();
  }

  async function deleteUser(id) {
    await fetch(`${API}/users/${id}`, { method: "DELETE", credentials: "include" });
    await loadUsers();
  }

  return (
    <section className="admin-panel">
      {/* USERS */}
      <h3 id="users" className="section-title">Manage Users</h3>
      {loadingUsers ? <p>Loading users...</p> : (
        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className={i % 2 ? "row-alt" : ""}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                <td className="action-cell">
                  {["admin", "editor", "viewer"].map(r => (
                    <button
                      key={r}
                      disabled={u.role === r}
                      onClick={() => changeRole(u._id, r)}
                      className={`role-btn ${u.role === r ? "disabled" : ""}`}
                    >
                      {r}
                    </button>
                  ))}
                  <button onClick={() => deleteUser(u._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* POSTS */}
      <h3 id="posts" className="section-title">All Posts</h3>
      <div className="card">
        {loadingPosts ? <p>Loading posts...</p> : (
          <ul className="post-list">
            {posts.map(p => (
              <li key={p._id} className="post-card">
                <strong>{p.title}</strong>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* LOGS */}
      <h3 id="logs" className="section-title">System Logs (latest 200)</h3>
      {loadingLogs ? <p>Loading logs...</p> : (
        <div className="logs-box">
          {logs.map(l => (
            <div key={l._id} className="log-row">
              <code>
                <span className="log-time">{new Date(l.createdAt).toLocaleString()}</span>
                {" — "}
                <span className="log-user">{l.email || l.userId}</span>
                {" — "}
                <span className="log-action">{l.action}</span>
                {" — "}
                <span className="log-route">{l.route}</span>
              </code>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
