"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Droplets,
  GraduationCap,
  Sprout,
  Leaf,
  HeartPulse,
  Briefcase,
} from "lucide-react"
import type { Program } from "@/lib/db"

const iconOptions = [
  { value: "droplets", label: "Water", icon: Droplets },
  { value: "graduation-cap", label: "Education", icon: GraduationCap },
  { value: "sprout", label: "Agriculture", icon: Sprout },
  { value: "leaf", label: "Environment", icon: Leaf },
  { value: "heart-pulse", label: "Healthcare", icon: HeartPulse },
  { value: "briefcase", label: "Economic", icon: Briefcase },
]

const getIconComponent = (iconName: string) => {
  const found = iconOptions.find((i) => i.value === iconName)
  return found ? found.icon : Droplets
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    long_description: "",
    icon: "droplets",
    image_url: "",
    display_order: 0,
    is_active: true,
  })

  const fetchPrograms = async () => {
    try {
      const response = await fetch("/api/admin/programs")
      if (response.ok) {
        const data = await response.json()
        setPrograms(data)
      }
    } catch (error) {
      console.error("Error fetching programs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = editingProgram ? `/api/admin/programs/${editingProgram.id}` : "/api/admin/programs"
      const method = editingProgram ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsDialogOpen(false)
        setEditingProgram(null)
        resetForm()
        fetchPrograms()
      }
    } catch (error) {
      console.error("Error saving program:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this program?")) return

    try {
      const response = await fetch(`/api/admin/programs/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchPrograms()
      }
    } catch (error) {
      console.error("Error deleting program:", error)
    }
  }

  const openEditDialog = (program: Program) => {
    setEditingProgram(program)
    setFormData({
      title: program.title,
      description: program.description || "",
      long_description: program.long_description || "",
      icon: program.icon || "droplets",
      image_url: program.image_url || "",
      display_order: program.display_order,
      is_active: program.is_active,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      long_description: "",
      icon: "droplets",
      image_url: "",
      display_order: programs.length,
      is_active: true,
    })
  }

  return (
    <div>
      <AdminHeader title="Programs" description="Manage your organization's programs and focus areas" />

      <div className="p-6">
        <div className="flex justify-end mb-6">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) {
                setEditingProgram(null)
                resetForm()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProgram ? "Edit Program" : "Add New Program"}</DialogTitle>
                <DialogDescription>
                  {editingProgram ? "Update the program details" : "Add a new program to your organization"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Water & Sanitation"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description for cards..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="long_description">Full Description</Label>
                  <Textarea
                    id="long_description"
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    placeholder="Detailed program description..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL (Optional)</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="/images/program.jpg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_active">Active</Label>
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingProgram ? "Update Program" : "Add Program"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : programs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No programs yet. Click "Add Program" to create your first one.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program) => {
              const IconComponent = getIconComponent(program.icon)
              return (
                <Card key={program.id} className={!program.is_active ? "opacity-60" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(program)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(program.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{program.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{program.description}</p>
                    {!program.is_active && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded mt-3 inline-block">Inactive</span>
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
