import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, getPostSlugs, getRelatedPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { AdSenseUnit } from '@/components/ads/AdSenseUnit'
import { JsonLd } from '@/components/seo/JsonLd'
import { PostCard } from '@/components/blog/PostCard'
import { Calendar, Clock, Tag } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.updatedAt || post.date,
        tags: post.tags,
        images: [post.thumbnail || '/og-default.png'],
      },
      alternates: { canonical: `${siteUrl}/posts/${post.slug}` },
    }
  } catch {
    return {}
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post, 3)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  return (
    <>
      <JsonLd post={post} siteUrl={siteUrl} />
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Header */}
            <header className="mb-8">
              <Link
                href={`/categories/${encodeURIComponent(post.category)}`}
                className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {post.category}
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{post.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  約{post.readingTime}分
                </span>
                {post.author && <span>by {post.author}</span>}
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-2.5 py-1 rounded-full transition-colors"
                    >
                      <Tag size={10} />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* Ad - Top of article */}
            <AdSenseUnit slot="1234567890" className="mb-8" />

            {/* Body */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Ad - Bottom of article */}
            <AdSenseUnit slot="0987654321" className="mt-8" />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">関連記事</h2>
                <div className="grid gap-4">
                  {relatedPosts.map(relPost => (
                    <PostCard key={relPost.slug} post={relPost} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <AdSenseUnit slot="1122334455" format="vertical" className="mb-6" />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
