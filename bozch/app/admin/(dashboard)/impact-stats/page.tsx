"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Loader2, Users, Droplets, GraduationCap, Sprout, Heart, Briefcase } from "lucide-react"
import type { ImpactStat } from "@/lib/db"

const iconOptions = [
  { value: "users", label: "Users", icon: Users },
  { value: "droplets", label: "Water", icon: Droplets },
  { value: "graduation-cap", label: "Education", icon: GraduationCap },
  { value: "sprout", label: "Agriculture", icon: Sprout },
  { value: "heart", label: "Health", icon: Heart },
  { value: "briefcase", label: "Economic", icon: Briefcase },
]

const getIconComponent = (iconName: string) => {
  const found = iconOptions.find((i) => i.value === iconName)
  return found ? found.icon : Users
}

export default function ImpactStatsPage() {
  const [stats, setStats] = useState<ImpactStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStat, setEditingStat] = useState<ImpactStat | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    label: "",
    value: 0,
    suffix: "",
    icon: "users",
    display_order: 0,
    is_active: true,
  })

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/impact-stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = editingStat ? `/api/admin/impact-stats/${editingStat.id}` : "/api/admin/impact-stats"
      const method = editingStat ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsDialogOpen(false)
        setEditingStat(null)
        resetForm()
        fetchStats()
      }
    } catch (error) {
      console.error("Error saving stat:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this stat?")) return

    try {
      const response = await fetch(`/api/admin/impact-stats/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchStats()
      }
    } catch (error) {
      console.error("Error deleting stat:", error)
    }
  }

  const openEditDialog = (stat: ImpactStat) => {
    setEditingStat(stat)
    setFormData({
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix || "",
      icon: stat.icon || "users",
      display_order: stat.display_order,
      is_active: stat.is_active,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      label: "",
      value: 0,
      suffix: "",
      icon: "users",
      display_order: stats.length,
      is_active: true,
    })
  }

  return (
    <div>
      <AdminHeader title="Impact Statistics" description="Manage the impact counters displayed on your homepage" />

      <div className="p-6">
        <div className="flex justify-end mb-6">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) {
                setEditingStat(null)
                resetForm()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Stat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingStat ? "Edit Stat" : "Add New Stat"}</DialogTitle>
                <DialogDescription>
                  {editingStat ? "Update the impact statistic" : "Add a new impact statistic"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Communities Reached"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="suffix">Suffix</Label>
                    <Input
                      id="suffix"
                      value={formData.suffix}
                      onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                      placeholder="+ or K"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-6">
                    <Label htmlFor="is_active">Active</Label>
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingStat ? "Update Stat" : "Add Stat"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : stats.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No stats yet. Click "Add Stat" to create your first one.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const IconComponent = getIconComponent(stat.icon)
              return (
                <Card key={stat.id} className={!stat.is_active ? "opacity-60" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(stat)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(stat.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-3xl font-bold">
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    {!stat.is_active && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded mt-2 inline-block">Inactive</span>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
