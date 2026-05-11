'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import ScoreBadge from '@/components/ScoreBadge/ScoreBadge';
import JeongBadge from '@/components/JeongBadge/JeongBadge';
import SearchBar from '@/components/SearchBar/SearchBar';
import reviews from '@/data/reviews.json';
import categories from '@/data/categories.json';
import styles from './page.module.css';

const JEONG_TIERS = [
  { min: 9, max: 10, label: 'Korean Soul Tier', desc: 'Must-try cultural icons', color: '#C0392B', emoji: '🔥' },
  { min: 7, max: 8.9, label: 'Beloved Classics', desc: 'Deep in Korean hearts', color: '#E67E22', emoji: '❤️' },
  { min: 4, max: 6.9, label: 'Modern Staples', desc: 'Liked but no deep roots', color: '#2980B9', emoji: '👍' },
  { min: 0, max: 3.9, label: 'Just Products', desc: 'Judge on merit alone', color: '#95A5A6', emoji: '🆕' },
];

function JeongModal({ onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        <h2 className={styles.modalTitle}>What is the Jeong Score? 정</h2>
        <p>Jeong (정) is a uniquely Korean concept — a warm, lived-in attachment that builds over time. It&apos;s what you feel toward something you grew up with, shared with family, or experienced in a defining Korean moment.</p>
        <p>It&apos;s untranslatable, but close to: <em>&quot;the feeling that makes you love something even when it&apos;s not objectively the best.&quot;</em></p>
        <div className={styles.modalTiers}>
          {JEONG_TIERS.map(t => (
            <div key={t.label} className={styles.modalTier} style={{ borderColor: t.color }}>
              <strong style={{ color: t.color }}>{t.emoji} {t.min}–{t.max}: {t.label}</strong>
              <span>{t.desc}</span>
            </div>
          ))}
        </div>
        <Link href="/jeong-score" className={styles.modalLink} onClick={onClose}>
          See full Jeong Score explanation →
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const [jeongOpen, setJeongOpen] = useState(false);

  const featured = reviews.find(r => r.slug === 'binggrae-banana-milk');
  const highestJeong = [...reviews].sort((a, b) => b.jeong_score - a.jeong_score).slice(0, 8);
  const polarizing = reviews.filter(r => Math.abs(r.score_min - r.score_seo) >= 3);

  // Categories in the new requested order
  const orderedSlugs = ['drinks', 'snacks', 'ramen', 'convenience', 'kpop', 'kbeauty'];
  const sortedCategories = orderedSlugs.map(slug => categories.find(c => c.slug === slug)).filter(Boolean);

  return (
    <>
      {jeongOpen && <JeongModal onClose={() => setJeongOpen(false)} />}

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              The only honest Korean product database written BY Koreans, FOR foreigners.
            </h1>
            <p className={styles.heroDesc}>
              We didn&apos;t try these products — we grew up with them. Min &amp; Seo, born in Korea, scoring everything from 0 to 10 with a uniquely Korean metric: the Jeong Score (정).
            </p>
            <div className={styles.heroCtas}>
              <Link href="/category/drinks" className="btn-primary">Browse Reviews</Link>
              <button className="btn-secondary" onClick={() => setJeongOpen(true)}>
                What&apos;s a Jeong Score? 정
              </button>
            </div>
          </div>
          <div className={styles.heroCard}>
            {featured && (
              <Link href={`/review/${featured.slug}`} className={styles.featuredCard}>
                <Image src={featured.image} alt={featured.product_name} width={500} height={375} className={styles.featuredImg} />
                <div className={styles.featuredContent}>
                  <div className={styles.featuredTop}>
                    <span className={styles.featuredLabel}>⭐ Featured Icon</span>
                    <ScoreBadge score={featured.score} size="md" />
                  </div>
                  <h2 className={styles.featuredName}>{featured.product_name}</h2>
                  <p className={styles.featuredVerdict}>{featured.one_liner}</p>
                  <JeongBadge score={featured.jeong_score} size="sm" showTooltip={false} />
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className={styles.findSection}>
        <div className="container">
          <div className={styles.findInner}>
            <div className={styles.findText}>
              <h2 className={styles.findTitle}>Spotted in Korea? Find it here.</h2>
            </div>
            <SearchBar placeholder="Type Korean text, English, or describe what you saw…" />
            <div className={styles.findChips}>
              <span>Try:</span>
              <Link href="/find-this?q=신라면" className={styles.findChip}>신라면</Link>
              <Link href="/find-this?q=yellow+drink+in+pot" className={styles.findChip}>yellow drink in pot</Link>
              <Link href="/find-this?q=spicy+red+noodle" className={styles.findChip}>spicy red noodle</Link>
              <Link href="/find-this?q=bath-house+drink" className={styles.findChip}>bath-house drink</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highest Jeong Scores */}
      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <h2 className="section-title">Highest Jeong Scores</h2>
          <p className="section-subtitle">The products with the deepest place in Korean hearts.</p>
          <div className={styles.grid}>
            {highestJeong.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Jeong Score Cards */}
      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">Browse by Jeong Score</h2>
          <div className={styles.jeongTierGrid}>
            {JEONG_TIERS.map(tier => (
              <Link key={tier.label} href={`/jeong-score#tier-${tier.min}`} className={styles.jeongTierCard}>
                <span className={styles.jeongTierEmoji}>{tier.emoji}</span>
                <strong className={styles.jeongTierLabel} style={{ color: tier.color }}>{tier.label}</strong>
                <p className={styles.jeongTierDesc}>{tier.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Polarizing Picks */}
      {polarizing.length > 0 && (
        <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
          <div className="container">
            <h2 className="section-title">Polarizing Picks ⚡</h2>
            <p className="section-subtitle">Products even Koreans can&apos;t agree on.</p>
            <div className={styles.gridSmall}>
              {polarizing.map((r, i) => (
                <ReviewCard key={r.id} review={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className={styles.categoryGrid}>
            {sortedCategories.map((cat, i) => (
              <CategoryCard key={cat.slug} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
