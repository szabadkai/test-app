import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
      <h1>Task Tracker</h1>
      <p>A simple app to manage your daily tasks.</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '12px', background: '#fff', marginBottom: 8, borderRadius: 8 }}>
          ☐ Buy groceries
        </li>
        <li style={{ padding: '12px', background: '#fff', marginBottom: 8, borderRadius: 8 }}>
          ☐ Review pull requests
        </li>
        <li style={{ padding: '12px', background: '#fff', marginBottom: 8, borderRadius: 8 }}>
          ☐ Ship prdemo v0
        </li>
      </ul>
      <Link href="/about" style={{ color: '#0070f3' }}>About this app</Link>
    </main>
  );
}
