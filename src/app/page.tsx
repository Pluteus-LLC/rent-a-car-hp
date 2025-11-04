'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from '@/components/Header';

const BookingPage = dynamic(() => import('@/components/BookingPage'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <section id="booking" className="w-full min-h-screen">
        <BookingPage />
      </section>

      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Image
            src="/プルテウスレンタカー.webp"
            alt="プルテウスレンタカー"
            width={1600}
            height={800}
            className="w-full h-auto rounded-xl shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Vehicle Information */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">車両一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 tracking-wide">- 北海道（安平町）-</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">TESLA Model 3 - Long Range [外装色：白 / 内装色：白]</p>
          </div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 tracking-wide">- 福岡（福岡市東区）-</h3>
            <div className="inline-block bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border border-orange-200 dark:border-orange-700 rounded-xl px-4 py-2 mb-3">
              <p style={{marginBottom: 0}} className="text-orange-600 dark:text-orange-400 font-semibold text-sm">☆11月1日より、福岡市千早駅 徒歩１分半の場所に！☆</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">TESLA Model Y - RWD [外装色：白 / 内装色：黒]</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* Social Media Links */}
        <div className="text-center mb-24 py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            最新情報は<a href="https://x.com/pluteusrentacar" className="text-orange-500 hover:text-orange-600 font-semibold">公式X</a>、<a href="https://www.instagram.com/pluteus_rent_a_car/" className="text-orange-500 hover:text-orange-600 font-semibold">Instagram</a>で
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://x.com/pluteusrentacar" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/pluteus_rent_a_car/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@pluteus_rent_a_car" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.302-1.875-1.302-2.992V.93h-3.194v11.11c0 .58-.237 1.14-.659 1.562a2.242 2.242 0 0 1-1.593.659c-1.227 0-2.232-1.005-2.232-2.232 0-1.227 1.005-2.232 2.232-2.232.117 0 .232.009.344.028V6.472a5.555 5.555 0 0 0-.344-.01C6.982 6.462 3.67 9.773 3.67 13.783s3.312 7.321 7.322 7.321c4.009 0 7.321-3.312 7.321-7.321V8.796c1.424 1.02 3.175 1.622 5.035 1.622v-3.194c-1.226 0-2.359-.373-3.027-1.662z"/>
              </svg>
            </a>
            <a href="https://xhslink.com/m/3Ltfyyw7yzY" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110">
              <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded">
                <span className="text-white text-[10px] font-bold">小红書</span>
              </div>
            </a>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-24" style={{ scrollMarginTop: '120px' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">料金表{'\u2009'}<span className="text-sm">全て税込み</span></h2>

          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                  <th className="py-3 md:py-4 px-0.5 md:px-1 text-left text-sm md:text-xl text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-900 z-10"></th>
                  <th className="py-3 md:py-4 px-0.5 md:px-1 text-center text-sm md:text-xl text-gray-900 dark:text-white number font-normal">3<span className="text-xs md:text-sm">{'\u2009'}時間</span></th>
                  <th className="py-3 md:py-4 px-0.5 md:px-1 text-center text-sm md:text-xl text-gray-900 dark:text-white number font-normal">6<span className="text-xs md:text-sm">{'\u2009'}時間</span></th>
                  <th className="py-3 md:py-4 px-0.5 md:px-1 text-center text-xs md:text-sm text-gray-900 dark:text-white number font-normal">6<span className="text-[10px] md:text-sm">{'\u2009'}時間以降</span><br/><span className="text-sm md:text-xl number">1</span><span className="text-[10px] md:text-sm">{'\u2009'}時間毎</span></th>
                  <th className="py-3 md:py-4 px-0.5 md:px-1 text-center text-xs md:text-sm text-orange-500 dark:text-white number font-normal">超過<br/><span className="text-sm md:text-xl number">1</span><span className="text-[10px] md:text-sm">{'\u2009'}時間毎</span></th>
                  <th className="py-3 md:py-4 px-0.5 md:px-1 text-center text-xs md:text-sm text-orange-500 dark:text-white number font-normal">超過<br/><span className="text-sm md:text-xl number">1</span><span className="text-[10px] md:text-sm">{'\u2009'}日毎</span></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 md:py-4 px-0.5 md:px-1 sticky left-0 bg-white dark:bg-gray-900 z-10">
                    <div className="font-semibold text-gray-900 dark:text-white text-xs md:text-base">北海道</div>
                    <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Model 3</div>
                  </td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">5,500<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">8,800<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">880<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">1,320<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">31,680<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 md:py-4 px-0.5 md:px-1 sticky left-0 bg-white dark:bg-gray-900 z-10">
                    <div className="font-semibold text-gray-900 dark:text-white text-xs md:text-base">福岡県</div>
                    <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Model Y</div>
                  </td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">6,600<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">10,560<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">1,100<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">1,650<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                  <td className="py-3 md:py-4 px-0.5 md:px-1 text-center text-gray-900 dark:text-white text-sm md:text-2xl">39,600<span className="text-[10px] md:text-sm">{'\u2009'}円</span></td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">ご利用に関する注意事項</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 上記価格は税込です</li>
              <li>• CHAdeMO・J1772アダプター・e-Mobility Power充電カードは無料で貸し出し</li>
              <li>• レンタカーご利用中の充電代(SC,当社からの貸出の充電カードをご利用の充電)は基本無料</li>
              <li>• レンタカー以外への充電カードの利用が判明した場合、別途料金を請求いたします</li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">ノンオペレーションチャージ（ＮＯＣ）</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 自走可能な場合：33,000<span className="text-[10px]">{'\u2009'}円（税込）</span></li>
                <li>• 自走不可の場合：55,000<span className="text-[10px]">{'\u2009'}円（税込）</span></li>
              </ul>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">車両の配達（配車引取料）</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 営業所から半径30km以内：3,000<span className="text-[10px]">{'\u2009'}円(税込)</span></li>
                <li>• 30km以上：超過1kmあたり100<span className="text-[10px]">{'\u2009'}円(税込)</span></li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">※片道単位</p>
            </div>
          </div>
        </div>
      </main>

      {/* キャンペーンセクション */}
      <section className="max-w-5xl mx-auto px-6 py-16 mb-12">
        <a
          href="/exclusiveoffer/offer0001"
          className="block max-w-2xl mx-auto bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 rounded-2xl overflow-hidden border-2 border-amber-200 dark:border-amber-800/50 transition-all duration-300 hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-700 hover:scale-[1.01] cursor-pointer"
          style={{
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.15)',
          }}
        >
          <div className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-2 leading-tight">
              充電はオーナーの奢りで
            </h2>
            <p className="text-base md:text-lg font-semibold text-orange-600 dark:text-orange-400 text-center mb-8">
              北海道の宿×レンタカー 優待キャンペーン
            </p>

            {/* 4枚の画像をグリッド配置 */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md">
                <img
                  src="/img/exclusive/obihiro_stay1_1.avif"
                  alt="プライベートサウナ付きコテージカンノンサウナ"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md">
                <img
                  src="/img/exclusive/obihiro_stay1_2.avif"
                  alt="カンノンサウナ サウナ室内"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md">
                <img
                  src="/img/exclusive/obihiro_stay2_1.avif"
                  alt="ファームステイBIEI 外観"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md">
                <img
                  src="/img/exclusive/obihiro_stay2_2.avif"
                  alt="ファームステイBIEI 農園"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                プルテウスレンタカーを利用いただき、<br />
                宿泊予約時に<span className="font-semibold text-orange-600 dark:text-orange-400">「充電はレンタカーの奢りで」</span><br />
                と申していただければ<br />
                <span className="font-bold text-gray-900 dark:text-white text-base">充電をプレゼント</span>
              </p>
              <div className="inline-flex items-center justify-center text-sm font-semibold text-orange-600 dark:text-orange-400">
                <span>詳細は画像をタップ</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">&copy; 2025 プルテウスレンタカー. All rights reserved.</p>
          <p className="text-[8px] text-gray-400">
            運営は合同会社プルテウス <a href="https://pluteus.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 underline">https://pluteus.co.jp/</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
