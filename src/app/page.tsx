"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";

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
  const [newTask, setNewTask] = useState("");

  function toggle(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function addTask() {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), label: trimmed, done: false },
    ]);
    setNewTask("");
  }

  function handleShare(contactIds: number[]) {
    const pendingLabels = tasks
      .filter((t) => !t.done)
      .map((t) => t.label);
    console.log(
      `Shared ${pendingLabels.length} tasks with contacts: ${contactIds.join(", ")}`
    );
  }

  const completed = tasks.filter((t) => t.done).length;

  return (
    <>
      <Sidebar
        sharedTasks={tasks.map(({ label, done }) => ({ label, done }))}
        onShare={handleShare}
      />
      <main style={{ flex: 1, maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
        <h1>Task Tracker</h1>
        <p>A simple app to manage your daily tasks.</p>
        <p style={{ color: '#666', fontSize: 14 }}>
          {completed}/{tasks.length} completed
        </p>

        {/* Add task form */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task…"
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #ddd',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <button
            onClick={addTask}
            style={{
              padding: '10px 20px',
              background: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Add
          </button>
        </div>

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
      </main>
    </>
  );
}
