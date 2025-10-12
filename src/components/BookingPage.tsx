'use client';

import { useState, useEffect } from 'react';
import { Select, DatePicker, Button, Checkbox, ConfigProvider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ja';
import locale from 'antd/locale/ja_JP';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

dayjs.locale('ja');

const TeslaScene = dynamic(() => import('@/components/TeslaScene'), { ssr: false });

// 15分単位の時刻オプションを生成
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push({
        value: timeString,
        label: timeString,
      });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

type AnimationState = 'entering' | 'parked-right' | 'parked-center';

interface PriceRate {
  threeHours: number;
  sixHours: number;
  additionalHour: number;
}

const priceRates: Record<string, PriceRate> = {
  北海道: {
    threeHours: 5500,
    sixHours: 8800,
    additionalHour: 880,
  },
  福岡: {
    threeHours: 6600,
    sixHours: 10560,
    additionalHour: 1100,
  },
};

export default function BookingPage() {
  const router = useRouter();
  const [animationState, setAnimationState] = useState<AnimationState>('entering');
  const [location, setLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<string>('12:00');
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<string>('12:00');
  const [price, setPrice] = useState<number | null>(null);
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);
  const [duration, setDuration] = useState<{ days: number; hours: number } | null>(null);
  const [airportPickup, setAirportPickup] = useState<boolean>(false);
  const [pickupRequest, setPickupRequest] = useState<boolean>(false);

  // 初回ロード時のアニメーション
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState('parked-right');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 価格アニメーション
  useEffect(() => {
    if (price === null) {
      setDisplayPrice(null);
      return;
    }

    const startPrice = displayPrice ?? 0;
    const duration = 800; // 0.8秒でアニメーション
    const steps = 40;
    const priceDiff = price - startPrice;
    const increment = priceDiff / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayPrice(price);
        clearInterval(timer);
      } else {
        setDisplayPrice(Math.round(startPrice + increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [price]);

  // 価格計算
  useEffect(() => {
    if (location && startDate && startTime && endDate && endTime) {
      // 時刻文字列をパース
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      // 開始日時と終了日時を結合
      const start = startDate.hour(startHour).minute(startMinute).second(0);
      const end = endDate.hour(endHour).minute(endMinute).second(0);

      // 時間差を計算
      const totalHours = end.diff(start, 'hour', true);
      const days = Math.floor(totalHours / 24);
      const remainingHours = totalHours % 24;

      if (totalHours > 0) {
        const rates = priceRates[location];
        let totalPrice = 0;

        if (totalHours <= 3) {
          totalPrice = rates.threeHours;
        } else if (totalHours <= 6) {
          totalPrice = rates.sixHours;
        } else {
          totalPrice = rates.sixHours + (totalHours - 6) * rates.additionalHour;
        }

        // 空港送迎オプションを追加
        if (airportPickup) {
          totalPrice += 5000;
        }

        setPrice(Math.round(totalPrice));
        setDuration({
          days: days,
          hours: Math.ceil(remainingHours),
        });
      } else {
        setPrice(null);
        setDuration(null);
      }
    } else {
      setPrice(null);
      setDuration(null);
    }
  }, [location, startDate, startTime, endDate, endTime, airportPickup]);

  const handleReservation = () => {
    const params = new URLSearchParams({
      location: location,
      startDate: startDate?.format('YYYY-MM-DD') || '',
      startTime: startTime,
      endDate: endDate?.format('YYYY-MM-DD') || '',
      endTime: endTime,
      airportPickup: airportPickup.toString(),
      pickupRequest: pickupRequest.toString(),
    });
    router.push(`/booking/contact?${params.toString()}`);
  };

  return (
    <ConfigProvider locale={locale}>
      <div
        className="min-h-screen bg-white text-gray-900 relative overflow-hidden font-sans"
      >
        {/* Campaign Banner */}
        <a
          href="/campaign"
          className="fixed top-0 left-0 right-0 z-50 bg-gray-300 hover:bg-gray-400 transition text-center py-2 px-4 cursor-pointer"
        >
          <p className="text-sm md:text-base text-gray-900">
            利用後購入キャンペーン実施中！
          </p>
        </a>

        {/* Header */}
        <header className="fixed top-10 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ margin: 0 }}>
                  プルテウスレンタカー
                </h1>
              </div>
              <div className="flex items-center gap-6">
                <nav className="flex gap-6 items-center">
                  <a
                    href="#booking"
                    className="text-orange-500 hover:text-orange-600 transition font-semibold"
                  >
                    予約
                  </a>
                  <a
                    href="#pricing"
                    className="text-gray-600 hover:text-gray-900 transition font-semibold"
                  >
                    料金
                  </a>
                </nav>

                {/* SNS Links */}
                <div className="flex gap-3 ml-4 border-l border-gray-300 pl-4">
                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/pluteusrentacar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition transform hover:scale-110"
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
                    className="text-gray-600 hover:text-gray-900 transition transform hover:scale-110"
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
                    className="text-gray-600 hover:text-gray-900 transition transform hover:scale-110"
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
                    className="text-gray-600 hover:text-gray-900 transition transform hover:scale-110"
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

        {/* Booking Form */}
        <div className="min-h-screen flex flex-col md:flex-row items-center md:items-start justify-center pt-24">
          <div className="block md:hidden w-full h-64 relative">
            <TeslaScene animationState={animationState} />
            {animationState === 'parked-right' && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center px-4">
                <p className="text-[10px] text-gray-500 mt-1">
                  ※画像はイメージです。モデルは選択されたものと対応していません
                </p>
              </div>
            )}
          </div>

          {/* 左側：テスラ3Dシーン */}
          <div className="hidden md:flex md:w-2/3 md:h-[800px] items-center justify-center relative">
            <div className="w-full h-full">
              <TeslaScene animationState={animationState} />
            </div>
            {animationState === 'parked-right' && (
              <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 text-center px-4">
                <p className="text-[10px] md:text-xs text-gray-500 mt-1">
                  ※画像はイメージです。モデルは選択されたものと対応していません
                </p>
              </div>
            )}
          </div>

          {/* 右側：予約フォーム */}
          <div className="w-full md:w-1/3 md:h-[800px] flex items-start justify-center z-10 pt-8 relative">
            <div
              className="w-full max-w-md px-4 md:px-0 md:max-w-full md:pl-6 lg:pr-12 md:h-full md:overflow-y-auto [&::-webkit-scrollbar]:hidden md:pb-32"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-8 text-center text-gray-900 pb-3">レンタカー予約</h2>

              <div className="mb-3">
                <label className="block text-sm font-semibold mb-2 text-gray-900">貸出場所</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLocation('北海道')}
                    className={`py-4 px-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                      location === '北海道'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="font-bold mb-1">北海道</div>
                    <div className="text-xs font-normal">安平町</div>
                    <div className="text-xs font-normal">Model 3</div>
                    <div className="text-xs font-normal"> (北海道旅行におすすめ)</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocation('福岡')}
                    className={`py-4 px-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                      location === '福岡'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="font-bold mb-1">福岡</div>
                    <div className="text-xs font-normal">福津市</div>
                    <div className="text-xs font-normal">Model Y</div>
                  </button>
                </div>
              </div>

              {location && (
                  <div className="mb-3">
                    <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-300">
                      {location === '北海道' ? (
                          <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92846.89347996594!2d141.7546304!3d42.7777778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b1e8e8e8e8e8f%3A0x1e8e8e8e8e8e8e8e!2z5YyX5rW36YGT5a6J5bmz55S6!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title="北海道 安平町の地図"
                          />
                      ) : (
                          <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106693.4!2d130.46!3d33.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541f1e8e8e8e8e8%3A0x8e8e8e8e8e8e8e8e!2z56aP5bKh55yM56aP5rSl5biC!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title="福岡 福津市の地図"
                          />
                      )}
                    </div>
                  </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-900">貸出日時</label>
                <div className="grid grid-cols-2 gap-2">
                  <DatePicker
                    size="large"
                    className="w-full"
                    placeholder="開始日"
                    value={startDate}
                    onChange={(value) => setStartDate(value)}
                    format="YYYY/MM/DD"
                    disabledDate={(current) => {
                      return current && current < dayjs().startOf('day');
                    }}
                  />
                  <Select
                    size="large"
                    className="w-full"
                    placeholder="開始時刻"
                    value={startTime || undefined}
                    onChange={(value) => setStartTime(value)}
                    options={timeOptions}
                    showSearch
                  />
                </div>
              </div>

              {/* 終了日時 */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-900">返却日時</label>
                <div className="grid grid-cols-2 gap-2">
                  <DatePicker
                    size="large"
                    className="w-full"
                    placeholder="終了日"
                    value={endDate}
                    onChange={(value) => setEndDate(value)}
                    format="YYYY/MM/DD"
                    disabledDate={(current) => {
                      if (!startDate) return current && current < dayjs().startOf('day');
                      return current && current < startDate.startOf('day');
                    }}
                  />
                  <Select
                    size="large"
                    className="w-full"
                    placeholder="終了時刻"
                    value={endTime || undefined}
                    onChange={(value) => setEndTime(value)}
                    options={timeOptions}
                    showSearch
                  />
                </div>
              </div>

              <div className="mb-6 space-y-3">
              <Checkbox
                  checked={airportPickup}
                  onChange={(e) => setAirportPickup(e.target.checked)}
              >
                  <span className="font-semibold text-gray-900">
                    {location === '北海道' ? (
                      <>
                        新千歳空港からの送迎<span className="text-xs text-gray-600"> (5,000<span className="text-[10px]">{'\u2009'}円</span>)</span>
                      </>
                    ) : location === '福岡' ? (
                      <>
                        福岡空港からの送迎<span className="text-xs text-gray-600"> (5,000<span className="text-[10px]">{'\u2009'}円</span>)</span>
                      </>
                    ) : (
                      <>
                        空港送迎 <span className="text-xs text-gray-600"> (5,000<span className="text-[10px]">{'\u2009'}円</span>)</span>
                      </>
                    )}
                  </span>
              </Checkbox>
                <div className="mt-3">
              <Checkbox
                  className="mt-3"
                  checked={pickupRequest}
                  onChange={(e) => setPickupRequest(e.target.checked)}
              >
                <span className="font-semibold text-gray-900">送迎希望<span className="text-xs text-gray-600">(サイト下部記載のの金額が加算されます。概算にこの金額は含まれません)</span></span>
              </Checkbox>
                </div>
            </div>
              <div className="mb-6 space-y-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900" style={{'marginBottom': '6px'}}>充電無料</p>
                    <p className="text-xs text-gray-600 mt-1">CHAdeMO・J1772アダプター・e-Mobility Power充電カード・Tesla SuperCharger利用可能
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex fixed bottom-0 right-0 w-1/3 h-28 items-center justify-between bg-white shadow-xl rounded-t-3xl pl-10 pr-12 py-6 z-50">
              <div>
                <p className="text-2xl text-gray-900 font-medium" style={{ margin: 0 }}>
                  {displayPrice !== null ? (
                    <>
                      {displayPrice.toLocaleString()}
                      <span className="text-base">{'\u2009'}円</span>
                    </>
                  ) : (
                    'ー'
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1" style={{ margin: 0 }}>
                  概算{pickupRequest && '(送迎費用は概算に含まれていません。)'}
                  {duration && (
                    <span className="ml-2">
                      {duration.days > 0 && (
                        <>
                          <span className="text-base font-semibold">{duration.days}</span>
                          <span className="text-[10px]">{'\u2009'}泊</span>
                        </>
                      )}
                      {duration.days > 0 && duration.hours > 0 && '・'}
                      {duration.hours > 0 && (
                        <>
                          <span className="text-base font-semibold">{duration.hours}</span>
                          <span className="text-[10px]">{'\u2009'}時間</span>
                        </>
                      )}
                    </span>
                  )}
                </p>
              </div>

              <Button
                type="primary"
                size="large"
                className="h-14 text-lg font-bold flex-shrink-0"
                style={{ backgroundColor: '#f97316', borderColor: '#f97316', minWidth: '140px' }}
                disabled={!location || !startDate || !startTime || !endDate || !endTime || price === null}
                onClick={handleReservation}
              >
                仮予約
              </Button>
            </div>

            {/* モバイル用 - 画面下部に固定 */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 px-4 py-4 z-50 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-2xl font-nomal text-gray-900 pl-6" style={{ margin: 0 }}>
                  <span className="text-[18px] text-gray-500 mt-1 pr-3">
                    概算  <span className="text-[12px] text-gray-500 mt-1 pr-3">{pickupRequest && '(送迎費用は含まれていません。)'}</span><br/>
                    {duration && (
                        <span className="ml-1">
                      {duration.days > 0 && (
                          <>
                            <span className="font-nomal">{duration.days}</span>
                            <span className="text-[12px]">{'\u2009'}泊 </span>
                          </>
                      )}
                          {duration.hours > 0 && (
                              <>
                                <span className="font-nomal">{duration.hours}</span>
                                <span className="text-[12px]">{'\u2009'}時間</span>
                              </>
                          )}
                    </span>
                    )}
                  </span>
                  {displayPrice !== null ? (
                    <>
                      {displayPrice.toLocaleString()}
                      <span className="text-sm">{'\u2009'}円  </span>
                    </>
                  ) : (
                    'ー'
                  )}
                </p>
              </div>

              <Button
                type="primary"
                size="large"
                className="h-12 text-base font-bold flex-shrink-0"
                style={{ backgroundColor: '#f97316', borderColor: '#f97316', minWidth: '100px' }}
                disabled={!location || !startDate || !startTime || !endDate || !endTime || price === null}
                onClick={handleReservation}
              >
                仮予約
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
