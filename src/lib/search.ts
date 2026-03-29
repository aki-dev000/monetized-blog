import Fuse from 'fuse.js'
import { PostMeta } from '@/types/post'

export function createSearchIndex(posts: PostMeta[]) {
  return new Fuse(posts, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'tags', weight: 0.15 },
      { name: 'category', weight: 0.05 },
    ],
    threshold: 0.4,
    includeScore: true,
  })
}

export function searchPosts(posts: PostMeta[], query: string): PostMeta[] {
  if (!query.trim()) return posts
  const fuse = createSearchIndex(posts)
  return fuse.search(query).map(r => r.item)
}
