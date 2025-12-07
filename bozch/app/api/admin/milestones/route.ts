import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const milestones = await sql("SELECT * FROM milestones ORDER BY display_order ASC")
    return NextResponse.json(milestones)
  } catch (error) {
    console.error("Error fetching milestones:", error)
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
      "INSERT INTO milestones (year, title, description, display_order, is_active) VALUES (?, ?, ?, ?, ?)",
      [
        data.year,
        data.title,
        data.description,
        data.display_order || 0,
        data.is_active !== false,
      ]
    )) as any

    const newMilestone = {
      id: result.insertId,
      ...data,
      display_order: data.display_order || 0,
      is_active: data.is_active !== false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    return NextResponse.json(newMilestone)
  } catch (error) {
    console.error("Error creating milestone:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
