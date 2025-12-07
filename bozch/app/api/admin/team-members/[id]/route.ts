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
      "UPDATE team_members SET name = ?, role = ?, bio = ?, image_url = ?, email = ?, linkedin_url = ?, display_order = ?, is_active = ?, updated_at = NOW() WHERE id = ?",
      [
        data.name,
        data.role,
        data.bio,
        data.image_url,
        data.email,
        data.linkedin_url,
        data.display_order,
        data.is_active,
        id,
      ]
    )

    // Fetch the updated record to return it
    const updatedMembers = (await sql("SELECT * FROM team_members WHERE id = ?", [id])) as any[]

    if (updatedMembers.length === 0) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json(updatedMembers[0])
  } catch (error) {
    console.error("Error updating team member:", error)
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
    await sql("DELETE FROM team_members WHERE id = ?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
