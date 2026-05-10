import styles from './ScoreBadge.module.css';

export default function ScoreBadge({ score, size = 'md' }) {
  const getColor = (s) => {
    if (s < 4) return 'var(--score-red)';
    if (s < 6) return 'var(--score-orange)';
    if (s < 7.5) return 'var(--score-yellow)';
    return 'var(--score-green)';
  };

  return (
    <div
      className={`${styles.badge} ${styles[size]}`}
      style={{ '--badge-color': getColor(score) }}
    >
      <span className={styles.score}>{score.toFixed(1)}</span>
      <span className={styles.outOf}>/10</span>
    </div>
  );
}
