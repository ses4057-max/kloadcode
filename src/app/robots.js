export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://kloadcode.vercel.app/sitemap.xml',
  };
}
