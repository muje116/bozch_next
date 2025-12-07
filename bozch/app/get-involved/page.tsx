"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Users, Handshake } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function GetInvolvedPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/interest-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Thank you for your interest!",
          description: "We will contact you soon.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "",
          message: "",
        })
      } else {
        throw new Error("Failed to submit interest")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your interest. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Get Involved</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance text-white/90">
              Join us in making a lasting difference in rural communities
            </p>
          </div>
        </section>

        {/* Ways to Help */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ways to Make an Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                There are many ways you can support our mission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Donate</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Your financial support helps us expand our programs and reach more communities
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Share your skills and time to directly impact the lives of community members
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-chart-3/10 flex items-center justify-center mx-auto mb-4">
                    <Handshake className="h-8 w-8 text-chart-3" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Partner</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Collaborate with us to amplify impact through strategic partnerships
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl text-center">Make a Donation</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Every contribution makes a difference in someone's life
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Your donation directly supports our programs in water access, education, healthcare, environmental
                      conservation, and sustainable agriculture. We ensure 100% transparency in how funds are used.
                    </p>
                    <div className="pt-4">
                      <Button size="lg" className="text-base">
                        Donate via PayPal
                      </Button>
                      <p className="text-sm text-muted-foreground mt-4">
                        For bank transfers or other payment methods, please contact us
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl text-center">Volunteer or Partner With Us</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Fill out the form below and we'll get in touch with you
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+265 123 456 789"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest">I'm interested in *</Label>
                      <Input
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Volunteering, Partnership, Sponsorship"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us more about how you'd like to get involved..."
                        rows={5}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
