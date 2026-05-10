import Link from 'next/link';
import Image from 'next/image';
import ScoreBadge from '../ScoreBadge/ScoreBadge';
import styles from './ReviewCard.module.css';

export default function ReviewCard({ review, index = 0 }) {
  return (
    <Link
      href={`/review/${review.slug}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={styles.imageWrap}>
        <Image
          src={review.image}
          alt={review.name}
          width={400}
          height={300}
          className={styles.image}
        />
        <div className={styles.scoreBadge}>
          <ScoreBadge score={review.score} size="sm" />
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.brand}>{review.brand}</span>
        <h3 className={styles.name}>{review.name}</h3>
        <p className={styles.verdict}>{review.verdict}</p>
        <div className={styles.meta}>
          <span className={styles.price}>₩{review.priceKRW.toLocaleString()} · ${review.priceUSD.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}
