import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Social Media Content — Tigran Media',
  description: 'Consistente, authentieke foto\'s voor Instagram en LinkedIn. Maandelijkse content die jouw merk professioneel en herkenbaar maakt.',
  url: '/social-media-content',
});

const includes = [
  'Maandelijkse of periodieke contentshoot',
  'Mix van portret, sfeer en productfoto\'s',
  'Professionele nabewerking in jouw brandstijl',
  'Bestanden geoptimaliseerd per platform (feed, stories, LinkedIn)',
  'Contentplanning in overleg (optioneel)',
  'Gebruiksrecht voor al je social media kanalen',
];

const forWhom = [
  'Ondernemers die consistent willen posten maar geen tijd hebben voor fotografie',
  'Merken die af willen van stockfoto\'s en Canva-templates',
  'Coaches en consultants die hun persoonlijke merk willen versterken',
  'Horecazaken die sfeer en gerechten professioneel willen vastleggen',
];

const results = [
  'Herkenbare, on-brand content die opvalt in de feed',
  'Meer engagement door authentieke beelden',
  'Tijdsbesparing — geen gedoe meer met zelf foto\'s maken',
  'Professionele uitstraling op elk platform',
];

export default function SocialMediaContentPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Social Media Content', url: '/social-media-content' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/50 text-xs md:text-sm tracking-[0.5em] uppercase mb-6 font-body">
            Dienst
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Social Media Content
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed font-body max-w-2xl">
            Je concurrent post stockfoto&apos;s. Jij post content die er écht uitziet. Maandelijkse foto&apos;s voor Instagram en LinkedIn die consistent, authentiek en on-brand zijn.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black border-t border-white/[0.07]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
            Wat zit erin
          </h2>
          <ul className="space-y-4">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="text-white/30 mt-1 text-sm">—</span>
                <span className="text-white/70 text-base md:text-lg font-body leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black border-t border-white/[0.07]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
            Voor wie
          </h2>
          <ul className="space-y-4">
            {forWhom.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="text-white/30 mt-1 text-sm">—</span>
                <span className="text-white/70 text-base md:text-lg font-body leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black border-t border-white/[0.07]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
            Wat het je oplevert
          </h2>
          <ul className="space-y-4">
            {results.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="text-white/30 mt-1 text-sm">—</span>
                <span className="text-white/70 text-base md:text-lg font-body leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-black border-t border-white/[0.07]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Nooit meer zonder content zitten?
          </h2>
          <p className="text-white/50 text-base md:text-lg font-body mb-10 max-w-lg mx-auto">
            Laten we bespreken hoe een maandelijkse contentshoot jouw socials kan transformeren.
          </p>
          <Link
            href="/contact/"
            className="px-10 py-4 bg-white text-black font-body text-xs uppercase tracking-[0.22em] hover:bg-white/85 transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
          >
            Neem contact op →
          </Link>
        </div>
      </section>
    </>
  );
}
