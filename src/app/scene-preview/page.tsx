'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const TeslaWithFlag = dynamic(() => import('@/components/TeslaWithFlag'), { ssr: false });

export default function ScenePreviewPage() {
  const [location, setLocation] = useState<string>('北海道');

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ margin: 0 }}>
                プルテウスレンタカー - シーンプレビュー
              </h1>
            </div>
            <Link
              href="/"
              className="text-orange-500 hover:text-orange-600 transition font-semibold"
            >
              ← ホームに戻る
            </Link>
          </div>
        </div>
      </header>

      {/* Location Selector */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200">
          <label className="block text-sm font-semibold mb-2 text-gray-900">
            表示する場所:
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setLocation('北海道')}
              className={`py-2 px-4 rounded-lg border-2 transition-all font-semibold text-sm ${
                location === '北海道'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-orange-300'
              }`}
            >
              北海道
            </button>
            <button
              type="button"
              onClick={() => setLocation('福岡')}
              className={`py-2 px-4 rounded-lg border-2 transition-all font-semibold text-sm ${
                location === '福岡'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-orange-300'
              }`}
            >
              福岡
            </button>
          </div>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="w-full h-screen">
        <TeslaWithFlag location={location} />
      </div>

      {/* Info Text */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-50 px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            さあ{location}でテスラが待っています
          </h2>
          <p className="text-sm text-gray-600">
            このシーンは予約確認時に表示されます
          </p>
        </div>
      </div>
    </div>
  );
}
