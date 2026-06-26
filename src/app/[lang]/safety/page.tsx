import { Metadata } from 'next'
import Link from 'next/link'
import { locales, hreflangCodes, type Locale } from '@/i18n/config'
import { safetyGuides, getCriticalSafetyGuides, type SafetyGuide } from '@/data/safety'

const BASE_URL = 'https://dogbenadrylcalculator.com'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

// Generate static params for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params

  const title = 'Benadryl Safety Guide for Dogs | Side Effects, Overdose & Contraindications'
  const description = `Complete safety information for giving Benadryl to your dog. Learn about side effects, overdose signs, drug interactions, and when to avoid Benadryl. Essential reading for pet owners.`

  // Generate alternates for hreflang
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    alternates[hreflangCodes[locale]] = `${BASE_URL}/${locale}/safety`
  }
  alternates['x-default'] = `${BASE_URL}/en/safety`

  return {
    title,
    description,
    keywords:
      'benadryl safety dogs, benadryl side effects dogs, benadryl overdose dogs, benadryl contraindications dogs, diphenhydramine safety pets',
    alternates: {
      canonical: `${BASE_URL}/${lang}/safety`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/safety`,
      siteName: 'Dog Benadryl Calculator',
      type: 'website',
    },
    // 薄列表 hub 頁暫時 noindex(AdSense 過審策略)
    robots: { index: false, follow: true },
  }
}

// Structured data for SEO
function generateJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Benadryl Safety Guide for Dogs',
        description: 'Complete safety information for giving Benadryl to dogs',
        url: `${BASE_URL}/${lang}/safety`,
        inLanguage: lang,
        numberOfItems: safetyGuides.length,
        itemListElement: safetyGuides.map((guide, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: guide.name,
          url: `${BASE_URL}/${lang}/safety/${guide.slug}`,
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
            name: 'Safety',
            item: `${BASE_URL}/${lang}/safety`,
          },
        ],
      },
    ],
  }
}

function ImportanceIndicator({ level }: { level: SafetyGuide['importance'] }) {
  const config = {
    critical: {
      bg: 'bg-red-100 text-red-700',
      label: 'Critical',
    },
    high: {
      bg: 'bg-orange-100 text-orange-700',
      label: 'High',
    },
    moderate: {
      bg: 'bg-yellow-100 text-yellow-700',
      label: 'Moderate',
    },
  }

  const { bg, label } = config[level]

  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${bg}`}>{label}</span>
}

export default async function SafetyPage({ params }: PageProps) {
  const { lang } = await params

  const criticalGuides = getCriticalSafetyGuides()
  const jsonLd = generateJsonLd(lang)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Breadcrumb */}
        <nav className="max-w-6xl mx-auto px-4 py-4 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href={`/${lang}`} className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Safety</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benadryl Safety Guide for Dogs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential safety information every dog owner should know before giving Benadryl.
              Learn about side effects, overdose signs, drug interactions, and contraindications.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{safetyGuides.length}</div>
              <div className="text-sm text-gray-500">Safety Topics</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{criticalGuides.length}</div>
              <div className="text-sm text-gray-500">Critical Guides</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">1mg/lb</div>
              <div className="text-sm text-gray-500">Safe Dose</div>
            </div>
          </div>
        </section>

        {/* Critical Safety Information */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🚨</span>
              <h2 className="text-2xl font-bold text-red-900">Critical Safety Information</h2>
            </div>
            <p className="text-red-800 mb-6">
              These guides cover the most important safety topics. Read these first before giving
              Benadryl to your dog.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {criticalGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${lang}/safety/${guide.slug}`}
                  className="bg-white p-5 rounded-lg hover:shadow-md transition-shadow border border-red-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{guide.shortName}</h3>
                    <ImportanceIndicator level={guide.importance} />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{guide.description}</p>
                  <div className="mt-3 flex items-center text-red-600 text-sm font-medium">
                    Read now
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Safety Guides */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Safety Guides</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${lang}/safety/${guide.slug}`}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{guide.shortName}</h3>
                  <ImportanceIndicator level={guide.importance} />
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{guide.description}</p>

                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Points</h4>
                  <ul className="space-y-1">
                    {guide.keyPoints.slice(0, 2).map((point, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-1">•</span>
                        <span className="line-clamp-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center text-blue-600 text-sm font-medium">
                  Read guide
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Safety Reference</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 font-semibold text-gray-900">Topic</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Importance</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Key Takeaway</th>
                  </tr>
                </thead>
                <tbody>
                  {safetyGuides.map((guide) => (
                    <tr key={guide.slug} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/${lang}/safety/${guide.slug}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {guide.shortName}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <ImportanceIndicator level={guide.importance} />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{guide.keyPoints[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Emergency Contact Box */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-600 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
              <p className="mb-6 text-red-100">
                If you suspect your dog has overdosed on Benadryl or is having a severe reaction,
                contact these resources immediately:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-1">ASPCA Poison Control</h3>
                  <p className="text-2xl font-bold">888-426-4435</p>
                  <p className="text-sm text-red-200">(Consultation fee may apply)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-1">Pet Poison Helpline</h3>
                  <p className="text-2xl font-bold">855-764-7661</p>
                  <p className="text-sm text-red-200">(Consultation fee may apply)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Calculate Your Dog&apos;s Safe Dosage</h2>
            <p className="mb-6 text-blue-100">
              Use our calculator to determine the correct Benadryl dose for your dog&apos;s weight.
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
