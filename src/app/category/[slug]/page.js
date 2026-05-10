import { notFound } from 'next/navigation';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import reviews from '@/data/reviews.json';
import categories from '@/data/categories.json';
import styles from './page.module.css';

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} Reviews — Honest Korean Reviews`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) notFound();

  const categoryReviews = reviews.filter(r => r.category === slug);

  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner} style={{ '--cat-color': category.color }}>
        <div className="container">
          <span className={styles.bannerIcon}>{category.icon}</span>
          <h1 className={styles.bannerTitle}>{category.name}</h1>
          <p className={styles.bannerDesc}>{category.description}</p>
          <p className={styles.reviewCount}>{categoryReviews.length} reviews</p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className={styles.content}>
        <div className="container">
          {categoryReviews.length > 0 ? (
            <div className={styles.grid}>
              {categoryReviews.map((r, i) => (
                <ReviewCard key={r.id} review={r} index={i} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No reviews in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
