import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Neiro Signalのプライバシーポリシーページです。個人情報の取り扱い、広告・アクセス解析について説明します。',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Neiro Signal'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monetized-blog.vercel.app'

  return (
    <div className="container mx-auto px-4 max-w-3xl py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">プライバシーポリシー</h1>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">

        <section>
          <p>
            当サイト「{siteName}」（{siteUrl}、以下「当サイト」）は、ユーザーのプライバシーを尊重し、
            個人情報の保護に努めています。本プライバシーポリシーは、当サイトにおける個人情報の取り扱いについて説明します。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">広告について</h2>
          <p>
            当サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。
            Google AdSenseは、ユーザーの興味に応じた広告を表示するため、Cookieを使用することがあります。
            Cookieを無効にする設定や、Google広告のオプトアウトページにアクセスすることで、
            パーソナライズ広告を無効にすることができます。
          </p>
          <p className="mt-2">
            詳しくは
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline mx-1"
            >
              Googleの広告に関するポリシー
            </a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。
            Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。
            このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
            Cookieを無効にすることで、データ収集を拒否することができます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">アフィリエイトについて</h2>
          <p>
            当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
            また、その他のアフィリエイトプログラムに参加する場合があります。
            アフィリエイトリンクには <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">rel="sponsored"</code> が付与されています。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">免責事項</h2>
          <p>
            当サイトのコンテンツや情報において、可能な限り正確な情報を掲載するよう努めています。
            しかし、誤情報が入り込んだり、情報が古くなっている場合もあります。
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">著作権について</h2>
          <p>
            当サイトに掲載されている文章・画像等のコンテンツの著作権は、当サイト管理者に帰属します。
            法的に認められている引用の範囲内での使用を除き、無断での転用・転載はお断りしています。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">プライバシーポリシーの変更</h2>
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のプライバシーポリシーは、当ページに掲載された時点から効力を生じるものとします。
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            制定日：2026年1月1日
          </p>
        </section>

      </div>
    </div>
  )
}
