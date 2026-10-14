import { MetadataRoute } from 'next'
import { locales, hreflangCodes, type Locale } from '@/i18n/config'

const baseUrl = 'https://dogbenadrylcalculator.com'

// Helper to generate alternates for a given path
function generateAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[hreflangCodes[locale as Locale]] = `${baseUrl}/${locale}${path}`
  }
  languages['x-default'] = `${baseUrl}/en${path}`
  return languages
}

/**
 * AdSense 過審策略（瘦身先過審）：
 * 只在 sitemap 列出有獨特價值、真翻譯的內容 —— 16 語言首頁 + 關於與聯絡頁。
 * 程式化 SEO 的 leaf/hub 頁（/dosage、/uses、/safety）內容薄且跨語言重複，
 * 已在各頁 generateMetadata 設為 noindex，且不列入 sitemap，
 * 以避免拉低整站品質評分。待逐步補上各頁獨特內容後，再分批放回索引與 sitemap。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // 16 語言首頁（內容紮實、真翻譯）
  const mainPageEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.8,
    alternates: {
      languages: generateAlternates(''),
    },
  }))

  // 關於與聯絡頁；privacy、terms、disclaimer 已設 noindex，不列入 sitemap
  const staticPages = [
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
  ]

  return [...mainPageEntries, ...staticPages]
}
