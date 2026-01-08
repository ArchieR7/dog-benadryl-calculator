import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Dog Benadryl Calculator',
  description: 'Privacy policy for Dog Benadryl Calculator. Learn how we handle your data.',
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
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Cookies</h2>
              <p className="text-gray-700">
                Our website may use cookies for analytics purposes. You can control cookie
                settings through your browser preferences.
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
                If you have questions about this privacy policy, please contact us through
                our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
