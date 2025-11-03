'use client';

interface LocationMapProps {
  selectedLocation: string;
}

export default function LocationMap({ selectedLocation }: LocationMapProps) {
  // 安平町のGoogle Maps URL（マーカー付き） - より広い範囲を表示
  const hokkaidoMapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d810.6023925952563!2d141.8269902747996!3d42.815988270561256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sja!2sjp!4v1762156191287!5m2!1sja!2sjp";

  // 千早駅のGoogle Maps URL（マーカー付き） - より広い範囲を表示
  const fukuokaMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.2894962326914!2d130.43825861178232!3d33.64965998876841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35418f1a736e7bf3%3A0xd6c5b3dd7f93c13e!2z5Y2D5pep6aeF!5e0!3m2!1sja!2sjp!4v1762156427743!5m2!1sja!2sjp";

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
        title={selectedLocation === '北海道' ? '安平営業所（安平町）の地図' : '福岡営業所（福岡市東区）の地図'}
        className="w-full h-full"
      />

      {/* 選択中の営業所名を表示 */}
      {selectedLocation && (
        <div className="absolute bottom-20 left-24 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <p className="text-sm font-bold text-gray-900">
            {selectedLocation === '北海道' ? '安平町営業所' : '福津市営業所'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {selectedLocation === '北海道' ? '安平駅から徒歩4分、新千歳空港から車で約30分' : '千早駅から徒歩2分、福岡空港から車で約18分'}
          </p>
        </div>
      )}
    </div>
  );
}
