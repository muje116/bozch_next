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
      "UPDATE hero_slides SET title = ?, subtitle = ?, image_url = ?, cta_text = ?, cta_link = ?, display_order = ?, is_active = ?, updated_at = NOW() WHERE id = ?",
      [
        data.title,
        data.subtitle,
        data.image_url,
        data.cta_text,
        data.cta_link,
        data.display_order,
        data.is_active,
        id,
      ]
    )

    // Fetch the updated record to return it
    const updatedSlides = (await sql("SELECT * FROM hero_slides WHERE id = ?", [id])) as any[]

    if (updatedSlides.length === 0) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 })
    }

    return NextResponse.json(updatedSlides[0])
  } catch (error) {
    console.error("Error updating hero slide:", error)
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
    await sql("DELETE FROM hero_slides WHERE id = ?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting hero slide:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
