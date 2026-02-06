"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import MapComponent from "@/components/map"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [settings, setSettings] = useState({
    contact_email: "info@bozchafrica.org",
    contact_phone: "+265 XXX XXX XXX",
    contact_address: "Limbe, Blantyre, Malawi",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingSettings, setIsLoadingSettings] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setSettings({
            contact_email: data.contact_email || settings.contact_email,
            contact_phone: data.contact_phone || settings.contact_phone,
            contact_address: data.contact_address || settings.contact_address,
          })
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
      } finally {
        setIsLoadingSettings(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message! We will get back to you soon.",
        })
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
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
              backgroundImage: "url(/african-children-clean-water-well-smiling.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>

          <div className="container mx-auto px-4 z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Contact Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance text-white/90">
              We'd love to hear from you. Get in touch with our team
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Office Location</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {settings.contact_address.split(", ").map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p className="text-sm text-muted-foreground">{settings.contact_email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-chart-3" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Phone</h3>
                        <p className="text-sm text-muted-foreground">{settings.contact_phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible
                    </p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
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
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="What is this regarding?"
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
                          placeholder="Your message..."
                          rows={6}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-balance">Find Us</h2>
              <div className="aspect-video rounded-lg overflow-hidden border-2 bg-muted relative">
                {isLoadingSettings ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <MapComponent address={settings.contact_address} />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
