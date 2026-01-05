import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImpactCounter } from "@/components/impact-counter"
import { HeroCarousel } from "@/components/hero-carousel"
import { TypewriterText } from "@/components/typewriter-text"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Droplets, Sprout, GraduationCap } from "lucide-react"

export default function HomePage() {
  const programs = [
    {
      icon: Droplets,
      title: "Water & Sanitation",
      description: "Providing access to clean and safe water for rural communities",
    },
    {
      icon: GraduationCap,
      title: "Education & Literacy",
      description: "Empowering communities through quality education programs",
    },
    {
      icon: Sprout,
      title: "Food Security",
      description: "Promoting sustainable agriculture and food security",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroCarousel />

        {/* Key Programs Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  <TypewriterText text="Our Focus Areas" speed={80} />
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                  We work across multiple sectors to create lasting impact in rural communities
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((program, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 200}>
                  <Card className="border-2 hover:border-primary transition-colors h-full">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <program.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                        <p className="text-muted-foreground text-balance">{program.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Counter Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  <TypewriterText text="Our Impact" speed={80} delay={300} />
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                  Together, we're making a difference in rural communities across Malawi
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={400}>
              <ImpactCounter />
            </ScrollReveal>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="slide-right">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                    <TypewriterText text="Our Mission" speed={80} delay={200} />
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    BOZCH Africa Limited is dedicated to empowering rural communities in Malawi through sustainable
                    development initiatives. We believe in creating lasting change through community-driven solutions.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Founded in 2025 by Nelson Blackson and Omega Zambasa, we work tirelessly to address critical
                    challenges in water access, education, healthcare, and sustainable agriculture.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/about">Read Our Story</Link>
                  </Button>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slide-left" delay={200}>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <img
                    src="/african-community-education-sustainable-farming.jpg"
                    alt="Community empowerment"
                    className="object-cover w-full h-full"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <ScrollReveal animation="fade-up">
          <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                Join Us in Building Sustainable Communities
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-balance opacity-90">
                Your support can help us reach more communities and create lasting impact
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-base">
                  <Link href="/contact">Donate Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/get-involved">Become a Volunteer</Link>
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  )
}
