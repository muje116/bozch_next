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
      "UPDATE milestones SET year = ?, title = ?, description = ?, display_order = ?, is_active = ?, updated_at = NOW() WHERE id = ?",
      [
        data.year,
        data.title,
        data.description,
        data.display_order,
        data.is_active,
        id,
      ]
    )

    // Fetch the updated record to return it
    const updatedMilestones = (await sql("SELECT * FROM milestones WHERE id = ?", [id])) as any[]

    if (updatedMilestones.length === 0) {
      return NextResponse.json({ error: "Milestone not found" }, { status: 404 })
    }

    return NextResponse.json(updatedMilestones[0])
  } catch (error) {
    console.error("Error updating milestone:", error)
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
    await sql("DELETE FROM milestones WHERE id = ?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting milestone:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
