import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()
    await sql(
      "UPDATE impact_stats SET label = ?, value = ?, suffix = ?, icon = ?, display_order = ?, is_active = ?, updated_at = NOW() WHERE id = ?",
      [
        data.label,
        data.value,
        data.suffix,
        data.icon,
        data.display_order,
        data.is_active,
        id,
      ]
    )

    // Fetch the updated record to return it
    const updatedStats = (await sql("SELECT * FROM impact_stats WHERE id = ?", [id])) as any[]

    if (updatedStats.length === 0) {
      return NextResponse.json({ error: "Impact stat not found" }, { status: 404 })
    }

    return NextResponse.json(updatedStats[0])
  } catch (error) {
    console.error("Error updating impact stat:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await sql("DELETE FROM impact_stats WHERE id = ?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting impact stat:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
