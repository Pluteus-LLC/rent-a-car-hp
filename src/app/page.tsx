'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const BookingPage = dynamic(() => import('@/components/BookingPage'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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

        {/* Available Locations */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">レンタル可能事業所</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">福岡県(福津市)</h4>
              <p className="text-gray-600 dark:text-gray-400">Model Y</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">北海道(安平町)</h4>
              <p className="text-gray-600 dark:text-gray-400">Model 3</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">料金表{'\u2009'}<span className="text-sm">全て税込み</span></h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                  <th className="py-4 px-4 text-left text-xl text-gray-900 dark:text-white">クラス</th>
                  <th className="py-4 px-4 text-center text-xl text-gray-900 dark:text-white number font-normal">3<span className="text-sm">{'\u2009'}時間</span></th>
                  <th className="py-4 px-4 text-center text-xl text-gray-900 dark:text-white number font-normal">6<span className="text-sm">{'\u2009'}時間</span></th>
                  <th className="py-4 px-4 text-center text-xl text-gray-900 dark:text-white number font-normal">6<span className="text-sm">{'\u2009'}時間以降</span><br/>1<span className="text-sm">{'\u2009'}時間毎</span></th>
                  <th className="py-4 px-4 text-center text-sm text-orange-500 dark:text-white number font-normal">超過料金<br/><span className="text-xl number">1</span><span className="text-sm">{'\u2009'}時間毎</span></th>
                  <th className="py-4 px-4 text-center text-sm text-orange-500 dark:text-white number font-normal">超過料金<br/><span className="text-xl number">1</span><span className="text-sm">{'\u2009'}日毎</span></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900 dark:text-white">北海道安平市</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Model 3</div>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">5,500<span className="text-[10px]">{'\u2009'}円</span></td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">8,800<span className="text-[10px]">{'\u2009'}円</span></td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">880<span className="text-[10px]">{'\u2009'}円</span></td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">1,320<span className="text-[10px]">{'\u2009'}円</span></td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">31,680<span className="text-[10px]">{'\u2009'}円</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900 dark:text-white">福岡県福津市</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Model Y</div>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">6,600<span className="text-[10px]">{'\u2009'}円</span></td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">10,560<span className="text-[10px]">{'\u2009'}円</span></td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">1,100<span className="text-[10px]">{'\u2009'}円</span></td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">1,650<span className="text-[10px]">{'\u2009'}円</span></td>
                  <td className="py-4 px-4 text-center text-gray-900 dark:text-white">39,600<span className="text-[10px]">{'\u2009'}円</span></td>
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
                <li>• 営業所から半径30km以内：3,000<span className="text-[10px]">{'\u2009'}円</span></li>
                <li>• 30km以上：超過1kmあたり100<span className="text-[10px]">{'\u2009'}円</span></li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">※片道単位</p>
            </div>
          </div>
        </div>
      </main>

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
