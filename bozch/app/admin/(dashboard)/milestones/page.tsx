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
import { Plus, Pencil, Trash2, Loader2, Calendar } from "lucide-react"
import type { Milestone } from "@/lib/db"

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    display_order: 0,
    is_active: true,
  })

  const fetchMilestones = async () => {
    try {
      const response = await fetch("/api/admin/milestones")
      if (response.ok) {
        const data = await response.json()
        setMilestones(data)
      }
    } catch (error) {
      console.error("Error fetching milestones:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMilestones()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = editingMilestone ? `/api/admin/milestones/${editingMilestone.id}` : "/api/admin/milestones"
      const method = editingMilestone ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsDialogOpen(false)
        setEditingMilestone(null)
        resetForm()
        fetchMilestones()
      }
    } catch (error) {
      console.error("Error saving milestone:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this milestone?")) return

    try {
      const response = await fetch(`/api/admin/milestones/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchMilestones()
      }
    } catch (error) {
      console.error("Error deleting milestone:", error)
    }
  }

  const openEditDialog = (milestone: Milestone) => {
    setEditingMilestone(milestone)
    setFormData({
      year: milestone.year,
      title: milestone.title,
      description: milestone.description || "",
      display_order: milestone.display_order,
      is_active: milestone.is_active,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      year: new Date().getFullYear().toString(),
      title: "",
      description: "",
      display_order: milestones.length,
      is_active: true,
    })
  }

  return (
    <div>
      <AdminHeader title="Milestones" description="Manage your organization's journey timeline" />

      <div className="p-6">
        <div className="flex justify-end mb-6">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) {
                setEditingMilestone(null)
                resetForm()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingMilestone ? "Edit Milestone" : "Add Milestone"}</DialogTitle>
                <DialogDescription>
                  {editingMilestone ? "Update milestone details" : "Add a new milestone to your timeline"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2025"
                      required
                    />
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
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="First Water Project Completed"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
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
                    {editingMilestone ? "Update" : "Add Milestone"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : milestones.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No milestones yet. Click "Add Milestone" to create your first one.
            </CardContent>
          </Card>
        ) : (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {milestones.map((milestone) => (
                <div key={milestone.id} className={`relative pl-20 ${!milestone.is_active ? "opacity-60" : ""}`}>
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-primary">{milestone.year}</span>
                              {!milestone.is_active && (
                                <span className="text-xs bg-muted px-2 py-0.5 rounded">Inactive</span>
                              )}
                            </div>
                            <h3 className="font-semibold mt-1">{milestone.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditDialog(milestone)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDelete(milestone.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
