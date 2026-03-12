import { Metadata } from 'next';
import Link from 'next/link';
import { cities, getCityBySlug } from '@/data/cities';
import { generateSEO } from '@/lib/seo';
import { generateCityServiceSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/structured-data';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import CityAbout from '@/components/CityAbout';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import { getCityContent } from '@/data/city-content';

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCityBySlug(params.city);
  if (!city) return {};

  const keywords = [
    `fotograaf ${city.name}`,
    `professionele fotograaf ${city.name}`,
    `fotografie ${city.name}`,
    `portretfotograaf ${city.name}`,
    `evenementfotograaf ${city.name}`,
    `zakelijke fotograaf ${city.name}`,
    `productfotograaf ${city.name}`,
    `fotoshoot ${city.name}`,
    `fotograaf ${city.province}`,
  ];

  return {
    ...generateSEO({
      title: `Fotograaf ${city.name} — Professionele Fotografie ${city.name}`,
      description: `Professionele fotograaf in ${city.name}, ${city.province}. Tigran Media biedt portret-, zakelijke, evenement- en productfotografie. ${city.population ? `Actief in ${city.name} (${city.population} inwoners)` : `Actief in ${city.name}`} en omgeving. Boek nu!`,
      url: `/fotograaf/${city.slug}`,
    }),
    keywords: keywords.join(', '),
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);
  if (!city) return <div className="pt-32 text-center text-white">Stad niet gevonden</div>;

  const content = getCityContent(city.name, city.slug, city.description, city.province);

  // Structured data
  const citySchema = generateCityServiceSchema(city.name, city.slug);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: `Fotograaf ${city.name}`, url: `/fotograaf/${city.slug}` },
  ]);
  const localBusinessSchema = {
    ...generateLocalBusinessSchema(),
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: city.province },
    },
  };

  // Neighboring cities for internal linking
  const neighborCities = cities
    .filter((c) => c.province === city.province && c.slug !== city.slug)
    .slice(0, 8);

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Fixed background photo — identical to homepage */}
      <Hero />

      {/* Hero text — same layout as homepage */}
      <div className="relative z-10 h-screen min-h-[600px] max-h-[1200px] flex items-end">
        <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-6 sm:px-10 lg:px-8 2xl:px-12 4xl:px-16 pb-20 md:pb-24 lg:pb-20">
          <div className="max-w-2xl lg:max-w-[45%]">
            <p className="text-white/60 text-xs md:text-sm 2xl:text-base tracking-[0.5em] uppercase mb-8 font-body">
              Professionele Fotografie
            </p>
            <h1 className="font-heading font-bold leading-[1.05] tracking-[-0.02em] mb-2">
              <span className="block text-white text-[2.5rem] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-[7rem] 5xl:text-[8.5rem]">
                Fotograaf in {city.name}
              </span>
            </h1>
            <p
              className="text-white/60 text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl max-w-xl 2xl:max-w-2xl mt-8 mb-10 font-body leading-relaxed"
              style={{ textShadow: '0 1px 20px rgba(0,0,0,0.8)' }}
            >
              Op zoek naar een professionele fotograaf in {city.name}? Tigran Media legt jouw bedrijf vast in {city.description}.
            </p>
            <Link
              href="/contact/"
              className="px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 bg-white text-black font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:bg-white/85 transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
            >
              Boek een shoot →
            </Link>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="relative z-10" style={{ boxShadow: '0 -20px 60px rgba(0,0,0,0.8)' }}>
        {/* Services */}
        <ServicesSection
          title={`Onze Diensten in ${city.name}`}
          subtitle={`Fotograaf ${city.name}`}
        />

        {/* Portfolio CTA */}
        <section className="py-12 bg-primary text-center">
          <Link
            href="/portfolio/"
            className="inline-block px-10 py-4 border border-white/30 text-white font-body text-xs uppercase tracking-[0.22em] hover:bg-white hover:text-black transition-all duration-[250ms] ease-out"
          >
            Bekijk ons volledige portfolio →
          </Link>
        </section>

        {/* City About Section */}
        <CityAbout
          cityName={city.name}
          text={content.aboutText}
        />

        {/* Testimonials */}
        <Testimonials
          title="Wat Klanten Zeggen"
          subtitle="Getuigenissen"
        />

        {/* CTA */}
        <CTA
          title={`Klaar voor Uw Fotoshoot in ${city.name}?`}
          description={`Boek vandaag uw professionele fotoshoot in ${city.name}. Tigran Media staat klaar om uw mooiste momenten vast te leggen.`}
          ctaText="Neem Contact Op"
          ctaLink="/contact/"
          secondaryCtaText="Bekijk Portfolio"
          secondaryCtaLink="/portfolio/"
        />

        {/* Nearby Cities */}
        {neighborCities.length > 0 && (
          <section className="py-16 bg-primary">
            <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
              <div className="text-center mb-10">
                <p className="text-white/50 text-sm tracking-[0.3em] uppercase mb-4 font-body">
                  Regio
                </p>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                  Ook Actief in de Buurt van {city.name}
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {neighborCities.map((nc) => (
                  <Link
                    key={nc.slug}
                    href={`/fotograaf/${nc.slug}/`}
                    className="p-4 bg-primary-dark border border-white/5 hover:border-white/30 transition-all text-center group"
                  >
                    <p className="text-white group-hover:text-white transition-colors font-heading">
                      Fotograaf {nc.name}
                    </p>
                    <p className="text-white/50 text-xs mt-1">{nc.province}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
