'use client'

export default function CalculatorSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dog Benadryl Dosage Calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1247',
    },
    description:
      'Free online calculator to determine the safe Benadryl (diphenhydramine) dosage for dogs based on weight. Includes dosage chart and liquid Benadryl guide.',
    url: 'https://dogbenadrylcalculator.com/en',
    author: {
      '@type': 'Organization',
      name: 'Dog Benadryl Calculator',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
