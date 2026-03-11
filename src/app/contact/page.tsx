import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Parallax from '@/components/Parallax';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Samenwerken',
  description: 'Plan een vrijblijvende kennismaking met Tigran Media. Bel +32 474 11 48 99 of mail naar info@tigranmedia.be.',
  url: '/contact',
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <Parallax
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=800&fit=crop"
        speed={0.3}
        overlayOpacity={0.7}
        height="50vh"
      >
        <div className="text-center px-4">
          <p className="text-white/50 text-sm tracking-[0.3em] uppercase mb-4 font-body">
            Laten we praten
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            Samenwerken
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Benieuwd of we matchen? Plan een vrijblijvend gesprek en ontdek wat professionele content voor jouw bedrijf kan doen.
          </p>
        </div>
      </Parallax>

      {/* Contact Form */}
      <ContactForm
        apiEndpoint="https://m16xyh3em8.execute-api.eu-west-1.amazonaws.com/api/contact"
      />
    </>
  );
}
