import Link from 'next/link';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ category, index = 0 }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.iconWrap} style={{ background: `${category.color}15` }}>
        <span className={styles.icon}>{category.icon}</span>
      </div>
      <h3 className={styles.name}>{category.name}</h3>
      <p className={styles.desc}>{category.description}</p>
      <span className={styles.arrow}>→</span>
    </Link>
  );
}
