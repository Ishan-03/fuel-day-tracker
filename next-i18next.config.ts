import type { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'si'], // 'si' = Sinhala
  },
};

export default nextI18NextConfig;