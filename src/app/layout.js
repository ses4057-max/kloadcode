import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Honest Korean Reviews — Real Reviews by Min & Seo',
  description: 'The only honest Korean product database written BY Koreans, FOR foreigners. Snacks, drinks, ramen, K-beauty — scored 0 to 10 with the unique Jeong Score (정).',
  keywords: 'Korean products, Korean snacks review, K-beauty review, Korean food, Korea travel, honest reviews, Jeong Score',
  openGraph: {
    title: 'Honest Korean Reviews',
    description: 'Real Korean product reviews by Koreans who see their own country through a traveler\'s eyes.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Honest Korean Reviews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honest Korean Reviews',
    description: 'Real Korean product reviews by Koreans who see their own country through a traveler\'s eyes.',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Honest Korean Reviews',
  url: 'https://kloadcode.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://kloadcode.vercel.app/find-this?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// GA4 and Clarity — activate by setting env vars GA4_MEASUREMENT_ID and CLARITY_PROJECT_ID
// const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
// const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* GA4 placeholder — uncomment and set NEXT_PUBLIC_GA4_MEASUREMENT_ID to activate
        {GA4_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');` }} />
          </>
        )}
        */}
        {/* Clarity placeholder — uncomment and set NEXT_PUBLIC_CLARITY_PROJECT_ID to activate
        {CLARITY_ID && (
          <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");` }} />
        )}
        */}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
