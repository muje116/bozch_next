import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET() {
    const session = await getSession()
    if (!session || session.role !== "super_admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const roles = await sql("SELECT * FROM roles ORDER BY name ASC")
        return NextResponse.json(roles)
    } catch (error) {
        console.error("Error fetching roles:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const session = await getSession()
    if (!session || session.role !== "super_admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { name, description } = await request.json()

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 })
        }

        await sql("INSERT INTO roles (name, description) VALUES (?, ?)", [name, description])

        return NextResponse.json({ message: "Role created successfully" })
    } catch (error: any) {
        console.error("Error creating role:", error)
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json({ error: "Role name already exists" }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
