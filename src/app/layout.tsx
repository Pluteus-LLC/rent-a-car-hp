import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "antd/dist/reset.css";

export const metadata: Metadata = {
  title: "充電無料！北海道、福岡のテスラレンタカーはプルテウスレンタカー",
  description: "新千歳空港、博多空港、博多駅からの利用に便利。レンタカー担当者は全員テスラオーナー。乗り方、充電の方法などしっかりサポート。Teslaの試乗としてもご活用することができ、試乗いただいた方にはTesla購入割引をプレゼント！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Script id="adobe-typekit" strategy="beforeInteractive">
          {`
 (function(d) {
    var config = {
      kitId: 'oqd2ucp',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);
          `}
        </Script>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-01BKZHBYQE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-01BKZHBYQE');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
