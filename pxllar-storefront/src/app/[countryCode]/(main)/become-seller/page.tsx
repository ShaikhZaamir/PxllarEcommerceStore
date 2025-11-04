// src/app/[countryCode]/(main)/become-seller/page.tsx

"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function BecomeSellerPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Become a Seller on Our Marketplace
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    Join our growing network of sellers and reach thousands of customers
                    who are ready to discover your products.
                </p>
                <div className="mt-8">
                    <a
                        href="https://forms.gle/your-google-form-link" // replace with your Google Form link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 rounded-2xl bg-white text-indigo-700 font-semibold shadow hover:bg-gray-100 transition"
                    >
                        Apply Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* Why Sell With Us */}
            <section className="py-16 px-6 md:px-12 lg:px-24 text-center">
                <h2 className="text-3xl font-bold mb-6">Why Sell With Us?</h2>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Wide Customer Reach</h3>
                        <p>
                            Get access to thousands of shoppers looking for quality products
                            every day.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Low Commissions</h3>
                        <p>
                            Maximize your profits with our seller-friendly commission
                            structure.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Marketing Support</h3>
                        <p>
                            Benefit from our marketplace-wide campaigns and promotional tools
                            to boost sales.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="text-indigo-600 text-4xl font-bold mb-2">1</div>
                        <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                        <p>
                            Fill out our quick Google Form to share details about your store
                            and products.
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="text-indigo-600 text-4xl font-bold mb-2">2</div>
                        <h3 className="text-xl font-semibold mb-2">Get Approved</h3>
                        <p>
                            Our team reviews your application and guides you through the
                            onboarding process.
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="text-indigo-600 text-4xl font-bold mb-2">3</div>
                        <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
                        <p>
                            Upload your products, manage inventory, and start reaching
                            customers instantly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Grow Your Business?
                </h2>
                <p className="text-lg mb-6">
                    Apply today and become part of our thriving seller community.
                </p>
                <a
                    href="https://forms.gle/your-google-form-link" // replace with your Google Form link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 rounded-2xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
                >
                    Become a Seller
                    <ArrowRight className="ml-2 w-5 h-5" />
                </a>
            </section>
        </div>
    )
}
