"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ImageIcon,
  BarChart3,
  FolderKanban,
  Users,
  Calendar,
  Settings,
  MessageSquare,
  LogOut,
  Leaf,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: ImageIcon },
  { href: "/admin/impact-stats", label: "Impact Stats", icon: BarChart3 },
  { href: "/admin/programs", label: "Programs", icon: FolderKanban },
  { href: "/admin/team", label: "Team Members", icon: Users },
  { href: "/admin/milestones", label: "Milestones", icon: Calendar },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/interest-submissions", label: "Interest Submissions", icon: UserPlus },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <img src="/final-logo-BOZCH.png" alt="BOZCH Africa" className="h-10 w-10" />
                {/* <Leaf className="h-5 w-5 text-primary-foreground" /> */}
              </div>
              <span className="font-semibold text-sidebar-foreground">BOZCH Admin</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed && "justify-center px-2",
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isCollapsed && "justify-center px-2",
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}
