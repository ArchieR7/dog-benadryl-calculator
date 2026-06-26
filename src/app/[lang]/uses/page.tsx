import { Metadata } from 'next'
import Link from 'next/link'
import { locales, hreflangCodes, type Locale } from '@/i18n/config'
import { useCases, getHighEffectivenessUses, type UseCase } from '@/data/uses'

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

  const title = 'Benadryl Uses for Dogs | Complete Guide to Dog Benadryl'
  const description = `Discover all the ways Benadryl can help your dog. Learn about treating allergies, anxiety, motion sickness, insect bites, and more. Safe dosage guidelines included.`

  // Generate alternates for hreflang
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    alternates[hreflangCodes[locale]] = `${BASE_URL}/${locale}/uses`
  }
  alternates['x-default'] = `${BASE_URL}/en/uses`

  return {
    title,
    description,
    keywords:
      'benadryl for dogs, what is benadryl used for in dogs, dog benadryl uses, benadryl benefits for dogs',
    alternates: {
      canonical: `${BASE_URL}/${lang}/uses`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/uses`,
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
        name: 'Benadryl Uses for Dogs',
        description: 'Complete guide to using Benadryl for dogs',
        url: `${BASE_URL}/${lang}/uses`,
        inLanguage: lang,
        numberOfItems: useCases.length,
        itemListElement: useCases.map((useCase, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: useCase.name,
          url: `${BASE_URL}/${lang}/uses/${useCase.slug}`,
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
            name: 'Uses',
            item: `${BASE_URL}/${lang}/uses`,
          },
        ],
      },
    ],
  }
}

function EffectivenessIndicator({ level }: { level: UseCase['effectiveness'] }) {
  const colors = {
    high: 'bg-green-100 text-green-700',
    moderate: 'bg-yellow-100 text-yellow-700',
    low: 'bg-red-100 text-red-700',
  }

  const labels = {
    high: 'High',
    moderate: 'Moderate',
    low: 'Limited',
  }

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[level]}`}>
      {labels[level]} Effectiveness
    </span>
  )
}

export default async function UsesPage({ params }: PageProps) {
  const { lang } = await params

  const highEffectivenessUses = getHighEffectivenessUses()
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
            <li className="text-gray-900 font-medium">Uses</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Can Benadryl Be Used For in Dogs?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Benadryl (diphenhydramine) is a versatile over-the-counter antihistamine that can help
              dogs with various conditions. Learn when and how to use it safely.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{useCases.length}</div>
              <div className="text-sm text-gray-500">Common Uses</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{highEffectivenessUses.length}</div>
              <div className="text-sm text-gray-500">Highly Effective</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">OTC</div>
              <div className="text-sm text-gray-500">No Prescription</div>
            </div>
          </div>
        </section>

        {/* Most Effective Uses */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-2xl font-bold text-green-900">Most Effective Uses</h2>
            </div>
            <p className="text-green-800 mb-6">
              Benadryl works best for these conditions. These are situations where antihistamines
              can make a significant difference.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {highEffectivenessUses.map((useCase) => (
                <Link
                  key={useCase.slug}
                  href={`/${lang}/uses/${useCase.slug}`}
                  className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{useCase.shortName}</h3>
                    <EffectivenessIndicator level={useCase.effectiveness} />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{useCase.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Uses Grid */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Benadryl Uses for Dogs</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <Link
                key={useCase.slug}
                href={`/${lang}/uses/${useCase.slug}`}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{useCase.shortName}</h3>
                  <EffectivenessIndicator level={useCase.effectiveness} />
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{useCase.description}</p>

                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Common Symptoms
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {useCase.symptoms.slice(0, 3).map((symptom, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {symptom}
                      </span>
                    ))}
                    {useCase.symptoms.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{useCase.symptoms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-blue-600 text-sm font-medium">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Dosage Quick Reference */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Dosage Reference by Use
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 font-semibold text-gray-900">Use Case</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Standard Dose</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">When to Give</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Effectiveness</th>
                  </tr>
                </thead>
                <tbody>
                  {useCases.map((useCase) => (
                    <tr key={useCase.slug} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/${lang}/uses/${useCase.slug}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {useCase.shortName}
                        </Link>
                      </td>
                      <td className="px-4 py-3">1 mg/lb</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {useCase.slug === 'motion-sickness' || useCase.slug === 'anxiety'
                          ? '30-60 min before'
                          : 'As needed'}
                      </td>
                      <td className="px-4 py-3">
                        <EffectivenessIndicator level={useCase.effectiveness} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Safety Information */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Safety Information</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-green-700 mb-3">
                  ✓ Safe to Use Benadryl When:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Your dog is healthy with no underlying conditions</li>
                  <li>• You use plain diphenhydramine only</li>
                  <li>• You weigh your dog accurately</li>
                  <li>• You follow the 1mg/lb dosing guideline</li>
                  <li>• The condition is mild to moderate</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-red-700 mb-3">✗ Avoid Benadryl When:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Your dog has glaucoma or cardiovascular disease</li>
                  <li>• Your dog is pregnant or nursing</li>
                  <li>• The reaction is severe (seek emergency care)</li>
                  <li>• Using Benadryl-D or combination products</li>
                  <li>• Your dog takes certain other medications</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                <strong>Always consult your veterinarian</strong> before giving Benadryl to your
                dog, especially if they have any health conditions or take other medications.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Calculate Your Dog&apos;s Benadryl Dosage</h2>
            <p className="mb-6 text-blue-100">
              Enter your dog&apos;s weight to get the exact dosage recommendation.
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
