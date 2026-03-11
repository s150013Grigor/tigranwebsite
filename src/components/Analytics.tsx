'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

const GA_ID = 'G-0YXKX26DMM';
const ADS_ID = 'AW-17899815726';

export default function Analytics() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'] as const;
    const load = () => {
      setLoaded(true);
      events.forEach((e) => window.removeEventListener(e, load));
    };
    events.forEach((e) => window.addEventListener(e, load, { passive: true }));
    const timer = setTimeout(load, 5000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };
  }, []);

  if (!loaded) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}
