import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession, hashPassword } from "@/lib/auth"

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession()
    if (!session || session.role !== "super_admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { name, email, password, role } = await request.json()
        const id = params.id

        if (!name || !email || !role) {
            return NextResponse.json({ error: "Name, email and role are required" }, { status: 400 })
        }

        if (password) {
            const hashedPassword = await hashPassword(password)
            await sql(
                "UPDATE admin_users SET name = ?, email = ?, password_hash = ?, role = ? WHERE id = ?",
                [name, email, hashedPassword, role, id]
            )
        } else {
            await sql(
                "UPDATE admin_users SET name = ?, email = ?, role = ? WHERE id = ?",
                [name, email, role, id]
            )
        }

        return NextResponse.json({ message: "User updated successfully" })
    } catch (error: any) {
        console.error("Error updating user:", error)
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession()
    if (!session || session.role !== "super_admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const id = params.id

        // Prevent self-deletion
        if (Number.parseInt(id) === session.userId) {
            return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 })
        }

        await sql("DELETE FROM admin_users WHERE id = ?", [id])
        return NextResponse.json({ message: "User deleted successfully" })
    } catch (error) {
        console.error("Error deleting user:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
