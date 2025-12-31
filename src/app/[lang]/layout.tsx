import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { locales, type Locale, ogLocales, hreflangCodes } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const GA_MEASUREMENT_ID = 'G-P50W0E310W'
const ADSENSE_CLIENT_ID = 'ca-pub-4467778867013569'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : 'en'
  const dictionary = await getDictionary(locale)

  const baseUrl = 'https://dogbenadrylcalculator.com'
  const currentUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`

  // Generate alternate language links
  const languages: Record<string, string> = {}
  locales.forEach((loc) => {
    const hreflang = hreflangCodes[loc]
    languages[hreflang] = loc === 'en' ? baseUrl : `${baseUrl}/${loc}`
  })
  languages['x-default'] = baseUrl

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dictionary.meta.title,
      template: dictionary.meta.titleTemplate,
    },
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords.split(', '),
    authors: [{ name: 'Dog Benadryl Calculator' }],
    creator: 'Dog Benadryl Calculator',
    alternates: {
      canonical: currentUrl,
      languages,
    },
    openGraph: {
      type: 'website',
      locale: ogLocales[locale],
      url: currentUrl,
      siteName: dictionary.header.title,
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: dictionary.header.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : 'en'
  const dictionary = await getDictionary(locale)

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Header dictionary={dictionary} locale={locale} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer dictionary={dictionary} />
    </>
  )
}
