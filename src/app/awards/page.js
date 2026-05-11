import styles from './page.module.css';

export const metadata = {
  title: 'K-Product Awards 2027 — Honest Korean Reviews',
  description: 'Coming Soon: The inaugural K-Product Awards celebrating the best Korean products based on honest data.',
};

export default function AwardsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <h1 className={styles.title}>K-Product Awards 2027</h1>
          <p className={styles.subtitle}>Coming Soon</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-narrow">
          <div className={styles.content}>
            <div className={styles.teaserCard}>
              <h2>Brands selected by data, not by payment</h2>
              <p>The K-Product Awards will be the first awards program in the industry where winners are determined by our independent scoring database. No entry fees, no lobbying — just honest results.</p>
            </div>

            <div className={styles.formTeaser}>
              <h3>How brands can be considered</h3>
              <p>If you are a brand and would like your product to be reviewed for the 2027 awards, please contact us for our review guidelines.</p>
              <div className={styles.emailSignup}>
                <p>Email signup for brand inquiries coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
