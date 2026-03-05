import { Metadata } from 'next';

const SITE_URL = 'https://www.tigranmedia.be';
const SITE_NAME = 'Tigran Media';
const DEFAULT_DESCRIPTION = 'Professionele content fotografie voor KMO\'s en ondernemers in de Kempen. Website foto\'s, social media content en branding shoots door Tigran.';
const DEFAULT_IMAGE = '/opengraph-image.jpg';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = '',
  type = 'website',
  article,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Content Fotograaf Kempen & Turnhout`;
  const fullUrl = `${SITE_URL}${url}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: fullUrl,
      languages: {
        'nl-BE': fullUrl,
        'x-default': fullUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: 'nl_BE',
      type: type === 'article' ? 'article' : 'website',
      ...(article && {
        publishedTime: article.publishedTime,
        authors: article.author ? [article.author] : undefined,
        tags: article.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'BE-VLG',
      'geo.placename': 'Vlaanderen',
    },
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION };
