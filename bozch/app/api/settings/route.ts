import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
    try {
        const settings = await sql("SELECT setting_key, setting_value FROM site_settings") as any[]

        const settingsObject = settings.reduce((acc: any, curr: any) => {
            acc[curr.setting_key] = curr.setting_value
            return acc
        }, {})

        return NextResponse.json(settingsObject)
    } catch (error) {
        console.error("Error fetching public settings:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
