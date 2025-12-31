'use client'

import type { Dictionary } from '@/i18n/dictionaries'

interface LiquidBenadrylGuideProps {
  dictionary: Dictionary
}

export default function LiquidBenadrylGuide({ dictionary }: LiquidBenadrylGuideProps) {
  const t = dictionary.liquidGuide

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-3xl">💧</span>
        {t.title}
      </h2>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed mb-4">
          {t.intro}
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">{t.conversion.title}</h3>
          <p className="text-blue-700 text-lg font-medium">
            {t.conversion.formula}
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
          {t.chartTitle}
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900">{t.headers.weight}</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900">{t.headers.dose}</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900">{t.headers.liquid}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">5 lbs (2.3 kg)</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">5 mg</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700 font-medium">2 mL</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-gray-700">10 lbs (4.5 kg)</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">10 mg</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700 font-medium">4 mL</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">12.5 lbs (5.7 kg)</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">12.5 mg</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700 font-medium">5 mL (1 tsp)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-gray-700">25 lbs (11.3 kg)</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">25 mg</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700 font-medium">10 mL (2 tsp)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">50 lbs (22.7 kg)</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">50 mg</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700 font-medium">20 mL (4 tsp)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <span>⚠️</span> {t.warning.title}
          </h4>
          <ul className="list-disc list-inside text-amber-700 space-y-1 text-sm">
            {t.warning.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
