'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder = 'Type Korean text, English, or describe what you saw…', dark = true }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/find-this?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className={`${styles.form} ${dark ? styles.dark : styles.light}`} onSubmit={handleSubmit}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button className={styles.btn} type="submit" aria-label="Search">
        Find it →
      </button>
    </form>
  );
}
