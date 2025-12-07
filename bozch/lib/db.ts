import mysql from "mysql2/promise"

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "bozch_cms",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

// Helper function to execute queries
export async function sql(query: string, values: any[] = []) {
  try {
    const [results] = await pool.execute(query, values)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Type definitions for database tables
export interface AdminUser {
  id: number
  email: string
  password_hash: string
  name: string
  role: string
  created_at: Date
  updated_at: Date
}

export interface SiteSetting {
  id: number
  setting_key: string
  setting_value: string
  setting_type: string
  updated_at: Date
}

export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  image_url: string
  cta_text: string
  cta_link: string
  display_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface ImpactStat {
  id: number
  label: string
  value: number
  suffix: string
  icon: string
  display_order: number
  is_active: boolean
  updated_at: Date
}

export interface Program {
  id: number
  title: string
  description: string
  long_description: string
  icon: string
  image_url: string
  display_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image_url: string
  email: string
  linkedin_url: string
  display_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface Milestone {
  id: number
  year: string
  title: string
  description: string
  display_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface CoreValue {
  id: number
  title: string
  description: string
  icon: string
  display_order: number
  is_active: boolean
  updated_at: Date
}

export interface ContactSubmission {
  id: number
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: Date
}

export interface NewsletterSubscriber {
  id: number
  email: string
  is_active: boolean
  subscribed_at: Date
}

export interface PageContent {
  id: number
  page_slug: string
  section_key: string
  title: string
  content: string
  updated_at: Date
}

export interface Partner {
  id: number
  name: string
  logo_url: string
  website_url: string
  display_order: number
  is_active: boolean
  created_at: Date
}
