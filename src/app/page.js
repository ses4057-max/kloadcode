'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import ScoreBadge from '@/components/ScoreBadge/ScoreBadge';
import JeongBadge from '@/components/JeongBadge/JeongBadge';
import NewsletterForm from '@/components/NewsletterForm/NewsletterForm';
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
        <h3 className={styles.modalSub}>Why we invented the Jeong Score</h3>
        <p>A product can score 9/10 on taste but have zero Jeong — because it&apos;s brand new. A product can score 6/10 on taste but have Jeong 10 — because every Korean has a childhood memory with it. That difference matters, and no other review site captures it.</p>
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

  const featured = reviews.find(r => r.slug === 'cosrx-snail-mucin-essence');
  const newest = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const highestJeong = [...reviews].sort((a, b) => (b.jeong_score || 0) - (a.jeong_score || 0)).slice(0, 8);
  const polarizing = reviews.filter(r => Math.abs(r.minScore - r.sarahScore) >= 3).slice(0, 4);

  const orderedCategories = ['drinks', 'snacks', 'ramen', 'convenience', 'kpop', 'kbeauty'];
  const sortedCategories = orderedCategories
    .map(slug => categories.find(c => c.slug === slug))
    .filter(Boolean);

  return (
    <>
      {jeongOpen && <JeongModal onClose={() => setJeongOpen(false)} />}

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.heroLabel}>🇰🇷 Since 2026 · Seoul, Korea</p>
            <h1 className={styles.heroTitle}>
              The only honest Korean product database written BY Koreans, FOR foreigners.
            </h1>
            <p className={styles.heroDesc}>
              We didn&apos;t try these products — we grew up with them. Min &amp; Seo, born in Korea, scoring everything from 0 to 10 with a uniquely Korean metric: the Jeong Score (정).
            </p>
            <div className={styles.heroCtas}>
              <Link href="/category/snacks" className="btn-primary">Browse Reviews</Link>
              <button className="btn-secondary" onClick={() => setJeongOpen(true)}>
                What&apos;s a Jeong Score? 정
              </button>
            </div>
          </div>
          <div className={styles.heroCard}>
            {featured && (
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
                  {featured.jeong_score !== undefined && (
                    <div className={styles.featuredJeong}>
                      <JeongBadge score={featured.jeong_score} size="sm" showTooltip={false} />
                    </div>
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Find This Product */}
      <section className={styles.findSection}>
        <div className="container">
          <div className={styles.findInner}>
            <div className={styles.findText}>
              <h2 className={styles.findTitle}>Spotted something in Korea? Find it here.</h2>
              <p className={styles.findSub}>Type Korean text, English, or describe what you saw.</p>
            </div>
            <SearchBar />
            <div className={styles.findChips}>
              {['신라면', 'yellow drink in pot', 'spicy red noodle', 'bath-house drink'].map(q => (
                <Link key={q} href={`/find-this?q=${encodeURIComponent(q)}`} className={styles.findChip}>
                  {q}
                </Link>
              ))}
            </div>
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

      {/* Highest Jeong Scores */}
      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Highest Jeong Scores 정</h2>
              <p className="section-subtitle">The products with the deepest place in Korean hearts.</p>
            </div>
            <Link href="/jeong-score" className="accent-link">What is Jeong? →</Link>
          </div>
          <div className={styles.grid}>
            {highestJeong.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Jeong Tier */}
      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">Browse by Jeong Score</h2>
          <p className="section-subtitle">How deep does it go in Korean culture?</p>
          <div className={styles.jeongTierGrid}>
            {JEONG_TIERS.map(tier => (
              <Link key={tier.label} href={`/jeong-score#tier-${tier.min}`} className={styles.jeongTierCard}>
                <span className={styles.jeongTierEmoji}>{tier.emoji}</span>
                <strong className={styles.jeongTierLabel} style={{ color: tier.color }}>{tier.label}</strong>
                <span className={styles.jeongTierScore}>{tier.min}–{tier.max}</span>
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
            <div className={styles.sectionHeader}>
              <div>
                <h2 className="section-title">Polarizing Picks ⚡</h2>
                <p className="section-subtitle">Products even Koreans can&apos;t agree on. Min and Seo are divided.</p>
              </div>
            </div>
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
          <p className="section-subtitle">Find exactly what you&apos;re looking for.</p>
          <div className={styles.categoryGrid}>
            {sortedCategories.map((cat, i) => (
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
                Our travel guides help you find the best products to buy, where to find them, and what to skip.
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
