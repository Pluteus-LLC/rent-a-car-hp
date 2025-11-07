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
  const [fukuokaPickupLocation, setFukuokaPickupLocation] = useState<string>('');
  const [pickupRequest, setPickupRequest] = useState<boolean>(false);
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [chargingStations, setChargingStations] = useState<number>(0);

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

  // 充電ステーション数のカウントアニメーション
  useEffect(() => {
    if (location === '北海道') {
      const target = 1041;
      const duration = 2000; // 2秒
      const steps = 50;
      const increment = target / steps;
      let currentStep = 0;

      setChargingStations(0);

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setChargingStations(target);
          clearInterval(timer);
        } else {
          setChargingStations(Math.round(increment * currentStep));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setChargingStations(0);
    }
  }, [location]);

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
        if (airportPickup || fukuokaPickupLocation) {
          totalPrice += 3000;
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
  }, [location, startDate, startTime, endDate, endTime, airportPickup, fukuokaPickupLocation]);

  const handleReservation = () => {
    const params = new URLSearchParams({
      location: location,
      startDate: startDate?.format('YYYY-MM-DD') || '',
      startTime: startTime,
      endDate: endDate?.format('YYYY-MM-DD') || '',
      endTime: endTime,
      airportPickup: airportPickup.toString(),
      fukuokaPickupLocation: fukuokaPickupLocation,
      pickupRequest: pickupRequest.toString(),
      pickupLocation: pickupLocation,
    });
    router.push(`/booking/contact?${params.toString()}`);
  };

  return (
    <ConfigProvider locale={locale}>
      <div
        className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden font-sans"
      >
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
              <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-8 text-center text-gray-900 dark:text-white pb-3">レンタカー予約</h2>

              <div className="mb-3">
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">貸出場所</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLocation('北海道')}
                    className={`py-4 px-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                      location === '北海道'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-600'
                    }`}
                  >
                    <div className="font-bold mb-1">北海道</div>
                    <div className="text-xs font-normal">安平町</div>
                    <div className="text-xs font-normal">Model 3</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => { /* setLocation('福岡') */ }}
                    className={`opacity-25 py-4 px-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                      location === '福岡'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-600'
                    }`}
                    disabled
                  >
                    <div className="font-bold mb-1">福岡</div>
                    <div className="text-xs font-normal">福岡市東区</div>
                    <div className="text-xs font-normal">（車両整備中）</div>
                  </button>
                </div>
              </div>

              {location && (
                  <div className="mb-3">
                    <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                      {location === '北海道' ? (
                          <iframe
                              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d810.6023925952563!2d141.8269902747996!3d42.815988270561256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sja!2sjp!4v1762156191287!5m2!1sja!2sjp"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title="安平営業所（安平町）の地図"
                          />
                      ) : (
                          <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.2894962326914!2d130.43825861178232!3d33.64965998876841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35418f1a736e7bf3%3A0xd6c5b3dd7f93c13e!2z5Y2D5pep6aeF!5e0!3m2!1sja!2sjp!4v1762156427743!5m2!1sja!2sjp"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title="千早駅（福岡市東区）の地図"
                          />
                      )}
                    </div>
                  </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">貸出日時</label>
                <div className="grid grid-cols-2 gap-2">
                  <DatePicker
                    size="large"
                    className="w-full"
                    style={{ height: 40 }}
                    placeholder="開始日"
                    value={startDate}
                    onChange={(value) => setStartDate(value)}
                    format="YYYY/MM/DD"
                    inputReadOnly
                    disabledDate={(current) => {
                      return current && current < dayjs().startOf('day');
                    }}
                  />
                  <Select
                    size="large"
                    className="w-full"
                    style={{ height: 40 }}
                    placeholder="開始時刻"
                    value={startTime || undefined}
                    onChange={(value) => setStartTime(value)}
                    options={timeOptions}
                  />
                </div>
              </div>

              {/* 終了日時 */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">返却日時</label>
                <div className="grid grid-cols-2 gap-2">
                  <DatePicker
                    size="large"
                    className="w-full"
                    style={{ height: 40 }}
                    placeholder="終了日"
                    value={endDate}
                    onChange={(value) => setEndDate(value)}
                    format="YYYY/MM/DD"
                    inputReadOnly
                    disabledDate={(current) => {
                      if (!startDate) return current && current < dayjs().startOf('day');
                      return current && current < startDate.startOf('day');
                    }}
                  />
                  <Select
                    size="large"
                    className="w-full"
                    style={{ height: 40 }}
                    placeholder="終了時刻"
                    value={endTime || undefined}
                    onChange={(value) => setEndTime(value)}
                    options={timeOptions}
                  />
                </div>
              </div>

              <div className="mb-6 space-y-3">
                {location === '北海道' && (
                  <Checkbox
                    checked={airportPickup}
                    onChange={(e) => {
                      setAirportPickup(e.target.checked);
                      if (e.target.checked) setPickupRequest(false);
                    }}
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      新千歳空港からの送迎<span className="text-xs text-gray-600 dark:text-gray-400"> (片道3,000<span className="text-[10px]">{'\u2009'}円（税込）</span>)</span>
                    </span>
                  </Checkbox>
                )}

                {location === '福岡' && (
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">主要箇所からの送迎<span className="text-xs text-gray-600 dark:text-gray-400"> (片道3,000<span className="text-[10px]">{'\u2009'}円（税込）</span>)</span></p>
                    <div className="space-y-2 pl-4">
                      <div>
                        <Checkbox
                          checked={fukuokaPickupLocation === '福岡空港'}
                          onChange={(e) => {
                            setFukuokaPickupLocation(e.target.checked ? '福岡空港' : '');
                            if (e.target.checked) setPickupRequest(false);
                          }}
                        >
                          <span className="text-sm text-gray-900 dark:text-white">福岡空港</span>
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox
                          checked={fukuokaPickupLocation === '博多駅'}
                          onChange={(e) => {
                            setFukuokaPickupLocation(e.target.checked ? '博多駅' : '');
                            if (e.target.checked) setPickupRequest(false);
                          }}
                        >
                          <span className="text-sm text-gray-900 dark:text-white">博多駅</span>
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox
                          checked={fukuokaPickupLocation === '西鉄天神高速バスターミナル'}
                          onChange={(e) => {
                            setFukuokaPickupLocation(e.target.checked ? '西鉄天神高速バスターミナル' : '');
                            if (e.target.checked) setPickupRequest(false);
                          }}
                        >
                          <span className="text-sm text-gray-900 dark:text-white">西鉄天神高速バスターミナル</span>
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <Checkbox
                    className="mt-3"
                    checked={pickupRequest}
                    onChange={(e) => {
                      setPickupRequest(e.target.checked);
                      if (e.target.checked) {
                        setFukuokaPickupLocation('');
                        setAirportPickup(false);
                      } else {
                        setPickupLocation('');
                      }
                    }}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      送迎希望（上記主要箇所以外）
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-normal mt-1">
                        • 営業所から半径30km以内：3,000<span className="text-[10px]">{'\u2009'}円</span>（税込）<br/>
                        • 30km以上：超過1kmあたり100<span className="text-[10px]">{'\u2009'}円</span>（税込）
                      </div>
                    </div>
                  </Checkbox>
                  {pickupRequest && (
                    <div className="mt-2 pl-6">
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        placeholder="送迎希望場所を入力してください"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-x-hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 北海道の特徴セクション */}
              {location === '北海道' && (
                <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 overflow-hidden">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">北海道でも安心！</h3>

                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      北海道の充電器は
                    </p>
                    <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2 tabular-nums">
                      {chargingStations.toLocaleString()}
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      拠点あります
                    </p>
                    <a
                      href="https://evsmart.net/spot/hokkaido/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline mb-3"
                    >
                      詳細はこちら
                    </a>
                    <p className="text-xs font-bold text-orange-500 dark:text-orange-400 mt-2">
                      かなり多くて電欠も心配なし！
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-6 space-y-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white" style={{'marginBottom': '6px'}}>充電無料、各種アダプタ利用可能</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">TESLA Supercharger, e-Mobility Power充電カード対応充電器 が無料で利用可能。
                      CHAdeMO,J1772アダプタも車載しているので、地方や観光地でも安心！
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white" style={{'marginBottom': '6px'}}>分かりやすいサポート</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">テスラの乗り方、充電の方法など詳しくサポートします。また、レンタル中にトラブルがあっても即座に対応します。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex fixed bottom-0 right-0 w-1/3 h-28 items-center justify-between bg-white dark:bg-gray-800 shadow-xl rounded-t-3xl pl-10 pr-12 py-6 z-50">
              <div>
                <p className="text-2xl text-gray-900 dark:text-white font-medium" style={{ margin: 0 }}>
                  {displayPrice !== null ? (
                    <>
                      {displayPrice.toLocaleString()}
                      <span className="text-base">{'\u2009'}円（税込）</span>
                    </>
                  ) : (
                    'ー'
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1" style={{ margin: 0 }}>
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
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-2xl border-t border-gray-200 dark:border-gray-700 px-4 py-4 z-50 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-2xl font-nomal text-gray-900 dark:text-white pl-6" style={{ margin: 0 }}>
                  <span className="text-[18px] text-gray-500 dark:text-gray-400 mt-1 pr-3">
                    概算  <span className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 pr-3">{pickupRequest && '(送迎費用は含まれていません。)'}</span><br/>
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
                      <span className="text-gray-500 text-sm">{'\u2009'}円 (税込)</span>
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
