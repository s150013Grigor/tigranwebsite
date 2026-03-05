import { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Wie ik ben',
  description: 'Leer Tigran kennen — 18-jarige content fotograaf uit de Kempen. Ik maak foto\'s die jouw bedrijf versterken, niet decoreren.',
  url: '/over-ons',
});

export default function OverOnsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Over Ons', url: '/over-ons/' },
  ]);

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutSection />
    </div>
  );
}
