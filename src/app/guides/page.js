import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Travel Guides — Honest Korean Reviews',
  description: 'Essential shopping guides for anyone visiting Korea.',
};

const guides = [
  { title: 'Top 50 Things to Buy in Korea (Under $50)', desc: 'The ultimate shopping list for first-time visitors. From convenience store gems to Olive Young must-haves.', icon: '🛍️', tag: 'Most Popular' },
  { title: 'Carry-On Safe: Best Korean Gifts to Fly Home With', desc: 'Everything on this list fits in your carry-on luggage and won\'t get confiscated at security.', icon: '✈️', tag: 'Travel Essential' },
  { title: 'Things You Can Only Buy in Korea', desc: 'No overseas shipping, no Amazon listing — these products exist only on Korean shelves.', icon: '🇰🇷', tag: 'Exclusive' },
  { title: 'Don\'t Get Ripped Off at Duty-Free', desc: 'We price-checked every popular item. Some things are cheaper at the local convenience store.', icon: '💰', tag: 'Money Saver' },
];

export default function GuidesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <h1 className={styles.title}>Travel Guides 🛫</h1>
          <p className={styles.subtitle}>
            Visiting Korea? These guides will save you time, money, and luggage space.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {guides.map((guide, i) => (
              <div key={i} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.cardTop}>
                  <span className={styles.icon}>{guide.icon}</span>
                  <span className={styles.tag}>{guide.tag}</span>
                </div>
                <h2 className={styles.cardTitle}>{guide.title}</h2>
                <p className={styles.cardDesc}>{guide.desc}</p>
                <span className={styles.comingSoon}>Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
