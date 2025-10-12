'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <>
      {/* Campaign Banner */}
      <a
        href="/campaign"
        className="fixed top-0 left-0 right-0 z-50 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition text-center py-2 px-4 cursor-pointer"
      >
        <p className="text-sm md:text-base text-gray-900 dark:text-white">
          利用後購入キャンペーン実施中！
        </p>
      </a>

      <header className="fixed top-10 left-0 right-0 z-50 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="hover:opacity-80 transition cursor-pointer">
              <h1 className="hidden md:block text-2xl font-bold text-gray-900 dark:text-white" style={{ margin: 0 }}>
                <span className="text-sm">北海道と福岡のテスラレンタカー</span><br />
                プルテウスレンタカー
              </h1>
              <h1 className="text-sm font-bold text-gray-900 dark:text-white md:hidden" style={{ margin: 0 }}>
                <span style={{fontSize: '8px'}}>北海道と福岡のテスラレンタカー</span><br />
                プルテウスレンタカー
              </h1>
            </Link>
            <div className="flex items-center gap-2 md:gap-6">
              <nav className="flex gap-6 items-center justify-end md:justify-start">
                <a
                  href="#booking"
                  className="hidden md:block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-semibold"
                >
                  予約
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-semibold"
                >
                  料金
                </a>
              </nav>

              {/* SNS Links */}
              <div className="flex gap-3 ml-2 md:ml-4 border-l border-gray-300 dark:border-gray-700 pl-4">
                {/* X (Twitter) */}
                <a
                  href="https://x.com/pluteusrentacar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/pluteus_rent_a_car/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@pluteus_rent_a_car"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.302-1.875-1.302-2.992V.93h-3.194v11.11c0 .58-.237 1.14-.659 1.562a2.242 2.242 0 0 1-1.593.659c-1.227 0-2.232-1.005-2.232-2.232 0-1.227 1.005-2.232 2.232-2.232.117 0 .232.009.344.028V6.472a5.555 5.555 0 0 0-.344-.01C6.982 6.462 3.67 9.773 3.67 13.783s3.312 7.321 7.322 7.321c4.009 0 7.321-3.312 7.321-7.321V8.796c1.424 1.02 3.175 1.622 5.035 1.622v-3.194c-1.226 0-2.359-.373-3.027-1.662z"/>
                  </svg>
                </a>

                {/* RedNote (小红書) */}
                <a
                  href="https://xhslink.com/m/3Ltfyyw7yzY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition transform hover:scale-110"
                >
                  <div className="w-5 h-5 flex items-center justify-center bg-red-600 rounded">
                    <span className="text-white text-[6px] font-bold">小红書</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
