import Link from 'next/link';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import JeongBadge from '@/components/JeongBadge/JeongBadge';
import reviews from '@/data/reviews.json';
import styles from './page.module.css';

export const metadata = {
  title: 'The Jeong Score (정) — Honest Korean Reviews',
  description: 'Jeong (정) is a uniquely Korean concept of warm cultural attachment. We score how much Jeong Koreans feel toward each product.',
};

const TIERS = [
  { id: 'tier-9', min: 9, max: 10, emoji: '🔥', label: 'Korean Soul Tier', color: '#C0392B', desc: 'Must-try cultural items.' },
  { id: 'tier-7', min: 7, max: 8.9, emoji: '❤️', label: 'Beloved Classics', color: '#E67E22', desc: 'Deep in Korean hearts.' },
  { id: 'tier-4', min: 4, max: 6.9, emoji: '👍', label: 'Modern Staples', color: '#2980B9', desc: 'Liked but no deep roots.' },
  { id: 'tier-0', min: 0, max: 3.9, emoji: '🆕', label: 'Just Products', color: '#95A5A6', desc: 'Judge on merit alone.' },
];

export default function JeongScorePage() {
  const top10 = [...reviews].sort((a, b) => b.jeong_score - a.jeong_score).slice(0, 10);
  const bottom10 = [...reviews].sort((a, b) => a.jeong_score - b.jeong_score).slice(0, 10);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <h1 className={styles.title}>What is Jeong (정)?</h1>
          <p className={styles.subtitle}>Our signature metric. Lived-in attachment built over time.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-narrow">
          <h2>Why we invented the Jeong Score</h2>
          <p>We score how much Jeong Koreans feel toward this product — a measure of its place in our cultural memory.</p>
          <p>A simple infographic (coming soon) will show the difference between a high taste score and a high Jeong score.</p>

          <div className={styles.tiers}>
            {TIERS.map(t => (
              <div key={t.id} className={styles.tier} style={{ borderColor: t.color }}>
                <h3>{t.emoji} {t.label} ({t.min}-{t.max})</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2>Top 10 Highest Jeong Score products</h2>
          <div className={styles.grid}>
            {top10.slice(0, 4).map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2>Top 10 Lowest Jeong Score products</h2>
          <div className={styles.grid}>
            {bottom10.slice(0, 4).map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
