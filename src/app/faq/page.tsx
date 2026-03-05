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

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center" style={{ height: '50vh' }}>
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/noise.svg')", backgroundRepeat: 'repeat' }}
        />
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,169,126,0.06) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
            Hulp nodig?
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            Veelgestelde Vragen
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Vind hier antwoorden op de meest gestelde vragen over onze diensten.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

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
