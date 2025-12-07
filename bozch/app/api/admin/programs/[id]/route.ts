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
      "UPDATE programs SET title = ?, description = ?, long_description = ?, icon = ?, image_url = ?, display_order = ?, is_active = ?, updated_at = NOW() WHERE id = ?",
      [
        data.title,
        data.description,
        data.long_description,
        data.icon,
        data.image_url,
        data.display_order,
        data.is_active,
        id,
      ]
    )

    // Fetch the updated record to return it
    const updatedPrograms = (await sql("SELECT * FROM programs WHERE id = ?", [id])) as any[]

    if (updatedPrograms.length === 0) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPrograms[0])
  } catch (error) {
    console.error("Error updating program:", error)
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
    await sql("DELETE FROM programs WHERE id = ?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting program:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
