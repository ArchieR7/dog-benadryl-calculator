/**
 * Benadryl safety guides data for pSEO Leaf Pages
 * Targets long-tail keywords like "benadryl side effects in dogs"
 */

export interface SafetyGuide {
  slug: string
  name: string
  shortName: string
  description: string
  importance: 'critical' | 'high' | 'moderate'
  keyPoints: string[]
  details: {
    title: string
    items: string[]
  }[]
  warningSignsTitle?: string
  warningSigns?: string[]
  emergencyActions?: string[]
  faq: {
    question: string
    answer: string
  }[]
  relatedGuides: string[]
}

export const safetyGuides: SafetyGuide[] = [
  {
    slug: 'side-effects',
    name: 'Benadryl Side Effects in Dogs',
    shortName: 'Side Effects',
    description:
      'Understanding the common and rare side effects of Benadryl (diphenhydramine) in dogs helps you monitor your pet and know when to seek veterinary care. Most side effects are mild, but some require immediate attention.',
    importance: 'high',
    keyPoints: [
      'Drowsiness is the most common side effect',
      'Most side effects are mild and temporary',
      'Serious side effects are rare but require immediate vet attention',
      'Side effects typically appear within 1-2 hours of dosing',
    ],
    details: [
      {
        title: 'Common Side Effects (Usually Harmless)',
        items: [
          'Drowsiness and sedation - most common, usually desired',
          'Dry mouth - may cause increased thirst',
          'Urinary retention - difficulty urinating',
          'Decreased appetite - temporary',
          'Mild lethargy - less active than usual',
          'Hypersalivation - drooling in some dogs',
        ],
      },
      {
        title: 'Less Common Side Effects',
        items: [
          'Rapid breathing or panting',
          'Increased heart rate',
          'Diarrhea or vomiting',
          'Loss of coordination or stumbling',
          'Excitement or hyperactivity (paradoxical reaction)',
          'Constipation',
        ],
      },
      {
        title: 'Serious Side Effects (Seek Vet Care)',
        items: [
          'Seizures or tremors',
          'Difficulty breathing',
          'Extreme agitation or aggression',
          'Collapse or unresponsiveness',
          'Allergic reaction (rare, but possible)',
          'Severely dilated pupils',
        ],
      },
    ],
    warningSignsTitle: 'When to Contact Your Vet',
    warningSigns: [
      'Side effects last more than 24 hours',
      'Your dog seems disoriented or confused',
      'Breathing becomes labored or difficult',
      'Your dog has a seizure',
      'Vomiting or diarrhea persists',
      'Your dog becomes unresponsive',
    ],
    faq: [
      {
        question: 'How long do Benadryl side effects last in dogs?',
        answer:
          'Most side effects like drowsiness typically last 8-12 hours, which is the duration of the medication. Mild side effects usually resolve within 24 hours after the last dose. If side effects persist beyond 24 hours, consult your veterinarian.',
      },
      {
        question: 'Is it normal for my dog to be very sleepy after Benadryl?',
        answer:
          "Yes, drowsiness is the most common and expected side effect of Benadryl in dogs. This sedative effect is why it's sometimes used for anxiety. The sleepiness typically lasts 8-12 hours. If your dog is excessively lethargic or unresponsive, contact your vet.",
      },
      {
        question: 'Can Benadryl make my dog hyperactive instead of sleepy?',
        answer:
          'Yes, some dogs experience a paradoxical reaction where Benadryl causes excitement or hyperactivity instead of drowsiness. This is more common in certain breeds and individual dogs. If this happens, note it for future reference and discuss alternatives with your vet.',
      },
    ],
    relatedGuides: ['overdose-signs', 'drug-interactions', 'when-to-avoid'],
  },
  {
    slug: 'overdose-signs',
    name: 'Benadryl Overdose in Dogs: Signs & What to Do',
    shortName: 'Overdose Signs',
    description:
      "Knowing the signs of Benadryl overdose in dogs can save your pet's life. While Benadryl is generally safe at proper doses, too much can cause serious symptoms that require emergency veterinary care.",
    importance: 'critical',
    keyPoints: [
      'Overdose can occur at doses above 10mg per pound',
      'Symptoms typically appear within 1-2 hours',
      'Severe overdose can be life-threatening',
      'Immediate veterinary care is essential for overdose',
    ],
    details: [
      {
        title: 'Early Overdose Signs (Mild to Moderate)',
        items: [
          'Extreme drowsiness - cannot be roused',
          'Rapid heartbeat (tachycardia)',
          'Dry mouth and excessive thirst',
          'Dilated pupils',
          'Agitation or restlessness',
          'Fever or elevated body temperature',
        ],
      },
      {
        title: 'Severe Overdose Signs (Emergency)',
        items: [
          'Seizures or convulsions',
          'Difficulty breathing or respiratory depression',
          'Extreme excitement followed by depression',
          'Loss of consciousness',
          'Cardiac arrhythmias',
          'Coma (in severe cases)',
        ],
      },
      {
        title: 'Risk Factors for Overdose',
        items: [
          'Using Benadryl-D or combination products (contain pseudoephedrine)',
          'Incorrect weight calculation',
          'Giving multiple doses too close together',
          'Small dogs are more susceptible',
          'Dogs with liver or kidney disease',
          'Concurrent use with other sedating medications',
        ],
      },
    ],
    warningSignsTitle: 'When to Seek Emergency Care',
    warningSigns: [
      'Any sign of seizure activity',
      'Difficulty breathing or blue gums',
      'Collapse or inability to stand',
      'Unresponsive or cannot be woken',
      'Rapid or irregular heartbeat',
      'Known ingestion of large amount',
    ],
    emergencyActions: [
      'Call your vet or pet poison control immediately (ASPCA: 888-426-4435)',
      'Do NOT induce vomiting unless directed by a professional',
      'Note the time of ingestion and amount if known',
      'Keep your dog calm and quiet',
      'Transport to emergency vet clinic if directed',
      'Bring the Benadryl packaging with you',
    ],
    faq: [
      {
        question: 'How much Benadryl is too much for a dog?',
        answer:
          'The maximum safe dose is generally 2-4mg per pound, given 2-3 times daily. Doses above 10mg per pound can cause overdose symptoms. For example, a 20-pound dog should never receive more than 40-80mg per dose. Always use plain diphenhydramine only.',
      },
      {
        question: 'What should I do if my dog ate too much Benadryl?',
        answer:
          'Call your veterinarian or the ASPCA Animal Poison Control Center (888-426-4435) immediately. Do not induce vomiting unless specifically instructed. Note the amount ingested, the time, and any symptoms. Be prepared to transport your dog to an emergency clinic.',
      },
      {
        question: 'Can a dog die from Benadryl overdose?',
        answer:
          'While rare, severe Benadryl overdose can be fatal, especially in small dogs or when combined with other medications. Death typically results from respiratory failure, seizures, or cardiac complications. This is why proper dosing and using plain Benadryl only is crucial.',
      },
    ],
    relatedGuides: ['side-effects', 'when-to-avoid', 'drug-interactions'],
  },
  {
    slug: 'when-to-avoid',
    name: 'When NOT to Give Your Dog Benadryl',
    shortName: 'Contraindications',
    description:
      "Not all dogs should take Benadryl. Certain health conditions, medications, and situations make Benadryl unsafe for your pet. Understanding these contraindications protects your dog's health.",
    importance: 'critical',
    keyPoints: [
      'Some health conditions make Benadryl dangerous',
      'Certain dog breeds may be more sensitive',
      'Some medications interact dangerously with Benadryl',
      'Always consult your vet if your dog has any health issues',
    ],
    details: [
      {
        title: 'Health Conditions (Avoid Benadryl)',
        items: [
          'Glaucoma - Benadryl can increase eye pressure',
          'Cardiovascular disease - can affect heart rate',
          'High blood pressure (hypertension)',
          'Hyperthyroidism - can worsen symptoms',
          'Prostatic hypertrophy - causes urinary issues',
          'Bladder neck obstruction',
          'Seizure disorders - may lower seizure threshold',
          'Severe liver or kidney disease',
        ],
      },
      {
        title: 'Situations to Avoid',
        items: [
          'Pregnant or nursing dogs (without vet approval)',
          'Puppies under 8 weeks old',
          'Dogs already sedated or recovering from anesthesia',
          'Before surgery (unless vet directed)',
          'Severe allergic reactions (need stronger treatment)',
          'Long-term daily use without veterinary guidance',
        ],
      },
      {
        title: 'Benadryl Products to NEVER Use',
        items: [
          'Benadryl-D (contains pseudoephedrine - toxic to dogs)',
          'Benadryl with decongestants',
          'Benadryl with pain relievers (ibuprofen, acetaminophen)',
          'Liquid Benadryl with xylitol (toxic sweetener)',
          'Any combination cold/flu products',
          'Time-release or extended-release formulas',
        ],
      },
    ],
    warningSignsTitle: 'Always Ask Your Vet First If Your Dog Has',
    warningSigns: [
      'Any chronic health condition',
      'History of adverse drug reactions',
      'Currently taking any medications',
      'Had recent surgery or illness',
      'Known allergies to antihistamines',
      'Abnormal heart rhythms',
    ],
    faq: [
      {
        question: 'Can I give Benadryl to my pregnant dog?',
        answer:
          "Benadryl is generally not recommended for pregnant or nursing dogs without veterinary approval. While it's not known to be harmful, the effects on puppies haven't been fully studied. Always consult your vet before giving any medication to a pregnant dog.",
      },
      {
        question: 'Why is Benadryl-D dangerous for dogs?',
        answer:
          'Benadryl-D contains pseudoephedrine, a decongestant that is highly toxic to dogs. Even small amounts can cause severe symptoms including seizures, heart problems, and death. Only use plain Benadryl (diphenhydramine) without any additional active ingredients.',
      },
      {
        question: 'Can dogs with heart problems take Benadryl?',
        answer:
          'Dogs with cardiovascular disease should avoid Benadryl unless specifically approved by their veterinarian. Diphenhydramine can affect heart rate and rhythm, potentially worsening heart conditions. Your vet may recommend safer alternatives.',
      },
    ],
    relatedGuides: ['drug-interactions', 'side-effects', 'overdose-signs'],
  },
  {
    slug: 'drug-interactions',
    name: 'Benadryl Drug Interactions in Dogs',
    shortName: 'Drug Interactions',
    description:
      "Benadryl can interact with many other medications, potentially causing dangerous effects. If your dog takes any other medications or supplements, it's crucial to understand these interactions.",
    importance: 'high',
    keyPoints: [
      'Many medications interact with Benadryl',
      'Sedative effects can be amplified with other drugs',
      'Always tell your vet about all medications your dog takes',
      'Some interactions can be life-threatening',
    ],
    details: [
      {
        title: 'Dangerous Interactions (Avoid Combining)',
        items: [
          'MAO inhibitors (selegiline/Anipryl) - can cause serotonin syndrome',
          'CNS depressants - excessive sedation',
          'Anticholinergic drugs - amplified side effects',
          'Epinephrine - altered cardiovascular effects',
          'Heparin - may reduce anticoagulant effect',
          'Warfarin - unpredictable interactions',
        ],
      },
      {
        title: 'Use with Caution (Vet Supervision)',
        items: [
          'Other antihistamines (Zyrtec, Claritin) - additive effects',
          'Sedatives and tranquilizers - increased drowsiness',
          'Pain medications - enhanced sedation',
          'Phenobarbital - altered Benadryl metabolism',
          'Tricyclic antidepressants - anticholinergic effects',
          'Opioids (tramadol) - respiratory depression risk',
        ],
      },
      {
        title: 'Generally Safe to Combine (With Vet Approval)',
        items: [
          'Most antibiotics - usually safe',
          'Heartworm preventatives - no known interactions',
          'Flea/tick medications - generally compatible',
          'Omega fatty acid supplements - safe to combine',
          'Most probiotics - no interactions',
          'Glucosamine/chondroitin - safe for joint support',
        ],
      },
    ],
    warningSignsTitle: 'Signs of Drug Interaction',
    warningSigns: [
      'Excessive sedation or cannot be roused',
      'Unusual behavior or disorientation',
      'Difficulty breathing',
      'Rapid or irregular heartbeat',
      'Tremors or seizures',
      'Severe vomiting or diarrhea',
    ],
    faq: [
      {
        question: 'Can I give my dog Benadryl with Apoquel?',
        answer:
          'Generally, Benadryl and Apoquel can be used together under veterinary guidance. They work through different mechanisms, and some vets recommend both during severe allergy flares. However, always confirm with your vet before combining any medications.',
      },
      {
        question: 'Can dogs take Benadryl and trazodone together?',
        answer:
          'Combining Benadryl and trazodone can cause excessive sedation since both have sedative effects. While some vets may prescribe them together at reduced doses for severe anxiety, this should only be done under direct veterinary supervision.',
      },
      {
        question: 'Is it safe to give Benadryl with pain medication?',
        answer:
          'This depends on the specific pain medication. NSAIDs like Rimadyl are generally safe to combine with Benadryl, but opioid pain medications can increase sedation and respiratory depression. Always consult your vet before combining any medications.',
      },
    ],
    relatedGuides: ['side-effects', 'when-to-avoid', 'overdose-signs'],
  },
  {
    slug: 'proper-dosing',
    name: 'Proper Benadryl Dosing for Dogs',
    shortName: 'Proper Dosing',
    description:
      'Giving the correct Benadryl dose is essential for your dog\'s safety and the medication\'s effectiveness. Learn how to calculate the right dose, what forms to use, and how often to give it.',
    importance: 'high',
    keyPoints: [
      'Standard dose: 1mg per pound of body weight',
      'Can be given every 8-12 hours',
      'Only use plain diphenhydramine',
      'Always weigh your dog accurately',
    ],
    details: [
      {
        title: 'Dosing Guidelines',
        items: [
          'Standard dose: 1mg diphenhydramine per pound',
          'Maximum dose: 2-4mg per pound (vet guidance only)',
          'Frequency: Every 8-12 hours as needed',
          'Duration: Short-term use recommended',
          'Tablets typically come in 25mg strength',
          'Liquid forms may contain xylitol - check ingredients',
        ],
      },
      {
        title: 'How to Calculate the Dose',
        items: [
          'Weigh your dog accurately on a scale',
          'Multiply weight in pounds by 1 (e.g., 50 lbs = 50mg)',
          'Round down to nearest tablet size if needed',
          'Small dogs: Consider children\'s liquid (no xylitol)',
          'Use a pill cutter for precise dosing',
          'When in doubt, give less rather than more',
        ],
      },
      {
        title: 'Administration Tips',
        items: [
          'Give with food to reduce stomach upset',
          'Hide tablet in cheese, peanut butter, or pill pocket',
          'Ensure dog swallows the full dose',
          'Wait 30-60 minutes before expecting effects',
          'Keep a dosing log to track times and amounts',
          'Store medication away from pets',
        ],
      },
    ],
    warningSignsTitle: 'Dosing Mistakes to Avoid',
    warningSigns: [
      'Guessing your dog\'s weight instead of measuring',
      'Using Benadryl with added ingredients',
      'Giving doses too close together',
      'Using liquid with xylitol sweetener',
      'Giving human combination cold medicines',
      'Exceeding maximum daily dose without vet approval',
    ],
    faq: [
      {
        question: 'How many 25mg Benadryl can I give my dog?',
        answer:
          'At the standard 1mg/lb dose: A 25-lb dog gets one 25mg tablet, a 50-lb dog gets two 25mg tablets, and a 75-lb dog gets three 25mg tablets. This can be given every 8-12 hours. Never exceed 4mg per pound without veterinary guidance.',
      },
      {
        question: 'Can I give my dog liquid Benadryl?',
        answer:
          'Yes, but you must check the ingredients first. Many liquid Benadryl products contain xylitol, an artificial sweetener that is highly toxic to dogs. Children\'s liquid Benadryl without xylitol is often the safest choice. The dose is 0.4ml per pound of body weight.',
      },
      {
        question: 'How often can I give my dog Benadryl?',
        answer:
          'Benadryl can be given every 8-12 hours, meaning 2-3 times per day. However, continuous daily use is not recommended without veterinary guidance. For occasional use (allergic reactions, travel), follow the 8-12 hour interval between doses.',
      },
    ],
    relatedGuides: ['side-effects', 'overdose-signs', 'when-to-avoid'],
  },
]

// Helper functions
export function getSafetyGuideBySlug(slug: string): SafetyGuide | undefined {
  return safetyGuides.find((guide) => guide.slug === slug)
}

export function getAllSafetyGuideSlugs(): string[] {
  return safetyGuides.map((guide) => guide.slug)
}

export function getCriticalSafetyGuides(): SafetyGuide[] {
  return safetyGuides.filter((guide) => guide.importance === 'critical')
}
