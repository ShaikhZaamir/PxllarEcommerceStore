// src/app/[countryCode]/(main)/contact/page.tsx

"use client"

export default function ContactPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    Have a question or want to work with us? We’d love to hear from you.
                    Reach out through our contact details or send us a message below.
                </p>
            </section>

            {/* Contact Info Section */}
            <section className="py-16 px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold mb-2">📧 Email</h3>
                        <p className="text-gray-600">support@yourstore.com</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold mb-2">💬 WhatsApp</h3>
                        <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold mb-2">📞 Phone</h3>
                        <p className="text-gray-600">+91 12345 67890</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold mb-2">📍 Address</h3>
                        <p className="text-gray-600">Mumbai, India</p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
                <form
                    action="https://formspree.io/f/xzzayvvo" // replace with your Formspree endpoint
                    method="POST"
                    className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-lg"
                >
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block mb-2 font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        </div>
    )
}
