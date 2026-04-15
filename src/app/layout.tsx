export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </head>
      <body style={{
        margin: 0,
        fontFamily: 'system-ui, sans-serif',
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #1a1a2e)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        color: '#e0e0e0',
      }}>
        {children}
      </body>
    </html>
  );
}
