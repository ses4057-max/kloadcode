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
  
  const title = `${review.product_name} Review — Honest Korean Reviews`;
  const desc = `${review.one_liner}. ${review.score}/10. ${review.jeong_score}/10 Jeong. Reviewed by Min & Seo, Koreans living in Korea.`;
  
  return {
    title,
    description: desc.slice(0, 155),
    openGraph: {
      title,
      description: desc.slice(0, 155),
      images: [{ url: review.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
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
  tasted: { icon: '🍽', label: 'Personally tasted' },
  first_impressions: { icon: '👀', label: 'First impressions only' },
};

const STORE_INFO = {
  CU: { color: '#652D90', icon: '🏪' },
  GS25: { color: '#00539C', icon: '🏪' },
  Emart24: { color: '#FFB81C', icon: '🏪' },
  '7-Eleven': { color: '#EE1C25', icon: '🏪' },
  'Olive Young': { color: '#97BF0D', icon: '✨' },
  Daiso: { color: '#E50012', icon: '🛍' },
  'E-mart': { color: '#FFD700', icon: '🛒' },
  Homeplus: { color: '#E31E26', icon: '🛒' },
  Costco: { color: '#005DAA', icon: '🛒' },
};

export default async function ReviewPage({ params }) {
  const { slug } = await params;
  const review = reviews.find(r => r.slug === slug);
  if (!review) notFound();

  const similar = reviews
    .filter(r => r.id !== review.id && r.category === review.category)
    .sort((a, b) => Math.abs(a.score - review.score) - Math.abs(b.score - review.score))
    .slice(0, 4);

  const reviewType = REVIEW_TYPE_LABELS[review.review_type] || REVIEW_TYPE_LABELS.tasted;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: review.product_name,
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
    reviewBody: review.one_liner,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.page}>

        {/* Header/Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroImage}>
              <Image src={review.image} alt={review.product_name} width={600} height={450} className={styles.heroImg} priority />
              <div className={styles.reviewTypeBadge}>
                {reviewType.icon} {reviewType.label}
              </div>
            </div>
            <div className={styles.heroInfo}>
              <div className={styles.heroTop}>
                <span className={styles.brand}>{review.brand}</span>
              </div>
              <h1 className={styles.title}>{review.product_name}</h1>
              <p className={styles.titleKo}>{review.product_name_ko}</p>
              <p className={styles.oneLiner}>&ldquo;{review.one_liner}&rdquo;</p>

              <div className={styles.scoreRow}>
                <div className={styles.mainScore}>
                  <ScoreBadge score={review.score} size="xl" />
                </div>
                <div className={styles.jeongScore}>
                  <JeongBadge score={review.jeong_score} size="lg" />
                </div>
              </div>

              <div className={styles.dualScores}>
                <div className={styles.personScore}>
                  <span className={styles.personName}>👨 Min&apos;s Score</span>
                  <ScoreBadge score={review.score_min} size="sm" />
                </div>
                <div className={styles.personScore}>
                  <span className={styles.personName}>👩 Seo&apos;s Score</span>
                  <ScoreBadge score={review.score_seo} size="sm" />
                </div>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.priceKrw}>₩{review.price_krw.toLocaleString()}</span>
                <span className={styles.priceUsd}>${review.price_usd.toFixed(2)}</span>
              </div>

              {review.first_tasted_age && (
                <div className={styles.firstTasted}>
                  🕐 First tried: {review.first_tasted_age}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content Body — 6 Paragraphs */}
        <section className={styles.content}>
          <div className="container-narrow">
            
            {/* Paragraph 1: The Korean Memory */}
            <div className={styles.memoryBox}>
              <div className={styles.memoryLabel}>🇰🇷 The Korean Memory</div>
              <p className={styles.memoryText}>{review.paragraphs[0]}</p>
            </div>

            {/* Paragraph 2: What it actually is */}
            <div className={styles.bodySection}>
              <h2>What it actually is</h2>
              <p>{review.paragraphs[1]}</p>
            </div>

            {/* Paragraph 3 & 4: Min & Seo Takes */}
            <div className={styles.takesGrid}>
              <div className={styles.takeBox}>
                <h3>Min&apos;s Take</h3>
                <p><em>{review.paragraphs[2]}</em></p>
              </div>
              <div className={styles.takeBox}>
                <h3>Seo&apos;s Take</h3>
                <p><em>{review.paragraphs[3]}</em></p>
              </div>
            </div>

            {/* Paragraph 5: Should you try it? */}
            <div className={styles.bodySection}>
              <h2>Should you try it?</h2>
              <p>{review.paragraphs[4]}</p>
            </div>

            {/* Paragraph 6: Score reasoning */}
            <div className={styles.bodySection}>
              <h2>Score Reasoning</h2>
              <p>{review.paragraphs[5]}</p>
            </div>

            {/* Image Gallery */}
            {review.images && review.images.length > 1 && (
              <div className={styles.gallery}>
                {review.images.map((img, idx) => (
                  <div key={idx} className={styles.galleryItem}>
                    <Image src={img} alt={`Product view ${idx + 1}`} width={200} height={150} />
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Sub-scores Chart */}
        <section className={styles.subScoresSection}>
          <div className="container-narrow">
            <h2 className={styles.sectionTitle}>Detailed Breakdown</h2>
            <div className={styles.subScoresGrid}>
              <SubScoreBar label="Taste & Quality" score={review.sub_scores.taste_quality} weight={40} />
              <SubScoreBar label="Packaging & Design" score={review.sub_scores.packaging_design} weight={15} />
              <SubScoreBar label="Value" score={review.sub_scores.value} weight={20} />
              <SubScoreBar label="Foreigner-Friendliness" score={review.sub_scores.foreigner_friendliness} weight={15} />
              <SubScoreBar label="Repurchase Intent" score={review.sub_scores.repurchase_intent} weight={10} />
            </div>
          </div>
        </section>

        {/* How to Spot It */}
        <section className={styles.spotSection}>
          <div className="container-narrow">
            <h2 className={styles.sectionTitle}>How to Spot It in Store</h2>
            <div className={styles.spotGrid}>
              <div className={styles.spotItem}>
                <span className={styles.spotIcon}>🎨</span>
                <div className={styles.spotInfo}>
                  <strong>Color</strong>
                  <span>{review.how_to_spot.color}</span>
                </div>
              </div>
              <div className={styles.spotItem}>
                <span className={styles.spotIcon}>📦</span>
                <div className={styles.spotInfo}>
                  <strong>Shape</strong>
                  <span>{review.how_to_spot.shape}</span>
                </div>
              </div>
              <div className={styles.spotItem}>
                <span className={styles.spotIcon}>📏</span>
                <div className={styles.spotInfo}>
                  <strong>Size</strong>
                  <span>{review.how_to_spot.size}</span>
                </div>
              </div>
              <div className={styles.spotItem}>
                <span className={styles.spotIcon}>🏪</span>
                <div className={styles.spotInfo}>
                  <strong>Location</strong>
                  <span>{review.how_to_spot.store_location}</span>
                </div>
              </div>
              <div className={styles.spotItem}>
                <span className={styles.spotIcon}>💰</span>
                <div className={styles.spotInfo}>
                  <strong>Price Range</strong>
                  <span>{review.how_to_spot.price_range}</span>
                </div>
              </div>
              <div className={styles.spotItem}>
                <span className={styles.spotIcon}>👁</span>
                <div className={styles.spotInfo}>
                  <strong>Identifier</strong>
                  <span>{review.how_to_spot.distinctive_feature}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tags & Where to Buy */}
        <section className={styles.metaSection}>
          <div className="container-narrow">
            <div className={styles.tagsRow}>
              {review.tags.map(tag => (
                <span key={tag} className={styles.tagPill}>#{tag}</span>
              ))}
            </div>

            <div className={styles.whereToBuy}>
              <div className={styles.buyCol}>
                <h3>🛒 Buy in Korea</h3>
                <div className={styles.storeBadges}>
                  {review.where_to_buy_kr.map(store => {
                    const info = STORE_INFO[store] || { color: 'var(--text-secondary)', icon: '🏪' };
                    return (
                      <div key={store} className={styles.storeBadge} style={{ borderColor: info.color, color: info.color }}>
                        <span>{info.icon}</span> {store}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.buyCol}>
                <h3>🌍 Buy Abroad (Affiliates)</h3>
                {review.affiliate_links && review.affiliate_links.length > 0 ? (
                  <div className={styles.affiliateGrid}>
                    {review.affiliate_links.map(link => (
                      <a key={link.site} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.affiliateCard}>
                        <span>{link.site}</span>
                        <small>Buy Now →</small>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className={styles.disclosure} style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                    International shipping links coming soon.
                  </p>
                )}
                <p className={styles.disclosure}>
                  This site contains affiliate links. We may earn a commission at no extra cost to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className={styles.similarSection}>
            <div className="container">
              <h2 className="section-title">If you liked this, try…</h2>
              <div className={styles.similarGrid}>
                {similar.map((r, i) => (
                  <ReviewCard key={r.id} review={r} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Questions */}
        <section className={styles.commentsSection}>
          <div className="container-narrow">
            <div className={styles.commentsBox} style={{ textAlign: 'center', background: 'transparent', border: 'none' }}>
              Have a question about this product? <a href="mailto:hello@honestkoreanreviews.com" className="accent-link">Email us</a> and we&apos;ll answer it.
            </div>
          </div>
        </section>

      </article>
    </>
  );
}
