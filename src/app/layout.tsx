import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateLocalBusinessSchema, generateWebsiteSchema } from '@/lib/structured-data';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'Tigran Media — Professionele Fotograaf in Vlaanderen',
    template: '%s | Tigran Media',
  },
  description:
    'Professionele fotograaf in Vlaanderen. Gespecialiseerd in portretfotografie, zakelijke fotografie, evenementfotografie en meer. Boek nu uw fotoshoot bij Tigran Media.',
  metadataBase: new URL('https://www.tigranmedia.be'),
  alternates: {
    canonical: 'https://www.tigranmedia.be',
  },
  openGraph: {
    title: 'Tigran Media — Professionele Fotograaf in Vlaanderen',
    description:
      'Professionele fotograaf in Vlaanderen. Portretten, evenementen, zakelijke shoots en meer.',
    url: 'https://www.tigranmedia.be',
    siteName: 'Tigran Media',
    locale: 'nl_BE',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Tigran Media - Professionele Fotografie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tigran Media — Professionele Fotograaf in Vlaanderen',
    description:
      'Professionele fotograaf in Vlaanderen. Portretten, evenementen, zakelijke shoots en meer.',
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
    <html lang="nl-BE">
      <head>
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
        {/*
        <Script id="google-ads" strategy="afterInteractive">
          {`
            gtag('config', 'AW-XXXXXXXXX');
          `}
        </Script>
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
