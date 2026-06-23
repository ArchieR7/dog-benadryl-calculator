import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locales, hreflangCodes, type Locale } from '@/i18n/config'
import { getUseCaseBySlug, getAllUseCaseSlugs, useCases, type UseCase } from '@/data/uses'

const BASE_URL = 'https://dogbenadrylcalculator.com'

interface PageProps {
  params: Promise<{ lang: Locale; use: string }>
}

// Generate static params for all uses and locales
export async function generateStaticParams() {
  const slugs = getAllUseCaseSlugs()
  const params: { lang: Locale; use: string }[] = []

  for (const locale of locales) {
    for (const use of slugs) {
      params.push({ lang: locale, use })
    }
  }

  return params
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, use: useSlug } = await params
  const useCase = getUseCaseBySlug(useSlug)

  if (!useCase) {
    return { title: 'Use Case Not Found' }
  }

  const title = `Benadryl for Dog ${useCase.shortName} | Dosage & Safety Guide`
  const description = `Learn how to safely use Benadryl for ${useCase.name.toLowerCase()} in dogs. Includes proper dosage, when to use, safety tips, and alternative treatments. Free dog Benadryl guide.`

  // Generate alternates for hreflang
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    alternates[hreflangCodes[locale]] = `${BASE_URL}/${locale}/uses/${useSlug}`
  }
  alternates['x-default'] = `${BASE_URL}/en/uses/${useSlug}`

  return {
    title,
    description,
    keywords: `benadryl for dog ${useCase.slug}, dog ${useCase.slug} benadryl, ${useCase.slug} treatment dogs, how much benadryl for dog ${useCase.slug}`,
    alternates: {
      canonical: `${BASE_URL}/${lang}/uses/${useSlug}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/uses/${useSlug}`,
      siteName: 'Dog Benadryl Calculator',
      type: 'article',
    },
  }
}

// Structured data for SEO
function generateJsonLd(useCase: UseCase, lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        name: `Benadryl for Dog ${useCase.shortName}`,
        description: useCase.description,
        url: `${BASE_URL}/${lang}/uses/${useCase.slug}`,
        inLanguage: lang,
        about: {
          '@type': 'MedicalCondition',
          name: useCase.name,
        },
        mainContentOfPage: {
          '@type': 'Drug',
          name: 'Diphenhydramine (Benadryl)',
          drugClass: 'Antihistamine',
        },
        lastReviewed: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'FAQPage',
        mainEntity: useCase.faq.map((item) => ({
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
            name: 'Uses',
            item: `${BASE_URL}/${lang}/uses`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: useCase.shortName,
            item: `${BASE_URL}/${lang}/uses/${useCase.slug}`,
          },
        ],
      },
    ],
  }
}

function EffectivenessIndicator({ level }: { level: UseCase['effectiveness'] }) {
  const colors = {
    high: 'bg-green-100 text-green-800 border-green-200',
    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-red-100 text-red-800 border-red-200',
  }

  const labels = {
    high: 'Highly Effective',
    moderate: 'Moderately Effective',
    low: 'Limited Effectiveness',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colors[level]}`}>
      {labels[level]}
    </span>
  )
}

export default async function UseCasePage({ params }: PageProps) {
  const { lang, use: useSlug } = await params
  const useCase = getUseCaseBySlug(useSlug)

  if (!useCase) {
    notFound()
  }

  // Get related use cases
  const relatedUseCases = useCases
    .filter(
      (u) => u.slug !== useCase.slug && useCase.relatedUses.some((r) => r === u.slug || u.relatedUses.includes(useCase.slug))
    )
    .slice(0, 3)

  const jsonLd = generateJsonLd(useCase, lang)

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
              <Link href={`/${lang}/uses`} className="hover:text-blue-600">
                Uses
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{useCase.shortName}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <EffectivenessIndicator level={useCase.effectiveness} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benadryl for Dog {useCase.shortName}
            </h1>

            <p className="text-lg text-gray-600 mb-6">{useCase.description}</p>

            {/* Quick Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Dosage Reminder</h3>
              <p className="text-blue-800">
                <strong>Standard dose:</strong> 1 mg per pound of body weight, every 8-12 hours.
                <br />
                <span className="text-sm">{useCase.dosageNotes}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Symptoms That May Benefit from Benadryl
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {useCase.symptoms.map((symptom, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{symptom}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When to Use / When Not to Use */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* When to Use */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">When to Use Benadryl</h2>
              </div>

              <ul className="space-y-3">
                {useCase.whenToUse.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* When Not to Use */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">When NOT to Use</h2>
              </div>

              <ul className="space-y-3">
                {useCase.whenNotToUse.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Alternative Options */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Alternative Treatment Options</h2>

            <p className="text-gray-600 mb-4">
              {useCase.effectiveness === 'low'
                ? `Since Benadryl has limited effectiveness for ${useCase.name.toLowerCase()}, you may want to consider these alternatives:`
                : useCase.effectiveness === 'moderate'
                  ? `While Benadryl can help with ${useCase.name.toLowerCase()}, these alternatives may be more effective for some dogs:`
                  : `Benadryl works well for ${useCase.name.toLowerCase()}, but here are some other options to discuss with your vet:`}
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              {useCase.alternativeOptions.map((option, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-blue-500">→</span>
                  <span className="text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {useCase.faq.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Uses */}
        {relatedUseCases.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Uses for Benadryl</h2>

              <div className="grid md:grid-cols-3 gap-4">
                {relatedUseCases.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${lang}/uses/${related.slug}`}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900 mb-1">{related.shortName}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{related.description}</div>
                    <EffectivenessIndicator level={related.effectiveness} />
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href={`/${lang}/uses`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All Benadryl Uses
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Calculate the Right Benadryl Dose</h2>
            <p className="mb-6 text-blue-100">
              Enter your dog&apos;s weight to get the exact Benadryl dosage for {useCase.name.toLowerCase()}.
            </p>
            <Link
              href={`/${lang}`}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Use the Dosage Calculator
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

        {/* Disclaimer */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-900 mb-2">Medical Disclaimer</h3>
            <p>
              This information is for educational purposes only and is not a substitute for
              professional veterinary advice. Always consult your veterinarian before giving any
              medication to your pet, including Benadryl. Your vet can provide personalized advice
              based on your dog&apos;s health history and specific needs.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
