import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, getPostsByCategory, getPostsByTag } from '@/lib/posts'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')

  let posts
  if (category) {
    posts = await getPostsByCategory(category)
  } else if (tag) {
    posts = await getPostsByTag(tag)
  } else {
    posts = await getAllPosts()
  }

  return NextResponse.json(posts)
}
