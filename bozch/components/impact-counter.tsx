"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Users, Droplets, GraduationCap, Sprout, Heart, Briefcase } from "lucide-react"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  label: string
}

function Counter({ end, duration = 2000, suffix = "", label }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">{label}</div>
    </div>
  )
}

interface ImpactStat {
  id: number
  label: string
  value: number
  suffix: string
  icon: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  droplets: Droplets,
  "graduation-cap": GraduationCap,
  sprout: Sprout,
  heart: Heart,
  briefcase: Briefcase,
}

export function ImpactCounter() {
  const [stats, setStats] = useState<ImpactStat[]>([
    { id: 1, label: "Communities Reached", value: 50, suffix: "+", icon: "users" },
    { id: 2, label: "Projects Initiated", value: 15, suffix: "+", icon: "droplets" },
    { id: 3, label: "Volunteers Engaged", value: 200, suffix: "+", icon: "graduation-cap" },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/impact-stats")
        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            setStats(data.filter((s: ImpactStat & { is_active: boolean }) => s.is_active !== false))
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
      {stats.map((stat) => {
        const IconComponent = iconMap[stat.icon] || Users
        return (
          <div key={stat.id} className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            <Counter end={stat.value} suffix={stat.suffix} label={stat.label} />
          </div>
        )
      })}
    </div>
  )
}
