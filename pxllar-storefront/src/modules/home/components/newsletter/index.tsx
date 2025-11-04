import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
    return (
        <section className="py-12 lg:py-20 bg-black">
            <div className="mx-auto px-4">
                <div className="max-w-4xl mx-auto pb-0 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/10 rounded-full p-3 lg:p-4">
                            <Mail className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Get Exclusive Deals</h2>

                    <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto px-4 lg:px-0 leading-relaxed">
                        Subscribe to our newsletter and get 20% off your first order plus early access to sales and new arrivals
                    </p>

                    <form className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-lg mx-auto px-4 sm:px-0">
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="pl-10 py-3 lg:py-6 text-base lg:text-lg bg-white border-0 rounded-lg"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="bg-white text-black hover:bg-white/90 px-6 lg:px-8 py-3 lg:py-6 text-base lg:text-lg font-semibold rounded-lg"
                        >
                            Subscribe
                        </Button>
                    </form>

                    <p className="text-white/60 text-xs lg:text-sm mt-6">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
                    <p className="text-white/60 text-xs lg:text-sm mt-2">No spam, unsubscribe at any time</p>
                </div>
            </div>
        </section>
    )
}
