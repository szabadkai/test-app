"use client";

import Link from "next/link";
import { useState } from "react";

type Category = "work" | "personal" | "shopping" | "health";

interface Task {
  id: number;
  text: string;
  done: boolean;
  category: Category;
}

const categoryColors: Record<Category, string> = {
  work: "#3b82f6",
  personal: "#a855f7",
  shopping: "#f59e0b",
  health: "#10b981",
};

const initialTasks: Task[] = [
  { id: 1, text: "Buy groceries", done: false, category: "shopping" },
  { id: 2, text: "Review pull requests", done: false, category: "work" },
  { id: 3, text: "Ship prdemo v0", done: false, category: "work" },
  { id: 4, text: "Morning run", done: false, category: "health" },
  { id: 5, text: "Call dentist", done: false, category: "personal" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Category | "all">("all");
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("work");

  const toggle = (id: number) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((t) => [
      ...t,
      { id: Date.now(), text: newTask.trim(), done: false, category: newCategory },
    ]);
    setNewTask("");
  };

  const filtered = tasks.filter((t) => {
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === "all" || t.category === filter;
    return matchesSearch && matchesCategory;
  });

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "60px auto",
        padding: "0 20px",
        color: "#1a1a2e",
      }}
    >
      <h1 style={{ marginBottom: 4 }}>Task Tracker</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        {doneCount}/{tasks.length} completed
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #ddd",
          fontSize: 14,
          marginBottom: 12,
          boxSizing: "border-box",
        }}
      />

      {/* Category filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {(["all", "work", "personal", "shopping", "health"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: filter === c ? 600 : 400,
              background: filter === c ? (c === "all" ? "#333" : categoryColors[c]) : "#e5e7eb",
              color: filter === c ? "#fff" : "#555",
              transition: "all 0.2s",
            }}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Task list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.map((task) => (
          <li
            key={task.id}
            onClick={() => toggle(task.id)}
            style={{
              padding: "12px 16px",
              background: "#fff",
              marginBottom: 8,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              borderLeft: `4px solid ${categoryColors[task.category]}`,
              textDecoration: task.done ? "line-through" : "none",
              opacity: task.done ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <span style={{ fontSize: 18 }}>{task.done ? "✅" : "☐"}</span>
            <span style={{ flex: 1 }}>{task.text}</span>
            <span
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 10,
                background: categoryColors[task.category] + "22",
                color: categoryColors[task.category],
                fontWeight: 600,
              }}
            >
              {task.category}
            </span>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ padding: 20, textAlign: "center", color: "#999" }}>
            No tasks found
          </li>
        )}
      </ul>

      {/* Add task */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 14,
          }}
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as Category)}
          style={{
            padding: "10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 14,
            background: "#fff",
          }}
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
        </select>
        <button
          onClick={addTask}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#3b82f6",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        <Link href="/about" style={{ color: "#3b82f6" }}>
          About this app
        </Link>
      </div>
    </main>
  );
}
