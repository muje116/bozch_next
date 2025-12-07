import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TypewriterText } from "@/components/typewriter-text"
import Link from "next/link"
import { TrendingUp, Droplets, Heart, Leaf, GraduationCap, Sprout, HeartPulse, Briefcase } from "lucide-react"
import { getPrograms } from "@/lib/content"

export default async function ProgramsPage() {
  const dbPrograms = await getPrograms()

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    droplets: Droplets,
    "graduation-cap": GraduationCap,
    sprout: Sprout,
    leaf: Leaf,
    "heart-pulse": HeartPulse,
    briefcase: Briefcase,
    heart: Heart,
    "trending-up": TrendingUp,
  }

  const colorMap: Record<string, string> = {
    droplets: "bg-secondary/10 text-secondary",
    "graduation-cap": "bg-chart-3/10 text-chart-3",
    sprout: "bg-chart-2/10 text-chart-2",
    leaf: "bg-primary/10 text-primary",
    "heart-pulse": "bg-destructive/10 text-destructive",
    briefcase: "bg-chart-1/10 text-chart-1",
  }

  const fallbackPrograms = [
    {
      id: 1,
      icon: "trending-up",
      title: "Economic Empowerment & Sustainable Growth",
      description:
        "Supporting communities to build sustainable livelihoods through entrepreneurship, skills training, and access to financial resources.",
    },
    {
      id: 2,
      icon: "droplets",
      title: "Access to Clean & Safe Water",
      description:
        "Providing reliable access to clean water through well construction, water system maintenance, and community education on water safety.",
    },
    {
      id: 3,
      icon: "heart-pulse",
      title: "Quality Healthcare & Well-being",
      description:
        "Improving health outcomes through mobile clinics, health education programs, and maternal and child health services.",
    },
    {
      id: 4,
      icon: "leaf",
      title: "Environmental Conservation",
      description:
        "Promoting sustainable environmental practices including reforestation, soil conservation, and climate change adaptation strategies.",
    },
    {
      id: 5,
      icon: "graduation-cap",
      title: "Education & Literacy",
      description:
        "Expanding access to quality education through school infrastructure development, teacher training, and literacy programs.",
    },
    {
      id: 6,
      icon: "sprout",
      title: "Food Security & Sustainable Agriculture",
      description:
        "Enhancing food security through modern farming techniques, crop diversification, and farmer training programs.",
    },
  ]

  const displayPrograms = dbPrograms.length > 0 ? dbPrograms : fallbackPrograms

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                "url(/placeholder.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>

          <div className="container mx-auto px-4 z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              <TypewriterText text="Our Programs" speed={80} />
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance text-white/90">
              Comprehensive solutions for sustainable community development
            </p>
          </div>
        </section>

        {/* Programs Grid - Now uses dynamic programs */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  <TypewriterText text="Our Focus Areas" speed={80} delay={200} />
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                  Our integrated approach addresses the most critical needs of rural communities
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {displayPrograms.map(
                (
                  program: { id: number; icon: string; title: string; description: string; long_description?: string },
                  index: number,
                ) => {
                  const IconComponent = iconMap[program.icon] || Droplets
                  const colorClass = colorMap[program.icon] || "bg-primary/10 text-primary"
                  return (
                    <ScrollReveal key={program.id} animation="fade-up" delay={index * 150}>
                      <Card className="border-2 hover:border-primary transition-all hover:shadow-lg h-full">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-4">
                            <div
                              className={`h-14 w-14 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}
                            >
                              <IconComponent className="h-7 w-7" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-3 text-balance">{program.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                {program.long_description || program.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  )
                },
              )}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="zoom-in">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Creating Lasting Change</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Each of our programs is designed to create sustainable, long-term impact. We work closely with
                  communities to ensure that our initiatives are culturally appropriate, environmentally sustainable,
                  and economically viable.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Through partnerships with local leaders, government agencies, and international organizations, we're
                  able to maximize our reach and effectiveness, ensuring that every project delivers measurable results.
                </p>
                <Button asChild size="lg">
                  <Link href="/get-involved">Support Our Programs</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
