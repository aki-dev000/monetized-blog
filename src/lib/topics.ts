export type Topic = {
  title: string
  category: string
  tags: string[]
  keywords: string[]
}

export const TOPICS: Topic[] = [
  // Web開発
  {
    title: 'TypeScriptの型システムを完全理解する',
    category: 'Web開発',
    tags: ['TypeScript', 'JavaScript', 'プログラミング'],
    keywords: ['ジェネリクス', 'ユニオン型', '型推論', 'satisfies'],
  },
  {
    title: 'Next.js App RouterでのAPI設計ベストプラクティス',
    category: 'Web開発',
    tags: ['Next.js', 'TypeScript', 'API設計'],
    keywords: ['Route Handler', 'Server Actions', 'Edge Runtime', 'Middleware'],
  },
  {
    title: 'Tailwind CSS v4の新機能と移行方法',
    category: 'Web開発',
    tags: ['Tailwind CSS', 'CSS', 'フロントエンド'],
    keywords: ['ユーティリティクラス', 'JIT', 'カスタマイズ', 'v4新機能'],
  },
  {
    title: 'Vercelデプロイで絶対に知っておきたい設定10選',
    category: 'Web開発',
    tags: ['Vercel', 'デプロイ', 'インフラ'],
    keywords: ['環境変数', 'Edge Functions', 'Cron Jobs', 'Analytics'],
  },
  {
    title: 'React Server Componentsでパフォーマンスを最大化する方法',
    category: 'Web開発',
    tags: ['React', 'Next.js', 'パフォーマンス'],
    keywords: ['RSC', 'Suspense', 'ストリーミング', 'キャッシュ'],
  },
  {
    title: 'Prismaで始めるNext.jsフルスタック開発入門',
    category: 'Web開発',
    tags: ['Prisma', 'Next.js', 'データベース'],
    keywords: ['ORM', 'マイグレーション', 'スキーマ定義', 'PostgreSQL'],
  },
  // SEO
  {
    title: 'Google Search Console完全活用ガイド【2026年版】',
    category: 'SEO',
    tags: ['SEO', 'Google', 'アクセス解析'],
    keywords: ['検索パフォーマンス', 'インデックス登録', 'コアウェブバイタル', 'サイトマップ'],
  },
  {
    title: 'コアウェブバイタル（Core Web Vitals）を改善する具体的な方法',
    category: 'SEO',
    tags: ['SEO', 'パフォーマンス', 'Googleランキング'],
    keywords: ['LCP', 'FID', 'CLS', 'INP', 'PageSpeed Insights'],
  },
  {
    title: 'AIライティングツールを使ったSEO記事の書き方',
    category: 'SEO',
    tags: ['SEO', 'AIライティング', 'コンテンツ作成'],
    keywords: ['Claude', 'ChatGPT', 'E-E-A-T', 'キーワード選定'],
  },
  {
    title: '内部リンク戦略でSEO評価を底上げする方法',
    category: 'SEO',
    tags: ['SEO', '内部リンク', 'サイト構造'],
    keywords: ['ピラーコンテンツ', 'クラスターモデル', 'アンカーテキスト'],
  },
  // 収益化
  {
    title: 'Google AdSense収益を最大化する広告配置の法則',
    category: '収益化',
    tags: ['AdSense', '収益化', 'ブログ運営'],
    keywords: ['RPM', 'CTR', '広告ユニット', 'ビューアビリティ'],
  },
  {
    title: 'Amazonアソシエイトで稼ぐブログ記事の書き方',
    category: '収益化',
    tags: ['アフィリエイト', 'Amazon', '収益化'],
    keywords: ['商品リンク', 'レビュー記事', '比較記事', 'コンバージョン率'],
  },
  {
    title: 'noteで月10万円を稼ぐコンテンツ販売戦略',
    category: '収益化',
    tags: ['note', 'コンテンツ販売', '副業'],
    keywords: ['有料記事', 'メンバーシップ', 'マガジン', '定期購読'],
  },
  {
    title: '副業ブログで月5万円達成するためのロードマップ【実践編】',
    category: '収益化',
    tags: ['副業', 'ブログ収益化', 'SEO'],
    keywords: ['ジャンル選定', '記事数', 'PV目標', '収益シミュレーション'],
  },
  {
    title: 'デジタルコンテンツ販売で不労所得を作る仕組みづくり',
    category: '収益化',
    tags: ['デジタル商品', '不労所得', '副業'],
    keywords: ['電子書籍', 'テンプレート', 'Gumroad', 'Base'],
  },
  // AIエージェント
  {
    title: 'Claude APIで業務自動化ツールを作る実践ガイド',
    category: 'AIエージェント',
    tags: ['Claude', 'Anthropic', 'AI活用'],
    keywords: ['Tool Use', 'プロンプト設計', 'ストリーミング', 'APIコスト'],
  },
  {
    title: 'AIエージェントで副業収入を作る3つの方法',
    category: 'AIエージェント',
    tags: ['AIエージェント', '副業', '収益化'],
    keywords: ['自動化', 'コンテンツ生成', 'SaaS', 'API連携'],
  },
  {
    title: 'n8nで作るノーコードAI自動化ワークフロー入門',
    category: 'AIエージェント',
    tags: ['n8n', '自動化', 'ノーコード'],
    keywords: ['ワークフロー', 'Webhook', 'スケジュール実行', 'API連携'],
  },
  {
    title: 'Anthropic Claude APIの料金を抑えながら使い倒す方法',
    category: 'AIエージェント',
    tags: ['Claude', 'API', 'コスト最適化'],
    keywords: ['キャッシュ', 'Haiku', 'Sonnet', 'トークン管理'],
  },
  {
    title: 'OpenAI APIとClaude APIの選び方と使い分けガイド',
    category: 'AIエージェント',
    tags: ['OpenAI', 'Claude', 'AI比較'],
    keywords: ['GPT-4o', 'Claude Sonnet', 'コスト比較', 'ユースケース'],
  },
  // 資産形成
  {
    title: 'エンジニアが副業で資産1000万円を作るためのロードマップ',
    category: '資産形成',
    tags: ['副業', '資産形成', 'エンジニア'],
    keywords: ['インデックス投資', '副収入', '節税', 'NISA'],
  },
  {
    title: '新NISAを最大活用するエンジニアの投資戦略2026',
    category: '資産形成',
    tags: ['NISA', '投資', '資産形成'],
    keywords: ['成長投資枠', 'つみたて投資枠', 'オルカン', 'S&P500'],
  },
  {
    title: 'フリーランスエンジニアの節税対策完全ガイド',
    category: '資産形成',
    tags: ['フリーランス', '節税', '確定申告'],
    keywords: ['青色申告', '経費', '小規模企業共済', '法人化'],
  },
]

export function getUnusedTopics(existingSlugs: string[]): Topic[] {
  return TOPICS.filter(topic => {
    const slug = topicToSlug(topic.title)
    return !existingSlugs.some(s => s === slug || s.includes(slug.substring(0, 10)))
  })
}

export function topicToSlug(title: string): string {
  const map: Record<string, string> = {
    'TypeScriptの型システムを完全理解する': 'typescript-type-system-complete-guide',
    'Next.js App RouterでのAPI設計ベストプラクティス': 'nextjs-app-router-api-best-practices',
    'Tailwind CSS v4の新機能と移行方法': 'tailwindcss-v4-new-features-migration',
    'Vercelデプロイで絶対に知っておきたい設定10選': 'vercel-deploy-settings-10-tips',
    'React Server Componentsでパフォーマンスを最大化する方法': 'react-server-components-performance',
    'Prismaで始めるNext.jsフルスタック開発入門': 'prisma-nextjs-fullstack-introduction',
    'Google Search Console完全活用ガイド【2026年版】': 'google-search-console-complete-guide-2026',
    'コアウェブバイタル（Core Web Vitals）を改善する具体的な方法': 'core-web-vitals-improvement-guide',
    'AIライティングツールを使ったSEO記事の書き方': 'ai-writing-tool-seo-article-guide',
    '内部リンク戦略でSEO評価を底上げする方法': 'internal-link-strategy-seo-boost',
    'Google AdSense収益を最大化する広告配置の法則': 'google-adsense-revenue-maximize-placement',
    'Amazonアソシエイトで稼ぐブログ記事の書き方': 'amazon-associate-blog-writing-guide',
    'noteで月10万円を稼ぐコンテンツ販売戦略': 'note-monthly-100k-content-strategy',
    '副業ブログで月5万円達成するためのロードマップ【実践編】': 'side-blog-50k-monthly-roadmap',
    'デジタルコンテンツ販売で不労所得を作る仕組みづくり': 'digital-content-sales-passive-income',
    'Claude APIで業務自動化ツールを作る実践ガイド': 'claude-api-automation-tool-guide',
    'AIエージェントで副業収入を作る3つの方法': 'ai-agent-side-income-3-methods',
    'n8nで作るノーコードAI自動化ワークフロー入門': 'n8n-nocode-ai-automation-workflow',
    'Anthropic Claude APIの料金を抑えながら使い倒す方法': 'claude-api-cost-optimization-guide',
    'OpenAI APIとClaude APIの選び方と使い分けガイド': 'openai-vs-claude-api-comparison',
    'エンジニアが副業で資産1000万円を作るためのロードマップ': 'engineer-side-hustle-10million-roadmap',
    '新NISAを最大活用するエンジニアの投資戦略2026': 'nisa-engineer-investment-strategy-2026',
    'フリーランスエンジニアの節税対策完全ガイド': 'freelance-engineer-tax-saving-guide',
  }
  return map[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
