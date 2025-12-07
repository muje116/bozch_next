"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, FolderKanban, Users, Calendar, MessageSquare, Mail, ArrowUpRight, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardData {
  stats: {
    heroSlides: number
    programs: number
    teamMembers: number
    milestones: number
    unreadMessages: number
    subscribers: number
  }
  recentMessages: Array<{
    id: number
    name: string
    email: string
    subject: string
    message: string
    is_read: boolean
    created_at: string
  }>
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard")
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    {
      label: "Hero Slides",
      value: data?.stats.heroSlides || 0,
      icon: ImageIcon,
      href: "/admin/hero-slides",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      label: "Programs",
      value: data?.stats.programs || 0,
      icon: FolderKanban,
      href: "/admin/programs",
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "Team Members",
      value: data?.stats.teamMembers || 0,
      icon: Users,
      href: "/admin/team",
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      label: "Milestones",
      value: data?.stats.milestones || 0,
      icon: Calendar,
      href: "/admin/milestones",
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Unread Messages",
      value: data?.stats.unreadMessages || 0,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "text-rose-500 bg-rose-500/10",
    },
    {
      label: "Subscribers",
      value: data?.stats.subscribers || 0,
      icon: Mail,
      href: "/admin/settings",
      color: "text-cyan-500 bg-cyan-500/10",
    },
  ]

  return (
    <div>
      <AdminHeader title="Dashboard" description="Welcome back! Here's an overview of your website." />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{isLoading ? "-" : stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <span>View all</span>
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Messages & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest contact form submissions</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/messages">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : data?.recentMessages && data.recentMessages.length > 0 ? (
                <div className="space-y-4">
                  {data.recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-primary">{message.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{message.name}</p>
                          {!message.is_read && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{message.subject || "No subject"}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No messages yet</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/admin/hero-slides">
                  <ImageIcon className="h-4 w-4" />
                  Add Hero Slide
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/admin/programs">
                  <FolderKanban className="h-4 w-4" />
                  Add New Program
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/admin/team">
                  <Users className="h-4 w-4" />
                  Add Team Member
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/admin/settings">Update Site Settings</Link>
              </Button>
              <div className="pt-4 border-t">
                <Button className="w-full gap-2" asChild>
                  <Link href="/" target="_blank">
                    <Eye className="h-4 w-4" />
                    View Live Site
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
