"use client";

import Link from "next/link";
import { useState } from "react";

interface Task {
  id: number;
  label: string;
  done: boolean;
}

const initialTasks: Task[] = [
  { id: 1, label: "Buy groceries", done: false },
  { id: 2, label: "Review pull requests", done: false },
  { id: 3, label: "Ship prdemo v0", done: false },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function toggle(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  const completed = tasks.filter((t) => t.done).length;

  return (
    <main style={{ maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
      <h1>Task Tracker</h1>
      <p>A simple app to manage your daily tasks.</p>
      <p style={{ color: '#666', fontSize: 14 }}>
        {completed}/{tasks.length} completed
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggle(task.id)}
            style={{
              padding: '12px',
              background: task.done ? '#e8f5e9' : '#fff',
              marginBottom: 8,
              borderRadius: 8,
              cursor: 'pointer',
              textDecoration: task.done ? 'line-through' : 'none',
              color: task.done ? '#888' : '#000',
              transition: 'all 0.2s ease',
            }}
          >
            {task.done ? '☑' : '☐'} {task.label}
          </li>
        ))}
      </ul>
      <Link href="/about" style={{ color: '#0070f3' }}>About this app</Link>
    </main>
  );
}
