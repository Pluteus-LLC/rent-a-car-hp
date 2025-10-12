'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="text-2xl font-bold text-gray-900">
              プルテウスレンタカー
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#features" className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition">
              特徴
            </Link>
            <Link href="/#pricing" className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition">
              料金表
            </Link>
            <Link href="/#booking" className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition">
              予約
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
