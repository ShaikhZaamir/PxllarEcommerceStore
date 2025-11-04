import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600" />
              <span className="text-xl font-bold">Pxllar Store</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover unique fashion, home decor, gifts, and handmade items from trusted sellers across India. Curated
              with love for the modern lifestyle.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/categories/fashion"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Fashion
              </Link>
              <Link
                href="/categories/home-decor"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Home Decor
              </Link>
              <Link
                href="/categories/gifts"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Gifts
              </Link>
              <Link
                href="/categories/handmade"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Handmade
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/help" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Help Center
              </Link>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Returns & Exchanges
              </Link>
              <Link
                href="/size-guide"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Size Guide
              </Link>
              <Link
                href="/track-order"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Track Your Order
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@pxllarstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Business District,
                  <br />
                  Mumbai, Maharashtra 400001
                  <br />
                  India
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">© 2024 Pxllar Store. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">We accept:</span>
            <div className="flex space-x-2">
              <div className="px-2 py-1 bg-blue-600 text-white text-xs rounded">UPI</div>
              <div className="px-2 py-1 bg-orange-600 text-white text-xs rounded">Razorpay</div>
              <div className="px-2 py-1 bg-green-600 text-white text-xs rounded">COD</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
