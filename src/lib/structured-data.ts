import { SITE_URL } from './seo';

// Schema.org Structured Data generators

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Tigran Media',
    description: 'Professionele fotograaf in Vlaanderen gespecialiseerd in portret-, evenement-, zakelijke en productfotografie.',
    url: SITE_URL,
    telephone: '+32474114899',
    email: 'info@tigranmedia.be',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=630&fit=crop',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Vlaanderen',
      addressCountry: 'BE',
    },
    areaServed: {
      '@type': 'State',
      name: 'Vlaanderen',
      containedInPlace: {
        '@type': 'Country',
        name: 'België',
      },
    },
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    sameAs: [],
  };
}

export function generatePhotographerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Tigran Media',
    description: 'Professionele fotograaf in Vlaanderen',
    url: SITE_URL,
    telephone: '+32474114899',
    email: 'info@tigranmedia.be',
    serviceType: [
      'Zakelijke Fotografie',
      'Portretfotografie',
      'Evenementfotografie',
      'Productfotografie',
      'Familiefotografie',
      'Natuurfotografie',
    ],
    areaServed: {
      '@type': 'State',
      name: 'Vlaanderen',
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tigran Media',
    url: SITE_URL,
    description: 'Professionele fotograaf in Vlaanderen',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/portfolio/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tigran Media',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${article.url}`,
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateImageSchema(image: {
  name: string;
  description: string;
  url: string;
  contentUrl: string;
  width: number;
  height: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: image.name,
    description: image.description,
    url: `${SITE_URL}${image.url}`,
    contentUrl: image.contentUrl,
    width: image.width,
    height: image.height,
    author: {
      '@type': 'Person',
      name: 'Tigran',
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Tigran Media',
    },
  };
}

export function generateCityServiceSchema(cityName: string, citySlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Fotograaf ${cityName}`,
    description: `Professionele fotograaf in ${cityName}. Tigran Media biedt portret-, evenement-, zakelijke en productfotografie in ${cityName} en omgeving.`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Tigran Media',
      telephone: '+32474114899',
      email: 'info@tigranmedia.be',
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: {
        '@type': 'State',
        name: 'Vlaanderen',
      },
    },
    url: `${SITE_URL}/fotograaf/${citySlug}`,
    serviceType: 'Fotografie',
  };
}
