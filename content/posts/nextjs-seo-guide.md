---
title: "Next.js 14でSEO完全対応ブログを作る方法【App Router対応】"
description: "Next.js 14のApp RouterとMetadata APIを使ってSEO最適化されたブログを構築する手順を解説します。OGP設定、JSON-LD、サイトマップまで完全網羅。"
date: "2026-01-15"
updatedAt: "2026-03-01"
category: "Web開発"
tags: ["Next.js", "SEO", "TypeScript", "App Router"]
author: "ブログ管理者"
published: true
---

## はじめに

Next.js 14のApp Routerを使ったブログ開発において、SEOは欠かせない要素です。この記事では、実際の設定方法を解説します。

## Metadata APIの使い方

Next.js 14では、`generateMetadata`関数を使って動的にmetaタグを生成できます。

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      images: [post.thumbnail],
    },
  }
}
```

## OGP画像の設定

OGP画像は`opengraph-image.tsx`または静的ファイルで設定できます。

## JSON-LDの実装

構造化データを追加することで、検索結果のリッチスニペットが表示されやすくなります。

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "記事タイトル",
  "datePublished": "2026-01-15"
}
```

## まとめ

Next.js 14のMetadata APIを活用することで、簡単にSEO対応が実現できます。継続的にコンテンツを追加してドメインパワーを高めていきましょう。
