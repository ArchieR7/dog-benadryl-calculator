import { MetadataRoute } from 'next'
import { locales, hreflangCodes } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dogbenadrylcalculator.com'
  const lastModified = new Date()

  // Generate URLs for all locales
  const localeUrls = locales.map((locale) => {
    const url = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`

    // Generate alternates for each language
    const languages: Record<string, string> = {}
    locales.forEach((loc) => {
      const hreflang = hreflangCodes[loc]
      languages[hreflang] = loc === 'en' ? baseUrl : `${baseUrl}/${loc}`
    })

    return {
      url,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 1 : 0.8,
      alternates: {
        languages,
      },
    }
  })

  // Static pages (English only for now)
  const staticPages = [
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  return [...localeUrls, ...staticPages]
}
