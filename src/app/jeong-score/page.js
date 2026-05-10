import Link from 'next/link';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import JeongBadge from '@/components/JeongBadge/JeongBadge';
import reviews from '@/data/reviews.json';
import styles from './page.module.css';

export const metadata = {
  title: 'The Jeong Score (정) — Honest Korean Reviews',
  description: 'Jeong (정) is a uniquely Korean concept of warm cultural attachment. We built it into our scoring system so you know which products are Korean soul food — and which are just products.',
};

const TIERS = [
  { id: 'tier-9', min: 9, max: 10, emoji: '🔥', label: 'Korean Soul Tier', color: '#C0392B', desc: 'These products are part of Korean identity. Every Korean has a memory with them. Not just food — they are culture.' },
  { id: 'tier-7', min: 7, max: 8.9, emoji: '❤️', label: 'Beloved Classics', color: '#E67E22', desc: 'Deep in Korean hearts. Most Koreans grew up with these and still reach for them today.' },
  { id: 'tier-4', min: 4, max: 6.9, emoji: '👍', label: 'Modern Staples', color: '#2980B9', desc: 'Good products with a following, but not yet woven into generational memory. Judge them on taste alone.' },
  { id: 'tier-0', min: 0, max: 3.9, emoji: '🆕', label: 'Just Products', color: '#95A5A6', desc: 'New launches, trend items, or products without cultural roots. No nostalgia bonus — score them on pure merit.' },
];

export default function JeongScorePage() {
  const sortedByJeong = [...reviews].sort((a, b) => (b.jeong_score || 0) - (a.jeong_score || 0));
  const top10 = sortedByJeong.slice(0, 10);
  const bottom10 = [...sortedByJeong].reverse().slice(0, 10);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <span className={styles.heroChar}>정</span>
          <h1 className={styles.title}>The Jeong Score</h1>
          <p className={styles.subtitle}>The metric no other review site has — because no other review site is written by Koreans.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>What is Jeong (정)?</h2>
          <p className={styles.body}>Jeong (정) is one of those Korean concepts that can&apos;t be directly translated. It&apos;s the warm, accumulated attachment you build with something — or someone — over time. It&apos;s what makes you love your neighborhood barbershop even though a better one opened nearby. It&apos;s what makes Koreans eat Shin Ramyun at 11pm not because it&apos;s the best ramen, but because it tastes like every late night they&apos;ve ever pushed through.</p>
          <p className={styles.body}>For food and consumer products, Jeong is the difference between &quot;this is good&quot; and &quot;this is ours.&quot;</p>

          <div className={styles.comparison}>
            <div className={styles.compCard}>
              <span className={styles.compScore}>9.5 / 10</span>
              <span className={styles.compLabel}>Taste Score</span>
              <p>Great product. Excellent quality. Worth buying.</p>
            </div>
            <span className={styles.compVs}>≠</span>
            <div className={styles.compCard} style={{ borderColor: '#C0392B' }}>
              <span className={styles.compScore} style={{ color: '#C0392B' }}>정 10 / 10</span>
              <span className={styles.compLabel}>Jeong Score</span>
              <p>Part of Korean cultural memory. Every Korean has a story with it.</p>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Why we invented it</h2>
          <p className={styles.body}>When foreigners visit Korea, they want to know: &quot;What should I try?&quot; The taste score helps. But it doesn&apos;t tell you whether something is a throwaway trend or a 50-year-old national icon. Banana Milk scores 8.5 on taste — good, not extraordinary. But its Jeong Score is 10. That context changes everything about how you should experience it.</p>
          <p className={styles.body}>No foreign reviewer can give you that. We can, because we grew up with it.</p>
        </div>
      </section>

      <section className={styles.tiersSection}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>The Four Jeong Tiers</h2>
          {TIERS.map(tier => {
            const tierReviews = reviews.filter(r => r.jeong_score >= tier.min && r.jeong_score <= tier.max);
            return (
              <div key={tier.id} id={tier.id} className={styles.tier} style={{ borderColor: tier.color }}>
                <div className={styles.tierHeader}>
                  <span className={styles.tierEmoji}>{tier.emoji}</span>
                  <div>
                    <strong className={styles.tierLabel} style={{ color: tier.color }}>{tier.label}</strong>
                    <span className={styles.tierRange}>Jeong {tier.min}–{tier.max}</span>
                  </div>
                </div>
                <p className={styles.tierDesc}>{tier.desc}</p>
                {tierReviews.length > 0 && (
                  <div className={styles.tierProducts}>
                    {tierReviews.map(r => (
                      <Link key={r.id} href={`/review/${r.slug}`} className={styles.tierProduct}>
                        <JeongBadge score={r.jeong_score} size="sm" showTooltip={false} />
                        <span>{r.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <h2 className="section-title">Highest Jeong Scores</h2>
          <p className="section-subtitle">The products most deeply woven into Korean culture.</p>
          <div className={styles.reviewGrid}>
            {top10.slice(0, 4).map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">Lowest Jeong Scores</h2>
          <p className="section-subtitle">New, modern, or globally-born. Judge them on taste alone.</p>
          <div className={styles.reviewGrid}>
            {bottom10.slice(0, 4).map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
