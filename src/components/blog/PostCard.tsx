import Link from 'next/link'
import { PostMeta } from '@/types/post'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <div
          className="rounded-sm p-5 transition-all duration-300 group-hover:-translate-y-0.5"
          style={{ border: '1px solid var(--border-warm)' }}
        >
          {/* Category label */}
          <span
            className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] mb-2"
            style={{ color: 'var(--accent-gold)' }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h2
            className={`font-medium leading-snug mb-2 line-clamp-2 ${featured ? 'text-lg' : 'text-base'}`}
            style={{ fontFamily: 'var(--font-noto-serif)' }}
          >
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed line-clamp-2 mb-3" style={{ opacity: 0.5 }}>
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs" style={{ opacity: 0.4 }}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}分で読める</span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-sm"
                  style={{ background: 'color-mix(in srgb, var(--accent-gold) 12%, transparent)', color: 'var(--accent-gold)' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
