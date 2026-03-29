interface AffiliateLinkProps {
  href: string
  children: React.ReactNode
  label?: string
  className?: string
  variant?: 'default' | 'button'
}

export function AffiliateLink({ href, children, label, className = '', variant = 'default' }: AffiliateLinkProps) {
  const baseClass = variant === 'button'
    ? `inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors ${className}`
    : `text-blue-600 dark:text-blue-400 underline hover:opacity-80 transition-opacity ${className}`

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener sponsored"
      aria-label={label}
      className={baseClass}
    >
      {children}
    </a>
  )
}
