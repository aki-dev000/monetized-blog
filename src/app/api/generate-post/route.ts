import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { TOPICS, getUnusedTopics, topicToSlug } from '@/lib/topics'

const client = new Anthropic()

// 既存記事のスラッグをGitHub APIから取得
async function getExistingSlugs(): Promise<string[]> {
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const token = process.env.GITHUB_TOKEN

  if (!owner || !repo || !token) return []

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/content/posts`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } }
  )
  if (!res.ok) return []
  const files = await res.json() as { name: string }[]
  return files.map((f) => f.name.replace(/\.md$/, ''))
}

// GitHub Contents API でMarkdownファイルをコミット
async function commitPostToGitHub(slug: string, content: string): Promise<void> {
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const token = process.env.GITHUB_TOKEN

  if (!owner || !repo || !token) throw new Error('GitHub env vars not set')

  const path = `content/posts/${slug}.md`
  const encoded = Buffer.from(content, 'utf-8').toString('base64')
  const today = new Date().toISOString().split('T')[0]

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `[auto] Add new post: ${slug} (${today})`,
        content: encoded,
        branch: 'main',
      }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub API error: ${err}`)
  }
}

// Claudeで記事を生成
async function generateArticle(topic: typeof TOPICS[0], slug: string): Promise<string> {
  const today = new Date().toISOString().split('T')[0]
  const tagsYaml = JSON.stringify(topic.tags)
  const keywordsStr = topic.keywords.join('、')

  const systemPrompt = `あなたはSEOに強いプロのブログライターです。
日本語で、読者が実際に役立つ高品質な技術・収益化記事を書いてください。
以下のルールを厳守してください：
- 文字数：本文2000〜3000文字
- 見出し（##, ###）を使って読みやすく構成する
- 具体的な数字・例・手順を含める
- E-E-A-T（経験・専門性・権威性・信頼性）を意識した内容にする
- マークダウン形式で出力する（フロントマターは含めない）
- コードブロックが必要な場合は適切に使用する`

  const userPrompt = `以下のテーマで記事本文を書いてください。

テーマ：${topic.title}
カテゴリ：${topic.category}
キーワード：${keywordsStr}

記事には以下を含めてください：
1. 導入文（なぜこのトピックが重要か）
2. メイン内容（見出しを使って3〜5セクション）
3. まとめ（読者が次に取るべきアクション）

マークダウン本文のみを出力してください。フロントマターは不要です。`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  })

  const body = message.content[0].type === 'text' ? message.content[0].text : ''

  const frontmatter = `---
title: "${topic.title}"
description: "${topic.title}について、具体的な手順と実践例を交えながら解説します。${topic.keywords[0]}や${topic.keywords[1]}など重要ポイントを網羅しています。"
date: "${today}"
category: "${topic.category}"
tags: ${tagsYaml}
author: "ブログ管理者"
published: true
---

`

  return frontmatter + body
}

export async function GET(request: NextRequest) {
  // Vercel Cron または手動実行の認証
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 既存記事を取得して重複を避ける
    const existingSlugs = await getExistingSlugs()
    const unusedTopics = getUnusedTopics(existingSlugs)

    if (unusedTopics.length === 0) {
      return NextResponse.json({ message: 'All topics already published' })
    }

    // ランダムにトピックを選択
    const topic = unusedTopics[Math.floor(Math.random() * unusedTopics.length)]
    const slug = topicToSlug(topic.title)

    // 記事を生成
    const markdown = await generateArticle(topic, slug)

    // GitHub にコミット
    await commitPostToGitHub(slug, markdown)

    return NextResponse.json({
      success: true,
      slug,
      title: topic.title,
      category: topic.category,
    })
  } catch (error) {
    console.error('[generate-post] Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
