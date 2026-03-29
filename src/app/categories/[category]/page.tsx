import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map(cat => ({ category: encodeURIComponent(cat.name) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: rawCategory } = await params
  const category = decodeURIComponent(rawCategory)
  return {
    title: `${category} の記事一覧`,
    description: `${category} カテゴリの記事一覧です。`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: rawCategory } = await params
  const category = decodeURIComponent(rawCategory)
  const posts = await getPostsByCategory(category)

  if (posts.length === 0) notFound()

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">カテゴリ</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{category}</h1>
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
