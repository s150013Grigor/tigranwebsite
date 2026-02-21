import { Metadata } from 'next';

const SITE_URL = 'https://www.tigranmedia.be';
const SITE_NAME = 'Tigran Media';
const DEFAULT_DESCRIPTION = 'Professionele fotograaf in Vlaanderen. Gespecialiseerd in portretfotografie, zakelijke fotografie, evenementfotografie en meer. Boek nu uw fotoshoot bij Tigran Media.';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=630&fit=crop';

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
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Professionele Fotograaf in Vlaanderen`;
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
