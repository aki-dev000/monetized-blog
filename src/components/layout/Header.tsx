import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
            {process.env.NEXT_PUBLIC_SITE_NAME || 'Neiro Signal'}
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link href="/posts" className="hover:text-gray-900 dark:hover:text-white transition-colors">記事一覧</Link>
            <Link href="/categories" className="hover:text-gray-900 dark:hover:text-white transition-colors">カテゴリ</Link>
            <Link href="/tags" className="hover:text-gray-900 dark:hover:text-white transition-colors">タグ</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/search" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="検索">
              <Search size={20} />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
