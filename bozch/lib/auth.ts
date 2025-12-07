import { cookies } from "next/headers"
import { sql } from "./db"
import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "bozch-secret-key-change-in-production"
)

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    // bcrypt.compare handles the comparison between plain text password and hashed password
    const isMatch = await bcrypt.compare(password, hash)
    return isMatch
  } catch (error) {
    console.error("Password verification error:", error)
    return false
  }
}

export async function createToken(userId: number, email: string, role: string): Promise<string> {
  return new SignJWT({ userId, email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { userId: number; email: string; role: string }
  } catch {
    return null
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  if (!token) return null
  return verifyToken(token)
}

export async function login(email: string, password: string) {
  try {
    // Fetch user from database
    const users = (await sql("SELECT * FROM admin_users WHERE email = ?", [email])) as any[]
    
    console.log("Login attempt for email:", email)
    console.log("Users found:", users.length)
    
    if (users.length === 0) {
      console.log("No user found with this email")
      return null
    }
    
    const user = users[0]
    
    // Check if password_hash exists
    if (!user.password_hash) {
      console.error("No password_hash field found in user record")
      return null
    }

    //hash the password
    const hashedPassword = await hashPassword(password)
    console.log("hashedPassword", hashedPassword);
    console.log("user.password_hash", user.password_hash);
    
    console.log("Comparing password with hash from database")
    console.log("Hash format check:", user.password_hash.substring(0, 4)) // Should be $2b$ or $2a$
    
    // Compare plain text password with hashed password from database
    const isValid = await verifyPassword(password, user.password_hash)
    
    console.log("Password validation result:", isValid)
    
    if (!isValid) {
      console.log("Invalid password")
      return null
    }
    
    // Create JWT token
    const token = await createToken(user.id, user.email, user.role)
    
    console.log("Login successful for user:", user.email)
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    }
  } catch (error) {
    console.error("Login error:", error)
    return null
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
}