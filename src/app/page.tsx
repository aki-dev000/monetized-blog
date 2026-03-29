import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9)

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {process.env.NEXT_PUBLIC_SITE_NAME || 'TechBlog'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Web開発・SEO・収益化の実践ブログ'}
        </p>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">最新記事</h2>
            <Link href="/posts" className="text-blue-600 dark:text-blue-400 hover:opacity-80 flex items-center gap-1 text-sm font-medium">
              すべて見る <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">新着記事</h2>
            <div className="grid gap-4">
              {recentPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">カテゴリ</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.name}>
                  <Link
                    href={`/categories/${encodeURIComponent(cat.name)}`}
                    className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-gray-200 dark:bg-gray-800 rounded-full px-2 py-0.5">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
