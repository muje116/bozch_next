# Headless WordPress Setup Guide

## Overview
This Next.js application is configured to use WordPress as a headless CMS. Your frontend keeps all animations and styling, while WordPress manages the content.

## Step 1: WordPress Installation

1. Set up a WordPress instance on your hosting provider
2. Install the following plugins:
   - **REST API** (usually built-in)
   - **ACF (Advanced Custom Fields) Pro** - for custom fields
   - **CORS Enabler** - to allow requests from your frontend

## Step 2: Enable REST API

In WordPress Admin:
1. Go to Settings → Permalinks
2. Choose "Post name" as your permalink structure
3. This enables the REST API endpoints

## Step 3: Configure Environment Variables

Add these to your `.env.local` file:

\`\`\`
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
WORDPRESS_WEBHOOK_SECRET=your-secret-key-here
\`\`\`

## Step 4: Create Custom Fields in WordPress

Use ACF to create custom fields for your pages. For example, on the Home page:

- `programs` (Repeater field for programs)
- `impact_stats` (Repeater field for impact counters)
- `hero_images` (Image field for carousel)

## Step 5: Set Up Content in WordPress

In WordPress Admin, create pages matching your site structure:
- Home
- About Us
- Our Programs
- Our Journey
- Get Involved
- Contact

## Step 6: Webhook Setup (Optional but Recommended)

This allows WordPress to tell Next.js when content changes, triggering automatic revalidation:

1. In WordPress, install **Webhooks** plugin
2. Go to Settings → Webhooks
3. Create a webhook:
   - **URL:** `https://your-nextjs-domain.com/api/revalidate`
   - **Event:** Post/Page Published/Updated
   - **Headers:** Add `x-webhook-secret: your-secret-key-here`

## Usage in Components

### Fetch and Display a Page

\`\`\`tsx
import { getPageBySlug } from '@/lib/wordpress'
import { WordPressContent } from '@/components/wordpress-content'

export default async function AboutPage() {
  const page = await getPageBySlug('about')
  
  if (!page) return <div>Page not found</div>
  
  return (
    <div>
      <h1>{page.title.rendered}</h1>
      <WordPressContent html={page.content.rendered} />
    </div>
  )
}
\`\`\`

### Fetch Custom Fields

\`\`\`tsx
import { getCustomField } from '@/lib/wordpress'

const heroImages = await getCustomField(pageId, 'hero_images')
const programs = await getCustomField(pageId, 'programs')
\`\`\`

### Fetch All Posts

\`\`\`tsx
import { getPosts } from '@/lib/wordpress'

const posts = await getPosts(10)
\`\`\`

## WordPress REST API Endpoints

- Get all pages: `/wp-json/wp/v2/pages`
- Get page by slug: `/wp-json/wp/v2/pages?slug=about`
- Get all posts: `/wp-json/wp/v2/posts`
- Get post by ID: `/wp-json/wp/v2/posts/123`
- Get media: `/wp-json/wp/v2/media/456`

## Content Structure in WordPress

### For Home Page Hero Carousel
Create a Repeater field called `hero_slides` with:
- Image field
- Title
- Description

### For Programs Section
Create a Repeater field called `programs` with:
- Title
- Description
- Icon name

### For Impact Counters
Create a Repeater field called `impact_stats` with:
- Label
- Number
- Suffix (optional)

## Recommended Plugins

- **WP REST API Custom Fields** - Easy ACF integration
- **REST API Show All** - Exposes all custom fields in REST
- **WordPress CORS Support** - Fixes CORS issues
- **Elementor** - For WordPress admin UI (optional)

## Troubleshooting

**CORS Errors:**
- Install CORS Enabler plugin
- Or add custom headers in WordPress functions.php

**Custom Fields Not Showing:**
- Make sure ACF plugin is installed
- Set ACF fields to "Show in REST API"

**Cache Not Updating:**
- Check that webhook URL is correct
- Verify webhook secret matches `.env.local`
- Test webhook by manually triggering in WordPress settings

## Performance Tips

- All API calls use Next.js ISR (Incremental Static Regeneration) with 1-hour revalidation
- Images are served from WordPress but can be cached through Next.js Image component
- Webhooks trigger immediate revalidation when content changes in WordPress
- Use `next: { revalidate: 3600 }` for 1-hour caching, adjust as needed
