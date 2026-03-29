'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PostMeta } from '@/types/post'
import { PostCard } from '@/components/blog/PostCard'
import { searchPosts } from '@/lib/search'
import { Search } from 'lucide-react'

interface SearchResultsProps {
  posts: PostMeta[]
}

export function SearchResults({ posts }: SearchResultsProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<PostMeta[]>([])

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
    setResults(q ? searchPosts(posts, q) : posts)
  }, [searchParams, posts])

  const handleSearch = (value: string) => {
    setQuery(value)
    const params = new URLSearchParams()
    if (value) params.set('q', value)
    router.replace(`/search?${params.toString()}`)
  }

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="記事を検索..."
          className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
        />
      </div>

      {query && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          「<span className="font-medium text-gray-900 dark:text-white">{query}</span>」の検索結果：{results.length}件
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid gap-6">
          {results.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">検索結果が見つかりませんでした。</p>
          <p className="text-sm mt-2">別のキーワードをお試しください。</p>
        </div>
      ) : null}
    </div>
  )
}
