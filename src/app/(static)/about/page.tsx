import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Dog Benadryl Calculator',
  description:
    'About Dog Benadryl Calculator — who runs this site, where our dosage information comes from, how our content is produced, and our editorial review process.',
  alternates: {
    canonical: '/about',
  },
  robots: 'index, follow',
}

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">About Dog Benadryl Calculator</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <p className="text-gray-600">
              <strong>Last reviewed:</strong> June 2026
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Who Runs This Site</h2>
              <p className="text-gray-700">
                Dog Benadryl Calculator is published and operated by{' '}
                <a
                  href="https://archie-design.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Archie Design App LLC
                </a>
                , a software company registered in Wyoming, United States. We build free, focused
                online tools that help people get quick, clearly-explained answers to everyday
                questions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What This Site Does</h2>
              <p className="text-gray-700">
                This site provides a free calculator that estimates a common diphenhydramine
                (Benadryl) dosage range for dogs based on body weight, along with educational
                articles about uses, breeds, and safety considerations. It is an informational
                reference tool, not a veterinary service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Where Our Information Comes From</h2>
              <p className="text-gray-700">
                Our dosage guidance is based on the commonly cited veterinary guideline of
                approximately 1 mg of diphenhydramine per pound of body weight, two to three times
                daily, and is cross-referenced against publicly available material from recognized
                animal-health authorities, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>
                  <a href="https://www.aspca.org/pet-care/animal-poison-control" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                    ASPCA Animal Poison Control
                  </a>
                </li>
                <li>
                  <a href="https://www.akc.org/expert-advice/health/benadryl-for-dogs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                    American Kennel Club (AKC)
                  </a>
                </li>
                <li>
                  <a href="https://vcahospitals.com/know-your-pet/diphenhydramine" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                    VCA Animal Hospitals
                  </a>
                </li>
                <li>
                  <a href="https://www.merckvetmanual.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Merck Veterinary Manual
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">How Our Content Is Produced</h2>
              <p className="text-gray-700">
                Content is drafted by our editorial team using the authoritative sources listed
                above, then reviewed for clarity and accuracy before publication. We use software
                tools to help draft and structure articles, but every page is reviewed by a person
                against primary sources before it goes live. When guidelines or product information
                change, we update the affected pages and revise the &quot;last reviewed&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Important Disclaimer</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <p className="text-amber-800">
                  This tool is for general educational and informational purposes only. It is{' '}
                  <strong>not</strong> veterinary advice and is not a substitute for an examination
                  by a licensed veterinarian. Always confirm any medication and dosage with your
                  veterinarian before giving anything to your dog — your vet&apos;s prescription and
                  guidance take precedence over any estimate shown here.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                Questions, corrections, or feedback? Reach us at{' '}
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
                  <Link href="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Privacy Policy
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
