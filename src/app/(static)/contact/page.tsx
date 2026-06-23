import { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Dog Benadryl Calculator',
  description:
    'Contact Dog Benadryl Calculator. Send us questions, corrections, or feedback by email at contact@archie-design.app or through our contact form.',
  alternates: {
    canonical: '/contact',
  },
  robots: 'index, follow',
}

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <p className="text-gray-700">
                Have a question, a correction, or feedback about the Dog Benadryl Calculator? We
                would love to hear from you. Email us directly at{' '}
                <a href="mailto:contact@archie-design.app" className="text-blue-600 hover:text-blue-800 transition-colors">
                  contact@archie-design.app
                </a>{' '}
                or use the form below.
              </p>
            </section>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                <strong>Please note:</strong> we cannot provide veterinary advice or respond to pet
                medical emergencies. If your dog is unwell or you suspect poisoning, contact your
                veterinarian or the <strong>ASPCA Animal Poison Control Center at 888-426-4435</strong>{' '}
                immediately.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Send a Message</h2>
              <ContactForm toEmail="contact@archie-design.app" />
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Who We Are</h2>
              <p className="text-gray-700">
                Dog Benadryl Calculator is operated by{' '}
                <a href="https://archie-design.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Archie Design App LLC
                </a>{' '}
                (Wyoming, USA). Learn more on our{' '}
                <Link href="/about" className="text-blue-600 hover:text-blue-800 transition-colors">
                  About page
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
                  <Link href="/about" className="text-blue-600 hover:text-blue-800 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Privacy Policy
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
