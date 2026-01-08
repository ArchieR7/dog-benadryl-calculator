'use client'

import { useState, useMemo } from 'react'
import type { Dictionary } from '@/i18n/dictionaries'

type WeightUnit = 'lbs' | 'kg'
type BenadrylType = 'tablet25' | 'tablet50' | 'liquid' | 'chewable'

interface DosageResult {
  dosageMg: number
  dosageMl: number | null
  tablets: number | null
  tabletDisplay: string
  maxDailyMg: number
  frequency: string
  warnings: string[]
}

interface BenadrylCalculatorProps {
  dictionary: Dictionary
}

export default function BenadrylCalculator({ dictionary }: BenadrylCalculatorProps) {
  const [weight, setWeight] = useState<string>('')
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('lbs')
  const [benadrylType, setBenadrylType] = useState<BenadrylType>('tablet25')
  const [purpose, setPurpose] = useState<string>('allergies')
  const [hasSpecialConditions, setHasSpecialConditions] = useState<boolean>(false)

  const t = dictionary.calculator

  const result = useMemo<DosageResult | null>(() => {
    const weightNum = parseFloat(weight)
    if (!weightNum || weightNum <= 0) return null

    // Convert to lbs if needed
    const weightInLbs = weightUnit === 'kg' ? weightNum * 2.20462 : weightNum

    // Standard dosage: 1mg per 1lb (range: 0.9-1.1mg per lb)
    const dosageMg = Math.round(weightInLbs * 1)
    const maxDailyMg = dosageMg * 3 // Max 3 times per day

    // Calculate based on Benadryl type
    let dosageMl: number | null = null
    let tablets: number | null = null
    let tabletDisplay = ''
    const warnings: string[] = []

    switch (benadrylType) {
      case 'tablet25':
        tablets = dosageMg / 25
        if (tablets < 0.5) {
          tabletDisplay = '¼ tablet or less'
          warnings.push(t.warnings.liquidRecommended)
        } else if (tablets < 1) {
          tabletDisplay = '½ tablet'
        } else if (tablets < 1.5) {
          tabletDisplay = '1 tablet'
        } else if (tablets < 2) {
          tabletDisplay = '1½ tablets'
        } else {
          tabletDisplay = `${Math.round(tablets)} tablets`
        }
        break

      case 'tablet50':
        tablets = dosageMg / 50
        if (tablets < 0.25) {
          tabletDisplay = 'Use 25mg tablets instead'
          warnings.push(t.warnings.tablet50TooStrong)
        } else if (tablets < 0.5) {
          tabletDisplay = '¼ tablet'
        } else if (tablets < 1) {
          tabletDisplay = '½ tablet'
        } else {
          tabletDisplay = `${Math.round(tablets)} tablet${Math.round(tablets) > 1 ? 's' : ''}`
        }
        break

      case 'liquid':
        // 12.5mg per 5ml (children's Benadryl)
        dosageMl = (dosageMg / 12.5) * 5
        tabletDisplay = `${dosageMl.toFixed(1)} ml`
        if (dosageMl > 30) {
          warnings.push(t.warnings.largeVolume)
        }
        break

      case 'chewable':
        // 12.5mg per chewable
        tablets = dosageMg / 12.5
        tabletDisplay = `${Math.round(tablets)} chewable${Math.round(tablets) > 1 ? 's' : ''}`
        break
    }

    // Add warnings based on weight
    if (weightInLbs < 10) {
      warnings.push(t.warnings.smallDogs)
    }
    if (weightInLbs > 100) {
      warnings.push(t.warnings.largeDogs)
    }

    // Add special condition warning
    if (hasSpecialConditions) {
      warnings.push(t.warnings.specialConditions)
    }

    return {
      dosageMg,
      dosageMl,
      tablets,
      tabletDisplay,
      maxDailyMg,
      frequency: t.result.frequencyValue,
      warnings,
    }
  }, [weight, weightUnit, benadrylType, hasSpecialConditions, t])

  return (
    <div className="calculator-card" id="calculator">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-3xl">💊</span>
        {t.title}
      </h2>

      <div className="space-y-6">
        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.weightLabel}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={t.weightPlaceholder}
              min="0"
              step="0.1"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              <option value="lbs">{t.lbs}</option>
              <option value="kg">{t.kg}</option>
            </select>
          </div>
        </div>

        {/* Benadryl Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.typeLabel}
          </label>
          <select
            value={benadrylType}
            onChange={(e) => setBenadrylType(e.target.value as BenadrylType)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
          >
            <option value="tablet25">{t.typeOptions.tablet25}</option>
            <option value="tablet50">{t.typeOptions.tablet50}</option>
            <option value="liquid">{t.typeOptions.liquid}</option>
            <option value="chewable">{t.typeOptions.chewable}</option>
          </select>
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.purposeLabel}
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
          >
            <option value="allergies">{t.purposeOptions.allergies}</option>
            <option value="motion">{t.purposeOptions.motion}</option>
            <option value="anxiety">{t.purposeOptions.anxiety}</option>
            <option value="insect">{t.purposeOptions.insect}</option>
            <option value="other">{t.purposeOptions.other}</option>
          </select>
        </div>

        {/* Special Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="specialConditions"
            checked={hasSpecialConditions}
            onChange={(e) => setHasSpecialConditions(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="specialConditions" className="ml-2 text-sm text-gray-600">
            {t.specialConditions}
          </label>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-4">
            <div className="result-highlight">
              <div className="text-center">
                <p className="text-white/80 text-sm uppercase tracking-wide mb-1">
                  {t.result.singleDose}
                </p>
                <p className="text-4xl font-bold">{result.tabletDisplay}</p>
                <p className="text-white/80 mt-1">({result.dosageMg} mg)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">{t.result.frequency}</p>
                <p className="font-semibold text-gray-900">{result.frequency}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">{t.result.maxDailyDose}</p>
                <p className="font-semibold text-gray-900">{result.maxDailyMg} mg</p>
              </div>
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="warning-box">
                <div className="flex items-start">
                  <span className="text-xl mr-2">⚠️</span>
                  <div>
                    <p className="font-semibold text-red-800">{t.result.importantNotes}</p>
                    <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                      {result.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Always show vet reminder */}
            <div className="info-box">
              <div className="flex items-start">
                <span className="text-xl mr-2">🩺</span>
                <p className="text-sm text-blue-800">
                  {t.result.vetReminder}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
