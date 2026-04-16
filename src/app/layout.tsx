export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          background: '#f5f5f5',
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
