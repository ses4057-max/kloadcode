/**
 * i18n configuration for Honest Korean Reviews.
 * Only 'en' is active. To enable a new locale, move it to the `active` array
 * and add the corresponding message files under src/i18n/messages/{locale}.json
 */

export const defaultLocale = 'en';

export const activeLocales = ['en'];

export const plannedLocales = ['ja', 'zh', 'es', 'fr', 'de', 'pt', 'th', 'vi', 'id', 'ar'];

export const allLocales = [...activeLocales, ...plannedLocales];

export const localeNames = {
  en: 'English',
  ja: '日本語',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  th: 'ภาษาไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  ar: 'العربية',
};

// When ready for translation: integrate next-intl or Weglot/DeepL API.
// Each locale needs: src/i18n/messages/{locale}.json
