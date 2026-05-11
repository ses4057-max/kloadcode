import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>🇰🇷</span>
              <div>
                <div className={styles.logoTitle}>Honest Korean Reviews</div>
                <p className={styles.tagline}>The only honest Korean product database written BY Koreans, FOR foreigners.</p>
              </div>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Categories</h4>
              <Link href="/category/drinks">🥤 Drinks</Link>
              <Link href="/category/snacks">🍪 Snacks</Link>
              <Link href="/category/ramen">🍜 Ramen &amp; Instant</Link>
              <Link href="/category/convenience">🏪 Convenience Store New</Link>
              <Link href="/category/kpop">🎵 K-Pop &amp; K-Drama</Link>
              <Link href="/category/kbeauty">✨ K-Beauty</Link>
            </div>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Explore</h4>
              <Link href="/find-this">🔍 Find a Product</Link>
              <Link href="/jeong-score">정 Jeong Score</Link>
              <Link href="/about">About Min &amp; Seo</Link>
              <Link href="/receipts">🧾 Receipts</Link>
              <Link href="/vs">Why Us?</Link>
              <Link href="/awards">Awards 2027</Link>
            </div>
          </div>
        </div>

        <div className={styles.affiliateBar}>
          This site contains affiliate links. We may earn a commission at no cost to you. Scores are never affected.{' '}
          <Link href="/about#how-we-make-money">Learn more →</Link>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2026 Honest Korean Reviews. Made with 정 in Seoul.</p>
        </div>
      </div>
    </footer>
  );
}
