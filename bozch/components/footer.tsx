import Link from "next/link"
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                <img src="/final logo BOZCH.png" alt="BOZCH Africa" className="h-10 w-10" />
              </div>
              <span className="font-semibold text-lg">BOZCH Africa</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering Rural Communities for a Sustainable Future
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/journey" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/get-involved" className="text-muted-foreground hover:text-foreground transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-muted-foreground hover:text-foreground transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-muted-foreground hover:text-foreground transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Limbe, Blantyre, Malawi</li>
              <li>P.O. Box 123</li>
              <li>info@bozchafrica.org</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 BOZCH Africa Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
