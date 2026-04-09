import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Neiro Signal'

  return (
    <footer style={{ borderTop: '1px solid var(--border-warm)' }} className="mt-16">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[10px] font-light tracking-[0.35em] uppercase"
                style={{ color: 'var(--accent-gold)' }}
              >
                Neiro
              </span>
              <span className="text-[13px] font-medium tracking-[0.08em]" style={{ opacity: 0.7 }}>
                Signal
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ opacity: 0.5 }}>
              Neiro Inc. の技術シグナルを届けるブログ。Web開発・AI・SEO・収益化の実践情報。
            </p>
          </div>
          <div>
            <p
              className="text-[10px] font-medium uppercase tracking-[0.3em] mb-3"
              style={{ color: 'var(--accent-gold)' }}
            >
              Content
            </p>
            <ul className="space-y-2 text-sm" style={{ opacity: 0.5 }}>
              <li>
                <Link href="/posts" className="transition-opacity hover:opacity-80">記事一覧</Link>
              </li>
              <li>
                <Link href="/categories" className="transition-opacity hover:opacity-80">カテゴリ</Link>
              </li>
              <li>
                <Link href="/tags" className="transition-opacity hover:opacity-80">タグ</Link>
              </li>
            </ul>
          </div>
          <div>
            <p
              className="text-[10px] font-medium uppercase tracking-[0.3em] mb-3"
              style={{ color: 'var(--accent-gold)' }}
            >
              Legal
            </p>
            <ul className="space-y-2 text-sm" style={{ opacity: 0.5 }}>
              <li>
                <Link href="/privacy" className="transition-opacity hover:opacity-80">プライバシーポリシー</Link>
              </li>
            </ul>
            <p className="text-xs mt-4" style={{ opacity: 0.3 }}>
              ※本サイトには広告・アフィリエイトリンクが含まれます。
            </p>
          </div>
        </div>
        <div
          className="pt-6 text-center text-xs"
          style={{ borderTop: '1px solid var(--border-warm)', opacity: 0.4 }}
        >
          © {year} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
