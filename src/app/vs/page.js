import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Why Honest Korean Reviews? — vs. Other Sources',
  description: 'How we compare to foreign bloggers, travel companies, K-beauty apps, and AI-generated Korea food lists. Written by Koreans, for foreigners.',
};

const COMPARISONS = [
  {
    them: 'Foreign bloggers\' one-off Korean snack articles',
    issue: 'Written by tourists after one trip. No cultural memory, no nuance. "Top 10 Korean snacks I tried!" written in a single afternoon.',
    us: 'We grew up with these. Min has been eating Shin Ramyun since he was 7. We score from lived experience, not a single tasting session.',
  },
  {
    them: 'Travel company long-form guides (e.g. Rustic Pathways)',
    issue: 'Written for group tours. Generic, safe, commercial. Designed to not offend. Won\'t tell you that a famous product is actually overrated.',
    us: 'Brutally honest. If something is overrated, we say so (see: Choco Pie). We have no brand relationships to protect.',
  },
  {
    them: 'K-beauty apps like Hwahae (화해)',
    issue: 'Hwahae is excellent for what it does — ingredient analysis and Korean user reviews. But it\'s in Korean, for Koreans, and focused on ingredients, not experience.',
    us: 'We deliberately stay small on K-beauty (max 20 personally-used products, never catalog scale). We write for foreigners who need context, not just ratings.',
  },
  {
    them: 'AI-generated Korea food lists',
    issue: '"Best Korean snacks" articles written by AI with no tasting, no cultural context, no accountability. All hype, no memory.',
    us: 'Real products, real memories, real receipts. We publish proof of purchase on /receipts. Our scores never change.',
  },
];

export default function VsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <h1 className={styles.title}>Why Honest Korean Reviews?</h1>
          <p className={styles.subtitle}>There are a lot of &quot;Korean snack recommendation&quot; sources. Here&apos;s how we&apos;re different — and why it matters.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>Our differentiators</h2>
          <div className={styles.differentiators}>
            {[
              { icon: '🇰🇷', title: 'Written by Koreans', body: 'Min and Seo are Korean. Born in Korea, raised in Korea, living in Korea right now. Not expats, not tourists — locals who know the culture from the inside.' },
              { icon: '📊', title: 'Product database, not articles', body: 'Individual pages for every product, not a single "Top 10" article that goes stale. Each review is its own permanent URL.' },
              { icon: '정', title: 'The Jeong Score', body: 'Our proprietary metric that measures cultural attachment — something no foreigner can give you. A product can be delicious and have zero Jeong. That context matters.' },
              { icon: '👁', title: '"How to spot it" guide', body: 'We describe the color, shape, size, and store location of every product so you can actually find it in a Korean store with no Korean.' },
              { icon: '🧾', title: 'Public receipts', body: 'Every product was personally purchased, received as a sample (labeled), or a lifelong household item. Proof at /receipts.' },
              { icon: '🔓', title: 'Free, honest, disclosed', body: 'No paywalls. Affiliate links clearly disclosed. Sponsored content always labeled. Scores never change based on payment.' },
            ].map(d => (
              <div key={d.title} className={styles.differentiator}>
                <span className={styles.diffIcon}>{d.icon}</span>
                <div>
                  <strong className={styles.diffTitle}>{d.title}</strong>
                  <p className={styles.diffBody}>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ background: 'var(--bg-white)' }}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>Us vs. other sources</h2>
          <div className={styles.comparisons}>
            {COMPARISONS.map((c, i) => (
              <div key={i} className={styles.comparison}>
                <div className={styles.them}>
                  <span className={styles.compLabel}>❌ Them</span>
                  <strong>{c.them}</strong>
                  <p>{c.issue}</p>
                </div>
                <div className={styles.us}>
                  <span className={styles.compLabel}>✅ Us</span>
                  <p>{c.us}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container-narrow">
          <h2 className={styles.ctaTitle}>Still not convinced?</h2>
          <p>Read our reviews. Check the Jeong Score. See the receipts. If you find an error or disagree with a score, email us — we&apos;ll discuss it publicly.</p>
          <div className={styles.ctaBtns}>
            <Link href="/category/snacks" className="btn-primary">Browse Reviews</Link>
            <Link href="/receipts" className="btn-secondary">See Receipts →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
