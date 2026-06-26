import { Metadata } from 'next'
import Link from 'next/link'
import { locales, hreflangCodes, type Locale } from '@/i18n/config'
import {
  dogBreeds,
  getBreedsBySize,
  calculateBenadrylDosage,
  getAllergyProneBreeds,
} from '@/data/breeds'

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

  const title = 'Benadryl Dosage by Dog Breed | Complete Breed Guide'
  const description = `Find Benadryl dosage for ${dogBreeds.length}+ dog breeds. Search by breed name or size. Free dosage calculator for Chihuahuas, Golden Retrievers, French Bulldogs, and more.`

  // Generate alternates for hreflang
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    alternates[hreflangCodes[locale]] = `${BASE_URL}/${locale}/breeds`
  }
  alternates['x-default'] = `${BASE_URL}/en/breeds`

  return {
    title,
    description,
    keywords:
      'benadryl dosage by breed, dog benadryl chart, benadryl for small dogs, benadryl for large dogs, antihistamine for dogs by breed',
    alternates: {
      canonical: `${BASE_URL}/${lang}/breeds`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/breeds`,
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
        name: 'Dog Breed Benadryl Dosage Guide',
        description: `Comprehensive Benadryl dosage information for ${dogBreeds.length}+ dog breeds`,
        url: `${BASE_URL}/${lang}/breeds`,
        inLanguage: lang,
        numberOfItems: dogBreeds.length,
        itemListElement: dogBreeds.slice(0, 10).map((breed, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: breed.name,
          url: `${BASE_URL}/${lang}/dosage/${breed.slug}`,
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
            name: 'Dog Breeds',
            item: `${BASE_URL}/${lang}/breeds`,
          },
        ],
      },
    ],
  }
}

export default async function BreedsPage({ params }: PageProps) {
  const { lang } = await params

  const toyBreeds = getBreedsBySize('toy')
  const smallBreeds = getBreedsBySize('small')
  const mediumBreeds = getBreedsBySize('medium')
  const largeBreeds = getBreedsBySize('large')
  const giantBreeds = getBreedsBySize('giant')
  const allergyProneBreeds = getAllergyProneBreeds()

  const jsonLd = generateJsonLd(lang)

  const sizeCategories = [
    {
      id: 'toy',
      name: 'Toy Breeds',
      description: 'Under 10 lbs (4.5 kg)',
      breeds: toyBreeds,
      color: 'pink',
    },
    {
      id: 'small',
      name: 'Small Breeds',
      description: '10-25 lbs (4.5-11 kg)',
      breeds: smallBreeds,
      color: 'purple',
    },
    {
      id: 'medium',
      name: 'Medium Breeds',
      description: '25-55 lbs (11-25 kg)',
      breeds: mediumBreeds,
      color: 'blue',
    },
    {
      id: 'large',
      name: 'Large Breeds',
      description: '55-100 lbs (25-45 kg)',
      breeds: largeBreeds,
      color: 'green',
    },
    {
      id: 'giant',
      name: 'Giant Breeds',
      description: 'Over 100 lbs (45+ kg)',
      breeds: giantBreeds,
      color: 'orange',
    },
  ]

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
            <li className="text-gray-900 font-medium">Dog Breeds</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benadryl Dosage by Dog Breed
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the safe Benadryl dosage for your dog&apos;s breed. Browse {dogBreeds.length}+
              breeds organized by size, or search for your specific breed.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{dogBreeds.length}+</div>
              <div className="text-sm text-gray-500">Dog Breeds</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{toyBreeds.length}</div>
              <div className="text-sm text-gray-500">Toy Breeds</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {smallBreeds.length + mediumBreeds.length}
              </div>
              <div className="text-sm text-gray-500">Small-Medium</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {largeBreeds.length + giantBreeds.length}
              </div>
              <div className="text-sm text-gray-500">Large-Giant</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{allergyProneBreeds.length}</div>
              <div className="text-sm text-gray-500">Allergy Prone</div>
            </div>
          </div>

          {/* Quick Jump Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {sizeCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    category.color === 'pink'
                      ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                      : category.color === 'purple'
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        : category.color === 'blue'
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : category.color === 'green'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
              >
                {category.name} ({category.breeds.length})
              </a>
            ))}
          </div>
        </section>

        {/* Breed Categories */}
        {sizeCategories.map((category) => (
          <section key={category.id} id={category.id} className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                  <p className="text-gray-500">{category.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    category.color === 'pink'
                      ? 'bg-pink-100 text-pink-700'
                      : category.color === 'purple'
                        ? 'bg-purple-100 text-purple-700'
                        : category.color === 'blue'
                          ? 'bg-blue-100 text-blue-700'
                          : category.color === 'green'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {category.breeds.length} breeds
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.breeds.map((breed) => {
                  const avgWeightLbs = Math.round(
                    (breed.avgWeightLbs.min + breed.avgWeightLbs.max) / 2
                  )
                  const dosage = calculateBenadrylDosage(avgWeightLbs)

                  return (
                    <Link
                      key={breed.slug}
                      href={`/${lang}/dosage/${breed.slug}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600">
                          {breed.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {breed.avgWeightLbs.min}-{breed.avgWeightLbs.max} lbs
                        </div>
                        {breed.allergyProne && (
                          <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                            Allergy Prone
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{dosage.doseMg}mg</div>
                        <div className="text-xs text-gray-500">{dosage.tablets25mg}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Allergy Prone Breeds Section */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-amber-50 rounded-2xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h2 className="text-2xl font-bold text-amber-900">Allergy-Prone Breeds</h2>
                <p className="text-amber-700">
                  These breeds are more susceptible to allergies and may need Benadryl more often
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {allergyProneBreeds.slice(0, 18).map((breed) => (
                <Link
                  key={breed.slug}
                  href={`/${lang}/dosage/${breed.slug}`}
                  className="p-3 bg-white rounded-lg hover:bg-amber-100 transition-colors text-center"
                >
                  <div className="font-medium text-gray-900 text-sm">{breed.name}</div>
                </Link>
              ))}
            </div>

            {allergyProneBreeds.length > 18 && (
              <p className="text-center text-amber-700 mt-4 text-sm">
                And {allergyProneBreeds.length - 18} more allergy-prone breeds...
              </p>
            )}
          </div>
        </section>

        {/* Dosage Guidelines */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Benadryl Dosage Guidelines for Dogs
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Standard Dosing Formula</h3>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">1 mg / lb</div>
                    <div className="text-gray-600">or 2-4 mg / kg</div>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Give every 8-12 hours as needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Maximum 3 doses per day
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Use only plain Benadryl (diphenhydramine)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Weigh your dog for accurate dosing
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Quick Reference Chart</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left">Dog Weight</th>
                      <th className="px-3 py-2 text-left">Benadryl Dose</th>
                      <th className="px-3 py-2 text-left">25mg Tablets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[10, 25, 50, 75, 100].map((weight) => {
                      const dose = calculateBenadrylDosage(weight)
                      return (
                        <tr key={weight} className="border-b">
                          <td className="px-3 py-2">{weight} lbs</td>
                          <td className="px-3 py-2">{dose.doseMg} mg</td>
                          <td className="px-3 py-2">{dose.tablets25mg}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Need an Exact Dosage?</h2>
            <p className="mb-6 text-blue-100">
              Use our calculator to get a personalized Benadryl dosage based on your dog&apos;s
              exact weight.
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
