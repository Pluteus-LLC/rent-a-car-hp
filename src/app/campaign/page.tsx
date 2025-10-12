import Link from 'next/link';

export default function CampaignPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              プルテウスレンタカー
            </h1>
            <Link
              href="/"
              className="text-orange-500 hover:text-orange-600 transition font-semibold text-sm md:text-base"
            >
              ← 予約ページに戻る
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Campaign Banner */}
        <div className="bg-orange-100 border-2 border-orange-300 rounded-2xl p-6 mb-12 text-center shadow-md">
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            利用後購入キャンペーン実施中！ <span className="text-base md:text-lg font-normal text-gray-700">（2025年12月31日まで）</span>
          </p>
        </div>

        {/* Campaign Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            テスラ体験からテスラオーナーへ
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            試乗車ではできない&quot;テスラのある生活&quot;体験キャンペーン
          </p>
        </div>

        {/* Main Message */}
        <div className="bg-orange-50 border-2 border-orange-500 rounded-xl p-8 mb-12">
          <p className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-4">
            レンタル後、テスラをご購入の方には<br />
            ご利用料金を半額キャッシュバック！
          </p>
          <p className="text-base md:text-lg text-gray-700 text-center">
            キャッシュバック分は、テスラ用のオプションパーツなどの購入に使うもよし、<br />
            テスラライフの楽しさが広がります
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white border border-gray-300 rounded-xl p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b pb-4">
            ○特典内容○
          </h3>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-lg font-bold text-gray-900 mb-3">
                利用料金の総額から半額キャッシュバック
              </p>
              <p className="text-xl font-bold text-orange-500 mb-4">
                →もしご利用から１ヶ月以内に購入の場合、なんと全額キャッシュバック！！
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  ※利用条件（下記3つすべてを満たす必要があります）:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
                  <li>当社から発行のテスラ紹介コードを利用</li>
                  <li>6<span className="text-[10px]">時間</span>以上のレンタカー利用</li>
                  <li>2025年12月31日までにコードを利用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Period Section */}
        <div className="bg-white border border-gray-300 rounded-xl p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center border-b pb-4">
            ○期間○
          </h3>
          <p className="text-xl text-gray-900 text-center font-semibold">
            2025年12月31日まで
          </p>
        </div>

        {/* Terms Section */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            -利用規約-
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>※当社発行のコードを利用した場合のみ有効です。</p>
            <p>※キャッシュバック金額は、ご利用時の決済金額（割引適用後）を基準として計算いたします。</p>
            <p>※車両購入時、証拠となる画像や書類の提出を求める場合があります。</p>
            <p>※キャッシュバック対象は、日本国内の正規 Tesla Store または公式オンラインストアでの新車購入に限ります。中古車・並行輸入車の購入は対象外となります。</p>
            <p>※利用後にキャンセル・返金・不正利用が判明した場合、キャッシュバックの対象外または返金をお願いする場合があります。</p>
            <p>※予告なく内容の変更やキャンペーンの終了を行う可能性があります。</p>
            <p>※他の割引を併用する場合、プルテウスレンタカーSNS のフォロー、ならびにSNS への投稿が必要となります。</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-xl transition shadow-lg text-lg"
          >
            予約ページに戻る
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-300 mt-16 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-600">
          <p>© 2025 プルテウスレンタカー All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
