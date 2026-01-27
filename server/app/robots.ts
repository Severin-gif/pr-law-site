import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    // Google игнорирует Host, Яндекс читает — но Next в robots не отдаёт "Host:" строкой.
    // Поэтому решаем через sitemap + canonical.
    sitemap: 'https://letter-law.ru/sitemap.xml',
  }
}
