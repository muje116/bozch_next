'use client'

export function WordPressContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-sm md:prose-base max-w-none
        prose-headings:font-bold prose-headings:text-foreground
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-a:hover:underline
        prose-img:rounded-lg prose-img:my-6
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
