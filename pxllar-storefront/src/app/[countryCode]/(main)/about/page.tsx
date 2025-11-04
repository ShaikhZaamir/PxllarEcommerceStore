// src/app/[countryCode]/(main)/about/page.tsx

"use client"

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    We’re building more than a marketplace — we’re creating a community
                    where quality, trust, and innovation come together.
                </p>
            </section>

            {/* Why We Work */}
            <section className="py-16 px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl font-bold mb-6 text-center">Why We Work</h2>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
                    Our mission is simple: to make shopping seamless, fair, and enjoyable.
                    We believe that marketplaces should empower both customers and sellers,
                    creating win-win experiences built on trust and transparency.
                </p>
            </section>

            {/* How We Work */}
            <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl font-bold mb-8 text-center">How We Work</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold mb-2">1. Discover</h3>
                        <p className="text-gray-600">
                            We curate the best products and collections tailored to your lifestyle and needs.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold mb-2">2. Connect</h3>
                        <p className="text-gray-600">
                            We connect you directly with trusted sellers who share our commitment to quality.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold mb-2">3. Deliver</h3>
                        <p className="text-gray-600">
                            From checkout to doorstep, we ensure smooth, secure, and fast delivery every time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features & Benefits */}
            <section className="py-16 px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl font-bold mb-8 text-center">Features & Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-50 border rounded-2xl hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">✔ Trusted Marketplace</h3>
                        <p className="text-gray-600">
                            Every product and seller goes through strict quality checks.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 border rounded-2xl hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">✔ Seamless Experience</h3>
                        <p className="text-gray-600">
                            Shop effortlessly with smooth navigation and checkout.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 border rounded-2xl hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">✔ Secure Payments</h3>
                        <p className="text-gray-600">
                            Your transactions are encrypted and 100% secure.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 border rounded-2xl hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">✔ Fast Delivery</h3>
                        <p className="text-gray-600">
                            We partner with reliable couriers to get products to you quickly.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 border rounded-2xl hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">✔ Customer Support</h3>
                        <p className="text-gray-600">
                            Our team is here 24/7 to help you with any queries.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 border rounded-2xl hover:shadow-md transition">
                        <h3 className="font-semibold mb-2">✔ Community Driven</h3>
                        <p className="text-gray-600">
                            We grow with feedback and ideas from our customers and sellers.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
