import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostMeta } from '@/types/post'
import { markdownToHtml } from './markdown'

const postsDirectory = path.join(process.cwd(), 'content/posts')

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = getPostFiles()
  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const wordCount = content.split(/\s+/).length

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      updatedAt: data.updatedAt,
      category: data.category || '',
      tags: data.tags || [],
      thumbnail: data.thumbnail,
      author: data.author || 'ブログ管理者',
      published: data.published !== false,
      readingTime: Math.ceil(wordCount / 400),
      wordCount,
    } as PostMeta
  })

  return posts
    .filter(p => process.env.NODE_ENV === 'production' ? p.published : true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = await markdownToHtml(content)
  const wordCount = content.split(/\s+/).length

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    updatedAt: data.updatedAt,
    category: data.category || '',
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    author: data.author || 'ブログ管理者',
    published: data.published !== false,
    content: htmlContent,
    readingTime: Math.ceil(wordCount / 400),
    wordCount,
  }
}

export async function getPostSlugs(): Promise<string[]> {
  return getPostFiles().map(f => f.replace(/\.md$/, ''))
}

export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter(p => p.category === category)
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter(p => p.tags.includes(tag))
}

export async function getAllCategories(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts()
  const categoryMap = new Map<string, number>()
  posts.forEach(p => {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1)
  })
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts()
  const tagMap = new Map<string, number>()
  posts.forEach(p => {
    p.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getRelatedPosts(post: PostMeta, limit = 3): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts
    .filter(p => p.slug !== post.slug)
    .map(p => {
      const sameCategory = p.category === post.category ? 2 : 0
      const sharedTags = p.tags.filter(t => post.tags.includes(t)).length
      return { post: p, score: sameCategory + sharedTags }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}
