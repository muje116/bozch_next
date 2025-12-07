import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const submissions = await sql("SELECT * FROM interest_submissions ORDER BY created_at DESC")
    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Error fetching interest submissions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

