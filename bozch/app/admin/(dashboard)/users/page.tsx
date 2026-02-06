"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, Loader2, User, Mail, ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminUser {
    id: number
    email: string
    name: string
    role: string
    created_at: string
}

interface Role {
    id: number
    name: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [roles, setRoles] = useState<Role[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
    })
    const { toast } = useToast()

    const fetchData = async () => {
        try {
            const [usersRes, rolesRes] = await Promise.all([
                fetch("/api/admin/users"),
                fetch("/api/admin/roles")
            ])

            if (usersRes.ok) {
                const usersData = await usersRes.json()
                setUsers(usersData)
            }

            if (rolesRes.ok) {
                const rolesData = await rolesRes.json()
                setRoles(rolesData)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const url = editingUser ? `/api/admin/users/${editingUser.id}` : "/api/admin/users"
            const method = editingUser ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setIsDialogOpen(false)
                setEditingUser(null)
                resetForm()
                fetchData()
                toast({
                    title: "Success",
                    description: editingUser ? "User updated successfully" : "User added successfully",
                })
            } else {
                const error = await response.json()
                throw new Error(error.error || "Failed to save user")
            }
        } catch (error: any) {
            console.error("Error saving user:", error)
            toast({
                title: "Error",
                description: error.message || "Failed to save user",
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this user?")) return

        try {
            const response = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
            if (response.ok) {
                fetchData()
                toast({
                    title: "Success",
                    description: "User deleted successfully",
                })
            } else {
                const error = await response.json()
                throw new Error(error.error || "Failed to delete user")
            }
        } catch (error: any) {
            console.error("Error deleting user:", error)
            toast({
                title: "Error",
                description: error.message || "Failed to delete user",
                variant: "destructive",
            })
        }
    }

    const openEditDialog = (user: AdminUser) => {
        setEditingUser(user)
        setFormData({
            name: user.name,
            email: user.email,
            password: "", // Don't show password
            role: user.role,
        })
        setIsDialogOpen(true)
    }

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "admin",
        })
    }

    return (
        <div>
            <AdminHeader title="User Management" description="Manage administrative users and their access" />

            <div className="p-6">
                <div className="flex justify-end mb-6">
                    <Dialog
                        open={isDialogOpen}
                        onOpenChange={(open) => {
                            setIsDialogOpen(open)
                            if (!open) {
                                setEditingUser(null)
                                resetForm()
                            }
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
                                <DialogDescription>
                                    {editingUser ? "Update account details" : "Create a new administrative account"}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">
                                        {editingUser ? "New Password (leave blank to keep current)" : "Password"}
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required={!editingUser}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.id} value={role.name}>
                                                    <span className="capitalize">{role.name.replace("_", " ")}</span>
                                                </SelectItem>
                                            ))}
                                            {roles.length === 0 && (
                                                <>
                                                    <SelectItem value="super_admin">Super Admin</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                    <SelectItem value="editor">Editor</SelectItem>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isSaving}>
                                        {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                        {editingUser ? "Update User" : "Add User"}
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
                ) : users.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            No users found.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((user) => (
                            <Card key={user.id} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(user)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-lg">{user.name}</h3>
                                        <div className="space-y-2 mt-4">
                                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                                <Mail className="h-4 w-4" />
                                                {user.email}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                                <ShieldCheck className="h-4 w-4" />
                                                <span className="capitalize px-2 py-0.5 bg-secondary/50 rounded text-xs font-medium">
                                                    {user.role.replace("_", " ")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-3 bg-muted/50 border-t flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">
                                            Created: {new Date(user.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
