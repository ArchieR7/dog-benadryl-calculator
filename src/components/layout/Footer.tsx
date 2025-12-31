import Link from 'next/link'
import type { Dictionary } from '@/i18n/dictionaries'

interface FooterProps {
  dictionary: Dictionary
}

export default function Footer({ dictionary }: FooterProps) {
  const t = dictionary.footer
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              🐕 {dictionary.header.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t.about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t.quickLinks.title}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#calculator" className="hover:text-white transition-colors">
                  {t.quickLinks.calculator}
                </Link>
              </li>
              <li>
                <Link href="#dosage-chart" className="hover:text-white transition-colors">
                  {t.quickLinks.dosageChart}
                </Link>
              </li>
              <li>
                <Link href="#safety" className="hover:text-white transition-colors">
                  {t.quickLinks.safetyGuidelines}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  {t.quickLinks.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t.legal.title}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t.legal.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t.legal.terms}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  {t.legal.disclaimer}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            <strong>{dictionary.disclaimer.title}:</strong> {t.disclaimerText}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} {dictionary.header.title}. {t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
