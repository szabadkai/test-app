"use client";

import Link from "next/link";
import { useState } from "react";

const tasks = ["Buy groceries", "Review pull requests", "Ship prdemo v0"];

export default function Home() {
  const [done, setDone] = useState<Set<number>>(new Set());
  const [shareTask, setShareTask] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  function toggle(i: number) {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function handleShare(e: React.FormEvent) {
    e.preventDefault();
    setShared(true);
    setTimeout(() => {
      setShareTask(null);
      setShared(false);
    }, 1500);
  }

  return (
    <main style={{ maxWidth: 600, margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ color: "#fff", fontSize: 32 }}>Task Tracker</h1>
      <p style={{ color: "#aaa" }}>A simple app to manage your daily tasks.</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, i) => (
          <li
            key={i}
            style={{
              padding: "14px 16px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              marginBottom: 10,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              onClick={() => toggle(i)}
              style={{
                cursor: "pointer",
                textDecoration: done.has(i) ? "line-through" : "none",
                opacity: done.has(i) ? 0.5 : 1,
              }}
            >
              {done.has(i) ? "✓" : "☐"} {task}
            </span>
            <button
              onClick={() => setShareTask(task)}
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Share
            </button>
          </li>
        ))}
      </ul>

      <p style={{ color: "#888", fontSize: 14 }}>
        {done.size}/{tasks.length} completed
      </p>

      <Link href="/about" style={{ color: "#667eea" }}>
        About this app
      </Link>

      {shareTask && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => { setShareTask(null); setShared(false); }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #1e1e3f, #2a2a5e)",
              borderRadius: 16,
              padding: "32px",
              width: 360,
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <h2 style={{ margin: "0 0 8px", color: "#fff", fontSize: 20 }}>
              Share Task
            </h2>
            <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 20px" }}>
              Send &ldquo;{shareTask}&rdquo; to a teammate
            </p>
            <form onSubmit={handleShare}>
              <input
                type="email"
                placeholder="teammate@company.com"
                required
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontSize: 14,
                  marginBottom: 12,
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
              <textarea
                placeholder="Add a note (optional)"
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontSize: 14,
                  marginBottom: 16,
                  boxSizing: "border-box",
                  resize: "none",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => { setShareTask(null); setShared(false); }}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "transparent",
                    color: "#aaa",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 22px",
                    borderRadius: 8,
                    border: "none",
                    background: shared
                      ? "linear-gradient(135deg, #43e97b, #38f9d7)"
                      : "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {shared ? "✓ Sent!" : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
