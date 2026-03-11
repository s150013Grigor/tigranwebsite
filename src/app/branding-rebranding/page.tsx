import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Branding & Rebranding — Tigran Media',
  description: 'Een volledig nieuw visueel verhaal voor bedrijven die zich herpositioneren of willen groeien. Professionele branding fotografie door Tigran Media.',
  url: '/branding-rebranding',
});

const includes = [
  'Uitgebreid intakegesprek over je merk, doelgroep en ambitie',
  'Moodboard & visuele richting vooraf',
  'Uitgebreide fotoshoot (hele dag of meerdere sessies)',
  'Portret, sfeer, product en behind-the-scenes beelden',
  'Professionele nabewerking in een consistente stijl',
  'Beeldbank voor website, socials, drukwerk en presentaties',
];

const forWhom = [
  'Bedrijven die zich herpositioneren of een nieuwe markt betreden',
  'Ondernemers die hun persoonlijke merk professioneel willen neerzetten',
  'Scale-ups die van "startup-look" naar een volwassen uitstraling willen',
  'Restaurants en retailers die een nieuw concept lanceren',
];

const results = [
  'Een complete visuele identiteit die je merk versterkt',
  'Beelden die je jarenlang kunt inzetten op elk kanaal',
  'Herkenning en vertrouwen bij je doelgroep',
  'Consistentie in al je communicatie — van website tot visitekaartje',
];

export default function BrandingRebrandingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Branding & Rebranding', url: '/branding-rebranding' },
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
            Branding &amp; Rebranding
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed font-body max-w-2xl">
            Je merk verdient beelden die even sterk zijn als je ambities. Een volledig nieuw visueel verhaal voor bedrijven die zich herpositioneren of willen groeien.
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
            Klaar voor een visuele upgrade?
          </h2>
          <p className="text-white/50 text-base md:text-lg font-body mb-10 max-w-lg mx-auto">
            Laten we samen bekijken hoe jouw merk er visueel sterker uit kan zien.
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
