import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bozchafrica.org"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "BOZCH Africa Limited - Empowering Rural Communities",
    template: "%s | BOZCH Africa Limited",
  },
  description:
    "BOZCH Africa Limited is a non-profit organization empowering rural communities in Malawi through sustainable development programs in water, education, healthcare, and agriculture.",
  keywords: ["Malawi", "rural development", "non-profit", "water projects", "education Malali", "sustainable agriculture"],
  authors: [{ name: "BOZCH Africa team" }],
  creator: "BOZCH Africa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "BOZCH Africa Limited",
    title: "BOZCH Africa Limited - Empowering Rural Communities",
    description: "Empowering rural communities in Malawi through sustainable development.",
    images: [
      {
        url: "/african-children-clean-water-well-smiling.jpg",
        width: 1200,
        height: 630,
        alt: "BOZCH Africa - Empowering Communities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOZCH Africa Limited",
    description: "Empowering rural communities in Malawi through sustainable development.",
    images: ["/african-children-clean-water-well-smiling.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
