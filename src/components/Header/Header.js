'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🇰🇷</span>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Honest Korean</span>
            <span className={styles.logoSub}>Reviews</span>
          </div>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <Link href="/category/drinks" className={styles.navLink} onClick={() => setMenuOpen(false)}>Drinks</Link>
          <Link href="/category/snacks" className={styles.navLink} onClick={() => setMenuOpen(false)}>Snacks</Link>
          <Link href="/category/ramen" className={styles.navLink} onClick={() => setMenuOpen(false)}>Ramen</Link>
          <Link href="/category/kbeauty" className={styles.navLink} onClick={() => setMenuOpen(false)}>K-Beauty</Link>
          <Link href="/jeong-score" className={styles.navLink} onClick={() => setMenuOpen(false)}>정 Jeong</Link>
          <Link href="/about" className={styles.navLink} onClick={() => setMenuOpen(false)}>About</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/find-this" className={styles.findBtn} aria-label="Find a product">🔍 Find</Link>
          <Link href="/newsletter" className={styles.subscribe}>Subscribe</Link>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
            <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
            <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
