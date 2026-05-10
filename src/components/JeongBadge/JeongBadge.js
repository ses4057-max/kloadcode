'use client';
import { useState } from 'react';
import styles from './JeongBadge.module.css';

export default function JeongBadge({ score, size = 'md', showTooltip = true }) {
  const [open, setOpen] = useState(false);

  const getColor = (s) => {
    if (s >= 9) return '#C0392B';
    if (s >= 7) return '#E67E22';
    if (s >= 4) return '#2980B9';
    return '#95A5A6';
  };

  const getLabel = (s) => {
    if (s >= 9) return 'Korean Soul';
    if (s >= 7) return 'Beloved Classic';
    if (s >= 4) return 'Modern Staple';
    return 'Just a Product';
  };

  return (
    <div className={`${styles.wrap} ${styles[size]}`}>
      <button
        className={styles.badge}
        style={{ background: getColor(score) }}
        onClick={() => setOpen(!open)}
        type="button"
        aria-label="Jeong Score — click to learn more"
      >
        <span className={styles.flag}>🇰🇷</span>
        <span className={styles.label}>정 {score.toFixed(1)}</span>
        <span className={styles.sublabel}>{getLabel(score)}</span>
      </button>

      {showTooltip && open && (
        <div className={styles.tooltip} role="tooltip">
          <button className={styles.close} onClick={() => setOpen(false)}>✕</button>
          <strong className={styles.tooltipTitle}>What is the Jeong Score? (정)</strong>
          <p>Jeong (정) is a uniquely Korean concept of warm, lived-in attachment built over time — the feeling you have for something you grew up with, shared with family, or experienced in a defining Korean moment.</p>
          <p>We score how much <em>Jeong</em> Koreans feel toward this product: a measure of its place in our cultural memory, separate from whether it tastes good.</p>
          <p><strong>9-10:</strong> Korean Soul Tier — part of the national identity.<br />
          <strong>7-8:</strong> Beloved Classic — most Koreans have a memory with this.<br />
          <strong>4-6:</strong> Modern Staple — liked but no deep roots.<br />
          <strong>0-3:</strong> Just a Product — judge it on merit alone.</p>
          <a href="/jeong-score" className={styles.tooltipLink}>Learn more about Jeong →</a>
        </div>
      )}
    </div>
  );
}
