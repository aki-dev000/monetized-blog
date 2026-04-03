---
title: "Vercelデプロイで絶対に知っておきたい設定10選"
description: "Vercelデプロイで絶対に知っておきたい設定10選について、具体的な手順と実践例を交えながら解説します。環境変数やEdge Functionsなど重要ポイントを網羅しています。"
date: "2026-04-03"
category: "Web開発"
tags: ["Vercel","デプロイ","インフラ"]
author: "ブログ管理者"
published: true
---

# Vercelデプロイで絶対に知っておきたい設定10選

Vercelは、Next.jsの開発元が提供する高性能なホスティングプラットフォームです。しかし、多くの開発者は基本的なデプロイだけで満足してしまい、Vercelの強力な機能を活用できていません。本番環境でのパフォーマンス低下、セキュリティ上の問題、スケーラビリティの制限など、後々になって問題が発生することは珍しくありません。

この記事では、Vercelのデプロイで絶対に知っておくべき10の設定を、実務的な観点から解説します。環境変数の正しい管理方法から、Edge Functionsの活用、Cron Jobsの設定、さらにはAnalyticsの最適化まで、実装レベルで役立つ知識を提供します。これらの設定を正しく理解することで、セキュアで高速、スケーラブルなWebアプリケーションが実現できます。

## 1. 環境変数の正しい管理方法

環境変数はアプリケーションの秘密情報やAPI キーを安全に管理するための基盤です。Vercelでは3つのレベルで環境変数を設定できます。

**プロジェクトレベル、環境別、チームレベルの3層構造**を理解することが重要です。

Vercelダッシュボード上で、プロジェクト設定 → Environment Variables で設定できます。開発環境（Development）、プレビュー環境（Preview）、本番環境（Production）で異なる値を使い分けることができます。

```
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://user:password@host/db
NEXT_PUBLIC_APP_NAME=My App
```

重要なポイントとして：

- **NEXT_PUBLIC_** 接頭辞が付いた変数は、ブラウザに露出します。APIキーやデータベース接続文字列には絶対に使用しないでください
- .env.local ファイルはローカル開発用、本当の秘密情報はVercelダッシュボードでのみ管理してください
- 環境別に異なる値を設定する場合、Environment欄で明示的に選択してください

本番環境では、データベースのレプリケーションURLを使用するなど、セキュリティを考慮した設定が必須です。

## 2. Edge Functionsで低レイテンシーを実現

Edge Functionsは、Vercelのグローバルエッジネットワーク上で実行されるサーバーレス関数です。オリジンサーバーから遠く離れたユーザーでも、地理的に最も近いエッジサーバーで処理が実行されるため、レスポンスタイムが大幅に改善されます。

**従来のServer-side Rendering（SSR）と比較して、Edge Functionsは数倍高速です。** 実際のプロジェクトでは、ページロードタイムが2秒から300msに短縮された例もあります。

Edge Functionsの実装方法は簡単です：

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // リクエストのIPアドレスで地理情報を判定
  const country = request.geo?.country;
  
  // 特定の国へのリダイレクト
  if (country === 'JP') {
    return NextResponse.redirect(new URL('/jp', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

活用シーン：

- **地理情報ベースのリダイレクト**：ユーザーの位置に応じて言語やコンテンツを変更
- **認証チェック**：JWTトークンの検証を全エッジで実行
- **A/Bテスト**：ユーザーをバージョン間でランダムに振り分け
- **キャッシュ制御**：動的にHTTPヘッダーを調整

Edge Functionsでは、Node.js標準ライブラリの一部のみが利用可能なため、依存パッケージを最小化することが重要です。

## 3. Cron Jobsで自動処理を定期実行

Cron Jobsは、スケジュールに従って自動的に関数を実行する機能です。データベースのクリーンアップ、定期的なレポート生成、キャッシュの更新など、バックグラウンドタスクに最適です。

```javascript
// pages/api/cron/cleanup.js
export default async function handler(request, response) {
  // Cron Jobからのリクエストを検証
  if (request.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return response.status(401).json({ success: false });
  }

  try {
    // 7日以上前のログを削除
    await db.logs.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    // キャッシュをリセット
    await redis.flushAll();

    response.status(200).json({ success: true, message: 'Cleanup completed' });
  } catch (error) {
    response.status(500).json({ success: false, error: error.message });
  }
}
```

vercel.jsonの設定：

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/generate-report",
      "schedule": "0 9 * * MON"
    }
  ]
}
```

実装のベストプラクティス：

- **認証トークンを必ず設定**：外部からの不正実行を防ぐ
- **タイムアウト対策**：長時間実行タスクは分割
- **ログ記録**：実行結果を記録しておくと障害対応が容易

## 4. Analyticsでパフォーマンスを可視化

Vercel Analyticsは、ページロードタイム、First Contentful Paint（FCP）、Cumulative Layout Shift（CLS）などのコア ウェブ バイタルを自動計測します。ユーザー体験の品質を数値化できます。

実装は驚くほど簡単です。Vercelに統合されているため、追加コードはほぼ不要です：

```javascript
// pages/_app.js
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

**計測される主要メトリクス：**

| メトリクス | 目標値 | 重要性 |
|-----------|--------|--------|
| LCP（最大視認要素の表示時間） | 2.5秒以下 | ★★★ |
| FID（最初の入力遅延） | 100ms以下 | ★★★ |
| CLS（レイアウトのずれ） | 0.1以下 | ★★★ |
| TTFB（最初のバイト時間） | 600ms以下 | ★★☆ |

ダッシュボードの活用方法：

- **Real User Monitoring（RUM）**：実際のユーザーデータを収集
- **地域別の詳細分析**：国やデバイス別のパフォーマンス比較
- **リリース時の自動比較**：デプロイ前後でパフォーマンス変化を検出

Analyticsの価格は無料プランで月100万PVまで計測可能です。

## 5. リダイレクトと書き換え（Rewrites）の設定

next.configに記述するリダイレクトと書き換えは、ルーティングの柔軟性を飛躍的に向上させます。

```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true, // 301リダイレクト
      },
      {
        source: '/api/v1/:path*',
        destination: 'https://api.example.com/v1/:path*',
        permanent: true,
      },
    ];
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend.example.com/api/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'https://cdn.example.com/:path*',
      },
    ];
  },
};
```

リダイレクト（redirect）と書き換え（rewrite）の違い：

- **リダイレクト**：ユーザーのブラウザアドレスバーが変更される。SEOは新URLに引き継がれます
- **書き換え**：内部的にURLが変換され、ユーザーのアドレスバーは変わらない。マイクロサービスアーキテクチャに最適

## 6. ISR（Incremental Static Regeneration）の最適化

ISRは、ビルド時に全ページを生成するわけではなく、リクエスト時に必要に応じてページを動的に生成・更新する仕組みです。静的生成の高速性と動的コンテンツの柔軟性を両立させます。

```javascript
// pages/blog/[slug].js
export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);

  return {
    props: { post },
    revalidate: 3600, // 1時間ごとに再生成
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'popular-post' } }],
    fallback: 'blocking', // 未知のパスは動的生成
  };
}
```

ISR設定のポイント：

- **revalidate 秒数の決定**：コンテンツ更新の頻度と応答性のバランスを考慮
- **fallback の選択**：'blocking'は初回アクセスで生成（SEOに有利）、'true'は古いキャッシュを即座に返す
- **on-demand ISR**：特定のイベント発生時にキャッシュを無効化

ブログで月10万PVの場合、ISRを導入すれば：
- ビルド時間が1時間→3分に短縮
- サーバー負荷が70%削減
- ユーザーの待機時間がほぼ0になります

## 7. キャッシュストラテジーとHTTPヘッダーの制御

Vercelにおけるキャッシュは複数層で機能します。正しく理解・設定することで、パフォーマンスと新鮮性のバランスが取れます。

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(response) {
  // 静的資産は30日キャッシュ
  if (request.nextUrl.pathname.startsWith('/static')) {
    response.headers.set('Cache-Control', 'public, max-age=2592000, immutable');
  }
  
  // HTMLは1時間キャッシュ
  if (request.nextUrl.pathname.endsWith('.html')) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  }
  
  // APIレスポンスはブラウザキャッシュなし
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  
  return response;
}
```

キャッシュレイヤー：

1. **ブラウザキャッシュ**（max-age）：ユーザーの端末に保存
2. **Vercelエッジキャッシュ**（s-maxage）：全世界のエッジサーバー上に保存
3. **オリジンキャッシュ**：バックエンドサーバー上

適切な設定で、キャッシュヒット率は95%以上に達します。

## 8. セキュリティヘッダーの設定

セキュリティヘッダーは、XSS、クリックジャッキング、MIME type sniffing など、一般的な攻撃から保護します。

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' *.google-analytics.com"
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

各ヘッダーの役割：

- **CSP**：JavaScriptの実行元を制限
- **X-Content-Type-Options**：ブラウザの MIME タイプ推測を無効化
- **X-Frame-Options**：iframeでの埋め込みを防止
- **Permissions-Policy**：端末機能へのアクセスを制限

## 9. チーム管理とデ