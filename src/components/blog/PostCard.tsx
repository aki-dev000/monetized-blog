import Link from 'next/link'
import Image from 'next/image'
import { PostMeta } from '@/types/post'
import { formatDate } from '@/lib/utils'
import { Clock, Calendar } from 'lucide-react'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={`group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300 ${featured ? 'md:flex' : ''}`}>
      {post.thumbnail && (
        <div className={`relative bg-gray-100 dark:bg-gray-800 ${featured ? 'md:w-2/5 h-48 md:h-auto' : 'h-48'}`}>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {!post.thumbnail && (
        <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 ${featured ? 'md:w-2/5 h-48 md:h-auto' : 'h-48'} flex items-center justify-center`}>
          <span className="text-4xl">📝</span>
        </div>
      )}
      <div className="p-5 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Link
            href={`/categories/${encodeURIComponent(post.category)}`}
            className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            {post.category}
          </Link>
        </div>

        <h2 className={`font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${featured ? 'text-xl' : 'text-base'}`}>
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {post.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime}分で読める
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map(tag => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
