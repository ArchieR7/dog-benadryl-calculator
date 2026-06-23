'use client'

import { type Locale } from '@/i18n/config'

interface BreadcrumbSchemaProps {
  locale: Locale
}

export default function BreadcrumbSchema({ locale }: BreadcrumbSchemaProps) {
  const baseUrl = 'https://dogbenadrylcalculator.com'

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Benadryl Dosage Calculator',
        item: `${baseUrl}/${locale}#calculator`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
