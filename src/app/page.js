import Link from 'next/link';
import Image from 'next/image';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import ScoreBadge from '@/components/ScoreBadge/ScoreBadge';
import NewsletterForm from '@/components/NewsletterForm/NewsletterForm';
import reviews from '@/data/reviews.json';
import categories from '@/data/categories.json';
import styles from './page.module.css';

export default function Home() {
  const featured = reviews.find(r => r.slug === 'cosrx-snail-mucin-essence');
  const newest = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const topRated = [...reviews].sort((a, b) => b.score - a.score).slice(0, 8);
  const worst = [...reviews].sort((a, b) => a.score - b.score).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.heroLabel}>🇰🇷 Since 2026</p>
            <h1 className={styles.heroTitle}>
              Honest reviews of Korean products, by Koreans who review their own country through a traveler&apos;s eyes.
            </h1>
            <p className={styles.heroDesc}>
              We buy it, taste it, test it, score it — from 0 to 10, no exceptions.
              Snacks, drinks, ramen, K-beauty, and everything in between.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/category/snacks" className="btn-primary">Browse Reviews</Link>
              <Link href="/about" className="btn-secondary">Our Story</Link>
            </div>
          </div>
          <div className={styles.heroCard}>
            <Link href={`/review/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredImgWrap}>
                <Image src={featured.image} alt={featured.name} width={500} height={375} className={styles.featuredImg} />
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.featuredTop}>
                  <span className={styles.featuredLabel}>⭐ Featured Review</span>
                  <ScoreBadge score={featured.score} size="md" />
                </div>
                <h2 className={styles.featuredName}>{featured.name}</h2>
                <p className={styles.featuredVerdict}>{featured.verdict}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">This Week&apos;s New Arrivals</h2>
              <p className="section-subtitle">Fresh reviews, straight from our kitchen.</p>
            </div>
          </div>
          <div className={styles.scrollRow}>
            {newest.map((r, i) => (
              <div key={r.id} className={styles.scrollItem}>
                <ReviewCard review={r} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Top Rated of All Time</h2>
              <p className="section-subtitle">The best Korean products we&apos;ve ever tested.</p>
            </div>
            <Link href="/category/snacks" className="accent-link">View all →</Link>
          </div>
          <div className={styles.grid}>
            {topRated.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Worst of the Worst */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Worst of the Worst 💀</h2>
              <p className="section-subtitle">We tried them so you don&apos;t have to. (But you probably will anyway.)</p>
            </div>
          </div>
          <div className={styles.gridSmall}>
            {worst.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">Find exactly what you&apos;re looking for.</p>
          <div className={styles.categoryGrid}>
            {categories.map((cat, i) => (
              <CategoryCard key={cat.slug} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Travel CTA */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>Visiting Korea? 🛫</h2>
              <p className={styles.ctaDesc}>
                Our travel guides help you find the best products to buy,
                where to find them, and what to skip.
              </p>
            </div>
            <Link href="/guides" className="btn-primary" style={{ background: 'white', color: 'var(--text-primary)' }}>
              Read Travel Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.newsletterBlock}>
            <div className={styles.newsletterText}>
              <h2 className="section-title">Get 5 New Reviews Every Sunday ✉️</h2>
              <p className="section-subtitle" style={{ marginBottom: 'var(--space-lg)' }}>
                Join our free newsletter — new products, honest scores, no spam.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
