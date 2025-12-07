import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = (await sql(
      "INSERT INTO interest_submissions (name, email, phone, interest, message) VALUES (?, ?, ?, ?, ?)",
      [data.name, data.email, data.phone || null, data.interest, data.message]
    )) as any

    const newSubmission = {
      id: result.insertId,
      ...data,
      is_read: false,
      created_at: new Date(),
    }

    return NextResponse.json(newSubmission, { status: 201 })
  } catch (error) {
    console.error("Error creating interest submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

