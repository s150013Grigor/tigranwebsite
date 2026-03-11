import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateLocalBusinessSchema, generateWebsiteSchema } from '@/lib/structured-data';
import Script from 'next/script';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Tigran Media | Content Fotograaf Kempen & Turnhout',
    template: '%s | Tigran Media',
  },
  description:
    'Professionele content fotografie voor KMO\'s en ondernemers in de Kempen. Website foto\'s, social media content en branding shoots door Tigran.',
  metadataBase: new URL('https://www.tigranmedia.be'),
  alternates: {
    canonical: 'https://www.tigranmedia.be',
  },
  openGraph: {
    title: 'Tigran Media | Content Fotograaf Kempen & Turnhout',
    description:
      'Professionele content fotografie voor KMO\'s en ondernemers in de Kempen. Website foto\'s, social media content en branding shoots.',
    url: 'https://www.tigranmedia.be',
    siteName: 'Tigran Media',
    locale: 'nl_BE',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tigran Media — Content Fotograaf Kempen & Turnhout',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tigran Media | Content Fotograaf Kempen & Turnhout',
    description:
      'Professionele content fotografie voor KMO\'s en ondernemers in de Kempen.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: Add your Google Search Console verification code
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
  other: {
    'geo.region': 'BE-VLG',
    'geo.placename': 'Vlaanderen',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="nl-BE" className={dmSans.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" sizes="any" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark-96x96.png" type="image/png" sizes="96x96" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <link rel="preload" as="image" type="image/webp" href="/DSCF6090-2.webp" />
        <link rel="preconnect" href="https://tigranmedia.be" />
        <link rel="dns-prefetch" href="https://tigranmedia.be" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* 
          ============================================
          GOOGLE ANALYTICS & ADS — SETUP REQUIRED
          ============================================
          
          To enable Google Analytics, replace 'G-XXXXXXXXXX' below with your 
          Google Analytics 4 Measurement ID.
          
          To enable Google Ads, you'll need:
          1. Google Ads Conversion ID (format: AW-XXXXXXXXX)
          2. Optionally a Google Tag Manager Container ID (format: GTM-XXXXXXX)
          
          Uncomment the scripts below once you have the IDs.
        */}

        {/* Google Analytics 4 + Ads — single gtag.js load, deferred */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-0YXKX26DMM"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0YXKX26DMM');
            gtag('config', 'AW-17899815726');
          `}
        </Script>

        {/*
          Security headers — set at CDN/hosting level (CloudFront/nginx):
          Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
          Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; ...
          Cross-Origin-Opener-Policy: same-origin
          X-Frame-Options: DENY
          X-Content-Type-Options: nosniff
          Referrer-Policy: strict-origin-when-cross-origin
          Permissions-Policy: camera=(), microphone=(), geolocation=()
        */}
      </head>
      <body className="min-h-screen bg-primary text-white font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
