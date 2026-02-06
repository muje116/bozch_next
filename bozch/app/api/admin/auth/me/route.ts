import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const session = await getSession()

    console.log("Session in /api/admin/auth/me:", session)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const users = (await sql("SELECT id, email, name, role FROM admin_users WHERE id = ?", [session.userId])) as any[]

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: users[0] })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
