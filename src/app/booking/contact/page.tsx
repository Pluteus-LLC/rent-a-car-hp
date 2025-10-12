'use client';

import { useState, useEffect, Suspense } from 'react';
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

function ContactPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<'contact' | 'confirmed'>('contact');
  const [location, setLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<string>('12:00');
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<string>('12:00');
  const [airportPickup, setAirportPickup] = useState<boolean>(false);
  const [fukuokaPickupLocation, setFukuokaPickupLocation] = useState<string>('');
  const [pickupRequest, setPickupRequest] = useState<boolean>(false);
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [contactMethod, setContactMethod] = useState<'x' | 'instagram' | 'email'>('email');
  const [contactValue, setContactValue] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);
  const [duration, setDuration] = useState<{ days: number; hours: number } | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [contactValueError, setContactValueError] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');

  // URLパラメータから予約情報を取得
  useEffect(() => {
    const loc = searchParams.get('location');
    const start = searchParams.get('startDate');
    const sTime = searchParams.get('startTime');
    const end = searchParams.get('endDate');
    const eTime = searchParams.get('endTime');
    const airport = searchParams.get('airportPickup');
    const fukuokaPickup = searchParams.get('fukuokaPickupLocation');
    const pickup = searchParams.get('pickupRequest');
    const pickupLoc = searchParams.get('pickupLocation');

    if (loc) setLocation(loc);
    if (start) setStartDate(dayjs(start));
    if (sTime) setStartTime(sTime);
    if (end) setEndDate(dayjs(end));
    if (eTime) setEndTime(eTime);
    if (airport) setAirportPickup(airport === 'true');
    if (fukuokaPickup) setFukuokaPickupLocation(fukuokaPickup);
    if (pickup) setPickupRequest(pickup === 'true');
    if (pickupLoc) setPickupLocation(pickupLoc);
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

  // バリデーション関数
  const validateContactInfo = () => {
    // エラーをリセット
    setContactValueError('');
    setPhoneNumberError('');

    let isValid = true;

    // メールアドレスのバリデーション
    if (contactMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactValue)) {
        setContactValueError('有効なメールアドレスを入力してください');
        isValid = false;
      }
    }

    // 電話番号のバリデーション（9-11個の数字）
    const phoneDigits = phoneNumber.replace(/\D/g, ''); // 数字以外を除去
    if (phoneDigits.length < 9 || phoneDigits.length > 11) {
      setPhoneNumberError('電話番号は9桁から11桁の数字で入力してください');
      isValid = false;
    }

    return isValid;
  };

  const handleContactSubmit = async () => {
    // バリデーションチェック
    if (!validateContactInfo()) {
      return;
    }

    // Google Formに送信
    try {
      const formData = new URLSearchParams();

      // entry.909150629: SNSのID または メールアドレス
      formData.append('entry.909150629', contactValue);

      // entry.303983299: 名前
      formData.append('entry.303983299', customerName);

      // entry.224606125: 電話番号
      formData.append('entry.224606125', phoneNumber);

      // entry.522302925: 希望のエリア
      formData.append('entry.522302925', location === '北海道' ? '北海道（安平町）' : '福岡（福津市）');

      // entry.2071702890: 利用開始日
      formData.append('entry.2071702890', `${startDate?.format('YYYY/MM/DD')} ${startTime}`);

      // entry.928348117: メールアドレスか、Twitter / Instagramか
      const contactMethodText = contactMethod === 'email' ? 'メールアドレス' : contactMethod === 'x' ? 'Twitter' : 'Instagram';
      formData.append('entry.928348117', contactMethodText);

      // entry.114282046: 送迎の備考
      let pickupNote = '';
      if (airportPickup) pickupNote += '新千歳空港送迎 ';
      if (fukuokaPickupLocation) pickupNote += fukuokaPickupLocation + ' ';
      if (pickupRequest && pickupLocation) pickupNote += `送迎希望: ${pickupLocation}`;
      formData.append('entry.114282046', pickupNote.trim());

      // entry.201391885: 返却日
      formData.append('entry.201391885', `${endDate?.format('YYYY/MM/DD')} ${endTime}`);

      // entry.228251123: webで表示した概算の金額
      formData.append('entry.228251123', price ? `${price.toLocaleString()}円` : '');

      // Google Formに送信
      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSeuwL0z1tNt94Z3PcAu1Gj-FseKaOvEmcMDScNu4bu7qvA4yg/formResponse',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors', // CORSエラーを回避
        }
      );
    } catch (error) {
      console.error('Google Form送信エラー:', error);
      // エラーが発生してもユーザーには確認画面を表示
    }

    // 確認画面に遷移
    setStep('confirmed');
  };

  if (step === 'confirmed') {
    return (
      <ConfigProvider locale={locale}>
        <div className="w-full min-h-screen flex flex-col bg-white dark:bg-gray-900">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 pt-20 text-gray-900">
              さあ{location}でテスラが待っています
            </h1>
            <p className="text-xl md:text-2xl text-gray-900 e mb-8">連絡をお待ちください</p>
            <div
              className="mt-8 bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-lg mx-auto shadow-2xl border border-white/30"
              style={{
                animation: 'fadeIn 1.5s ease-in-out',
              }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-900">貸出</span>
                  <span className="text-base font-medium text-gray-900">
                    <span className="text-xl">{startDate?.format('YYYY')}</span><span className="text-sm">年</span>
                    <span className="text-xl">{startDate?.format('M')}</span><span className="text-sm">月</span>
                    <span className="text-xl">{startDate?.format('D')}</span><span className="text-sm">日</span>{' '}
                    <span className="text-xl">{startTime}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-900">返却</span>
                  <span className="text-base font-medium text-gray-900">
                    <span className="text-xl">{endDate?.format('YYYY')}</span><span className="text-sm">年</span>
                    <span className="text-xl">{endDate?.format('M')}</span><span className="text-sm">月</span>
                    <span className="text-xl">{endDate?.format('D')}</span><span className="text-sm">日</span>{' '}
                    <span className="text-xl">{endTime}</span>
                  </span>
                </div>
                {duration && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-900">期間</span>
                    <span className="text-base font-medium text-gray-900">
                      {duration.days > 0 && <><span className="text-xl">{duration.days}</span><span className="text-sm">{'\u2009'}泊</span></>}
                      {duration.days > 0 && duration.hours > 0 && ' '}
                      {duration.hours > 0 && <><span className="text-xl">{duration.hours}</span><span className="text-sm">{'\u2009'}時間</span></>}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm font-semibold text-gray-900 text-left">
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
      <div className="w-full min-h-screen flex flex-col bg-white dark:bg-gray-900">
        <Header />
        <div className="w-full py-4 px-4 md:px-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">あと一歩です</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">ご連絡先をお知らせください</p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
          {/* 左側：地図 (2/3幅) */}
          <div className="h-[400px] md:h-auto relative order-2 md:order-1 md:col-span-2">
            <LocationMap selectedLocation={location} />
          </div>

          {/* 右側：予約情報と連絡先フォーム (1/3幅) */}
          <div className="overflow-y-auto p-4 md:pl-4 lg:pr-12 md:py-3 order-1 md:order-2 bg-white dark:bg-gray-900">
            <div className="space-y-6">
            <div style={{"margin": "0"}}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">予約内容</h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-orange-500 hover:text-orange-600 font-nomal"
                style={{"color": isEditing ? "#ea580c!important" : "#f97316!important", "fontSize": "12px"}}
              >
                {isEditing ? '完了' : '編集'}
              </button>
            </div>

            {isEditing ? (
              // 編集モード
              <div className="space-y-4">
                {/* 営業所 */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">営業所</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLocation('北海道')}
                      className={`py-2 px-3 rounded-lg border-2 transition-all font-semibold text-xs ${
                        location === '北海道'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-600'
                      }`}
                    >
                      北海道（安平町）
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocation('福岡')}
                      className={`py-2 px-3 rounded-lg border-2 transition-all font-semibold text-xs ${
                        location === '福岡'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-600'
                      }`}
                    >
                      福岡（福津市）
                    </button>
                  </div>
                </div>

                {/* 貸出日時 */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">貸出日時</label>
                  <div className="grid grid-cols-2 gap-2">
                    <DatePicker
                      size="large"
                      className="w-full"
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
                      placeholder="開始時刻"
                      value={startTime || undefined}
                      onChange={(value) => setStartTime(value)}
                      options={timeOptions}
                    />
                  </div>
                </div>

                {/* 返却日時 */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">返却日時</label>
                  <div className="grid grid-cols-2 gap-2">
                    <DatePicker
                      size="large"
                      className="w-full"
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
                      placeholder="終了時刻"
                      value={endTime || undefined}
                      onChange={(value) => setEndTime(value)}
                      options={timeOptions}
                    />
                  </div>
                </div>

                {/* オプション */}
                <div className="space-y-2">
                  {location === '北海道' && (
                    <Checkbox
                      checked={airportPickup}
                      onChange={(e) => {
                        setAirportPickup(e.target.checked);
                        if (e.target.checked) setPickupRequest(false);
                      }}
                    >
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        新千歳空港からの送迎（片道3,000<span className="text-[10px]">{'\u2009'}円（税込）</span>）
                      </span>
                    </Checkbox>
                  )}

                  {location === '福岡' && (
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">主要箇所からの送迎（片道3,000<span className="text-[10px]">{'\u2009'}円（税込）</span>）</p>
                      <div className="space-y-1 pl-4">
                        <div>
                          <Checkbox
                            checked={fukuokaPickupLocation === '福岡空港'}
                            onChange={(e) => {
                              setFukuokaPickupLocation(e.target.checked ? '福岡空港' : '');
                              if (e.target.checked) setPickupRequest(false);
                            }}
                          >
                            <span className="text-xs text-gray-900 dark:text-white">福岡空港</span>
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
                            <span className="text-xs text-gray-900 dark:text-white">博多駅</span>
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
                            <span className="text-xs text-gray-900 dark:text-white">西鉄天神高速バスターミナル</span>
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  )}

                  <Checkbox
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
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
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
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-x-hidden dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // 表示モード（コンパクト）
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 dark:text-gray-400">営業所</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{location === '北海道' ? '北海道（安平町）' : '福岡（福津市）'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 dark:text-gray-400">貸出</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {startDate?.format('YYYY')}<span className="text-xs font-normal">年</span>
                    {startDate?.format('M')}<span className="text-xs font-normal">月</span>
                    {startDate?.format('D')}<span className="text-xs font-normal">日</span> {startTime}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 dark:text-gray-400">返却</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {endDate?.format('YYYY')}<span className="text-xs font-normal">年</span>
                    {endDate?.format('M')}<span className="text-xs font-normal">月</span>
                    {endDate?.format('D')}<span className="text-xs font-normal">日</span> {endTime}
                  </span>
                </div>
                {(airportPickup || fukuokaPickupLocation || pickupRequest) && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 dark:text-gray-400">オプション</span>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm text-right">
                      {airportPickup && <div>新千歳空港送迎</div>}
                      {fukuokaPickupLocation && <div>{fukuokaPickupLocation}</div>}
                      {pickupRequest && (
                        <div>
                          送迎希望
                          {pickupLocation && <div className="text-xs font-normal text-gray-600 dark:text-gray-400 mt-1">({pickupLocation})</div>}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 料金表示 */}
            {duration && (
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">概算料金</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {duration.days > 0 && <>{duration.days}<span className="text-[10px]">{'\u2009'}泊</span></>}
                    {duration.days > 0 && duration.hours > 0 && '・'}
                    {duration.hours > 0 && <>{duration.hours}<span className="text-[10px]">{'\u2009'}時間</span></>}
                  </p>
                </div>
                <span className="text-2xl text-orange-500 font-nomal">
                  {displayPrice?.toLocaleString()}<span className="text-base">{'\u2009'}円（税込）</span>
                </span>
              </div>
            )}
            </div>

            {/* 連絡先入力フォーム */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">連絡先情報</h3>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">ご希望の連絡方法</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold text-sm ${
                    contactMethod === 'email'
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-600'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('x')}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold text-sm ${
                    contactMethod === 'x'
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-600'
                  }`}
                >
                  X
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('instagram')}
                  className={`py-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                    contactMethod === 'instagram'
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-600'
                  }`}
                >
                  Instagram
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                {contactMethod === 'email' ? 'メールアドレス' : contactMethod === 'x' ? 'X (Twitter) アカウント' : 'Instagram アカウント'}
              </label>
              <input
                type={contactMethod === 'email' ? 'email' : 'text'}
                value={contactValue}
                onChange={(e) => {
                  setContactValue(e.target.value);
                  if (contactValueError) setContactValueError('');
                }}
                placeholder={
                  contactMethod === 'email'
                    ? 'example@email.com'
                    : contactMethod === 'x'
                      ? '@username'
                      : '@username'
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-x-hidden dark:bg-gray-800 dark:text-white ${
                  contactValueError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {contactValueError && (
                <p className="mt-1 text-sm text-red-600">{contactValueError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">お名前</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="山田 太郎"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-x-hidden dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">電話番号</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (phoneNumberError) setPhoneNumberError('');
                }}
                placeholder="090-1234-5678"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-x-hidden dark:bg-gray-800 dark:text-white ${
                  phoneNumberError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {phoneNumberError && (
                <p className="mt-1 text-sm text-red-600">{phoneNumberError}</p>
              )}
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

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
