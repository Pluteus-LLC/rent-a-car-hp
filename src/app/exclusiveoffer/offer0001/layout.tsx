import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "充電はオーナーの奢りで - 北海道の宿×レンタカー 優待キャンペーン | プルテウスレンタカー",
  description: "プルテウスレンタカーご利用で宿泊時の充電をプレゼント。帯広のプライベートサウナ付きコテージカンノンサウナ、ファームステイBIEIが対象。TESLA×自然で癒やされる旅を楽しもう。",
  keywords: ["テスラ", "レンタカー", "北海道", "帯広", "宿泊", "キャンペーン", "充電無料", "カンノンサウナ", "ファームステイ", "優待"],
  openGraph: {
    title: "充電はオーナーの奢りで - 北海道の宿×レンタカー 優待キャンペーン",
    description: "プルテウスレンタカーご利用で宿泊時の充電をプレゼント。TESLA×自然で癒やされる旅を。",
    type: "website",
    locale: "ja_JP",
    siteName: "プルテウスレンタカー",
  },
  twitter: {
    card: "summary_large_image",
    title: "充電はオーナーの奢りで - 北海道の宿×レンタカー 優待キャンペーン",
    description: "プルテウスレンタカーご利用で宿泊時の充電をプレゼント。",
  },
};

export default function Offer0001Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
