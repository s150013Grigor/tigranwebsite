import type { Metadata } from 'next';
import { Playfair_Display, Tenor_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import { generateLocalBusinessSchema, generateWebsiteSchema } from '@/lib/structured-data';
import Script from 'next/script';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tenor-sans',
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
    <html lang="nl-BE" className={`${playfair.variable} ${tenorSans.variable}`}>
      <head>
        {/* Preload hero image — mobile and desktop variants */}
        <link
          rel="preload"
          as="image"
          href="/zelfportret-mobile.webp"
          type="image/webp"
          media="(max-width: 1023px)"
        />
        <link
          rel="preload"
          as="image"
          href="/zelfportret-desktop.webp"
          type="image/webp"
          media="(min-width: 1024px)"
        />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" sizes="any" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark-96x96.png" type="image/png" sizes="96x96" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />

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

        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0YXKX26DMM"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0YXKX26DMM');
          `}
        </Script>

        {/* Google Ads Conversion Tracking */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17899815726"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            gtag('config', 'AW-17899815726');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-primary text-white font-body antialiased">
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
