import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dogbenadrylcalculator.com'),
  title: 'Dog Benadryl Calculator',
  description: 'Calculate safe Benadryl dosage for your dog',
  alternates: {
    canonical: 'https://www.dogbenadrylcalculator.com/en',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This is a minimal root layout - actual html/body tags are in [lang]/layout.tsx
  // and (static)/layout.tsx for proper lang attribute handling
  return children
}
