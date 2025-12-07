import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const stats = await sql("SELECT * FROM impact_stats ORDER BY display_order ASC")
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching impact stats:", error)
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
      "INSERT INTO impact_stats (label, value, suffix, icon, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)",
      [
        data.label,
        data.value,
        data.suffix || "",
        data.icon,
        data.display_order || 0,
        data.is_active !== false,
      ]
    )) as any

    const newStat = {
      id: result.insertId,
      ...data,
      suffix: data.suffix || "",
      display_order: data.display_order || 0,
      is_active: data.is_active !== false,
      updated_at: new Date(),
    }

    return NextResponse.json(newStat)
  } catch (error) {
    console.error("Error creating impact stat:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
