import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TypewriterText } from "@/components/typewriter-text"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { getMilestones } from "@/lib/content"

export default async function JourneyPage() {
  const dbMilestones = await getMilestones()

  const fallbackMilestones = [
    {
      id: 1,
      year: "2025",
      title: "Foundation & Vision",
      description:
        "BOZCH Africa Limited was founded by Nelson Blackson and Omega Zambasa with a clear vision to empower rural communities in Malawi.",
    },
    {
      id: 2,
      year: "2025",
      title: "Building the Team",
      description:
        "Assembled a dedicated board of directors and established our organizational structure with Mavuto Chintengo as Chairman.",
    },
    {
      id: 3,
      year: "2025",
      title: "Program Development",
      description:
        "Developed comprehensive programs across six key areas: water, education, healthcare, environment, agriculture, and economic empowerment.",
    },
    {
      id: 4,
      year: "Ongoing",
      title: "Community Partnerships",
      description:
        "Building strong relationships with local communities, government agencies, and international partners to maximize our impact.",
    },
  ]

  const displayMilestones = dbMilestones.length > 0 ? dbMilestones : fallbackMilestones

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url(/placeholder.svg?height=400&width=1200&query=journey+path+forward+hope)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>

          <div className="container mx-auto px-4 z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              <TypewriterText text="Our Journey" speed={80} />
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance text-white/90">
              From vision to action - building sustainable communities together
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">Our Journey So Far</h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    BOZCH Africa Limited was born from a deep commitment to address the pressing challenges faced by
                    rural communities in Malawi. Founded in 2025 by Nelson Blackson and Omega Zambasa, our organization
                    emerged from years of observing the gaps in essential services and the untapped potential within
                    these communities.
                  </p>

                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Our founders recognized that sustainable development requires more than just good intentions—it
                    demands strategic planning, community engagement, and a holistic approach that addresses
                    interconnected challenges. This realization shaped our comprehensive six-pillar approach to
                    community development.
                  </p>

                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    With the support of our dedicated board of directors, led by Chairman Mavuto Chintengo, we've built
                    a strong foundation for our work. Our team brings together diverse expertise in community
                    development, healthcare, education, agriculture, and environmental conservation.
                  </p>

                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    While we are in the early stages of our journey, our preparation has been thorough. We've spent
                    countless hours engaging with communities, understanding their needs, building partnerships, and
                    developing programs that are both ambitious and achievable.
                  </p>

                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Our vision extends far beyond immediate relief. We're committed to creating systemic change that
                    empowers communities to become self-sufficient, resilient, and prosperous. Every program we design,
                    every partnership we forge, and every decision we make is guided by this long-term vision.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Timeline Section - Now uses dynamic milestones */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-balance">
                  <TypewriterText text="Key Milestones" speed={80} delay={200} />
                </h2>
              </ScrollReveal>

              <div className="space-y-8">
                {displayMilestones.map(
                  (milestone: { id: number; year: string; title: string; description: string }, index: number) => (
                    <ScrollReveal key={milestone.id} animation="slide-right" delay={index * 200}>
                      <Card className="border-2">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                                <div className="h-px flex-1 bg-border" />
                              </div>
                              <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <ScrollReveal animation="fade-up">
          <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                Join Us in Building Sustainable, Thriving Communities
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-balance opacity-90">
                Our journey is just beginning, and we invite you to be part of this transformative work
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-base">
                  <Link href="/get-involved">Get Involved</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/contact">Contact Us</Link>
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
