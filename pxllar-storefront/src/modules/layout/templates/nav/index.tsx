"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"
import CartButton from "@modules/layout/components/cart-button"
import { Button } from "components/ui/button"
import { User } from "lucide-react"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/40 backdrop-blur-md">
      <div className="mx-auto px-4 w-full">
        {/* Topbar */}
        <div className="flex h-16 items-center justify-between w-full">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
              <span className="sr-only">Pxllar Logo</span>
            </div>
            <span className="text-xl font-bold">Pxllar Store</span>
          </Link> */}

          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg overflow-hidden -mt-1">
              <img
                src="/storelogo.png"
                alt="Pxllar Store Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl font-bold">Pxllar Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/store" className="text-sm font-medium hover:text-primary">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact Us
            </Link>
            <Link href="/become-seller" className="text-sm font-medium hover:text-primary">
              Become a Seller
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:block">
              <CartButton />
            </div>
            <div className="hidden md:block">
              <Link href="/account" className="text-black hover:text-primary">
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-full left-0 z-40 w-full bg-white border-t py-4 space-y-4 md:hidden shadow-lg">

            {/* Navigation */}
            <nav className="space-y-2 px-3">
              <Link href="/store" className="block py-2 text-sm font-medium hover:text-primary">
                Shop
              </Link>
              <Link href="/categories/home-decor" className="block py-2 text-sm font-medium hover:text-primary">
                Home Decor
              </Link>
              <Link href="/categories/gifts" className="block py-2 text-sm font-medium hover:text-primary">
                Gifts
              </Link>
              <Link href="/categories/handmade" className="block py-2 text-sm font-medium hover:text-primary">
                Handmade
              </Link>
            </nav>

            {/* Auth & Cart */}
            <div className="flex items-center justify-between w-full px-3">
              <CartButton />
              <Button asChild variant="black">
                <Link href="/account">Login</Link>
              </Button>
            </div>

          </div>
        )}
      </div>
    </header>
  )
}
