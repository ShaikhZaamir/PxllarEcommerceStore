"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "components/ui/button"

const heroSlides = [
  {
    id: 1,
    title: "Discover Unique Fashion",
    subtitle: "Curated styles from India's best sellers",
    image: "https://res.cloudinary.com/dv9tzfmlv/image/upload/v1757233572/pexels-arina-krasnikova-5418890_x1cwpk.jpg",
    cta: "Shop Fashion",
    category: "fashion",
  },
  {
    id: 2,
    title: "Accessorize Your Style",
    subtitle: "Trendy scrunchies, jewelry & more for every vibe",
    image: "https://res.cloudinary.com/dv9tzfmlv/image/upload/v1755869328/pexels-kpaukshtite-1460838_kzf3st.jpg",
    cta: "Shop Accessories",
    category: "accessories",
  },
  {
    id: 3,
    title: "Perfect Gifts Await",
    subtitle: "Thoughtful presents for every occasion",
    image: "https://res.cloudinary.com/dv9tzfmlv/image/upload/v1755869327/pexels-pixabay-264787_glsgv0.jpg",
    cta: "Shop Gifts",
    category: "gifts",
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Inject fade-in animations
    const styles = `
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in { animation: fade-in 0.8s ease-out; }
      .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.2s both; }
      .animate-fade-in-delay-2 { animation: fade-in 0.8s ease-out 0.4s both; }
    `
    const styleSheet = document.createElement("style")
    styleSheet.textContent = styles
    document.head.appendChild(styleSheet)
    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current
    const swipeThreshold = 50
    if (delta > swipeThreshold) {
      nextSlide()
    } else if (delta < -swipeThreshold) {
      prevSlide()
    }
  }

  return (
    <section
      className="relative h-[60vh] md:h-[80vh] overflow-hidden mb-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-5xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 animate-fade-in-delay">
                  {slide.subtitle}
                </p>
                <Link href={`/in/store?category=${slide.category}`}>
                  <Button size="large" variant="black" className="p-3 animate-fade-in-delay-2">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows (desktop only) */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20 backdrop-blur-md"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20 backdrop-blur-md"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
