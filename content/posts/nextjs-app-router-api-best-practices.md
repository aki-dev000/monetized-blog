---
title: "Next.js App RouterでのAPI設計ベストプラクティス"
description: "Next.js App RouterでのAPI設計ベストプラクティスについて、具体的な手順と実践例を交えながら解説します。Route HandlerやServer Actionsなど重要ポイントを網羅しています。"
date: "2026-04-03"
category: "Web開発"
tags: ["Next.js","TypeScript","API設計"]
author: "ブログ管理者"
published: true
---

# Next.js App RouterでのAPI設計ベストプラクティス

Next.jsのApp Routerが登場してから、APIの設計方法が大きく変わりました。従来のpagesディレクトリから移行する際に、多くの開発者がRoute HandlerやServer Actions、Edge Runtimeといった新しい機能に戸惑っています。適切なAPI設計を行わないと、パフォーマンス低下やセキュリティ脆弱性につながる可能性があります。

本記事では、Next.js App Routerで実装すべきAPI設計のベストプラクティスを、実装例を交えて詳しく解説します。これらの知識を身につけることで、スケーラブルで保守性の高いAPIを構築できるようになります。

## Route Handlerの正しい使い方

Route Handlerは、App Router環境でのAPI実装の中核となるファイルです。`route.ts`または`route.js`ファイルで定義され、特定のHTTPメソッドに対応する関数をエクスポートします。

### 基本的な実装パターン

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const users = await fetchUsersFromDatabase();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = await createUserInDatabase(body);
    return NextResponse.json(
      { data: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 400 }
    );
  }
}
```

Route Handlerを実装する際の重要なポイントは以下の通りです：

**1. 適切なHTTPステータスコードの返却**
200（成功）、201（作成）、400（不正なリクエスト）、500（サーバーエラー）など、状況に応じたステータスコードを返すことで、クライアント側での処理を明確にできます。

**2. エラーハンドリングの充実**
try-catchブロックで予期しないエラーをキャッチし、ユーザーにとって有用なエラーメッセージを返すことが重要です。本番環境では、詳細なエラー情報をログに記録しつつ、クライアントには一般的なメッセージを返します。

**3. リクエストボディの検証**
ユーザーから送られたデータは常に信頼できないものとして扱い、スキーマ検証を行うべきです。Zodなどのバリデーションライブラリの導入をお勧めします。

## Server Actionsによる効率的なデータ更新

Server Actionsは、Next.js 13.4以降で利用可能な機能で、クライアント側から直接サーバー関数を呼び出すことができます。Route Handlerと異なり、フォームデータの処理やデータベース更新に特に適しています。

### Server Actionsの実装例

```typescript
// app/actions/user.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(formData: FormData) {
  const userId = formData.get('userId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  try {
    const updated = await db.user.update({
      where: { id: userId },
      data: { name, email }
    });

    revalidatePath('/profile');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function deleteUserAccount(userId: string) {
  try {
    await db.user.delete({
      where: { id: userId }
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete account' };
  }
}
```

クライアント側での使用方法：

```typescript
// app/components/ProfileForm.tsx
'use client';

import { updateUserProfile } from '@/app/actions/user';
import { useState } from 'react';

export function ProfileForm({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('userId', userId);

    const result = await updateUserProfile(formData);

    if (result.success) {
      alert('Profile updated successfully');
    } else {
      alert(result.error);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

Server Actionsの利点は、クライアント-サーバー間の通信が自動的に最適化され、JavaScriptの型安全性が保たれることです。ただし、複雑なビジネスロジックや複数のデータベース操作を含む場合は、Route Handlerの方が適切な場合もあります。

## Edge Runtimeによるグローバルパフォーマンス最適化

Edge Runtimeを使用すると、Route HandlerをEdge Functionsとしてデプロイでき、ユーザーの地理的に近い場所で実行されます。これにより、レスポンス時間を大幅に短縮できます。

```typescript
// app/api/validate-token/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { valid: false, error: 'No token provided' },
      { status: 401 }
    );
  }

  try {
    const decoded = await verifyJWT(token);
    return NextResponse.json({ valid: true, user: decoded });
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
}

async function verifyJWT(token: string) {
  // Token verification logic
  return { userId: '123', email: 'user@example.com' };
}
```

Edge Runtimeが適した用途：
- **認証・認可の処理**：トークン検証やセッション確認
- **リダイレクト・レスポンス修正**：地域別コンテンツの配信
- **キャッシュ管理**：リクエスト前処理

ただし、Edge Runtimeにはいくつかの制限があります。データベースへの直接接続、Node.js APIの完全なサポート、ファイルシステムアクセスなどが利用できないため、事前に確認が必要です。

## Middlewareを活用したリクエスト前処理

Middlewareは、Route Handlerが実行される前にリクエストをインターセプトし、認証やロギング、リダイレクトなどの処理を実行します。

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes - no authentication required
  if (pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }

  // Protected API routes
  if (pathname.startsWith('/api')) {
    const token = request.headers.get('authorization');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      const user = await verifyAuth(token);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', user.id);

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/admin/:path*'
  ]
};
```

Route Handler側でMiddlewareから渡されたデータを活用：

```typescript
// app/api/protected/route.ts
export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id');

  const userData = await fetchUser(userId);
  return NextResponse.json({ data: userData });
}
```

Middlewareを活用することで、複数のRoute Handlerで繰り返される認証ロジックを一元化し、コードの保守性を大幅に向上させられます。

## ベストプラクティスのまとめと設計パターン

### API設計の判断フロー

1. **CRUD操作をシンプルに実装したい？**
   → Server Actionsを優先検討

2. **複雑なビジネスロジックが必要？**
   → Route Handlerで実装

3. **グローバルユーザーへの高速レスポンスが必須？**
   → Edge Runtimeの導入を検討

4. **複数のエンドポイントで共通の前処理が必要？**
   → Middlewareで一元化

### セキュリティに関する重要な注意点

```typescript
// セキュアなAPI設計例
export async function POST(request: NextRequest) {
  // 1. Content-Type検証
  const contentType = request.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return NextResponse.json(
      { error: 'Invalid content type' },
      { status: 400 }
    );
  }

  // 2. レート制限の実装
  const ip = request.ip || request.headers.get('x-forwarded-for');
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // 3. CORS対応
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  // 4. リクエストボディの検証
  const body = await request.json();
  const validated = await validateSchema(body);
  
  if (!validated.success) {
    return NextResponse.json(
      { errors: validated.errors },
      { status: 400 }
    );
  }

  // API処理実行
  return NextResponse.json({ success: true });
}
```

## 次のステップ

Next.js App Routerでのベストプラクティスを理解することで、本番環境に耐える堅牢なAPI設計が可能になります。まずは以下の手順で実践してみてください：

1. **既存プロジェクトの監査**：現在のAPI実装がベストプラクティスに沿っているか確認

2. **段階的な改善**：セキュリティやエラーハンドリングを強化する

3. **パフォーマンス測定**：Vercelのダッシュボードなどで実際の改善効果を確認

4. **チーム内での知識共有**：ベストプラクティスをドキュメント化し、チーム全体で統一したAPI設計を実現

これらの実装パターンをマスターすることで、スケーラブルで保守性の高いNext.jsアプリケーションを構築できるようになります。