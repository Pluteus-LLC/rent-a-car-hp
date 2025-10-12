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
          <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-4">レンタカーの事前のご相談、最新の情報は<a className="text-blue-600 font-bold" href="https://x.com/pluteusrentacar"> 公式X(旧Twitter)</a> or <a className="text-blue-600 font-bold" href="https://www.instagram.com/pluteus_rent_a_car/">公式Instagram</a>まで！</h2>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-6">
            {/* X (Twitter) */}
            <a href="https://x.com/pluteusrentacar" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/pluteus_rent_a_car/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@pluteus_rent_a_car" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-black transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.302-1.875-1.302-2.992V.93h-3.194v11.11c0 .58-.237 1.14-.659 1.562a2.242 2.242 0 0 1-1.593.659c-1.227 0-2.232-1.005-2.232-2.232 0-1.227 1.005-2.232 2.232-2.232.117 0 .232.009.344.028V6.472a5.555 5.555 0 0 0-.344-.01C6.982 6.462 3.67 9.773 3.67 13.783s3.312 7.321 7.322 7.321c4.009 0 7.321-3.312 7.321-7.321V8.796c1.424 1.02 3.175 1.622 5.035 1.622v-3.194c-1.226 0-2.359-.373-3.027-1.662z"/>
              </svg>
            </a>

            {/* REDNOTE */}
            <a href="https://xhslink.com/m/3Ltfyyw7yzY" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-lg">
                <span className="text-white text-xs font-bold">小红书</span>
              </div>
            </a>
          </div>

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
