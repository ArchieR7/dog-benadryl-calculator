import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | Dog Benadryl Calculator',
  description: 'Terms of use for Dog Benadryl Calculator. Please read before using our calculator.',
  robots: 'noindex, follow',
}

export default function TermsPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Use</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <p className="text-gray-600">
              <strong>Last Updated:</strong> December 2024
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Dog Benadryl Calculator, you accept and agree to be
                bound by these terms of use. If you do not agree to these terms, please do
                not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Use of Calculator</h2>
              <p className="text-gray-700">
                The Dog Benadryl Calculator is provided as a free educational tool to help
                pet owners estimate safe Benadryl dosages for their dogs. This calculator
                is for informational purposes only and should not replace professional
                veterinary advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">No Medical Advice</h2>
              <p className="text-gray-700">
                The information provided on this website does not constitute veterinary
                advice. Always consult with a licensed veterinarian before administering
                any medication to your pet. Dosage requirements may vary based on your
                dog&apos;s individual health conditions, age, and other factors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700">
                We make no warranties or representations about the accuracy, reliability,
                or completeness of the information provided. We are not liable for any
                damages arising from your use of this calculator or reliance on the
                information provided.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">User Responsibilities</h2>
              <p className="text-gray-700">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Consulting with a veterinarian before giving any medication to your pet</li>
                <li>Providing accurate weight information for calculations</li>
                <li>Monitoring your pet for any adverse reactions</li>
                <li>Seeking immediate veterinary care if problems occur</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
              <p className="text-gray-700">
                All content on this website, including text, graphics, and code, is
                protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of
                the website after changes constitutes acceptance of the modified terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
