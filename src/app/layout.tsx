import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://dogbenadrylcalculator.com'),
  title: 'Dog Benadryl Calculator',
  description: 'Calculate safe Benadryl dosage for your dog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="y1HtE/ykbcnDPqKAIoORYg"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        {children}
      </body>
    </html>
  )
}
