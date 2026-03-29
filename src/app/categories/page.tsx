import { Metadata } from 'next'
import Link from 'next/link'
import { getAllCategories } from '@/lib/posts'
import { FolderOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'カテゴリ一覧',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">カテゴリ一覧</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.name}
            href={`/categories/${encodeURIComponent(cat.name)}`}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <FolderOpen size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.count}件</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
