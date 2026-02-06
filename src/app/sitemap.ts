import { MetadataRoute } from 'next'
import { locales, hreflangCodes, type Locale } from '@/i18n/config'
import { getAllBreedSlugs } from '@/data/breeds'
import { getAllUseCaseSlugs } from '@/data/uses'
import { getAllSafetyGuideSlugs } from '@/data/safety'

const baseUrl = 'https://www.dogbenadrylcalculator.com'

// Helper to generate alternates for a given path
function generateAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[hreflangCodes[locale as Locale]] = `${baseUrl}/${locale}${path}`
  }
  languages['x-default'] = `${baseUrl}/en${path}`
  return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const breedSlugs = getAllBreedSlugs()
  const useCaseSlugs = getAllUseCaseSlugs()
  const safetyGuideSlugs = getAllSafetyGuideSlugs()

  // Main page entries for each locale
  const mainPageEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.8,
    alternates: {
      languages: generateAlternates(''),
    },
  }))

  // Breeds HUB page entries for each locale
  const breedsHubEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/breeds`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 0.9 : 0.7,
    alternates: {
      languages: generateAlternates('/breeds'),
    },
  }))

  // Breed Leaf page entries for each locale and breed
  const breedLeafEntries = locales.flatMap((locale) =>
    breedSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/dosage/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.8 : 0.6,
      alternates: {
        languages: generateAlternates(`/dosage/${slug}`),
      },
    }))
  )

  // Uses HUB page entries for each locale
  const usesHubEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/uses`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 0.9 : 0.7,
    alternates: {
      languages: generateAlternates('/uses'),
    },
  }))

  // Uses Leaf page entries for each locale and use case
  const usesLeafEntries = locales.flatMap((locale) =>
    useCaseSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/uses/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.8 : 0.6,
      alternates: {
        languages: generateAlternates(`/uses/${slug}`),
      },
    }))
  )

  // Safety HUB page entries for each locale
  const safetyHubEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/safety`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 0.9 : 0.7,
    alternates: {
      languages: generateAlternates('/safety'),
    },
  }))

  // Safety Leaf page entries for each locale and guide
  const safetyLeafEntries = locales.flatMap((locale) =>
    safetyGuideSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/safety/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.8 : 0.6,
      alternates: {
        languages: generateAlternates(`/safety/${slug}`),
      },
    }))
  )

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

  return [
    ...mainPageEntries,
    ...breedsHubEntries,
    ...breedLeafEntries,
    ...usesHubEntries,
    ...usesLeafEntries,
    ...safetyHubEntries,
    ...safetyLeafEntries,
    ...staticPages,
  ]
}
