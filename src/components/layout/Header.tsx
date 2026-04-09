import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Search } from 'lucide-react'

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80"
      style={{ borderBottom: '1px solid var(--border-warm)' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-80">
            <span
              className="text-[10px] font-light tracking-[0.35em] uppercase"
              style={{ color: 'var(--accent-gold)' }}
            >
              Neiro
            </span>
            <span
              className="text-[13px] font-medium tracking-[0.08em]"
              style={{ opacity: 0.7 }}
            >
              Signal
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm" style={{ opacity: 0.5 }}>
            <Link href="/posts" className="transition-colors duration-300 hover:opacity-100" style={{ opacity: 0.8 }}>
              記事一覧
            </Link>
            <Link href="/categories" className="transition-colors duration-300 hover:opacity-100" style={{ opacity: 0.8 }}>
              カテゴリ
            </Link>
            <Link href="/tags" className="transition-colors duration-300 hover:opacity-100" style={{ opacity: 0.8 }}>
              タグ
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 rounded-sm transition-colors hover:opacity-70"
              aria-label="検索"
            >
              <Search size={18} />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
