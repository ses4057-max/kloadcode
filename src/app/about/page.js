import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'About Min & Seo — Honest Korean Reviews',
  description: 'Min and Seo are Korean. Born in Korea, raised in Korea, living in Korea right now. Every product on this site, we have a memory with — often from childhood.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <h1 className={styles.title}>About Honest Korean Reviews</h1>
          <p className={styles.subtitle}>Written by Koreans, for foreigners.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-narrow">
          <div className={styles.content}>
            <p><strong>Min and Seo are Korean.</strong> Born in Korea, raised in Korea, living in Korea right now. Every product on this site, we have a memory with — often from childhood. Foreign reviewers give you taste notes. We give you what those tastes mean to a Korean.</p>
            
            <h2>Why we started this</h2>
            <p>[Min and Seo&apos;s story about why they started the project will go here.]</p>

            <h2>How we score</h2>
            <p>We use a comprehensive scoring system to ensure our reviews are as honest and objective as possible, while still capturing the cultural nuance of each product.</p>
            <ul>
              <li><strong>Main Score (0-10):</strong> The overall verdict.</li>
              <li><strong>Sub-Scores:</strong> We break down taste, packaging, value, foreigner-friendliness, and repurchase intent.</li>
              <li><strong>The Jeong Score (정):</strong> Our unique metric for cultural nostalgia.</li>
            </ul>

            <h2 id="how-we-make-money">How we make money</h2>
            <p>Transparency is our priority. We make money through:</p>
            <ul>
              <li><strong>Affiliate links:</strong> We may earn a commission from Coupang Global, Amazon, YesStyle, or Olive Young Global if you buy through our links. This is disclosed on every page.</li>
              <li><strong>Display ads:</strong> (Planned, not yet active).</li>
              <li><strong>Sponsored content:</strong> Clearly labeled when applicable. Sponsorship <strong>never</strong> changes a score.</li>
              <li><strong>Future: K-Product Awards:</strong> Independent awards where brands can sponsor categories, but winners are chosen by data.</li>
            </ul>

            <h2>Our promises</h2>
            <ol>
              <li>Scores never change based on payment.</li>
              <li>Sponsored content is always clearly labeled.</li>
              <li>We tell you when we just saw it vs lived with it (review_type).</li>
              <li>Receipts are public at /receipts.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
