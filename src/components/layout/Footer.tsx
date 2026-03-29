import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'TechBlog'

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 mt-16">
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">{siteName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Web開発・SEO・収益化に関する実践的な情報をお届けします。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">コンテンツ</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/posts" className="hover:text-gray-900 dark:hover:text-white transition-colors">記事一覧</Link></li>
              <li><Link href="/categories" className="hover:text-gray-900 dark:hover:text-white transition-colors">カテゴリ</Link></li>
              <li><Link href="/tags" className="hover:text-gray-900 dark:hover:text-white transition-colors">タグ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">情報</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">プライバシーポリシー</Link></li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              ※本サイトには広告・アフィリエイトリンクが含まれます。
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {year} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
