import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret')
  
  // Verify the webhook secret
  if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { action, post_type, post_id } = body

    // Revalidate based on post type and action
    if (action === 'publish_post' || action === 'update_post') {
      revalidateTag(`post-${post_id}`)
      revalidateTag('posts')
    } else if (action === 'publish_page' || action === 'update_page') {
      revalidateTag(`page-${post_id}`)
      revalidateTag('pages')
    }

    return NextResponse.json({ success: true, revalidated: true })
  } catch (error) {
    console.error('[v0] Revalidation error:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
