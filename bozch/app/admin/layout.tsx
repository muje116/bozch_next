import type React from "react"
import { Poppins } from "next/font/google"
import "@/app/globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "BOZCH Admin Dashboard",
  description: "Manage your BOZCH Africa website content",
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={poppins.className}>{children}</div>
}
