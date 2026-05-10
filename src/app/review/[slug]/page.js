import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ScoreBadge from '@/components/ScoreBadge/ScoreBadge';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import reviews from '@/data/reviews.json';
import styles from './page.module.css';

export async function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const review = reviews.find(r => r.slug === slug);
  if (!review) return {};
  return {
    title: `${review.name} Review (${review.score}/10) — Honest Korean Reviews`,
    description: review.verdict,
  };
}

function SubScoreBar({ label, score, weight }) {
  const pct = (score / 10) * 100;
  const getColor = (s) => {
    if (s < 4) return 'var(--score-red)';
    if (s < 6) return 'var(--score-orange)';
    if (s < 7.5) return 'var(--score-yellow)';
    return 'var(--score-green)';
  };
  return (
    <div className={styles.subScore}>
      <div className={styles.subScoreHeader}>
        <span className={styles.subScoreLabel}>{label}</span>
        <span className={styles.subScoreWeight}>{weight}%</span>
      </div>
      <div className={styles.subScoreTrack}>
        <div className={styles.subScoreFill} style={{ width: `${pct}%`, background: getColor(score) }} />
      </div>
      <span className={styles.subScoreVal} style={{ color: getColor(score) }}>{score.toFixed(1)}</span>
    </div>
  );
}

export default async function ReviewPage({ params }) {
  const { slug } = await params;
  const review = reviews.find(r => r.slug === slug);
  if (!review) notFound();

  const similar = reviews
    .filter(r => r.id !== review.id)
    .sort((a, b) => Math.abs(a.score - review.score) - Math.abs(b.score - review.score))
    .slice(0, 4);

  const tags = [
    ...(review.tags || []),
    review.halalFriendly && 'Halal-friendly',
    review.vegan && 'Vegan',
    review.glutenFree && 'Gluten-free',
  ].filter(Boolean);

  return (
    <article className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroImage}>
            <Image src={review.image} alt={review.name} width={600} height={450} className={styles.heroImg} priority />
          </div>
          <div className={styles.heroInfo}>
            <span className={styles.brand}>{review.brand}</span>
            <h1 className={styles.title}>{review.name}</h1>
            <p className={styles.titleKo}>{review.nameKo}</p>
            <ScoreBadge score={review.score} size="xl" />
            <p className={styles.verdict}>&ldquo;{review.verdict}&rdquo;</p>

            <div className={styles.dualScores}>
              <div className={styles.personScore}>
                <span className={styles.personName}>Min&apos;s Score</span>
                <ScoreBadge score={review.minScore} size="sm" />
              </div>
              <div className={styles.personScore}>
                <span className={styles.personName}>Seo&apos;s Score</span>
                <ScoreBadge score={review.sarahScore} size="sm" />
              </div>
            </div>

            <div className={styles.price}>
              ₩{review.priceKRW.toLocaleString()} · ${review.priceUSD.toFixed(2)}
            </div>
          </div>
        </div>
      </section>

      {/* Sub Scores */}
      <section className={styles.section}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>Detailed Scores</h2>
          <div className={styles.subScores}>
            <SubScoreBar label="Taste & Quality" score={review.subScores.taste} weight={40} />
            <SubScoreBar label="Packaging & Design" score={review.subScores.packaging} weight={15} />
            <SubScoreBar label="Value for Money" score={review.subScores.value} weight={20} />
            <SubScoreBar label="Foreigner-Friendliness" score={review.subScores.foreignerFriendly} weight={15} />
            <SubScoreBar label="Would Buy Again" score={review.subScores.wouldBuyAgain} weight={10} />
          </div>
        </div>
      </section>

      {/* Review Body */}
      <section className={styles.section}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>Our Review</h2>
          <div className={styles.reviewBody}>
            {review.reviewBody.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Min & Seo Takes */}
      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container-narrow">
          <div className={styles.takes}>
            <div className={styles.takeBox}>
              <div className={styles.takeHeader}>
                <span className={styles.takeAvatar}>👨</span>
                <div>
                  <h3 className={styles.takeName}>Min&apos;s Take</h3>
                  <ScoreBadge score={review.minScore} size="sm" />
                </div>
              </div>
              <p className={styles.takeText}>{review.minTake}</p>
            </div>
            <div className={styles.takeBox}>
              <div className={styles.takeHeader}>
                <span className={styles.takeAvatar}>👩</span>
                <div>
                  <h3 className={styles.takeName}>Seo&apos;s Take</h3>
                  <ScoreBadge score={review.sarahScore} size="sm" />
                </div>
              </div>
              <p className={styles.takeText}>{review.sarahTake}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className={styles.section}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>Tags &amp; Attributes</h2>
          <div className={styles.tags}>
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Buy */}
      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>Where to Buy</h2>
          <div className={styles.stores}>
            {review.whereToBuy.map(store => (
              <div key={store} className={styles.storeChip}>🏪 {store}</div>
            ))}
          </div>
          <p className={styles.affiliate}>
            🔗 Also available on Coupang Global, Amazon, YesStyle
            <br />
            <small>This site contains affiliate links. We may earn a commission at no extra cost to you.</small>
          </p>
        </div>
      </section>

      {/* Country Recs */}
      {review.countryRecs && (
        <section className={styles.section}>
          <div className="container-narrow">
            <h2 className={styles.sectionTitle}>Country Recommendations</h2>
            <div className={styles.countryGrid}>
              {Object.entries(review.countryRecs).map(([country, score]) => (
                <div key={country} className={styles.countryCard}>
                  <span className={styles.countryName}>{country}</span>
                  <span className={styles.countryScore}>{score}/10</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Similar */}
      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <h2 className="section-title">If You Liked This, Try…</h2>
          <p className="section-subtitle">Products with similar scores and vibes.</p>
          <div className={styles.similarGrid}>
            {similar.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
