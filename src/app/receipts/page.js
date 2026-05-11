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
            Public archive of every product&apos;s purchase proof or sponsorship disclosure.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Date</th>
                <th>Source</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => {
                const src = SOURCE_LABELS[r.review_type] || SOURCE_LABELS.tasted;
                return (
                  <tr key={r.id}>
                    <td>
                      <strong>{r.product_name}</strong><br />
                      <small>{r.brand}</small>
                    </td>
                    <td>{r.reviewed_date}</td>
                    <td>
                      <span className={styles.sourceBadge} style={{ color: src.color, borderColor: src.color }}>
                        {src.icon} {src.label}
                      </span>
                    </td>
                    <td><small>Photo evidence coming Month 2</small></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
