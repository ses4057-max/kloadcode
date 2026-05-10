import { notFound } from 'next/navigation';
import Image from 'next/image';
import ScoreBadge from '@/components/ScoreBadge/ScoreBadge';
import JeongBadge from '@/components/JeongBadge/JeongBadge';
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
  const desc = `${review.verdict} ${review.score}/10. Jeong Score ${review.jeong_score}/10. Reviewed by Min & Seo, Koreans living in Korea.`;
  return {
    title: `${review.name} Review (${review.score}/10) — Honest Korean Reviews`,
    description: desc.slice(0, 155),
    openGraph: {
      title: `${review.name} Review — Honest Korean Reviews`,
      description: desc.slice(0, 155),
      images: [{ url: review.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${review.name} Review — Honest Korean Reviews`,
      description: desc.slice(0, 155),
    },
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

const REVIEW_TYPE_LABELS = {
  childhood: { icon: '👶', label: 'Lived with since childhood' },
  tasted: { icon: '🍽', label: 'Personally tasted & tested' },
  first_impressions: { icon: '👀', label: 'First impressions only' },
};

const STORE_COLORS = {
  CU: '#00A0E9',
  GS25: '#0066B3',
  Emart24: '#F05A28',
  '7-Eleven': '#007940',
  'Olive Young': '#4CAF50',
  Daiso: '#E60026',
  'E-mart': '#FFD700',
  Homeplus: '#E31E26',
  'Costco Korea': '#005DAA',
  'Duty-free': '#8B6914',
};

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

  const reviewType = REVIEW_TYPE_LABELS[review.review_type] || REVIEW_TYPE_LABELS.tasted;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: review.name,
      brand: { '@type': 'Brand', name: review.brand },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.score,
      bestRating: 10,
      worstRating: 0,
    },
    author: { '@type': 'Person', name: 'Min & Seo' },
    publisher: { '@type': 'Organization', name: 'Honest Korean Reviews' },
    reviewBody: review.verdict,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.page}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroImage}>
              <Image src={review.image} alt={review.name} width={600} height={450} className={styles.heroImg} priority />
            </div>
            <div className={styles.heroInfo}>
              <div className={styles.heroTop}>
                <span className={styles.brand}>{review.brand}</span>
                <span className={styles.reviewTypeBadge}>
                  {reviewType.icon} {reviewType.label}
                </span>
              </div>
              <h1 className={styles.title}>{review.name}</h1>
              <p className={styles.titleKo}>{review.nameKo}</p>
              <p className={styles.verdict}>&ldquo;{review.verdict}&rdquo;</p>

              <div className={styles.scoreRow}>
                <ScoreBadge score={review.score} size="xl" />
                {review.jeong_score !== undefined && (
                  <JeongBadge score={review.jeong_score} size="lg" />
                )}
              </div>

              <div className={styles.dualScores}>
                <div className={styles.personScore}>
                  <span className={styles.personName}>👨 Min&apos;s Score</span>
                  <ScoreBadge score={review.minScore} size="sm" />
                </div>
                <div className={styles.personScore}>
                  <span className={styles.personName}>👩 Seo&apos;s Score</span>
                  <ScoreBadge score={review.sarahScore} size="sm" />
                </div>
              </div>

              <div className={styles.price}>
                ₩{review.priceKRW.toLocaleString()} · ${review.priceUSD.toFixed(2)}
              </div>

              {review.first_tasted_age && (
                <div className={styles.firstTasted}>
                  🕐 First tried: {review.first_tasted_age}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Korean Memory */}
        {review.korean_memory && (
          <section className={styles.section}>
            <div className="container-narrow">
              <div className={styles.memoryBox}>
                <span className={styles.memoryIcon}>🇰🇷</span>
                <div>
                  <h2 className={styles.memoryTitle}>The Korean Memory</h2>
                  <p className={styles.memoryText}>{review.korean_memory}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sub Scores */}
        <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
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
            <h2 className={styles.sectionTitle}>What It Actually Is</h2>
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

        {/* Should You Try It */}
        <section className={styles.section}>
          <div className="container-narrow">
            <h2 className={styles.sectionTitle}>Should You Try It?</h2>
            <div className={styles.tryAdvice}>
              {review.score >= 8 && <p>✅ <strong>Yes, absolutely.</strong> This is one of the products we recommend without hesitation. Add it to your Korea must-try list.</p>}
              {review.score >= 6 && review.score < 8 && <p>🤔 <strong>Yes, with context.</strong> It&apos;s good — not life-changing, but worth experiencing. Check the sub-scores to see if it matches your preferences.</p>}
              {review.score >= 4 && review.score < 6 && <p>⚠️ <strong>Only if you&apos;re curious.</strong> There are better options in this category, but if you spot it and want to try, go ahead. Just don&apos;t make a special trip for it.</p>}
              {review.score < 4 && <p>❌ <strong>Skip it.</strong> We tried it so you don&apos;t have to. There are far better options — check our top-rated picks instead.</p>}
            </div>
          </div>
        </section>

        {/* How to Spot It */}
        {review.how_to_spot && (
          <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
            <div className="container-narrow">
              <h2 className={styles.sectionTitle}>How to Spot It in Store</h2>
              <div className={styles.spotGrid}>
                <div className={styles.spotItem}><span className={styles.spotIcon}>🎨</span><div><strong>Color</strong><p>{review.how_to_spot.color}</p></div></div>
                <div className={styles.spotItem}><span className={styles.spotIcon}>📦</span><div><strong>Shape</strong><p>{review.how_to_spot.shape}</p></div></div>
                <div className={styles.spotItem}><span className={styles.spotIcon}>📏</span><div><strong>Size</strong><p>{review.how_to_spot.size}</p></div></div>
                <div className={styles.spotItem}><span className={styles.spotIcon}>🏪</span><div><strong>Where in Store</strong><p>{review.how_to_spot.store_location}</p></div></div>
                <div className={styles.spotItem}><span className={styles.spotIcon}>💰</span><div><strong>Price Range</strong><p>{review.how_to_spot.price_range}</p></div></div>
                <div className={styles.spotItem}><span className={styles.spotIcon}>👁</span><div><strong>Look For</strong><p>{review.how_to_spot.distinctive_feature}</p></div></div>
              </div>
            </div>
          </section>
        )}

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
            <h3 className={styles.buySubtitle}>🇰🇷 In Korea</h3>
            <div className={styles.stores}>
              {review.whereToBuy.map(store => (
                <div
                  key={store}
                  className={styles.storeChip}
                  style={{ borderColor: STORE_COLORS[store] || 'var(--border)', color: STORE_COLORS[store] || 'var(--text-primary)' }}
                >
                  {store}
                </div>
              ))}
            </div>
            <h3 className={styles.buySubtitle} style={{ marginTop: '1.5rem' }}>🌍 Buy Abroad</h3>
            <div className={styles.affiliateCards}>
              {['Coupang Global', 'Amazon', 'YesStyle'].map(shop => (
                <div key={shop} className={styles.affiliateCard}>
                  <span>{shop}</span>
                  <span className={styles.affiliateTag}>Affiliate link coming soon</span>
                </div>
              ))}
            </div>
            <p className={styles.affiliate}>
              <small>This site contains affiliate links. We may earn a small commission at no extra cost to you. Scores are never affected by affiliate relationships.</small>
            </p>
          </div>
        </section>

        {/* Country Recs */}
        {review.countryRecs && (
          <section className={styles.section}>
            <div className="container-narrow">
              <h2 className={styles.sectionTitle}>How Much Will You Like It?</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Our prediction by country, based on taste preferences.</p>
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

        {/* Comments placeholder */}
        <section className={styles.section}>
          <div className="container-narrow">
            <h2 className={styles.sectionTitle}>Comments</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Comments are coming soon. Have a question? Email us at hello@honestkoreanreviews.com</p>
          </div>
        </section>

      </article>
    </>
  );
}
