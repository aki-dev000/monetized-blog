import { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: '記事一覧',
  description: 'すべての記事一覧です。',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">記事一覧</h1>
      {posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-16">まだ記事がありません。</p>
      )}
    </div>
  )
}
