import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const members = await sql("SELECT * FROM team_members ORDER BY display_order ASC")
    return NextResponse.json(members)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const result = (await sql(
      "INSERT INTO team_members (name, role, bio, image_url, email, linkedin_url, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.role,
        data.bio,
        data.image_url,
        data.email,
        data.linkedin_url,
        data.display_order || 0,
        data.is_active !== false,
      ]
    )) as any

    const newMember = {
      id: result.insertId,
      ...data,
      display_order: data.display_order || 0,
      is_active: data.is_active !== false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    return NextResponse.json(newMember)
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
