"use client";

import Sidebar from "../components/Sidebar";

export default function About() {
  return (
    <>
      <Sidebar />
      <main style={{ flex: 1, maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
        <h1>About</h1>
        <p>Task Tracker is a demo app used to test prdemo — a CLI that generates narrated PR demo videos.</p>
        <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>
          Use the sidebar to select contacts and share your pending tasks with teammates.
          Click any task on the home page to mark it complete, then share your progress.
        </p>
      </main>
    </>
  );
}
