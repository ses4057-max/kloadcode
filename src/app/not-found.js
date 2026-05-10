import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '6rem 1.5rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🇰🇷</p>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '0.5rem' }}>어머나…</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>Oh no — this page doesn&apos;t exist. Maybe it was eaten by a hungry Korean.</p>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'var(--accent)', color: '#fff', fontWeight: 700, borderRadius: '12px', fontSize: '0.95rem' }}>
        ← Back to reviews
      </Link>
    </div>
  );
}
