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
                <p className={styles.tagline}>Real reviews by Koreans who see their own country through a traveler&apos;s eyes.</p>
              </div>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Categories</h4>
              <Link href="/category/drinks">Drinks</Link>
              <Link href="/category/snacks">Snacks</Link>
              <Link href="/category/ramen">Ramen &amp; Instant</Link>
              <Link href="/category/kbeauty">K-Beauty</Link>
              <Link href="/category/convenience">Convenience Store</Link>
              <Link href="/category/kpop">K-Pop &amp; K-Drama</Link>
            </div>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>More</h4>
              <Link href="/about">About Us</Link>
              <Link href="/guides">Travel Guides</Link>
              <Link href="/awards">Awards</Link>
              <Link href="/newsletter">Newsletter</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2026 Honest Korean Reviews. All rights reserved.</p>
          <p className={styles.disclosure}>
            This site contains affiliate links. We may earn a commission at no extra cost to you.
            <Link href="/about"> Learn more →</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
