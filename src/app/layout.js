import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Honest Korean Reviews — Real Reviews by Min & Sarah',
  description: 'A Korean couple taste-tests and reviews Korean products from a foreigner\'s perspective — snacks, drinks, ramen, K-beauty, and more. Brutally honest scores from 0 to 10.',
  keywords: 'Korean products, Korean snacks review, K-beauty review, Korean food, Korea travel, honest reviews',
  openGraph: {
    title: 'Honest Korean Reviews',
    description: 'Real Korean product reviews by a couple who pretend they\'re tourists.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Honest Korean Reviews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honest Korean Reviews',
    description: 'Real Korean product reviews by a couple who pretend they\'re tourists.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
