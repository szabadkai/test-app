"use client";

import { useState } from "react";
import Link from "next/link";

interface Contact {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const contacts: Contact[] = [
  { id: 1, name: "Alice Chen", email: "alice@example.com", avatar: "AC" },
  { id: 2, name: "Bob Martinez", email: "bob@example.com", avatar: "BM" },
  { id: 3, name: "Carol Nguyen", email: "carol@example.com", avatar: "CN" },
  { id: 4, name: "Dave Patel", email: "dave@example.com", avatar: "DP" },
];

interface SidebarProps {
  sharedTasks?: { label: string; done: boolean }[];
  onShare?: (contactIds: number[]) => void;
}

export default function Sidebar({ sharedTasks = [], onShare }: SidebarProps) {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [shareSuccess, setShareSuccess] = useState(false);

  function toggleContact(id: number) {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setShareSuccess(false);
  }

  function handleShare() {
    if (selectedContacts.length === 0) return;
    onShare?.(selectedContacts);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  }

  const pendingTasks = sharedTasks.filter((t) => !t.done);

  return (
    <aside
      style={{
        width: 280,
        background: "#fff",
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          padding: "20px 16px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, color: "#1a1a1a" }}>
          📋 Task Tracker
        </h2>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "12px 0" }}>
        <Link
          href="/"
          style={{
            display: "block",
            padding: "10px 16px",
            color: "#1a1a1a",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
            background: "#f0f4ff",
            borderRight: "3px solid #0070f3",
          }}
        >
          🏠 Tasks
        </Link>
        <Link
          href="/about"
          style={{
            display: "block",
            padding: "10px 16px",
            color: "#666",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          ℹ️ About
        </Link>
      </nav>

      {/* Contacts Section */}
      <div
        style={{
          padding: "0 16px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <h3
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#999",
            marginBottom: 8,
          }}
        >
          Contacts
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {contacts.map((contact) => {
            const isSelected = selectedContacts.includes(contact.id);
            return (
              <li
                key={contact.id}
                onClick={() => toggleContact(contact.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  marginBottom: 4,
                  background: isSelected ? "#e8f0fe" : "transparent",
                  border: isSelected
                    ? "1px solid #0070f3"
                    : "1px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: isSelected ? "#0070f3" : "#e0e0e0",
                    color: isSelected ? "#fff" : "#666",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {contact.avatar}
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#1a1a1a",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {contact.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#999",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {contact.email}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Share Section */}
      <div
        style={{
          padding: 16,
          borderTop: "1px solid #e0e0e0",
          background: "#fafafa",
        }}
      >
        {pendingTasks.length > 0 && (
          <p style={{ fontSize: 12, color: "#666", margin: "0 0 8px" }}>
            {pendingTasks.length} pending task{pendingTasks.length !== 1 && "s"}{" "}
            to share
          </p>
        )}
        <button
          onClick={handleShare}
          disabled={selectedContacts.length === 0}
          style={{
            width: "100%",
            padding: "10px 0",
            background:
              selectedContacts.length > 0 ? "#0070f3" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: selectedContacts.length > 0 ? "pointer" : "not-allowed",
            transition: "background 0.2s ease",
          }}
        >
          {shareSuccess
            ? "✓ Shared!"
            : `Share with ${selectedContacts.length || "…"}`}
        </button>
        {selectedContacts.length === 0 && (
          <p style={{ fontSize: 11, color: "#999", margin: "6px 0 0", textAlign: "center" }}>
            Select contacts above to share your tasks
          </p>
        )}
      </div>
    </aside>
  );
}
