import styles from './page.module.css';

export const metadata = {
  title: 'K-Product Awards 2027 — Honest Korean Reviews',
  description: 'The inaugural K-Product Awards — celebrating the best Korean products as scored by real testing.',
};

export default function AwardsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <span className={styles.badge}>Coming 2027</span>
          <h1 className={styles.title}>K-Product Awards</h1>
          <p className={styles.subtitle}>
            The first-ever awards celebrating the best Korean products —
            based entirely on our honest scores.
          </p>
          <div className={styles.teaserGrid}>
            <div className={styles.teaserCard}>
              <span className={styles.teaserIcon}>🏆</span>
              <h3>Score-Based Selection</h3>
              <p>Every product with a published score is automatically eligible. No applications needed.</p>
            </div>
            <div className={styles.teaserCard}>
              <span className={styles.teaserIcon}>🔒</span>
              <h3>Scores ≠ Sponsorship</h3>
              <p>Category sponsorship is separate from winning. Money can&apos;t buy a trophy.</p>
            </div>
            <div className={styles.teaserCard}>
              <span className={styles.teaserIcon}>🌍</span>
              <h3>30+ Categories</h3>
              <p>From Best Ramen to Best K-Beauty Newcomer — covering all corners of Korean consumer products.</p>
            </div>
          </div>
          <p className={styles.cta}>Interested in sponsoring a category?<br />Email us at <strong>awards@honestkoreanreviews.com</strong></p>
        </div>
      </section>
    </div>
  );
}
