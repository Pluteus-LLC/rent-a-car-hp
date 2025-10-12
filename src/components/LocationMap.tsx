'use client';

interface LocationMapProps {
  selectedLocation: string;
}

export default function LocationMap({ selectedLocation }: LocationMapProps) {
  // 安平町のGoogle Maps URL（マーカー付き） - より広い範囲を表示
  const hokkaidoMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d185693.78695993188!2d141.7546304!3d42.7777778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b1e8e8e8e8e8f%3A0x1e8e8e8e8e8e8e8e!2z5YyX5rW36YGT5a6J5bmz55S6!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp";

  // 福津市のGoogle Maps URL（マーカー付き） - より広い範囲を表示
  const fukuokaMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d213386.8!2d130.46!3d33.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541f1e8e8e8e8e8%3A0x8e8e8e8e8e8e8e8e!2z56aP5bKh55yM56aP5rSl5biC!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp";

  // 選択された営業所に応じてマップURLを切り替え
  const mapUrl = selectedLocation === '北海道' ? hokkaidoMapUrl : fukuokaMapUrl;

  return (
    <div className="w-full h-full relative">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={selectedLocation === '北海道' ? '北海道 安平町の地図' : '福岡 福津市の地図'}
        className="w-full h-full"
      />

      {/* 選択中の営業所名を表示 */}
      {selectedLocation && (
        <div className="absolute bottom-20 left-24 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <p className="text-sm font-bold text-gray-900">
            {selectedLocation === '北海道' ? '安平町営業所' : '福津市営業所'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {selectedLocation === '北海道' ? '新千歳空港から車で約30分' : '福岡空港から車で約40分'}
          </p>
        </div>
      )}
    </div>
  );
}
