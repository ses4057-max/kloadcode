'use client';
import { useState } from 'react';
import styles from './NewsletterForm.module.css';

export default function NewsletterForm({ variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  if (submitted) {
    return (
      <div className={`${styles.wrapper} ${styles[variant]}`}>
        <div className={styles.success}>
          <span className={styles.successIcon}>✉️</span>
          <p className={styles.successText}>You&apos;re in! Check your inbox this Sunday.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
          id="newsletter-email"
        />
        <button type="submit" className={styles.button}>Subscribe</button>
      </form>
    </div>
  );
}
