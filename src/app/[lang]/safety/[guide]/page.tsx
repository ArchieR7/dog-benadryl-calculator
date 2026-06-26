import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locales, hreflangCodes, type Locale } from '@/i18n/config'
import {
  safetyGuides,
  getSafetyGuideBySlug,
  getAllSafetyGuideSlugs,
  type SafetyGuide,
} from '@/data/safety'

const BASE_URL = 'https://dogbenadrylcalculator.com'

interface PageProps {
  params: Promise<{ lang: Locale; guide: string }>
}

// Generate static params for all locales and safety guides
export async function generateStaticParams() {
  const slugs = getAllSafetyGuideSlugs()

  return locales.flatMap((locale) => slugs.map((slug) => ({ lang: locale, guide: slug })))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, guide: guideSlug } = await params
  const guide = getSafetyGuideBySlug(guideSlug)

  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  const title = `${guide.name} | Dog Benadryl Safety Guide`
  const description = guide.description.slice(0, 160)

  // Generate alternates for hreflang
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    alternates[hreflangCodes[locale]] = `${BASE_URL}/${locale}/safety/${guideSlug}`
  }
  alternates['x-default'] = `${BASE_URL}/en/safety/${guideSlug}`

  return {
    title,
    description,
    keywords: `benadryl ${guide.shortName.toLowerCase()} dogs, diphenhydramine ${guide.shortName.toLowerCase()} dogs, dog benadryl safety, ${guide.name.toLowerCase()}`,
    alternates: {
      canonical: `${BASE_URL}/${lang}/safety/${guideSlug}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/safety/${guideSlug}`,
      siteName: 'Dog Benadryl Calculator',
      type: 'article',
    },
    // pSEO 薄頁暫時 noindex,待補上獨特內容後再放回索引(AdSense 過審策略)
    robots: { index: false, follow: true },
  }
}

// Structured data for SEO
function generateJsonLd(guide: SafetyGuide, lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        name: guide.name,
        description: guide.description,
        url: `${BASE_URL}/${lang}/safety/${guide.slug}`,
        inLanguage: lang,
        about: {
          '@type': 'Drug',
          name: 'Diphenhydramine (Benadryl)',
          activeIngredient: 'Diphenhydramine',
        },
        audience: {
          '@type': 'PeopleAudience',
          audienceType: 'Pet owners',
        },
        lastReviewed: new Date().toISOString().split('T')[0],
        reviewedBy: {
          '@type': 'Organization',
          name: 'Dog Benadryl Calculator',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/${lang}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Safety Guides',
            item: `${BASE_URL}/${lang}/safety`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: guide.shortName,
            item: `${BASE_URL}/${lang}/safety/${guide.slug}`,
          },
        ],
      },
    ],
  }
}

function ImportanceIndicator({ level }: { level: SafetyGuide['importance'] }) {
  const config = {
    critical: {
      bg: 'bg-red-100 text-red-700 border-red-200',
      label: 'Critical',
      icon: '🚨',
    },
    high: {
      bg: 'bg-orange-100 text-orange-700 border-orange-200',
      label: 'High',
      icon: '⚠️',
    },
    moderate: {
      bg: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      label: 'Moderate',
      icon: '📋',
    },
  }

  const { bg, label, icon } = config[level]

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${bg}`}>
      {icon} {label} Importance
    </span>
  )
}

export default async function SafetyGuidePage({ params }: PageProps) {
  const { lang, guide: guideSlug } = await params
  const guide = getSafetyGuideBySlug(guideSlug)

  if (!guide) {
    notFound()
  }

  const jsonLd = generateJsonLd(guide, lang)
  const relatedGuides = guide.relatedGuides
    .map((slug) => getSafetyGuideBySlug(slug))
    .filter((g): g is SafetyGuide => g !== undefined)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Breadcrumb */}
        <nav className="max-w-4xl mx-auto px-4 py-4 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href={`/${lang}`} className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${lang}/safety`} className="hover:text-blue-600">
                Safety
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{guide.shortName}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-4">
            <ImportanceIndicator level={guide.importance} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{guide.name}</h1>

          <p className="text-lg text-gray-600 mb-6">{guide.description}</p>

          {/* Key Points */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="font-semibold text-blue-900 mb-3">Key Points</h2>
            <ul className="space-y-2">
              {guide.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blue-800">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Detailed Information */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {guide.details.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Warning Signs */}
        {guide.warningSigns && guide.warningSigns.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 py-8">
            <div
              className={`rounded-xl p-6 ${guide.importance === 'critical' ? 'bg-red-50 border-2 border-red-300' : 'bg-yellow-50 border-2 border-yellow-300'}`}
            >
              <h2
                className={`text-xl font-bold mb-4 ${guide.importance === 'critical' ? 'text-red-900' : 'text-yellow-900'}`}
              >
                {guide.warningSignsTitle || 'Warning Signs'}
              </h2>
              <ul className="space-y-3">
                {guide.warningSigns.map((sign, index) => (
                  <li key={index} className="flex items-start">
                    <span
                      className={`text-lg mr-2 ${guide.importance === 'critical' ? 'text-red-600' : 'text-yellow-600'}`}
                    >
                      ⚠️
                    </span>
                    <span
                      className={guide.importance === 'critical' ? 'text-red-800' : 'text-yellow-800'}
                    >
                      {sign}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Emergency Actions */}
        {guide.emergencyActions && guide.emergencyActions.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-red-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🚨</span>
                Emergency Actions
              </h2>
              <ol className="space-y-3">
                {guide.emergencyActions.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {guide.faq.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Safety Guides */}
        {relatedGuides.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Safety Guides</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={`/${lang}/safety/${relatedGuide.slug}`}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                >
                  <ImportanceIndicator level={relatedGuide.importance} />
                  <h3 className="font-semibold text-gray-900 mt-3">{relatedGuide.shortName}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {relatedGuide.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Calculate Safe Benadryl Dosage</h2>
            <p className="mb-6 text-blue-100">
              Use our calculator to determine the correct Benadryl dose for your dog.
            </p>
            <Link
              href={`/${lang}`}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Open Dosage Calculator
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
