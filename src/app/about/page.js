import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'About Min & Seo — Honest Korean Reviews',
  description: 'Min and Seo are Korean. Born in Korea, raised in Korea, living in Korea right now. Every product on this site, we have a memory with — often from childhood.',
  openGraph: {
    type: 'profile',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', name: 'Min', jobTitle: 'Co-founder', worksFor: { '@type': 'Organization', name: 'Honest Korean Reviews' }, address: { '@type': 'PostalAddress', addressCountry: 'KR', addressLocality: 'Seoul' } },
    { '@type': 'Person', name: 'Seo', jobTitle: 'Co-founder', worksFor: { '@type': 'Organization', name: 'Honest Korean Reviews' }, address: { '@type': 'PostalAddress', addressCountry: 'KR', addressLocality: 'Seoul' } },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className="container-narrow">
            <h1 className={styles.title}>About Us</h1>
            <p className={styles.subtitle}>Two Koreans. One database. Zero loyalty to bad products.</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container-narrow">
            <div className={styles.block}>
              <h2 className={styles.heading}>Min and Seo are Korean.</h2>
              <p>Born in Korea. Raised in Korea. Living in Seoul right now. Not expats who &quot;moved to Korea.&quot; Not tourists who did a food tour. Koreans.</p>
              <p>Every product on this site, we have a memory with — often from childhood. Foreign reviewers give you taste notes. We give you what those tastes <em>mean</em> to a Korean.</p>
              <p>Min grew up in Busan eating every snack the convenience store had to offer. Seo has traveled to over 30 countries — the US, China, the Philippines, Thailand, France, and beyond — and brings a sharp cross-cultural perspective to every product she reviews. Together, we score Korean products the way no foreign reviewer can: from the inside.</p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.heading}>Why we started this</h2>
              <p>We kept seeing the same problem: millions of foreigners curious about Korean products — from K-dramas, K-pop, travel videos — with no reliable, honest, English-language guide to what&apos;s actually worth buying.</p>
              <p>Most &quot;Korean snack recommendations&quot; are written after one trip, by someone who tried 10 things in a gift shop. We grew up with 1,000 of these products. That&apos;s the difference.</p>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>[Our full origin story — coming soon]</p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.heading}>How we score</h2>
              <div className={styles.rules}>
                <div className={styles.rule}><span className={styles.ruleNum}>01</span><div><h3>0 to 10, in 0.5 steps</h3><p>Every product gets a score. No &quot;we don&apos;t rate this&quot; cop-outs. A 5.0 is average — not bad.</p></div></div>
                <div className={styles.rule}><span className={styles.ruleNum}>02</span><div><h3>Five sub-scores</h3><p>Taste &amp; Quality (40%), Packaging (15%), Value (20%), Foreigner-Friendliness (15%), Would Buy Again (10%).</p></div></div>
                <div className={styles.rule}><span className={styles.ruleNum}>03</span><div><h3>The Jeong Score (정)</h3><p>Our proprietary metric — how much cultural attachment Koreans feel toward this product. Separate from the main score. <Link href="/jeong-score" className="accent-link">Learn more →</Link></p></div></div>
                <div className={styles.rule}><span className={styles.ruleNum}>04</span><div><h3>Scores never change</h3><p>Once published, a score is final. Error corrections are the only exception, and they are publicly logged.</p></div></div>
                <div className={styles.rule}><span className={styles.ruleNum}>05</span><div><h3>We disagree — publicly</h3><p>Min and Seo often give different scores. That&apos;s the point. Two honest perspectives beat one forced consensus.</p></div></div>
              </div>
            </div>

            <div id="how-we-make-money" className={styles.block}>
              <h2 className={styles.heading}>How we make money</h2>
              <ul className={styles.list}>
                <li><strong>Affiliate links:</strong> When you buy through our links (Coupang Global, Amazon, YesStyle, Olive Young Global), we earn a small commission. It costs you nothing extra. Disclosed on every review page.</li>
                <li><strong>Display ads:</strong> Planned but not yet active. Will be non-intrusive when launched.</li>
                <li><strong>Sponsored content:</strong> Clearly labeled &quot;Sponsored&quot; when applicable. Sponsorship never changes a score — we score the product before any brand contact, then the score is locked.</li>
                <li><strong>K-Product Awards (coming 2027):</strong> Brands can sponsor award categories. Winning is based on scores only — money can&apos;t buy a trophy.</li>
              </ul>
              <div className={styles.pledge}>
                <strong>Scores are never influenced by payment. Period.</strong>
              </div>
            </div>

            <div className={styles.block}>
              <h2 className={styles.heading}>Our promises</h2>
              <div className={styles.promises}>
                {[
                  'Scores never change based on payment or brand pressure.',
                  'Sponsored content is always clearly labeled.',
                  'We always tell you whether we grew up with it or just tasted it (the review_type field).',
                  'Proof of purchase is public at /receipts.',
                ].map((p, i) => (
                  <div key={i} className={styles.promise}>
                    <span className={styles.promiseNum}>{i + 1}</span>
                    <p>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
