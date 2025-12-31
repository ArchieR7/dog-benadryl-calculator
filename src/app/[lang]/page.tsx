import BenadrylCalculator from '@/components/calculator/BenadrylCalculator'
import DosageChart from '@/components/calculator/DosageChart'
import LiquidBenadrylGuide from '@/components/calculator/LiquidBenadrylGuide'
import FAQSchema from '@/components/seo/FAQSchema'
import { locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : 'en'
  const dictionary = await getDictionary(locale)

  return (
    <div className="py-8 md:py-12">
      {/* FAQ Schema for SEO */}
      <FAQSchema faqs={dictionary.faq.items} />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dictionary.hero.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dictionary.hero.subtitle}
          </p>
        </div>

        {/* Calculator */}
        <div className="max-w-2xl mx-auto">
          <BenadrylCalculator dictionary={dictionary} />
        </div>
      </section>

      {/* Dosage Chart Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <DosageChart dictionary={dictionary} />
      </section>

      {/* Liquid Benadryl Guide */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12" id="liquid-benadryl">
        <LiquidBenadrylGuide dictionary={dictionary} />
      </section>

      {/* How Much Benadryl Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🐕</span>
            {dictionary.howMuch.title}
          </h2>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {dictionary.howMuch.intro}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">{dictionary.howMuch.simpleRule.title}</h3>
            <div className="bg-primary-50 rounded-lg p-4 mb-4">
              <p className="text-primary-800 font-medium text-lg">
                {dictionary.howMuch.simpleRule.formula}
              </p>
              <p className="text-primary-700 text-sm mt-1">
                {dictionary.howMuch.simpleRule.example}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">{dictionary.howMuch.guidelines.title}</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>{dictionary.howMuch.guidelines.items.frequency.split(':')[0]}:</strong>{dictionary.howMuch.guidelines.items.frequency.split(':').slice(1).join(':')}</li>
              <li><strong>{dictionary.howMuch.guidelines.items.maximum.split(':')[0]}:</strong>{dictionary.howMuch.guidelines.items.maximum.split(':').slice(1).join(':')}</li>
              <li><strong>{dictionary.howMuch.guidelines.items.duration.split(':')[0]}:</strong>{dictionary.howMuch.guidelines.items.duration.split(':').slice(1).join(':')}</li>
              <li><strong>{dictionary.howMuch.guidelines.items.forms.split(':')[0]}:</strong>{dictionary.howMuch.guidelines.items.forms.split(':').slice(1).join(':')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Is Benadryl Safe Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12" id="is-benadryl-safe">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🛡️</span>
            {dictionary.isSafe.title}
          </h2>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              {dictionary.isSafe.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">{dictionary.isSafe.safeFor.title}</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  {dictionary.isSafe.safeFor.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">{dictionary.isSafe.notSafeFor.title}</h3>
                <ul className="text-red-700 text-sm space-y-1">
                  {dictionary.isSafe.notSafeFor.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Give Benadryl Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">✅</span>
            {dictionary.whenToGive.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <span>🌿</span> {dictionary.whenToGive.allergies.title}
              </h3>
              <p className="text-green-700 text-sm">
                {dictionary.whenToGive.allergies.description}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <span>🚗</span> {dictionary.whenToGive.motionSickness.title}
              </h3>
              <p className="text-blue-700 text-sm">
                {dictionary.whenToGive.motionSickness.description}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5">
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <span>😰</span> {dictionary.whenToGive.anxiety.title}
              </h3>
              <p className="text-purple-700 text-sm">
                {dictionary.whenToGive.anxiety.description}
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-5">
              <h3 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                <span>🐝</span> {dictionary.whenToGive.insectBites.title}
              </h3>
              <p className="text-orange-700 text-sm">
                {dictionary.whenToGive.insectBites.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12" id="safety">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">⚠️</span>
            {dictionary.safety.title}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{dictionary.safety.commonSideEffects.title}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {dictionary.safety.commonSideEffects.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="warning-box">
              <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <span>🚨</span> {dictionary.safety.callVet.title}
              </h3>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                {dictionary.safety.callVet.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{dictionary.safety.whenNot.title}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {dictionary.safety.whenNot.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12" id="faq">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">❓</span>
            {dictionary.faq.title}
          </h2>

          <div className="space-y-6">
            {dictionary.faq.items.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-100 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-600">
            <strong>{dictionary.disclaimer.title}:</strong> {dictionary.disclaimer.text}
          </p>
        </div>
      </section>
    </div>
  )
}
