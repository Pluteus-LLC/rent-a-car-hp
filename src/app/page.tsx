import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M5 9h14l-1 7h-12z" />
                <path d="M5 5h14" />
                <path d="M8 5v4" />
                <path d="M16 5v4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">プルテウスレンタカー</h1>
              <p className="text-xs sm:text-sm">Pluteus Rent-a-Car</p>
            </div>
          </div>
          <nav className="flex space-x-4">
            <a href="#pricing" className="hover:underline text-sm sm:text-base">料金表</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-4">レンタカーの事前のご相談、最新の情報は<a className="text-blue-600 font-bold" href="https://x.com/pluteusrentacar"> 公式X(旧Twitter)</a> にて</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">プルテウスレンタカーは、「福岡県、北海道」で貸出中！</p>
        </div>

        {/* Main Image */}
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/プルテウスレンタカー.webp"
            alt="プルテウスレンタカー"
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
          />
        </div>

        {/* Available Vehicles/Locations Section */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-16">
          <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">プルテウスレンタカーのレンタル可能車両/事業所</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="inline-block bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-lg mb-2">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">⭐︎福岡県(福津市)⭐︎</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Model Y [料金:Aクラス]</p>
            </div>
            <div className="text-center">
              <div className="inline-block bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg mb-2">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">⭐︎北海道(安平町)⭐︎</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Model 3 [料金:Bクラス]</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">料金表</h2>
          
          {/* Pricing Table */}
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">クラス</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">３時間まで</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">６時間まで</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">6時間以降<br/>(1時間毎)</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">超過料金<br/>(１時間ごと)</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">超過料金<br/>(１日ごと)</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-4 whitespace-normal">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Bクラス</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">(モデル3 -2023・モデルS -2017)</div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥5,500</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥8,800</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥880</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥1,320</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥31,680</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-normal">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Aクラス</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">(モデル3 2024-・モデルY)</div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥6,600</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥10,560</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥1,100</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥1,650</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥39,600</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-normal">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Sクラス</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">(モデルS,X)</div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥7,700</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥12,320</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥1,320</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥1,980</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">¥47,520</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4">ご利用に関する注意事項</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>上記価格は税込です。</li>
              <li>CHAdeMO・J1772アダプター・e-Mobility Power充電カードは無料で貸し出しいたします。</li>
              <li>レンタカーご利用中の充電代(SC,当社からの貸出の充電カードをご利用の充電)は基本無料になります。</li>
              <li>レンタカー以外への充電カードの利用が判明した場合、別途料金を請求いたします。</li>
            </ul>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">ノンオペレーションチャージ（ＮＯＣ）</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>自走可能な場合・・・33,000円（税込）</li>
                <li>自走不可の場合・・・55,000円（税込）</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">車両の配達ご希望の場合（配車引取料）</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>営業所から半径30km以内の範囲・・・ 3,000円</li>
                <li>営業所から30km以上の超過1kmあたり100円</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">※片道単位</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm">&copy; 2025 プルテウスレンタカー. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-sm hover:underline">お問い合わせ</a> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
