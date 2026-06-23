import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Dog Benadryl Calculator',
  description: 'Privacy policy for Dog Benadryl Calculator. Learn how we collect, use, and protect your data. We respect your privacy and do not store any personal information from calculator usage.',
  alternates: {
    canonical: '/privacy',
  },
  robots: 'noindex, follow',
}

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <p className="text-gray-600">
              <strong>Last Updated:</strong> December 2024
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
              <p className="text-gray-700">
                Dog Benadryl Calculator is a free tool that does not require registration or
                personal information. We do not collect, store, or share any personal data
                from our users.
              </p>
              <p className="text-gray-700 mt-4">
                All calculations are performed locally in your browser. The weight and dosage
                information you enter is never transmitted to our servers or stored anywhere.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Analytics</h2>
              <p className="text-gray-700">
                We may use third-party analytics services (such as Google Analytics) to
                understand how visitors use our website. These services collect anonymous,
                aggregated data about page views and user behavior. No personally identifiable
                information is collected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Advertising</h2>
              <p className="text-gray-700">
                This site is supported by advertising. We use Google AdSense and may use other
                third-party advertising vendors to serve ads when you visit our website.
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>
                  Third-party vendors, including Google, use cookies to serve ads based on your
                  prior visits to this and other websites.
                </li>
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve
                  ads to you based on your visit to this site and/or other sites on the Internet.
                </li>
                <li>
                  You may opt out of personalized advertising by visiting{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Google Ads Settings
                  </a>
                  . You can also opt out of a third-party vendor&apos;s use of cookies for
                  personalized advertising by visiting{' '}
                  <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                    aboutads.info
                  </a>
                  .
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                For more information about how Google uses data, see Google&apos;s{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Privacy &amp; Terms
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Cookies</h2>
              <p className="text-gray-700">
                Our website may use cookies for analytics and advertising purposes, including
                cookies set by Google AdSense and other advertising partners. You can control or
                disable cookies through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Links</h2>
              <p className="text-gray-700">
                Our website may contain links to external sites. We are not responsible for
                the privacy practices of other websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. Any changes will be
                posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact</h2>
              <p className="text-gray-700">
                If you have questions about this privacy policy, please contact us at{' '}
                <a href="mailto:contact@archie-design.app" className="text-blue-600 hover:text-blue-800 transition-colors">
                  contact@archie-design.app
                </a>{' '}
                or through our{' '}
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">
                  contact page
                </Link>
                .
              </p>
            </section>

            {/* Related Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/en" className="text-blue-600 hover:text-blue-800 transition-colors">
                    ← Back to Dog Benadryl Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Medical Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
