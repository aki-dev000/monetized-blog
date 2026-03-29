import { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllPosts } from '@/lib/posts'
import { SearchResults } from '@/components/search/SearchResults'

export const metadata: Metadata = {
  title: '記事を検索',
  description: '記事を検索します。',
}

export default async function SearchPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">記事を検索</h1>
      <Suspense fallback={<div>読み込み中...</div>}>
        <SearchResults posts={posts} />
      </Suspense>
    </div>
  )
}
