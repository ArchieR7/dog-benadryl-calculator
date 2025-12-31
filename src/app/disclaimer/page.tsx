import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Disclaimer | Dog Benadryl Calculator',
  description: 'Medical disclaimer for Dog Benadryl Calculator. Important information about using our calculator.',
  robots: 'noindex, follow',
}

export default function DisclaimerPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Medical Disclaimer</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                Important Warning
              </h2>
              <p className="text-red-700">
                This calculator is for educational and informational purposes only. It is
                NOT a substitute for professional veterinary care. Always consult your
                veterinarian before giving any medication to your pet.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Not Medical Advice</h2>
              <p className="text-gray-700">
                The Dog Benadryl Calculator and all information on this website are provided
                for general educational purposes only. The content is not intended to be a
                substitute for professional veterinary advice, diagnosis, or treatment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Individual Variations</h2>
              <p className="text-gray-700">
                Every dog is unique. The standard dosage of 1mg per pound of body weight
                is a general guideline. Your dog may require different dosing based on:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Age and overall health condition</li>
                <li>Existing medical conditions</li>
                <li>Other medications being taken</li>
                <li>Breed-specific sensitivities</li>
                <li>Previous reactions to antihistamines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">When NOT to Use Benadryl</h2>
              <p className="text-gray-700">
                Do not give Benadryl to your dog without veterinary guidance if:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Your dog has glaucoma or cardiovascular disease</li>
                <li>Your dog has high blood pressure</li>
                <li>Your dog is pregnant or nursing</li>
                <li>Your dog is a puppy under 6 months old</li>
                <li>Your dog is taking MAOIs or other sedatives</li>
                <li>Your dog has had allergic reactions to antihistamines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Emergency Situations</h2>
              <p className="text-gray-700">
                This calculator should never be used as a substitute for emergency
                veterinary care. If your dog is experiencing a severe allergic reaction
                (anaphylaxis), difficulty breathing, or any other emergency situation,
                seek immediate veterinary care.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <p className="text-blue-800 font-medium">
                  ASPCA Animal Poison Control Center: <strong>888-426-4435</strong>
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  Available 24/7 for poisoning emergencies
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Accuracy of Information</h2>
              <p className="text-gray-700">
                While we strive to provide accurate and up-to-date information, we make
                no warranties about the completeness, reliability, or accuracy of the
                information on this website. The dosage guidelines are based on commonly
                accepted veterinary practices, but may not reflect the most current
                research or your veterinarian&apos;s specific recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700">
                By using this calculator, you acknowledge and agree that we are not
                liable for any harm, injury, or death that may result from:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Use of or reliance on the information provided</li>
                <li>Incorrect use of the calculator</li>
                <li>Failure to seek professional veterinary care</li>
                <li>Adverse reactions to medication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Always Consult Your Vet</h2>
              <p className="text-gray-700">
                We cannot emphasize this enough: <strong>always consult with a licensed
                veterinarian</strong> before giving any medication to your dog. Your vet
                knows your dog&apos;s medical history and can provide personalized advice.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
