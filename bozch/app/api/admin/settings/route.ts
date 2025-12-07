import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const settings = (await sql("SELECT * FROM site_settings ORDER BY setting_key ASC")) as any[]
    const settingsMap: Record<string, string> = {}
    settings.forEach((s: { setting_key: string; setting_value: string }) => {
      settingsMap[s.setting_key] = s.setting_value
    })
    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    for (const [key, value] of Object.entries(data)) {
      await sql(
        "INSERT INTO site_settings (setting_key, setting_value, updated_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE setting_value = ?, updated_at = NOW()",
        [key, value as string, value as string]
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
