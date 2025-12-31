'use client'

import Link from 'next/link'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  dictionary: Dictionary
  locale: Locale
}

export default function Header({ dictionary, locale }: HeaderProps) {
  const t = dictionary.header
  const basePath = locale === 'en' ? '' : `/${locale}`

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`${basePath}/`} className="flex items-center space-x-2">
            <span className="text-3xl">🐕</span>
            <span className="font-bold text-xl text-gray-900">
              {t.title}
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#calculator"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {t.nav.calculator}
            </Link>
            <Link
              href="#dosage-chart"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {t.nav.dosageChart}
            </Link>
            <Link
              href="#safety"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {t.nav.safetyGuide}
            </Link>
            <Link
              href="#faq"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {t.nav.faq}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile Language Switcher */}
          <div className="md:hidden">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </nav>
    </header>
  )
}
