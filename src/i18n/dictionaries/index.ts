import type { Locale } from '../config'

export interface Dictionary {
  meta: {
    title: string
    titleTemplate: string
    description: string
    keywords: string
  }
  header: {
    title: string
    nav: {
      calculator: string
      dosageChart: string
      safetyGuide: string
      faq: string
    }
  }
  hero: {
    title: string
    subtitle: string
  }
  calculator: {
    title: string
    weightLabel: string
    weightPlaceholder: string
    lbs: string
    kg: string
    typeLabel: string
    typeOptions: {
      tablet25: string
      tablet50: string
      liquid: string
      chewable: string
    }
    purposeLabel: string
    purposeOptions: {
      allergies: string
      motion: string
      anxiety: string
      insect: string
      other: string
    }
    specialConditions: string
    result: {
      singleDose: string
      frequency: string
      frequencyValue: string
      maxDailyDose: string
      importantNotes: string
      vetReminder: string
    }
    warnings: {
      smallDogs: string
      largeDogs: string
      specialConditions: string
      liquidRecommended: string
      tablet50TooStrong: string
      largeVolume: string
    }
  }
  dosageChart: {
    title: string
    subtitle: string
    headers: {
      weight: string
      dosage: string
      tablets25: string
      tablets50: string
      liquid: string
    }
    note: string
  }
  liquidGuide: {
    title: string
    intro: string
    conversion: {
      title: string
      formula: string
    }
    chartTitle: string
    headers: {
      weight: string
      dose: string
      liquid: string
    }
    warning: {
      title: string
      items: string[]
    }
  }
  howMuch: {
    title: string
    intro: string
    simpleRule: {
      title: string
      formula: string
      example: string
    }
    guidelines: {
      title: string
      items: {
        frequency: string
        maximum: string
        duration: string
        forms: string
      }
    }
  }
  isSafe: {
    title: string
    intro: string
    safeFor: {
      title: string
      items: string[]
    }
    notSafeFor: {
      title: string
      items: string[]
    }
  }
  whenToGive: {
    title: string
    allergies: {
      title: string
      description: string
    }
    motionSickness: {
      title: string
      description: string
    }
    anxiety: {
      title: string
      description: string
    }
    insectBites: {
      title: string
      description: string
    }
  }
  safety: {
    title: string
    commonSideEffects: {
      title: string
      items: string[]
    }
    callVet: {
      title: string
      items: string[]
    }
    whenNot: {
      title: string
      items: string[]
    }
  }
  faq: {
    title: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  disclaimer: {
    title: string
    text: string
  }
  footer: {
    about: string
    quickLinks: {
      title: string
      calculator: string
      dosageChart: string
      safetyGuidelines: string
      faq: string
    }
    legal: {
      title: string
      privacy: string
      terms: string
      disclaimer: string
    }
    disclaimerText: string
    copyright: string
  }
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./en.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
  de: () => import('./de.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
  ja: () => import('./ja.json').then((module) => module.default),
  pt: () => import('./pt.json').then((module) => module.default),
  ko: () => import('./ko.json').then((module) => module.default),
  'zh-TW': () => import('./zh-TW.json').then((module) => module.default),
  it: () => import('./it.json').then((module) => module.default),
  nl: () => import('./nl.json').then((module) => module.default),
  pl: () => import('./pl.json').then((module) => module.default),
  tr: () => import('./tr.json').then((module) => module.default),
  sv: () => import('./sv.json').then((module) => module.default),
  th: () => import('./th.json').then((module) => module.default),
  vi: () => import('./vi.json').then((module) => module.default),
  id: () => import('./id.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]()
}
