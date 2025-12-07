import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const submissions = await sql("SELECT * FROM contact_submissions ORDER BY created_at DESC")
    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = (await sql(
      "INSERT INTO contact_submissions (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [data.name, data.email, data.subject, data.message]
    )) as any

    const newSubmission = {
      id: result.insertId,
      ...data,
      is_read: false,
      created_at: new Date(),
    }

    return NextResponse.json(newSubmission)
  } catch (error) {
    console.error("Error creating contact submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
