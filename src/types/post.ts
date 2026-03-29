export interface FrontMatter {
  title: string
  description: string
  date: string
  updatedAt?: string
  category: string
  tags: string[]
  thumbnail?: string
  author?: string
  published: boolean
}

export interface Post extends FrontMatter {
  slug: string
  content: string
  readingTime: number
  wordCount: number
}

export type PostMeta = Omit<Post, 'content'>
