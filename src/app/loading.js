export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: '1rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <span style={{ fontSize: '2rem' }}>🇰🇷</span>
      <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>잠시만요…</p>
      <p style={{ fontSize: '0.9rem' }}>Just a moment</p>
    </div>
  );
}
