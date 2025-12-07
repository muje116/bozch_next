import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [slidesCount, programsCount, teamCount, milestonesCount, unreadMessages, subscribers] = await Promise.all([
      sql("SELECT COUNT(*) as count FROM hero_slides WHERE is_active = true", []),
      sql("SELECT COUNT(*) as count FROM programs WHERE is_active = true", []),
      sql("SELECT COUNT(*) as count FROM team_members WHERE is_active = true", []),
      sql("SELECT COUNT(*) as count FROM milestones WHERE is_active = true", []),
      sql("SELECT COUNT(*) as count FROM contact_submissions WHERE is_read = false", []),
      sql("SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = true", []),
    ])

    const recentMessages = (await sql("SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5", [])) as any[]

    return NextResponse.json({
      stats: {
        heroSlides: Number((slidesCount as any[])[0]?.count || 0),
        programs: Number((programsCount as any[])[0]?.count || 0),
        teamMembers: Number((teamCount as any[])[0]?.count || 0),
        milestones: Number((milestonesCount as any[])[0]?.count || 0),
        unreadMessages: Number((unreadMessages as any[])[0]?.count || 0),
        subscribers: Number((subscribers as any[])[0]?.count || 0),
      },
      recentMessages,
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
