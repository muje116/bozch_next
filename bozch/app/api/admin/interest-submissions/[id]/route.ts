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
    await sql("UPDATE interest_submissions SET is_read = ? WHERE id = ?", [data.is_read, id])

    // Fetch the updated record to return it
    const updatedSubmissions = (await sql("SELECT * FROM interest_submissions WHERE id = ?", [id])) as any[]

    if (updatedSubmissions.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json(updatedSubmissions[0])
  } catch (error) {
    console.error("Error updating interest submission:", error)
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
    await sql("DELETE FROM interest_submissions WHERE id = ?", [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting interest submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

