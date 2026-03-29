import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-24 text-center">
      <h1 className="text-8xl font-bold text-gray-200 dark:text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ページが見つかりません</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">お探しのページは移動または削除された可能性があります。</p>
      <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
        トップページへ戻る
      </Link>
    </div>
  )
}
