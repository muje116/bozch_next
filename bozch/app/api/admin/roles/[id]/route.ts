import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession()
    if (!session || session.role !== "super_admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { name, description } = await request.json()
        const id = params.id

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 })
        }

        await sql("UPDATE roles SET name = ?, description = ? WHERE id = ?", [name, description, id])

        return NextResponse.json({ message: "Role updated successfully" })
    } catch (error: any) {
        console.error("Error updating role:", error)
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json({ error: "Role name already exists" }, { status: 400 })
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
        await sql("DELETE FROM roles WHERE id = ?", [id])
        return NextResponse.json({ message: "Role deleted successfully" })
    } catch (error) {
        console.error("Error deleting role:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
