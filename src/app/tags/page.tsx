import { Metadata } from 'next'
import Link from 'next/link'
import { getAllTags } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'タグ一覧',
}

export default async function TagsPage() {
  const tags = await getAllTags()

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">タグ一覧</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map(tag => (
          <Link
            key={tag.name}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-2 rounded-full transition-colors text-sm font-medium"
            style={{ fontSize: `${Math.max(0.8, Math.min(1.4, 0.8 + tag.count * 0.15))}rem` }}
          >
            #{tag.name}
            <span className="text-xs opacity-60">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
