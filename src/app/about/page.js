import styles from './page.module.css';

export const metadata = {
  title: 'About Us — Honest Korean Reviews',
  description: 'Meet Min & Sarah, the Korean couple behind Honest Korean Reviews.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container-narrow">
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>Meet the couple behind the scores.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-narrow">
          <div className={styles.block}>
            <h2 className={styles.heading}>Who We Are</h2>
            <p>We&apos;re Min and Sarah — a Korean couple living in Seoul who decided to look at Korean products through fresh eyes. Min grew up in Busan eating every snack the convenience store had to offer. Sarah moved to Korea from the US five years ago and has been on a non-stop tasting journey ever since.</p>
            <p>Together, we buy, taste, test, and score Korean products on a scale of 0 to 10. No exceptions, no sacred cows. If it&apos;s bad, we say it&apos;s bad. If it&apos;s life-changing, we&apos;ll make sure you know.</p>
            <p>We started this site because we noticed a gap: millions of foreigners are curious about Korean products thanks to K-dramas, K-pop, and Korean food trends — but there&apos;s no reliable, honest, English-language resource to help them navigate what&apos;s actually good versus what&apos;s just marketing.</p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>Our Scoring Philosophy</h2>
            <div className={styles.rules}>
              <div className={styles.rule}>
                <span className={styles.ruleNum}>01</span>
                <div>
                  <h3>0 to 10, in 0.5 steps</h3>
                  <p>Every product gets a score. No &quot;we don&apos;t rate this&quot; cop-outs. The scale means something — a 5.0 is average, not bad.</p>
                </div>
              </div>
              <div className={styles.rule}>
                <span className={styles.ruleNum}>02</span>
                <div>
                  <h3>Five sub-scores</h3>
                  <p>Taste &amp; Quality (40%), Packaging (15%), Value (20%), Foreigner-Friendliness (15%), and Would Buy Again (10%).</p>
                </div>
              </div>
              <div className={styles.rule}>
                <span className={styles.ruleNum}>03</span>
                <div>
                  <h3>Scores never change</h3>
                  <p>Once published, a score is final. No brand can pay to change it. Error corrections are the only exception, and they&apos;re publicly logged.</p>
                </div>
              </div>
              <div className={styles.rule}>
                <span className={styles.ruleNum}>04</span>
                <div>
                  <h3>We disagree — publicly</h3>
                  <p>Min and Sarah often give different scores. That&apos;s the point. Two perspectives are more honest than one forced consensus.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>How We Make Money</h2>
            <p>Full transparency — here&apos;s exactly how this site generates revenue:</p>
            <ul className={styles.list}>
              <li><strong>Affiliate links:</strong> When you buy a product through our links (Coupang Global, Amazon, YesStyle), we earn a small commission. It costs you nothing extra.</li>
              <li><strong>Display ads:</strong> Non-intrusive ads help keep the lights on.</li>
              <li><strong>Sponsored content:</strong> Clearly labeled. Always honest. Scores are never influenced by payment.</li>
              <li><strong>Awards (coming 2027):</strong> Brands can sponsor award categories. Winning is based on scores only — sponsorship doesn&apos;t buy placement.</li>
            </ul>
            <div className={styles.pledge}>
              <strong>Our non-negotiable rule:</strong> No amount of money will ever change a score. Period.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
