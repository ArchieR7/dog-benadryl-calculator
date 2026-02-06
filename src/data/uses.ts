/**
 * Benadryl use cases data for pSEO Leaf Pages
 * Targets long-tail keywords like "benadryl for dog allergies"
 */

export interface UseCase {
  slug: string
  name: string
  shortName: string
  description: string
  symptoms: string[]
  whenToUse: string[]
  whenNotToUse: string[]
  dosageNotes: string
  effectiveness: 'high' | 'moderate' | 'low'
  alternativeOptions: string[]
  faq: {
    question: string
    answer: string
  }[]
  relatedUses: string[]
}

export const useCases: UseCase[] = [
  {
    slug: 'allergies',
    name: 'Allergies (Environmental & Seasonal)',
    shortName: 'Allergies',
    description:
      'Benadryl is commonly used to treat allergic reactions in dogs, including environmental allergies (pollen, dust, mold), food allergies, and contact allergies. It works by blocking histamine, which causes itching, swelling, and other allergic symptoms.',
    symptoms: [
      'Excessive scratching and itching',
      'Red, inflamed skin',
      'Sneezing and runny nose',
      'Watery eyes',
      'Ear infections (secondary to allergies)',
      'Paw licking and chewing',
      'Hair loss (from scratching)',
      'Hives or welts',
    ],
    whenToUse: [
      'Seasonal allergy flare-ups (spring/fall)',
      'After exposure to known allergens',
      'Mild to moderate allergic reactions',
      'As a temporary relief while waiting for vet appointment',
      'Environmental allergies (grass, pollen, dust mites)',
    ],
    whenNotToUse: [
      'Severe allergic reactions (anaphylaxis) - seek emergency vet care',
      'Chronic allergies requiring daily treatment (consider Apoquel/Cytopoint)',
      'If your dog has glaucoma or cardiovascular disease',
      'Pregnant or nursing dogs (without vet approval)',
    ],
    dosageNotes:
      'For allergies, the standard dose of 1mg per pound can be given every 8-12 hours. For chronic allergies, Benadryl may lose effectiveness over time, and prescription alternatives like Apoquel or Cytopoint may be more effective.',
    effectiveness: 'moderate',
    alternativeOptions: [
      'Apoquel (oclacitinib) - prescription, more effective for chronic allergies',
      'Cytopoint injection - long-lasting, fewer side effects',
      'Zyrtec (cetirizine) - less sedating antihistamine',
      'Omega-3 fatty acids - supports skin health',
      'Medicated shampoos - for topical relief',
    ],
    faq: [
      {
        question: 'How quickly does Benadryl work for dog allergies?',
        answer:
          'Benadryl typically starts working within 30-60 minutes for allergy symptoms. Peak effectiveness is usually reached within 2-4 hours. For best results with seasonal allergies, give Benadryl before exposure to allergens when possible.',
      },
      {
        question: 'Can I give my dog Benadryl every day for allergies?',
        answer:
          'While Benadryl can be given daily for short periods, it may lose effectiveness over time (tachyphylaxis). For chronic daily allergies, prescription medications like Apoquel or Cytopoint are generally more effective and sustainable long-term options.',
      },
      {
        question: 'Is Benadryl or Apoquel better for dog allergies?',
        answer:
          'Apoquel is generally more effective for chronic allergies, with an 80%+ success rate compared to about 30-40% for Benadryl. However, Benadryl is much cheaper and available over-the-counter. Apoquel requires a prescription and costs more but provides better itch relief for most dogs.',
      },
    ],
    relatedUses: ['insect-bites', 'hives', 'skin-irritation'],
  },
  {
    slug: 'anxiety',
    name: 'Anxiety & Stress Relief',
    shortName: 'Anxiety',
    description:
      "Benadryl's sedative properties can help calm anxious dogs in stressful situations. While not FDA-approved for anxiety, many veterinarians recommend it as a mild, over-the-counter option for situational anxiety.",
    symptoms: [
      'Pacing and restlessness',
      'Excessive panting',
      'Trembling or shaking',
      'Destructive behavior',
      'Hiding or cowering',
      'Excessive barking or whining',
      'Loss of appetite',
      'Attempting to escape',
    ],
    whenToUse: [
      'Thunderstorm anxiety',
      'Fireworks fear',
      'Vet visit anxiety',
      'Grooming appointments',
      'Mild separation anxiety',
      'Car rides (if anxious, not motion sick)',
      'Moving to a new home',
    ],
    whenNotToUse: [
      'Severe anxiety requiring prescription medication',
      'Daily anxiety management (not sustainable)',
      'If sedation could be dangerous (senior dogs, certain conditions)',
      'Aggressive anxiety (may reduce inhibitions)',
    ],
    dosageNotes:
      "For anxiety, give Benadryl 30-60 minutes before the anxiety-inducing event for best results. The sedative effect helps calm dogs but isn't as effective as prescription anxiety medications like trazodone or gabapentin for severe cases.",
    effectiveness: 'low',
    alternativeOptions: [
      'Trazodone - prescription, more effective for anxiety',
      'Gabapentin - prescription, good for vet visits',
      'Sileo (dexmedetomidine) - prescription gel for noise phobias',
      'CBD oil - natural calming option',
      'ThunderShirt - anxiety wrap',
      'Adaptil (DAP) - calming pheromone diffuser',
    ],
    faq: [
      {
        question: 'Can I give my dog Benadryl for thunderstorm anxiety?',
        answer:
          'Yes, Benadryl can help with mild thunderstorm anxiety due to its sedative effects. Give it 30-60 minutes before the storm for best results. However, for severe storm phobia, prescription medications like Sileo or trazodone are more effective.',
      },
      {
        question: 'How much Benadryl to calm a dog?',
        answer:
          'The standard dose for calming is the same as for allergies: 1mg per pound of body weight. This can be given every 8-12 hours. The drowsiness is a side effect that helps with mild anxiety but is not a true anti-anxiety medication.',
      },
      {
        question: 'Is Benadryl safe for dogs with anxiety?',
        answer:
          'Benadryl is generally safe for occasional anxiety relief in healthy dogs. However, it should not be used as a long-term anxiety solution. If your dog has frequent anxiety, consult your vet about more effective prescription options.',
      },
    ],
    relatedUses: ['travel', 'motion-sickness'],
  },
  {
    slug: 'motion-sickness',
    name: 'Motion Sickness & Travel',
    shortName: 'Motion Sickness',
    description:
      "Benadryl can help prevent motion sickness in dogs during car rides, boat trips, or airplane travel. Its antihistamine and anti-nausea properties, combined with mild sedation, make it useful for dogs who get car sick.",
    symptoms: [
      'Drooling excessively',
      'Vomiting in the car',
      'Dry heaving',
      'Whining or restlessness',
      'Lip licking',
      'Lethargy after travel',
      'Refusal to get in the car',
      'Yawning repeatedly',
    ],
    whenToUse: [
      'Car rides (short or long trips)',
      'Airplane travel',
      'Boat trips',
      'Any travel causing nausea',
      'Dogs with history of car sickness',
    ],
    whenNotToUse: [
      'If your dog has never shown motion sickness symptoms',
      "If drowsiness would be problematic upon arrival",
      'When driving (never give to a dog you need alert)',
      'Severe motion sickness (prescription may be needed)',
    ],
    dosageNotes:
      'For motion sickness, give Benadryl 30-60 minutes before travel. The antihistamine component helps with nausea while the sedative effect keeps dogs calmer during the trip. Withhold food for 2-3 hours before travel to reduce vomiting.',
    effectiveness: 'moderate',
    alternativeOptions: [
      'Cerenia (maropitant) - prescription, most effective anti-nausea',
      'Dramamine (dimenhydrinate) - OTC, similar to Benadryl',
      'Ginger supplements - natural anti-nausea',
      'Travel crate training - behavioral approach',
      'Adaptil spray - calming pheromone for car',
    ],
    faq: [
      {
        question: 'Can I give my dog Benadryl before a car ride?',
        answer:
          'Yes, Benadryl can help prevent car sickness in dogs. Give it 30-60 minutes before the trip. The recommended dose is 1mg per pound. Also withhold food for 2-3 hours before travel to further reduce the chance of vomiting.',
      },
      {
        question: 'Is Benadryl or Dramamine better for dog car sickness?',
        answer:
          'Both can work for motion sickness. Dramamine (dimenhydrinate) is specifically designed for motion sickness, while Benadryl (diphenhydramine) is more versatile. Some dogs respond better to one or the other. Cerenia (prescription) is the most effective option.',
      },
      {
        question: 'How long does Benadryl last for travel?',
        answer:
          'Benadryl typically lasts 8-12 hours in dogs, making it suitable for long car rides. For very long trips, you can give another dose after 8 hours. The sedative effect usually peaks 2-4 hours after administration.',
      },
    ],
    relatedUses: ['anxiety', 'travel'],
  },
  {
    slug: 'insect-bites',
    name: 'Insect Bites & Bee Stings',
    shortName: 'Insect Bites',
    description:
      'Benadryl is excellent for treating allergic reactions to insect bites and bee stings in dogs. It can reduce swelling, itching, and prevent more serious allergic reactions when given promptly after a sting.',
    symptoms: [
      'Swelling at bite/sting site',
      'Redness and inflammation',
      'Excessive licking of affected area',
      'Hives or welts',
      'Facial swelling (especially from bee stings)',
      'Pawing at face or mouth',
      'Drooling (if stung in mouth)',
      'Difficulty breathing (severe - emergency)',
    ],
    whenToUse: [
      'Bee or wasp stings',
      'Mosquito bites',
      'Spider bites (non-venomous)',
      'Ant bites',
      'Fly bites',
      'Any insect-related swelling or itching',
    ],
    whenNotToUse: [
      'Venomous spider bites (black widow, brown recluse) - seek emergency care',
      'Severe allergic reaction with breathing difficulty - emergency',
      'Snake bites - Benadryl does not help, seek emergency care',
      'Multiple stings causing severe reaction',
    ],
    dosageNotes:
      'For insect bites and stings, give Benadryl as soon as possible after the incident. You can give a slightly higher dose (up to 2mg/lb) for severe reactions, but only under veterinary guidance. Watch for signs of anaphylaxis.',
    effectiveness: 'high',
    alternativeOptions: [
      'Cold compress - reduces swelling',
      'Hydrocortisone cream - topical relief',
      'Baking soda paste - neutralizes bee stings',
      'Epinephrine (EpiPen) - for severe anaphylaxis (prescription)',
      'Veterinary emergency care - for severe reactions',
    ],
    faq: [
      {
        question: 'How much Benadryl for a dog bee sting?',
        answer:
          'Give 1mg per pound of body weight immediately after a bee sting. For example, a 50-pound dog would get 50mg (two 25mg tablets). If swelling is severe or spreading, contact your vet immediately while giving the Benadryl.',
      },
      {
        question: 'Can Benadryl stop an allergic reaction in dogs?',
        answer:
          'Benadryl can help with mild to moderate allergic reactions by blocking histamine release. However, it cannot stop severe anaphylactic reactions. If your dog shows signs of difficulty breathing, extreme swelling, or collapse, seek emergency veterinary care immediately.',
      },
      {
        question: 'How quickly should I give Benadryl after a bee sting?',
        answer:
          'Give Benadryl as soon as possible after the sting, ideally within 15-30 minutes. The faster you administer it, the better it can work to reduce the allergic response. Always monitor your dog closely for signs of severe reaction.',
      },
    ],
    relatedUses: ['allergies', 'hives', 'swelling'],
  },
  {
    slug: 'hives',
    name: 'Hives & Skin Reactions',
    shortName: 'Hives',
    description:
      'Benadryl is highly effective for treating hives (urticaria) in dogs. Hives appear as raised, itchy bumps on the skin and are usually caused by allergic reactions. Benadryl can provide quick relief from the itching and help the hives resolve faster.',
    symptoms: [
      'Raised bumps or welts on skin',
      'Intense itching',
      'Redness and swelling',
      'Bumps that appear and disappear',
      'Facial swelling',
      'Rubbing against furniture',
      'Hair standing up in patches',
    ],
    whenToUse: [
      'Allergic reaction causing hives',
      'Contact with new substances (shampoo, plants)',
      'Food allergy reactions',
      'Vaccine reactions',
      'Unknown cause hives',
    ],
    whenNotToUse: [
      'Hives with difficulty breathing - emergency',
      'Hives that don\'t improve after 24-48 hours',
      'Hives accompanied by vomiting/diarrhea',
      'Recurring chronic hives (need veterinary workup)',
    ],
    dosageNotes:
      'For hives, the standard 1mg/lb dose is typically effective. Hives usually respond well to antihistamines, and you may see improvement within 30-60 minutes. If hives persist beyond 24 hours despite Benadryl, consult your veterinarian.',
    effectiveness: 'high',
    alternativeOptions: [
      'Zyrtec (cetirizine) - longer lasting antihistamine',
      'Hydrocortisone cream - topical relief',
      'Cool bath - soothing for itchy skin',
      'Prescription steroids - for severe cases',
      'Elimination diet - if food allergies suspected',
    ],
    faq: [
      {
        question: 'How long does it take for Benadryl to work on dog hives?',
        answer:
          'Benadryl usually starts working on hives within 30-60 minutes. You should see the bumps begin to flatten and the itching decrease. Full resolution of hives typically takes 12-24 hours with treatment.',
      },
      {
        question: 'Can I give my dog Benadryl for hives from vaccines?',
        answer:
          'Yes, Benadryl is commonly used for mild vaccine reactions including hives and facial swelling. Give the standard dose of 1mg per pound. If your dog has had vaccine reactions before, your vet may recommend giving Benadryl before future vaccinations.',
      },
      {
        question: 'Why does my dog keep getting hives?',
        answer:
          'Recurring hives suggest an ongoing allergic trigger. Common causes include food allergies, environmental allergens, insect bites, or contact allergies. Keep a log of when hives occur to help identify the trigger, and consult your vet for allergy testing.',
      },
    ],
    relatedUses: ['allergies', 'insect-bites', 'skin-irritation'],
  },
  {
    slug: 'itching',
    name: 'Itching & Skin Irritation',
    shortName: 'Itching',
    description:
      'Benadryl can provide relief from general itching and skin irritation in dogs. While it may not address the underlying cause, it can make dogs more comfortable while you work with your vet to identify and treat the source of the itching.',
    symptoms: [
      'Constant scratching',
      'Biting at skin or paws',
      'Rubbing against objects',
      'Red, irritated skin',
      'Hair loss from scratching',
      'Hot spots developing',
      'Restlessness due to discomfort',
    ],
    whenToUse: [
      'Mild to moderate itching',
      'Temporary relief while awaiting vet appointment',
      'Seasonal itching flare-ups',
      'After bathing (dry skin)',
      'Contact irritation from plants or chemicals',
    ],
    whenNotToUse: [
      'Chronic severe itching (need proper diagnosis)',
      'Itching with open wounds or infection',
      'Parasites (fleas, mites) - treat the cause',
      'Hot spots - may need antibiotics',
    ],
    dosageNotes:
      'For itching, the standard 1mg/lb dose can be given every 8-12 hours. However, Benadryl only treats symptoms, not underlying causes. If itching persists more than a few days, see your vet to identify and treat the root cause.',
    effectiveness: 'moderate',
    alternativeOptions: [
      'Apoquel - prescription, highly effective for itch',
      'Cytopoint injection - targets itch specifically',
      'Oatmeal baths - soothing for itchy skin',
      'Omega fatty acid supplements - supports skin health',
      'Medicated shampoos - for topical relief',
      'Coconut oil - moisturizing for dry skin',
    ],
    faq: [
      {
        question: 'Will Benadryl stop my dog from itching?',
        answer:
          'Benadryl can reduce itching caused by histamine release (allergies, hives). However, it\'s only about 30-40% effective for general itching. If your dog has chronic itching, prescription medications like Apoquel or Cytopoint are significantly more effective.',
      },
      {
        question: 'How long can I give my dog Benadryl for itching?',
        answer:
          'Benadryl can be given for short-term itching relief (a few days to a week). For ongoing itching, it\'s important to identify the underlying cause. Long-term use may lead to decreased effectiveness and doesn\'t address the root problem.',
      },
      {
        question: 'Is Benadryl or Zyrtec better for dog itching?',
        answer:
          'Both can help with allergy-related itching. Zyrtec (cetirizine) is less sedating and may last longer, while Benadryl works faster. Neither is as effective as prescription options like Apoquel for chronic itching.',
      },
    ],
    relatedUses: ['allergies', 'hives', 'dry-skin'],
  },
]

// Helper functions
export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((useCase) => useCase.slug === slug)
}

export function getAllUseCaseSlugs(): string[] {
  return useCases.map((useCase) => useCase.slug)
}

export function getHighEffectivenessUses(): UseCase[] {
  return useCases.filter((useCase) => useCase.effectiveness === 'high')
}
