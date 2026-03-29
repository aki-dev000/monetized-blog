import { Post } from '@/types/post'

interface JsonLdProps {
  post: Post
  siteUrl: string
}

export function JsonLd({ post, siteUrl }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.thumbnail ? `${siteUrl}${post.thumbnail}` : `${siteUrl}/og-default.png`,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'ブログ管理者',
    },
    url: `${siteUrl}/posts/${post.slug}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
