import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="text-center mb-16 py-8">
        <p
          className="text-[10px] font-medium uppercase tracking-[0.3em] mb-3"
          style={{ color: 'var(--accent-gold)' }}
        >
          Neiro Inc. Tech Blog
        </p>
        <h1
          className="text-4xl md:text-5xl font-medium mb-4"
          style={{ fontFamily: 'var(--font-noto-serif)' }}
        >
          {process.env.NEXT_PUBLIC_SITE_NAME || 'Neiro Signal'}
        </h1>
        <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ opacity: 0.5 }}>
          {process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Neiro Inc. の技術シグナルを届けるブログ — Web開発・AI・SEO・収益化'}
        </p>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p
                className="text-[10px] font-medium uppercase tracking-[0.3em] mb-1.5"
                style={{ color: 'var(--accent-gold)' }}
              >
                Featured
              </p>
              <h2 className="text-2xl font-medium" style={{ fontFamily: 'var(--font-noto-serif)' }}>
                最新記事
              </h2>
            </div>
            <Link
              href="/posts"
              className="flex items-center gap-1 text-sm transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent-indigo)' }}
            >
              すべて見る <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map(post => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.3em] mb-1.5"
                style={{ color: 'var(--accent-gold)' }}
              >
                Recent
              </p>
              <h2 className="text-2xl font-medium" style={{ fontFamily: 'var(--font-noto-serif)' }}>
                新着記事
              </h2>
            </div>
            <div className="grid gap-4">
              {recentPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="rounded-sm p-5" style={{ border: '1px solid var(--border-warm)' }}>
            <p
              className="text-[10px] font-medium uppercase tracking-[0.3em] mb-3"
              style={{ color: 'var(--accent-gold)' }}
            >
              Categories
            </p>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.name}>
                  <Link
                    href={`/categories/${encodeURIComponent(cat.name)}`}
                    className="flex items-center justify-between text-sm transition-opacity hover:opacity-70"
                    style={{ opacity: 0.6 }}
                  >
                    <span>{cat.name}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-sm"
                      style={{ background: 'color-mix(in srgb, var(--accent-gold) 12%, transparent)', color: 'var(--accent-gold)' }}
                    >
                      {cat.count}
                    </span>
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
