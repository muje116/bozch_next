const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-wordpress-site.com'

export interface WordPressPage {
  id: number
  title: string
  content: string
  excerpt: string
  slug: string
  featured_media?: number
  acf?: Record<string, any>
}

export interface WordPressPost {
  id: number
  title: string
  content: string
  excerpt: string
  slug: string
  date: string
  featured_media?: number
}

export interface WordPressMedia {
  id: number
  source_url: string
  alt_text: string
  title: string
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } }
    )
    const data = await response.json()
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('[v0] Error fetching page:', error)
    return null
  }
}

// Fetch all pages
export async function getAllPages(): Promise<WordPressPage[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/pages?per_page=100&_embed`,
      { next: { revalidate: 3600 } }
    )
    return await response.json()
  } catch (error) {
    console.error('[v0] Error fetching pages:', error)
    return []
  }
}

// Fetch posts (for blog, updates, etc.)
export async function getPosts(limit = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=${limit}&_embed`,
      { next: { revalidate: 3600 } }
    )
    return await response.json()
  } catch (error) {
    console.error('[v0] Error fetching posts:', error)
    return []
  }
}

// Fetch media by ID
export async function getMedia(id: number): Promise<WordPressMedia | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/media/${id}`,
      { next: { revalidate: 3600 } }
    )
    return await response.json()
  } catch (error) {
    console.error('[v0] Error fetching media:', error)
    return null
  }
}

// Fetch custom ACF fields
export async function getCustomField(postId: number, fieldName: string): Promise<any> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/posts/${postId}?_embed`,
      { next: { revalidate: 3600 } }
    )
    const data = await response.json()
    return data.acf?.[fieldName] || null
  } catch (error) {
    console.error('[v0] Error fetching custom field:', error)
    return null
  }
}
