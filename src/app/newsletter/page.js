import NewsletterForm from '@/components/NewsletterForm/NewsletterForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Newsletter — Honest Korean Reviews',
  description: 'Get 5 new honest Korean product reviews every Sunday. Free.',
};

export default function NewsletterPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <span className={styles.emoji}>✉️</span>
          <h1 className={styles.title}>Get 5 New Reviews Every Sunday</h1>
          <p className={styles.subtitle}>
            Join thousands of K-product enthusiasts. We send the latest reviews,
            hot takes, and travel tips — straight to your inbox. No spam, ever.
          </p>
          <div className={styles.formWrap}>
            <NewsletterForm />
          </div>

          <div className={styles.pastIssues}>
            <h2 className={styles.pastTitle}>Past Issues</h2>
            <div className={styles.issueList}>
              {[
                { title: 'Issue #3: The Ramen Rankings Are In', date: 'May 4, 2026' },
                { title: 'Issue #2: K-Beauty Products That Actually Work', date: 'Apr 27, 2026' },
                { title: 'Issue #1: Welcome + Our First 10 Reviews', date: 'Apr 20, 2026' },
              ].map((issue, i) => (
                <div key={i} className={styles.issueCard}>
                  <div>
                    <h3 className={styles.issueTitle}>{issue.title}</h3>
                    <span className={styles.issueDate}>{issue.date}</span>
                  </div>
                  <span className={styles.issueArrow}>→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
