import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TypewriterText } from "@/components/typewriter-text"
import { Users, Target, Heart, Handshake, Lightbulb, Activity, Award, ShieldCheck, Recycle } from "lucide-react"
import { getTeamMembers, getCoreValues, getSiteSettings } from "@/lib/content"

export default async function AboutPage() {
  const [teamMembers, coreValues, settings] = await Promise.all([getTeamMembers(), getCoreValues(), getSiteSettings()])

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    users: Users,
    "shield-check": ShieldCheck,
    recycle: Recycle,
    handshake: Handshake,
    lightbulb: Lightbulb,
    heart: Heart,
  }

  const displayValues =
    coreValues.length > 0
      ? coreValues
      : [
        {
          id: 1,
          icon: "users",
          title: "Community Empowerment",
          description: "We believe in empowering communities to drive their own development",
        },
        {
          id: 2,
          icon: "lightbulb",
          title: "Innovation & Learning",
          description: "Continuously improving through innovation and shared knowledge",
        },
        {
          id: 3,
          icon: "heart",
          title: "Equity & Inclusion",
          description: "Ensuring equal opportunities and inclusive participation for all",
        },
        {
          id: 4,
          icon: "shield-check",
          title: "Integrity & Accountability",
          description: "Operating with transparency and accountability in all our actions",
        },
        {
          id: 5,
          icon: "handshake",
          title: "Collaboration",
          description: "Building strong partnerships to amplify our collective impact",
        },
        {
          id: 6,
          icon: "recycle",
          title: "Sustainability",
          description: "Designing programs for long-term impact and environmental responsibility",
        },
      ]

  const displayTeam =
    teamMembers.length > 0
      ? teamMembers
      : [
        { id: 1, name: "Nelson Blackson", role: "Co-founder & Executive Director" },
        { id: 2, name: "Omega Zambasa", role: "Co-founder & Programs Director" },
        { id: 3, name: "Mavuto Chintengo", role: "Chairman" },
        { id: 4, name: "Nelson Nyoloka", role: "Vice Chairman" },
      ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url(/placeholder.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>

          <div className="container mx-auto px-4 z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              <TypewriterText text="About BOZCH Africa" speed={80} />
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance text-white/90">
              Building sustainable futures through community-driven development
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Who We Are</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  BOZCH Africa Limited is a non-profit organization founded in 2025 in Malawi by Nelson Blackson and
                  Omega Zambasa. We are dedicated to empowering rural communities through sustainable development
                  initiatives that address critical challenges in water access, education, healthcare, and agriculture.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our work is rooted in the belief that every community has the potential to thrive when given the right
                  tools, resources, and support. We partner with local communities to co-create solutions that are
                  sustainable, culturally appropriate, and impactful.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Vision & Mission - Now uses dynamic settings */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ScrollReveal animation="slide-right">
                <Card className="border-2 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="h-8 w-8 text-primary" />
                      <h3 className="text-2xl font-bold">Our Vision</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {settings.vision_statement ||
                        "A Malawi where every rural community thrives with access to clean water, quality education, healthcare, and sustainable livelihoods, fostering dignity, equity, and resilience for all."}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="slide-left" delay={200}>
                <Card className="border-2 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="h-8 w-8 text-primary" />
                      <h3 className="text-2xl font-bold">Our Mission</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {settings.mission_statement ||
                        "To empower rural communities in Malawi through sustainable development programs that improve access to essential services, promote environmental conservation, and build capacity for long-term prosperity."}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Core Values - Now uses dynamic values */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  <TypewriterText text="Our Core Values" speed={80} delay={200} />
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                  These principles guide everything we do
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {displayValues.map(
                (value: { id: number; icon: string; title: string; description: string }, index: number) => {
                  const IconComponent = iconMap[value.icon] || Activity
                  return (
                    <ScrollReveal key={value.id} animation="zoom-in" delay={index * 100}>
                      <Card className="border-2 hover:border-primary transition-colors h-full">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
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

        {/* Team Members - Now uses dynamic team */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  <TypewriterText text="Our Leadership" speed={80} delay={200} />
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                  Meet the dedicated team guiding BOZCH Africa's mission
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {displayTeam.map(
                (member: { id: number; name: string; role: string; image_url?: string }, index: number) => (
                  <ScrollReveal key={member.id} animation="fade-up" delay={index * 80}>
                    <Card className="border-2 h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 group-hover:scale-110">
                            {member.image_url ? (
                              <img
                                src={member.image_url || "/placeholder.png"}
                                alt={member.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Users className="h-12 w-12 text-primary" />
                            )}
                          </div>
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ),
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
