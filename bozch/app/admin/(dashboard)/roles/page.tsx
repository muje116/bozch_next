"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Loader2, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Role {
    id: number
    name: string
    description: string
}

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingRole, setEditingRole] = useState<Role | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })
    const { toast } = useToast()

    const fetchRoles = async () => {
        try {
            const response = await fetch("/api/admin/roles")
            if (response.ok) {
                const data = await response.json()
                setRoles(data)
            }
        } catch (error) {
            console.error("Error fetching roles:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const url = editingRole ? `/api/admin/roles/${editingRole.id}` : "/api/admin/roles"
            const method = editingRole ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setIsDialogOpen(false)
                setEditingRole(null)
                setFormData({ name: "", description: "" })
                fetchRoles()
                toast({
                    title: "Success",
                    description: editingRole ? "Role updated successfully" : "Role added successfully",
                })
            } else {
                const error = await response.json()
                throw new Error(error.error || "Failed to save role")
            }
        } catch (error: any) {
            console.error("Error saving role:", error)
            toast({
                title: "Error",
                description: error.message || "Failed to save role",
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this role?")) return

        try {
            const response = await fetch(`/api/admin/roles/${id}`, { method: "DELETE" })
            if (response.ok) {
                fetchRoles()
                toast({
                    title: "Success",
                    description: "Role deleted successfully",
                })
            } else {
                const error = await response.json()
                throw new Error(error.error || "Failed to delete role")
            }
        } catch (error: any) {
            console.error("Error deleting role:", error)
            toast({
                title: "Error",
                description: error.message || "Failed to delete role",
                variant: "destructive",
            })
        }
    }

    const openEditDialog = (role: Role) => {
        setEditingRole(role)
        setFormData({
            name: role.name,
            description: role.description || "",
        })
        setIsDialogOpen(true)
    }

    return (
        <div>
            <AdminHeader title="Roles Management" description="Manage user roles and permissions" />

            <div className="p-6">
                <div className="flex justify-end mb-6">
                    <Dialog
                        open={isDialogOpen}
                        onOpenChange={(open) => {
                            setIsDialogOpen(open)
                            if (!open) {
                                setEditingRole(null)
                                setFormData({ name: "", description: "" })
                            }
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Role
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
                                <DialogDescription>
                                    Define a new role for the system
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Role Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="e.g. editor"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        placeholder="What can this role do?"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isSaving}>
                                        {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                        {editingRole ? "Update Role" : "Add Role"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : roles.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            No roles defined yet.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {roles.map((role) => (
                            <Card key={role.id}>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Shield className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(role)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive"
                                                onClick={() => handleDelete(role.id)}
                                                disabled={role.name === "super_admin"}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1 capitalize">{role.name.replace("_", " ")}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{role.description || "No description"}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
