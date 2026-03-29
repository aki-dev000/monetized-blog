import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(tag => ({ tag: encodeURIComponent(tag.name) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag)
  return {
    title: `#${tag} の記事一覧`,
    description: `${tag} タグの記事一覧です。`,
  }
}

export default async function TagPage({ params }: PageProps) {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag)
  const posts = await getPostsByTag(tag)

  if (posts.length === 0) notFound()

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">タグ</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">#{tag}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{posts.length}件の記事</p>
      </div>
      <div className="grid gap-6">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
