import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locales, hreflangCodes, type Locale } from '@/i18n/config'
import {
  getBreedBySlug,
  getAllBreedSlugs,
  calculateBenadrylDosage,
  getBreedsBySize,
  type DogBreed,
} from '@/data/breeds'

const BASE_URL = 'https://dogbenadrylcalculator.com'

interface PageProps {
  params: Promise<{ lang: Locale; breed: string }>
}

// Generate static params for all breeds and locales
export async function generateStaticParams() {
  const slugs = getAllBreedSlugs()
  const params: { lang: Locale; breed: string }[] = []

  for (const locale of locales) {
    for (const breed of slugs) {
      params.push({ lang: locale, breed })
    }
  }

  return params
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, breed: breedSlug } = await params
  const breed = getBreedBySlug(breedSlug)

  if (!breed) {
    return { title: 'Breed Not Found' }
  }

  const avgWeightLbs = Math.round((breed.avgWeightLbs.min + breed.avgWeightLbs.max) / 2)
  const dosage = calculateBenadrylDosage(avgWeightLbs)

  const title = `Benadryl Dosage for ${breed.name} | ${dosage.doseMg}mg Calculator`
  const description = `Calculate safe Benadryl dosage for your ${breed.name}. Average weight: ${breed.avgWeightLbs.min}-${breed.avgWeightLbs.max} lbs. Recommended dose: ${dosage.tablets25mg} every ${dosage.frequencyHours} hours. Free dog Benadryl calculator.`

  // Generate alternates for hreflang
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    alternates[hreflangCodes[locale]] = `${BASE_URL}/${locale}/dosage/${breedSlug}`
  }
  alternates['x-default'] = `${BASE_URL}/en/dosage/${breedSlug}`

  return {
    title,
    description,
    keywords: `benadryl for ${breed.name.toLowerCase()}, ${breed.name.toLowerCase()} benadryl dosage, how much benadryl for ${breed.name.toLowerCase()}, ${breed.name.toLowerCase()} allergy medicine, benadryl dose ${breed.name.toLowerCase()}`,
    alternates: {
      canonical: `${BASE_URL}/${lang}/dosage/${breedSlug}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/dosage/${breedSlug}`,
      siteName: 'Dog Benadryl Calculator',
      type: 'website',
    },
    // pSEO 薄頁暫時 noindex,待補上各品種獨特內容後再放回索引(AdSense 過審策略)
    robots: { index: false, follow: true },
  }
}

// Structured data for SEO
function generateJsonLd(breed: DogBreed, lang: Locale) {
  const avgWeightLbs = Math.round((breed.avgWeightLbs.min + breed.avgWeightLbs.max) / 2)
  const dosage = calculateBenadrylDosage(avgWeightLbs)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        name: `Benadryl Dosage for ${breed.name}`,
        description: `Safe Benadryl dosing information for ${breed.name} dogs. Recommended dose: ${dosage.tablets25mg} (${dosage.doseMg}mg) every ${dosage.frequencyHours} hours.`,
        url: `${BASE_URL}/${lang}/dosage/${breed.slug}`,
        inLanguage: lang,
        about: {
          '@type': 'Drug',
          name: 'Diphenhydramine (Benadryl)',
          drugClass: 'Antihistamine',
        },
        audience: {
          '@type': 'PeopleAudience',
          audienceType: 'Pet Owners',
        },
        lastReviewed: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How much Benadryl can I give my ${breed.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `For a ${breed.name} weighing ${breed.avgWeightLbs.min}-${breed.avgWeightLbs.max} lbs, the recommended Benadryl dose is ${dosage.doseMg}mg (${dosage.tablets25mg}) every ${dosage.frequencyHours} hours, up to ${dosage.maxDosesPerDay} times daily. Always consult your veterinarian.`,
            },
          },
          {
            '@type': 'Question',
            name: `Is Benadryl safe for ${breed.name}s?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes, Benadryl (diphenhydramine) is generally safe for ${breed.name}s when given at the correct dosage. ${breed.allergyProne ? `${breed.name}s are prone to allergies, so Benadryl is commonly used for this breed.` : ''} Always consult your veterinarian before giving any medication.`,
            },
          },
          {
            '@type': 'Question',
            name: `What can I give my ${breed.name} for allergies?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Benadryl (diphenhydramine) is a common over-the-counter antihistamine that can help with allergies in ${breed.name}s. The standard dose is 1mg per pound of body weight. Other options include Apoquel, Cytopoint, or prescription medications from your veterinarian.`,
            },
          },
        ],
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
          {
            '@type': 'ListItem',
            position: 3,
            name: breed.name,
            item: `${BASE_URL}/${lang}/dosage/${breed.slug}`,
          },
        ],
      },
    ],
  }
}

export default async function BreedDosagePage({ params }: PageProps) {
  const { lang, breed: breedSlug } = await params
  const breed = getBreedBySlug(breedSlug)

  if (!breed) {
    notFound()
  }

  const avgWeightLbs = Math.round((breed.avgWeightLbs.min + breed.avgWeightLbs.max) / 2)
  const avgWeightKg = Math.round((breed.avgWeightKg.min + breed.avgWeightKg.max) / 2)
  const minDosage = calculateBenadrylDosage(breed.avgWeightLbs.min)
  const maxDosage = calculateBenadrylDosage(breed.avgWeightLbs.max)
  const avgDosage = calculateBenadrylDosage(avgWeightLbs)

  // Get related breeds (same size category)
  const relatedBreeds = getBreedsBySize(breed.sizeCategory)
    .filter((b) => b.slug !== breed.slug)
    .slice(0, 6)

  const jsonLd = generateJsonLd(breed, lang)

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
              <Link href={`/${lang}/breeds`} className="hover:text-blue-600">
                Dog Breeds
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{breed.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-4">
              {breed.allergyProne && (
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Allergy Prone Breed
                </span>
              )}
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
                {breed.sizeCategory} Breed
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benadryl Dosage for {breed.name}
            </h1>

            <p className="text-lg text-gray-600 mb-6">{breed.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-500">Average Weight</div>
                <div className="text-xl font-bold text-gray-900">
                  {breed.avgWeightLbs.min}-{breed.avgWeightLbs.max} lbs
                </div>
                <div className="text-sm text-gray-500">
                  ({breed.avgWeightKg.min}-{breed.avgWeightKg.max} kg)
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-500">Recommended Dose</div>
                <div className="text-xl font-bold text-blue-600">{avgDosage.doseMg} mg</div>
                <div className="text-sm text-gray-500">{avgDosage.tablets25mg}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-500">Frequency</div>
                <div className="text-xl font-bold text-gray-900">Every {avgDosage.frequencyHours}h</div>
                <div className="text-sm text-gray-500">Max {avgDosage.maxDosesPerDay}x daily</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-500">Lifespan</div>
                <div className="text-xl font-bold text-gray-900">{breed.lifespan}</div>
                <div className="text-sm text-gray-500">Origin: {breed.origin}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dosage Table */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {breed.name} Benadryl Dosage Chart
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 font-semibold text-gray-900">Weight Range</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Dose (mg)</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">25mg Tablets</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">
                      Small {breed.name}
                      <br />
                      <span className="text-sm text-gray-500">{breed.avgWeightLbs.min} lbs</span>
                    </td>
                    <td className="px-4 py-3 font-medium">{minDosage.doseMg} mg</td>
                    <td className="px-4 py-3">{minDosage.tablets25mg}</td>
                    <td className="px-4 py-3">Every {minDosage.frequencyHours} hours</td>
                  </tr>
                  <tr className="border-b bg-blue-50">
                    <td className="px-4 py-3">
                      Average {breed.name}
                      <br />
                      <span className="text-sm text-gray-500">{avgWeightLbs} lbs</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-blue-600">{avgDosage.doseMg} mg</td>
                    <td className="px-4 py-3 font-medium">{avgDosage.tablets25mg}</td>
                    <td className="px-4 py-3">Every {avgDosage.frequencyHours} hours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">
                      Large {breed.name}
                      <br />
                      <span className="text-sm text-gray-500">{breed.avgWeightLbs.max} lbs</span>
                    </td>
                    <td className="px-4 py-3 font-medium">{maxDosage.doseMg} mg</td>
                    <td className="px-4 py-3">{maxDosage.tablets25mg}</td>
                    <td className="px-4 py-3">Every {maxDosage.frequencyHours} hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              * Standard dosing: 1 mg per pound of body weight. Always weigh your {breed.name} for
              accurate dosing.
            </p>
          </div>
        </section>

        {/* Common Uses */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Give Benadryl to a {breed.name}?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Common Uses for This Breed</h3>
                <ul className="space-y-2">
                  {breed.commonUses.map((use) => (
                    <li key={use} className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="capitalize">{use.replace(/-/g, ' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">General Benadryl Uses</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    Environmental allergies (pollen, dust, mold)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    Insect bites and bee stings
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    Motion sickness during travel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    Mild anxiety (vet visits, thunderstorms)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    Vaccine reactions
                  </li>
                </ul>
              </div>
            </div>

            {breed.allergyProne && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Allergy Alert: {breed.name}s Are Prone to Allergies
                </h4>
                <p className="text-amber-700 text-sm">
                  {breed.name}s are known to be more susceptible to allergies than many other breeds.
                  If your {breed.name} has recurring allergic symptoms, consult your veterinarian
                  about long-term management options like Apoquel or Cytopoint, which may be more
                  effective than Benadryl for chronic allergies.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Safety Information */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Safety Information for {breed.name}s
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">Safe Practices</h3>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Use only plain Benadryl (diphenhydramine)</li>
                  <li>• Weigh your {breed.name} accurately before dosing</li>
                  <li>• Start with the lower end of the dose range</li>
                  <li>• Monitor for drowsiness (normal side effect)</li>
                  <li>• Give with food to prevent stomach upset</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">Avoid / Warning Signs</h3>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Never use Benadryl-D or combination products</li>
                  <li>• Avoid if your dog has glaucoma or heart disease</li>
                  <li>• Watch for rapid heartbeat or breathing</li>
                  <li>• Stop if your dog shows extreme drowsiness</li>
                  <li>• Seek vet care for severe allergic reactions</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Important:</strong> While Benadryl is generally safe for dogs, always consult
                your veterinarian before giving any medication to your {breed.name}, especially if
                they have pre-existing health conditions or are taking other medications.
              </p>
            </div>
          </div>
        </section>

        {/* Related Breeds */}
        {relatedBreeds.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Other {breed.sizeCategory.charAt(0).toUpperCase() + breed.sizeCategory.slice(1)} Breeds
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {relatedBreeds.map((relatedBreed) => {
                  const relatedDosage = calculateBenadrylDosage(
                    Math.round((relatedBreed.avgWeightLbs.min + relatedBreed.avgWeightLbs.max) / 2)
                  )
                  return (
                    <Link
                      key={relatedBreed.slug}
                      href={`/${lang}/dosage/${relatedBreed.slug}`}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{relatedBreed.name}</div>
                      <div className="text-sm text-gray-500">
                        {relatedBreed.avgWeightLbs.min}-{relatedBreed.avgWeightLbs.max} lbs
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        ~{relatedDosage.doseMg}mg Benadryl
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href={`/${lang}/breeds`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All Dog Breeds
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
            <h2 className="text-2xl font-bold mb-4">Calculate Exact Dosage for Your {breed.name}</h2>
            <p className="mb-6 text-blue-100">
              Enter your dog&apos;s exact weight for a personalized Benadryl dosage recommendation.
            </p>
            <Link
              href={`/${lang}`}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Use the Calculator
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
              This calculator is for informational purposes only and is not a substitute for
              professional veterinary advice. Always consult your veterinarian before giving any
              medication to your pet. The dosage information provided is based on general guidelines
              and may not be appropriate for all dogs. Individual factors such as age, health
              conditions, and other medications may affect the appropriate dosage.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
