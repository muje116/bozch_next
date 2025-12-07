"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface Slide {
  id: number
  title: string
  subtitle: string
  image_url: string
  cta_text?: string
  cta_link?: string
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    image_url: "/african-children-clean-water-well-smiling.jpg",
    title: "Empowering Rural Communities",
    subtitle: "Building thriving communities through sustainable development",
    cta_text: "Learn More",
    cta_link: "/about",
  },
  {
    id: 2,
    image_url: "/african-students-classroom-education-learning.jpg",
    title: "Education for All",
    subtitle: "Transforming lives through quality education and literacy programs",
    cta_text: "Our Programs",
    cta_link: "/programs",
  },
  {
    id: 3,
    image_url: "/african-farmers-sustainable-agriculture-crops.jpg",
    title: "Sustainable Agriculture",
    subtitle: "Promoting food security and sustainable farming practices",
    cta_text: "Get Involved",
    cta_link: "/get-involved",
  },
]

export function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/admin/hero-slides")
        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            setSlides(data.filter((s: Slide & { is_active: boolean }) => s.is_active !== false))
          }
        }
      } catch (error) {
        console.error("Error fetching slides:", error)
      }
    }
    fetchSlides()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  if (slides.length === 0) return null

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
          style={{
            transform:
              index < currentSlide
                ? "translateX(-100%)"
                : index === currentSlide
                  ? "translateX(0)"
                  : "translateX(100%)",
          }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image_url})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-fade-in-up">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-balance text-white/90 animate-fade-in-up animation-delay-200">
                {slide.subtitle}
              </p>
              {slide.cta_text && slide.cta_link && (
                <Button asChild size="lg" className="animate-fade-in-up animation-delay-400">
                  <Link href={slide.cta_link}>{slide.cta_text}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
