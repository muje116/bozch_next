import { sql } from "./db"

export async function getHeroSlides() {
  try {
    const slides = await sql("SELECT * FROM hero_slides WHERE is_active = true ORDER BY display_order ASC", [])
    return slides
  } catch {
    return []
  }
}

export async function getImpactStats() {
  try {
    const stats = await sql("SELECT * FROM impact_stats WHERE is_active = true ORDER BY display_order ASC", [])
    return stats
  } catch {
    return []
  }
}

export async function getPrograms() {
  try {
    const programs = await sql("SELECT * FROM programs WHERE is_active = true ORDER BY display_order ASC", [])
    return programs
  } catch {
    return []
  }
}

export async function getTeamMembers() {
  try {
    const members = await sql("SELECT * FROM team_members WHERE is_active = true ORDER BY display_order ASC", [])
    return members
  } catch {
    return []
  }
}

export async function getMilestones() {
  try {
    const milestones = await sql("SELECT * FROM milestones WHERE is_active = true ORDER BY display_order ASC", [])
    return milestones
  } catch {
    return []
  }
}

export async function getCoreValues() {
  try {
    const values = await sql("SELECT * FROM core_values WHERE is_active = true ORDER BY display_order ASC", [])
    return values
  } catch {
    return []
  }
}

export async function getSiteSettings() {
  try {
    const settings = await sql("SELECT * FROM site_settings", []) as any[]
    const settingsMap: Record<string, string> = {}
    settings.forEach((s: { setting_key: string; setting_value: string }) => {
      settingsMap[s.setting_key] = s.setting_value
    })
    return settingsMap
  } catch {
    return {}
  }
}

export async function getPageContent(pageSlug: string, sectionKey: string) {
  try {
    const content = await sql(
      "SELECT * FROM page_content WHERE page_slug = ? AND section_key = ?",
      [pageSlug, sectionKey]
    ) as any[]
    return content[0] || null
  } catch {
    return null
  }
}
