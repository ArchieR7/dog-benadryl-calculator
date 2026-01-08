'use client'

import type { Dictionary } from '@/i18n/dictionaries'

const dosageData = [
  { weight: '10 lbs', dosage: '10 mg', tablets25: '½ tablet', tablets50: '¼ tablet', liquid: '4 ml' },
  { weight: '20 lbs', dosage: '20 mg', tablets25: '1 tablet', tablets50: '½ tablet', liquid: '8 ml' },
  { weight: '30 lbs', dosage: '30 mg', tablets25: '1¼ tablets', tablets50: '½ tablet', liquid: '12 ml' },
  { weight: '40 lbs', dosage: '40 mg', tablets25: '1½ tablets', tablets50: '1 tablet', liquid: '16 ml' },
  { weight: '50 lbs', dosage: '50 mg', tablets25: '2 tablets', tablets50: '1 tablet', liquid: '20 ml' },
  { weight: '60 lbs', dosage: '60 mg', tablets25: '2½ tablets', tablets50: '1¼ tablets', liquid: '24 ml' },
  { weight: '70 lbs', dosage: '70 mg', tablets25: '3 tablets', tablets50: '1½ tablets', liquid: '28 ml' },
  { weight: '80 lbs', dosage: '80 mg', tablets25: '3 tablets', tablets50: '1½ tablets', liquid: '32 ml' },
  { weight: '90 lbs', dosage: '90 mg', tablets25: '3½ tablets', tablets50: '2 tablets', liquid: '36 ml' },
  { weight: '100 lbs', dosage: '100 mg', tablets25: '4 tablets', tablets50: '2 tablets', liquid: '40 ml' },
]

interface DosageChartProps {
  dictionary: Dictionary
}

export default function DosageChart({ dictionary }: DosageChartProps) {
  const t = dictionary.dosageChart

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden" id="dosage-chart">
      <div className="p-6 bg-gradient-to-r from-secondary-500 to-secondary-600">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-3xl">📊</span>
          {t.title}
        </h2>
        <p className="text-secondary-100 mt-1">{t.subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.headers.weight}</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.headers.dosage}</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.headers.tablets25}</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.headers.tablets50}</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.headers.liquid}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dosageData.map((row, index) => (
              <tr
                key={row.weight}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.weight}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{row.dosage}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{row.tablets25}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{row.tablets50}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{row.liquid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-amber-50 border-t border-amber-100">
        <p className="text-sm text-amber-800">
          {t.note}
        </p>
      </div>
    </div>
  )
}
