'use client';
import { useState } from 'react';
import styles from './LanguageSwitcher.module.css';

const LOCALES = [
  { code: 'en', label: 'EN', name: 'English', active: true },
  { code: 'ja', label: 'JA', name: '日本語', active: false },
  { code: 'zh', label: 'ZH', name: '中文', active: false },
  { code: 'es', label: 'ES', name: 'Español', active: false },
  { code: 'fr', label: 'FR', name: 'Français', active: false },
  { code: 'de', label: 'DE', name: 'Deutsch', active: false },
  { code: 'pt', label: 'PT', name: 'Português', active: false },
  { code: 'th', label: 'TH', name: 'ภาษาไทย', active: false },
  { code: 'vi', label: 'VI', name: 'Tiếng Việt', active: false },
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia', active: false },
  { code: 'ar', label: 'AR', name: 'العربية', active: false },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <button
        className={styles.btn}
        onClick={() => setOpen(!open)}
        aria-label="Language — currently English only"
        title="More languages coming soon"
      >
        🌐 EN
      </button>
      {open && (
        <div className={styles.dropdown} role="menu">
          <p className={styles.note}>More languages coming soon</p>
          {LOCALES.map(l => (
            <button
              key={l.code}
              className={`${styles.option} ${l.active ? styles.active : styles.disabled}`}
              disabled={!l.active}
              title={l.active ? undefined : `${l.name} — coming soon`}
              onClick={() => { if (l.active) setOpen(false); }}
            >
              <span className={styles.code}>{l.label}</span>
              <span className={styles.name}>{l.name}</span>
              {!l.active && <span className={styles.soon}>Soon</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
