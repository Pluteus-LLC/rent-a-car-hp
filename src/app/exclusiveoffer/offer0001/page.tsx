'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Offer0001() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white dark:from-gray-900 dark:via-orange-950/10 dark:to-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">戻る</span>
          </button>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            プルテウスレンタカー
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            充電はオーナーの奢りで
            <br />
            <span className="text-orange-600 dark:text-orange-400">宿×レンタカー 優待キャンペーン</span>
          </h1>
          <div className="max-w-2xl mx-auto space-y-3 mt-8">
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              プルテウスレンタカーを利用いただき、<br className="md:hidden" />
              下記の宿を予約すると、充電をプレゼント
            </p>
            <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
              TESLA×自然で癒やされる旅を楽しもう
            </p>
          </div>
        </div>

        {/* 画像ギャラリー */}
        <div className="mb-20">
          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
            {[
              { src: '/img/exclusive/obihiro_stay1_1.avif', alt: 'プライベートサウナ付きコテージカンノンサウナ - 北海道帯広市の日高山脈を一望できる宿泊施設' },
              { src: '/img/exclusive/obihiro_stay1_2.avif', alt: 'カンノンサウナのプライベートサウナ室内 - 道産カラマツを使用した癒しの空間' },
              { src: '/img/exclusive/obihiro_stay2_1.avif', alt: 'ファームステイBIEI - 38Haの農地に囲まれた貸切コテージ外観' },
              { src: '/img/exclusive/obihiro_stay2_2.avif', alt: 'ファームステイBIEIの広大な農園風景 - 北海道の大自然を満喫' },
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === index ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 特典内容 */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            特典内容
          </h2>
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-10">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-orange-100 dark:bg-orange-900/30 rounded-full px-6 py-2 mb-2">
                <span className="text-orange-700 dark:text-orange-300 font-semibold text-sm">
                  特典の受け方
                </span>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                プルテウスレンタカーを利用いただき、<br />
                宿泊予約時に
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 rounded-xl p-6 my-6">
                <p style={{marginBottom: 0}} className="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">
                  「充電はレンタカーの奢りで」
                </p>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                と申していただければ
              </p>
              <div className="pt-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  充電をプレゼント
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 対象の宿 */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            対象の宿
          </h2>

          <div className="space-y-12 max-w-3xl mx-auto">
            {/* カンノンサウナ */}
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    プライベートサウナ付きコテージカンノンサウナ
                  </h3>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">北海道帯広市</span>
                </div>

                {/* 画像 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                    <img
                      src="/img/exclusive/obihiro_stay1_1.avif"
                      alt="カンノンサウナ"
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                    <img
                      src="/img/exclusive/obihiro_stay1_2.avif"
                      alt="カンノンサウナ"
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* 説明文 */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  コンセプトは「北海道・十勝の畑と日高山脈を一望できる みんなのサウナ付き宿泊施設カンノンサウナ」は、一日一組限定・素泊まりの宿。<br />
                  道産カラマツの呼吸する室内、併設のプライベートサウナでは選べるrentoのアロマオイル8種でセルフロウリュが可能
                </p>

                {/* ボタン */}
                <a
                  href="https://www.airbnb.jp/rooms/9943726"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  宿の詳細をみる
                </a>
              </div>
            </article>

            {/* ファームステイBIEI */}
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    ファームステイBIEI
                  </h3>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">北海道帯広市</span>
                </div>

                {/* 画像 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                    <img
                      src="/img/exclusive/obihiro_stay2_1.avif"
                      alt="ファームステイBIEI"
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                    <img
                      src="/img/exclusive/obihiro_stay2_2.avif"
                      alt="ファームステイBIEI"
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* 説明文 */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  38Haの自社農地を含む辺り一面を畑に囲まれた農家の「はなれ」を貸切で提供。<br />
                  隣接する母屋にオーナーがいるので観光案内も可能、有事も安心です。<br />
                  オプションとして農業体験も可能
                </p>

                {/* ボタン */}
                <a
                  href="https://www.airbnb.jp/rooms/26066096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  宿の詳細をみる
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-2xl border-2 border-orange-200 dark:border-orange-800 p-8 md:p-10 text-center shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              レンタカーのご予約はこちら
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
              北海道でのTESLAレンタカー体験をお楽しみください
            </p>
            <button
              onClick={() => router.push('/booking')}
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              予約ページへ
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 プルテウスレンタカー All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
