'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdSenseUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'vertical'
  className?: string
}

export function AdSenseUnit({ slot, format = 'auto', className = '' }: AdSenseUnitProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (clientId) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {}
    }
  }, [clientId])

  if (!clientId) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-sm py-8 ${className}`}>
        広告スペース
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
