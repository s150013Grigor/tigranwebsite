import os

content = r"""import { Metadata } from 'next';
import Link from 'next/link';
import { cities, getCityBySlug } from '@/data/cities';
import { getAlbums } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { generateCityServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateLocalBusinessSchema } from '@/lib/structured-data';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import Gallery from '@/components/Gallery';
import CityAbout from '@/components/CityAbout';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import FAQSection from '@/components/FAQSection';
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

  const albums = getAlbums();
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

  const cityFAQs = [
    {
      id: `${city.slug}-1`,
      question: `Wat kost een fotograaf in ${city.name}?`,
      answer: `De tarieven voor professionele fotografie in ${city.name} vari\u00EBren afhankelijk van het type shoot. Portretfotografie begint vanaf \u20AC150, zakelijke fotografie vanaf \u20AC250 en evenementfotografie vanaf \u20AC500. Neem contact op met Tigran Media voor een persoonlijke offerte op maat.`,
    },
    {
      id: `${city.slug}-2`,
      question: `Waar kan ik mooie foto's laten maken in ${city.name}?`,
      answer: `${city.name}, ${city.description}, biedt tal van prachtige locaties voor fotoshoots. Van stadsgezichten tot natuurlijke omgevingen \u2014 wij kennen de beste plekken en helpen u graag bij het kiezen van de perfecte locatie.`,
    },
    {
      id: `${city.slug}-3`,
      question: `Hoe boek ik een fotoshoot in ${city.name}?`,
      answer: `Boek eenvoudig via ons contactformulier, bel naar +32 474 11 48 99 of mail naar info@tigranmedia.be. We plannen graag een vrijblijvend kennismakingsgesprek om uw wensen te bespreken.`,
    },
    {
      id: `${city.slug}-4`,
      question: `Welke soorten fotografie biedt Tigran Media aan in ${city.name}?`,
      answer: `In ${city.name} bieden wij portretfotografie, zakelijke fotografie, evenementfotografie, productfotografie, familiefotografie en fotoshoots op locatie aan. Elk type shoot wordt volledig aangepast aan uw specifieke wensen en doelen.`,
    },
    {
      id: `${city.slug}-5`,
      question: `Hoe lang duurt een fotoshoot in ${city.name}?`,
      answer: `Een standaard portretshoot duurt 1-2 uur, een zakelijke shoot 2-4 uur en evenementfotografie wordt op maat gepland. Na de shoot ontvangt u de bewerkte foto's binnen 5-10 werkdagen.`,
    },
  ];

  const faqSchema = generateFAQSchema(cityFAQs);

  // Gallery items - same as homepage
  const galleryItems = albums.slice(0, 6).map((album) => ({
    id: album.id,
    title: album.title,
    slug: album.slug,
    coverImage: album.coverImage,
    category: album.category,
    description: album.description,
    href: `/portfolio/${album.slug}/`,
  }));

  // Services - same as homepage
  const albumServices = albums.map((a) => ({
    title: a.title,
    description: a.description,
    slug: a.slug,
  }));

  // Neighboring cities for internal linking
  const neighborCities = cities
    .filter((c) => c.province === city.province && c.slug !== city.slug)
    .slice(0, 8);

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero - same component as homepage */}
      <Hero
        title={`Fotograaf in ${city.name}`}
        subtitle="Professionele Fotografie"
        description={`Op zoek naar een professionele fotograaf in ${city.name}? Tigran Media legt uw mooiste momenten vast in ${city.description}.`}
        ctaText="Bekijk Portfolio"
        ctaLink="/portfolio/"
        secondaryCtaText="Boek een Shoot"
        secondaryCtaLink="/contact/"
      />

      <div className="relative z-10">
        {/* Breadcrumbs */}
        <div className="bg-primary border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Fotograaf {city.name}</span>
            </nav>
          </div>
        </div>

        {/* Services - same component as homepage */}
        <ServicesSection
          albums={albumServices}
          title={`Onze Diensten in ${city.name}`}
          subtitle={`Fotograaf ${city.name}`}
        />

        {/* Portfolio Gallery - same component as homepage */}
        <Gallery
          items={galleryItems}
          columns={3}
          title="Portfolio"
          subtitle="Ons werk"
        />

        {/* City About Section - unique content per city */}
        <CityAbout
          cityName={city.name}
          text={content.aboutText}
        />

        {/* Testimonials - same component as homepage */}
        <Testimonials
          title="Wat Klanten Zeggen"
          subtitle="Getuigenissen"
        />

        {/* FAQ */}
        <FAQSection
          faqs={cityFAQs}
          title={`Veelgestelde Vragen \u2014 ${city.name}`}
          subtitle="FAQ"
        />

        {/* CTA - same component as homepage */}
        <CTA
          title={`Klaar voor Uw Fotoshoot in ${city.name}?`}
          description={`Boek vandaag uw professionele fotoshoot in ${city.name}. Tigran Media staat klaar om uw mooiste momenten vast te leggen.`}
          ctaText="Neem Contact Op"
          ctaLink="/contact/"
          secondaryCtaText="Bekijk Portfolio"
          secondaryCtaLink="/portfolio/"
        />

        {/* Nearby Cities - internal linking for SEO */}
        {neighborCities.length > 0 && (
          <section className="py-16 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
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
                    className="p-4 bg-primary-dark border border-white/5 hover:border-accent/30 transition-all text-center group"
                  >
                    <p className="text-white group-hover:text-accent transition-colors font-heading">
                      Fotograaf {nc.name}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{nc.province}</p>
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
"""

with open('src/app/fotograaf/[city]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
