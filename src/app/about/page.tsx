import Link from "next/link";

export default function About() {
  return (
    <main style={{ maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#fff' }}>About</h1>
      <p style={{ color: '#aaa' }}>Task Tracker is a demo app used to test prdemo — a CLI that generates narrated PR demo videos.</p>
      <Link href="/" style={{ color: '#667eea' }}>← Back home</Link>
    </main>
  );
}
