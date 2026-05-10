'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import reviews from '@/data/reviews.json';
import styles from './page.module.css';

const fuseIndex = new Fuse(reviews, {
  threshold: 0.35,
  includeScore: true,
  keys: [
    { name: 'name', weight: 2 },
    { name: 'nameKo', weight: 2 },
    { name: 'brand', weight: 1.5 },
    { name: 'verdict', weight: 1 },
    { name: 'tags', weight: 1 },
    { name: 'aliases.korean_official', weight: 2 },
    { name: 'aliases.korean_nicknames', weight: 2 },
    { name: 'aliases.romanization', weight: 2 },
    { name: 'aliases.english_descriptors', weight: 1.5 },
    { name: 'aliases.common_typos', weight: 1 },
    { name: 'how_to_spot.color', weight: 0.8 },
    { name: 'how_to_spot.distinctive_feature', weight: 0.8 },
  ],
});

const STORE_OPTIONS = ['CU', 'GS25', 'Emart24', '7-Eleven', 'Olive Young', 'E-mart', 'Homeplus', 'Costco Korea'];
const COLOR_OPTIONS = ['Red', 'Yellow', 'Blue', 'Green', 'White', 'Black', 'Pink', 'Brown'];
const TRENDING = ['신라면', '바나나우유', 'honey butter', 'snail mucin', '불닭', 'choco pie'];

function FindThisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState('text');
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [storeFilter, setStoreFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      doSearch(q);
    }
  }, [searchParams]);

  const doSearch = (q) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    const raw = fuseIndex.search(q);
    setResults(raw.map(r => r.item));
    setSearched(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/find-this?q=${encodeURIComponent(query)}`);
    doSearch(query);
  };

  const describeResults = (() => {
    if (!storeFilter && !colorFilter) return results;
    return results.filter(r => {
      const storeMatch = !storeFilter || r.whereToBuy?.includes(storeFilter);
      const colorMatch = !colorFilter || r.how_to_spot?.color?.toLowerCase().includes(colorFilter.toLowerCase());
      return storeMatch && colorMatch;
    });
  })();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <h1 className={styles.title}>Find a Korean Product</h1>
          <p className={styles.subtitle}>Spotted something in a Korean store? We&apos;ll tell you what it is, how it tastes, and whether it&apos;s worth buying.</p>

          <div className={styles.tabs}>
            {[
              { key: 'text', icon: '🔤', label: 'Type it' },
              { key: 'describe', icon: '🎨', label: 'Describe it' },
              { key: 'store', icon: '🏪', label: 'By store' },
            ].map(t => (
              <button
                key={t.key}
                className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {tab === 'text' && (
            <form onSubmit={handleSubmit} className={styles.searchForm}>
              <input
                className={styles.searchInput}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type Korean letters, English name, description…"
                autoFocus
              />
              <button className={styles.searchBtn} type="submit">Search →</button>
            </form>
          )}

          {tab === 'describe' && (
            <div className={styles.filterGroup}>
              <div className={styles.filterRow}>
                <label className={styles.filterLabel}>Color you see:</label>
                <div className={styles.filterChips}>
                  {COLOR_OPTIONS.map(c => (
                    <button
                      key={c}
                      className={`${styles.filterChip} ${colorFilter === c ? styles.filterChipActive : ''}`}
                      onClick={() => { setColorFilter(colorFilter === c ? '' : c); setSearched(true); }}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div className={styles.filterRow}>
                <label className={styles.filterLabel}>Or type a description:</label>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                  <input
                    className={styles.searchInput}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="e.g. yellow drink in pot bottle, spicy red packet…"
                  />
                  <button className={styles.searchBtn} type="submit">Search →</button>
                </form>
              </div>
            </div>
          )}

          {tab === 'store' && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Where did you see it?</label>
              <div className={styles.filterChips}>
                {STORE_OPTIONS.map(s => (
                  <button
                    key={s}
                    className={`${styles.filterChip} ${storeFilter === s ? styles.filterChipActive : ''}`}
                    onClick={() => { setStoreFilter(storeFilter === s ? '' : s); setSearched(true); }}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {!searched && (
            <div className={styles.trending}>
              <p className={styles.trendingLabel}>Trending searches:</p>
              <div className={styles.trendingChips}>
                {TRENDING.map(t => (
                  <button key={t} className={styles.trendingChip} onClick={() => { setQuery(t); router.push(`/find-this?q=${encodeURIComponent(t)}`); doSearch(t); }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.results}>
        <div className="container">
          {searched && describeResults.length > 0 && (
            <>
              <p className={styles.resultCount}>{describeResults.length} result{describeResults.length !== 1 ? 's' : ''} found</p>
              <div className={styles.resultGrid}>
                {describeResults.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
              </div>
            </>
          )}
          {searched && describeResults.length === 0 && (
            <div className={styles.noResults}>
              <p>😕 No results found for &ldquo;{query}&rdquo;</p>
              <p>Try describing the color, shape, or where you saw it. Or <a href="mailto:hello@honestkoreanreviews.com">email us a photo</a> — we&apos;ll identify it within 24 hours.</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.comingSoon}>
        <div className="container-narrow">
          <h2 className={styles.comingTitle}>More ways to find products — coming soon</h2>
          <div className={styles.comingGrid}>
            <div className={styles.comingCard}>
              <span className={styles.comingIcon}>📷</span>
              <strong>Photo Search</strong>
              <p>Take a photo of the product — our AI will identify it. Coming Month 3.</p>
            </div>
            <div className={styles.comingCard}>
              <span className={styles.comingIcon}>📦</span>
              <strong>Barcode Scan</strong>
              <p>Scan the barcode for an instant match. Coming Month 3.</p>
            </div>
            <div className={styles.comingCard}>
              <span className={styles.comingIcon}>💬</span>
              <strong>Telegram Bot</strong>
              <p>Send a photo to @HonestKoreanBot — get a review link in seconds. Coming Month 2.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FindThisPage() {
  return (
    <Suspense>
      <FindThisContent />
    </Suspense>
  );
}
