import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession, hashPassword } from "@/lib/auth"

export async function GET() {
    const session = await getSession()
    if (!session || session.role !== "super_admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const users = await sql("SELECT id, email, name, role, created_at FROM admin_users ORDER BY name ASC")
        return NextResponse.json(users)
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const session = await getSession()
    if (!session || session.role !== "super_admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { name, email, password, role } = await request.json()

        if (!name || !email || !password || !role) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        const hashedPassword = await hashPassword(password)

        await sql(
            "INSERT INTO admin_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role]
        )

        return NextResponse.json({ message: "User created successfully" })
    } catch (error: any) {
        console.error("Error creating user:", error)
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
