'use client';

import { useState, useEffect } from 'react';
import { Select, DatePicker, Button, Checkbox, ConfigProvider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ja';
import locale from 'antd/locale/ja_JP';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

dayjs.locale('ja');

const TeslaWithFlag = dynamic(() => import('@/components/TeslaWithFlag'), { ssr: false });
const LocationMap = dynamic(() => import('@/components/LocationMap'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });

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

export default function ContactPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<'contact' | 'confirmed'>('contact');
  const [location, setLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<string>('12:00');
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<string>('12:00');
  const [airportPickup, setAirportPickup] = useState<boolean>(false);
  const [pickupRequest, setPickupRequest] = useState<boolean>(false);
  const [contactMethod, setContactMethod] = useState<'x' | 'instagram' | 'email'>('email');
  const [contactValue, setContactValue] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);
  const [duration, setDuration] = useState<{ days: number; hours: number } | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // URLパラメータから予約情報を取得
  useEffect(() => {
    const loc = searchParams.get('location');
    const start = searchParams.get('startDate');
    const sTime = searchParams.get('startTime');
    const end = searchParams.get('endDate');
    const eTime = searchParams.get('endTime');
    const airport = searchParams.get('airportPickup');
    const pickup = searchParams.get('pickupRequest');

    if (loc) setLocation(loc);
    if (start) setStartDate(dayjs(start));
    if (sTime) setStartTime(sTime);
    if (end) setEndDate(dayjs(end));
    if (eTime) setEndTime(eTime);
    if (airport) setAirportPickup(airport === 'true');
    if (pickup) setPickupRequest(pickup === 'true');
  }, [searchParams]);

  // 価格計算
  useEffect(() => {
    if (location && startDate && startTime && endDate && endTime) {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      const start = startDate.hour(startHour).minute(startMinute).second(0);
      const end = endDate.hour(endHour).minute(endMinute).second(0);

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

  // 価格アニメーション
  useEffect(() => {
    if (price === null) {
      setDisplayPrice(null);
      return;
    }

    const startPrice = displayPrice ?? 0;
    const duration = 800;
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

  const handleContactSubmit = () => {
    setStep('confirmed');
  };

  if (step === 'confirmed') {
    return (
      <ConfigProvider locale={locale}>
        <div className="w-full min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex flex-col items-center justify-start pt-20 relative">
            <div className="absolute inset-0">
              <TeslaWithFlag location={location} />
            </div>
          <div
            className="relative z-10 text-center px-4 animate-fadeIn"
            style={{
              animation: 'fadeIn 1s ease-in-out',
            }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              さあ{location}でテスラが待っています
            </h1>
            <p className="text-xl md:text-2xl text-gray-900 mb-8">連絡をお待ちください</p>
            <div
              className="mt-8 bg-white/50 backdrop-blur-md rounded-2xl p-8 max-w-lg mx-auto shadow-2xl border border-white/20"
              style={{
                animation: 'fadeIn 1.5s ease-in-out',
              }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-600">貸出</span>
                  <span className="text-base font-medium text-gray-900">
                    <span className="text-xl">{startDate?.format('YYYY')}</span><span className="text-sm">年</span>
                    <span className="text-xl">{startDate?.format('M')}</span><span className="text-sm">月</span>
                    <span className="text-xl">{startDate?.format('D')}</span><span className="text-sm">日</span>{' '}
                    <span className="text-xl">{startTime}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-600">返却</span>
                  <span className="text-base font-medium text-gray-900">
                    <span className="text-xl">{endDate?.format('YYYY')}</span><span className="text-sm">年</span>
                    <span className="text-xl">{endDate?.format('M')}</span><span className="text-sm">月</span>
                    <span className="text-xl">{endDate?.format('D')}</span><span className="text-sm">日</span>{' '}
                    <span className="text-xl">{endTime}</span>
                  </span>
                </div>
                {duration && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">期間</span>
                    <span className="text-base font-medium text-gray-900">
                      {duration.days > 0 && <><span className="text-xl">{duration.days}</span><span className="text-sm">{'\u2009'}泊</span></>}
                      {duration.days > 0 && duration.hours > 0 && ' '}
                      {duration.hours > 0 && <><span className="text-xl">{duration.hours}</span><span className="text-sm">{'\u2009'}時間</span></>}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm font-semibold text-gray-600 text-left">
                    概算{pickupRequest && <span className="text-xs block">(送迎費用なし)</span>}
                  </span>
                  <span className="text-3xl text-orange-500">
                    {price?.toLocaleString()}<span className="text-sm">{'\u2009'}円</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider locale={locale}>
      <div className="w-full min-h-screen flex flex-col bg-white">
        <Header />
        <div className="w-full py-4 px-4 md:px-8 bg-white border-b border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">あと一歩です</h2>
          <p className="text-center text-gray-600">ご連絡先をお知らせください</p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
          {/* 左側：地図 (2/3幅) */}
          <div className="h-[400px] md:h-auto relative order-2 md:order-1 md:col-span-2">
            <LocationMap selectedLocation={location} />
          </div>

          {/* 右側：予約情報と連絡先フォーム (1/3幅) */}
          <div className="overflow-y-auto p-4 md:pl-8 md:pr-2 md:py-3 order-1 md:order-2 bg-white">
            <div className="space-y-6">
            <div style={{"margin": "0"}}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">予約内容</h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-orange-500 hover:text-orange-600 font-nomal"
                style={{"color": isEditing ? "#ea580c!important" : "#f97316!important"}}
              >
                {isEditing ? '完了' : '編集'}
              </button>
            </div>

            {isEditing ? (
              // 編集モード
              <div className="space-y-4">
                {/* 営業所 */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">営業所</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLocation('北海道')}
                      className={`py-2 px-3 rounded-lg border-2 transition-all font-semibold text-xs ${
                        location === '北海道'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      北海道（安平町）
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocation('福岡')}
                      className={`py-2 px-3 rounded-lg border-2 transition-all font-semibold text-xs ${
                        location === '福岡'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      福岡（福津市）
                    </button>
                  </div>
                </div>

                {/* 貸出日時 */}
                <div>
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

                {/* 返却日時 */}
                <div>
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

                {/* オプション */}
                <div className="space-y-2">
                  <Checkbox
                    checked={airportPickup}
                    onChange={(e) => setAirportPickup(e.target.checked)}
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {location === '北海道' ? (
                        <>
                          新千歳空港からの送迎（5,000<span className="text-[10px]">{'\u2009'}円</span>）
                        </>
                      ) : location === '福岡' ? (
                        <>
                          福岡空港からの送迎（5,000<span className="text-[10px]">{'\u2009'}円</span>）
                        </>
                      ) : (
                        <>
                          空港送迎（5,000<span className="text-[10px]">{'\u2009'}円</span>）
                        </>
                      )}
                    </span>
                  </Checkbox>
                  <Checkbox
                    checked={pickupRequest}
                    onChange={(e) => setPickupRequest(e.target.checked)}
                  >
                    <span className="text-sm font-semibold text-gray-900">送迎希望</span>
                    <span className="text-xs text-gray-600 ml-1">(概算に含まれません)</span>
                  </Checkbox>
                </div>
              </div>
            ) : (
              // 表示モード（コンパクト）
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">営業所</span>
                  <span className="font-semibold text-gray-900">{location === '北海道' ? '北海道（安平町）' : '福岡（福津市）'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">貸出</span>
                  <span className="font-semibold text-gray-900">
                    {startDate?.format('YYYY')}<span className="text-xs font-normal">年</span>
                    {startDate?.format('M')}<span className="text-xs font-normal">月</span>
                    {startDate?.format('D')}<span className="text-xs font-normal">日</span> {startTime}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">返却</span>
                  <span className="font-semibold text-gray-900">
                    {endDate?.format('YYYY')}<span className="text-xs font-normal">年</span>
                    {endDate?.format('M')}<span className="text-xs font-normal">月</span>
                    {endDate?.format('D')}<span className="text-xs font-normal">日</span> {endTime}
                  </span>
                </div>
                {(airportPickup || pickupRequest) && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">オプション</span>
                    <span className="font-semibold text-gray-900 text-sm">
                      {airportPickup && (location === '北海道' ? '新千歳空港送迎' : '福岡空港送迎')}
                      {airportPickup && pickupRequest && '、'}
                      {pickupRequest && '送迎希望'}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 料金表示 */}
            {duration && (
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
                <div>
                  <span className="text-sm font-bold text-gray-900">概算料金</span>
                  <p className="text-xs text-gray-600">
                    {duration.days > 0 && <>{duration.days}<span className="text-[10px]">{'\u2009'}泊</span></>}
                    {duration.days > 0 && duration.hours > 0 && '・'}
                    {duration.hours > 0 && <>{duration.hours}<span className="text-[10px]">{'\u2009'}時間</span></>}
                  </p>
                </div>
                <span className="text-2xl text-orange-500 font-nomal">
                  {displayPrice?.toLocaleString()}<span className="text-base">{'\u2009'}円</span>
                </span>
              </div>
            )}
            </div>

            {/* 連絡先入力フォーム */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">連絡先情報</h3>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-900">ご希望の連絡方法</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold text-sm ${
                    contactMethod === 'email'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-orange-300'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('x')}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold text-sm ${
                    contactMethod === 'x'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-orange-300'
                  }`}
                >
                  X
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('instagram')}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold text-sm ${
                    contactMethod === 'instagram'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-orange-300'
                  }`}
                >
                  Instagram
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                {contactMethod === 'email' ? 'メールアドレス' : contactMethod === 'x' ? 'X (Twitter) アカウント' : 'Instagram アカウント'}
              </label>
              <input
                type={contactMethod === 'email' ? 'email' : 'text'}
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                placeholder={
                  contactMethod === 'email'
                    ? 'example@email.com'
                    : contactMethod === 'x'
                      ? '@username'
                      : '@username'
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">お名前</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="山田 太郎"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">電話番号</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="090-1234-5678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                size="large"
                onClick={() => router.back()}
                className="flex-1 h-12 font-semibold"
              >
                戻る
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleContactSubmit}
                disabled={!contactValue || !customerName || !phoneNumber}
                className="flex-1 h-12 font-bold"
                style={{ backgroundColor: '#f97316', borderColor: '#f97316' }}
              >
                予約を確定する
              </Button>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
