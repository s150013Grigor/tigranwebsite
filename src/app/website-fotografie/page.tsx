import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Website Fotografie — Tigran Media',
  description: 'Professionele website fotografie die vertrouwen wekt en converteert. Beelden voor je homepage, over-ons en dienstenpagina\'s.',
  url: '/website-fotografie',
});

const includes = [
  'Voorbereiding & moodboard op maat',
  'On-location fotoshoot (halve of hele dag)',
  'Professionele nabewerking van alle beelden',
  'Geoptimaliseerde bestanden voor web (snel ladend)',
  'Persoonlijke selectie afgestemd op je pagina-indeling',
  'Gebruiksrecht voor website & online marketing',
];

const forWhom = [
  'Ondernemers die hun website laten (her)bouwen',
  'Bedrijven met verouderde of generieke stockfoto\'s',
  'Coaches, consultants en freelancers die vertrouwen willen uitstralen',
  'Restaurants en horeca die sfeer willen overbrengen',
];

const results = [
  'Langere sessieduur — bezoekers blijven langer op je site',
  'Hogere conversie — echte beelden wekken meer vertrouwen',
  'Professionele eerste indruk vanaf de eerste seconde',
  'Consistente visuele identiteit door je hele website',
];

export default function WebsiteFotografiePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Website Fotografie', url: '/website-fotografie' },
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
            Website Fotografie
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed font-body max-w-2xl">
            Website bezoekers beslissen in 3 seconden of ze blijven. Stockfoto&apos;s voelen onpersoonlijk — echte foto&apos;s van jouw team, ruimte en product maken het verschil tussen een bounce en een lead.
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
            Klaar om je website te upgraden?
          </h2>
          <p className="text-white/50 text-base md:text-lg font-body mb-10 max-w-lg mx-auto">
            Plan een vrijblijvend gesprek en ontdek wat professionele fotografie voor jouw website kan betekenen.
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
