import { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import CTA from '@/components/CTA';
import { getFAQ } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Veelgestelde Vragen (FAQ)',
  description: 'Antwoorden op veelgestelde vragen over fotografie bij Tigran Media. Tarieven, levertijden, locaties en meer.',
  url: '/faq',
});

export default function FAQPage() {
  const faqs = getFAQ();
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* FAQ Section — with built-in heading, extra top padding for navbar clearance */}
      <FAQSection faqs={faqs} className="pt-28 md:pt-32" />

      {/* CTA */}
      <CTA
        title="Nog Vragen?"
        description="Staat uw vraag er niet bij? Neem gerust contact met ons op. We helpen u graag verder!"
        ctaText="Stel Uw Vraag"
        ctaLink="/contact/"
        variant="gradient"
      />
    </>
  );
}
