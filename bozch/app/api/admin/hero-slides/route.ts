import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const slides = await sql("SELECT * FROM hero_slides ORDER BY display_order ASC")
    return NextResponse.json(slides)
  } catch (error) {
    console.error("Error fetching hero slides:", error)
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
      "INSERT INTO hero_slides (title, subtitle, image_url, cta_text, cta_link, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        data.title,
        data.subtitle,
        data.image_url,
        data.cta_text,
        data.cta_link,
        data.display_order || 0,
        data.is_active !== false,
      ]
    )) as any

    const newSlide = {
      id: result.insertId,
      ...data,
      display_order: data.display_order || 0,
      is_active: data.is_active !== false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    return NextResponse.json(newSlide)
  } catch (error) {
    console.error("Error creating hero slide:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
