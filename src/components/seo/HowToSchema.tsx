'use client'

export default function HowToSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Benadryl Dosage for Dogs',
    description:
      'Step-by-step guide to calculate the safe Benadryl (diphenhydramine) dosage for your dog based on weight.',
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Benadryl (diphenhydramine)',
      },
      {
        '@type': 'HowToSupply',
        name: 'Scale to weigh your dog',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Dog Benadryl Dosage Calculator',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Weigh your dog',
        text: 'Use a scale to determine your dog\'s current weight in pounds (lbs) or kilograms (kg). Accurate weight is essential for proper dosing.',
        image: 'https://www.dogbenadrylcalculator.com/step-weigh-dog.png',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Calculate the dosage',
        text: 'Apply the standard dosage formula: 1 mg of Benadryl per 1 pound of body weight. For example, a 25 lb dog can take 25 mg of Benadryl.',
        image: 'https://www.dogbenadrylcalculator.com/step-calculate.png',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose the Benadryl form',
        text: 'Select the appropriate form: 25mg tablets, 50mg tablets, or liquid Benadryl (12.5mg/5mL). Ensure the product contains only diphenhydramine as the active ingredient.',
        image: 'https://www.dogbenadrylcalculator.com/step-choose-form.png',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Verify with your veterinarian',
        text: 'Always consult your veterinarian before giving Benadryl, especially if your dog has health conditions, is pregnant/nursing, or takes other medications.',
        image: 'https://www.dogbenadrylcalculator.com/step-consult-vet.png',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Administer the correct dose',
        text: 'Give the calculated dose every 8-12 hours (2-3 times daily) as needed. Do not exceed 2 mg per pound in a single dose. Monitor your dog for side effects.',
        image: 'https://www.dogbenadrylcalculator.com/step-administer.png',
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
