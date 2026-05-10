import reviews from '@/data/reviews.json';
import styles from './page.module.css';

export const metadata = {
  title: 'Receipts — Honest Korean Reviews',
  description: 'Public proof of purchase for every product we review. Transparency is the baseline.',
};

const SOURCE_LABELS = {
  childhood: { label: 'Lifelong household item', color: '#C0392B', icon: '👶' },
  tasted: { label: 'Personally purchased', color: '#27AE60', icon: '🧾' },
  first_impressions: { label: 'Sample received', color: '#2980B9', icon: '📦' },
};

export default function ReceiptsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <h1 className={styles.title}>Receipts</h1>
          <p className={styles.subtitle}>
            Every product on this site was either personally purchased, received as a labeled sample, or a lifelong household item we&apos;ve known for decades. This page is our public audit trail.
          </p>
          <div className={styles.legend}>
            {Object.values(SOURCE_LABELS).map(s => (
              <span key={s.label} className={styles.legendItem}>
                {s.icon} {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Review Date</th>
                  <th>Source</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => {
                  const src = SOURCE_LABELS[r.review_type] || SOURCE_LABELS.tasted;
                  return (
                    <tr key={r.id}>
                      <td>
                        <a href={`/review/${r.slug}`} className={styles.productLink}>
                          {r.name}
                          <span className={styles.nameKo}>{r.nameKo}</span>
                        </a>
                      </td>
                      <td className={styles.brand}>{r.brand}</td>
                      <td className={styles.date}>{r.date}</td>
                      <td>
                        <span className={styles.sourceBadge} style={{ color: src.color, borderColor: src.color }}>
                          {src.icon} {src.label}
                        </span>
                      </td>
                      <td className={styles.score}>{r.score}/10</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.note}>
            <strong>Our commitment:</strong> Any product received as a sample is clearly labeled and never results in a higher score. Sponsorship never changes a score. Questions? Email receipts@honestkoreanreviews.com
          </div>
        </div>
      </section>
    </div>
  );
}
