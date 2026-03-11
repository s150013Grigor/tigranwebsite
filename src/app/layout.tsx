import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateLocalBusinessSchema, generateWebsiteSchema } from '@/lib/structured-data';

const Analytics = dynamic(() => import('@/components/Analytics'), { ssr: false });

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
        <link rel="preload" as="image" type="image/webp" href="/DSCF6090-2.webp" fetchPriority="high" />
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
        <Analytics />
      </body>
    </html>
  );
}
