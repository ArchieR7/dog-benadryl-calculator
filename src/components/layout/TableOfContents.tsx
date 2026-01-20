'use client'

import type { Dictionary } from '@/i18n/dictionaries'

interface TableOfContentsProps {
  dictionary: Dictionary
}

export default function TableOfContents({ dictionary }: TableOfContentsProps) {
  const links = [
    { href: '#calculator', label: dictionary.header.nav.calculator },
    { href: '#dosage-chart', label: dictionary.header.nav.dosageChart },
    { href: '#liquid-benadryl', label: 'Liquid Benadryl' },
    { href: '#is-benadryl-safe', label: 'Safety' },
    { href: '#safety', label: 'Side Effects' },
    { href: '#faq', label: dictionary.header.nav.faq },
  ]

  return (
    <nav
      aria-label="Table of Contents"
      className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-8"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Quick Navigation
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
