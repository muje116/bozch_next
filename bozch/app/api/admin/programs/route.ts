import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const programs = await sql("SELECT * FROM programs ORDER BY display_order ASC")
    return NextResponse.json(programs)
  } catch (error) {
    console.error("Error fetching programs:", error)
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
      "INSERT INTO programs (title, description, long_description, icon, image_url, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        data.title,
        data.description,
        data.long_description,
        data.icon,
        data.image_url,
        data.display_order || 0,
        data.is_active !== false,
      ]
    )) as any

    const newProgram = {
      id: result.insertId,
      ...data,
      display_order: data.display_order || 0,
      is_active: data.is_active !== false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    return NextResponse.json(newProgram)
  } catch (error) {
    console.error("Error creating program:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
