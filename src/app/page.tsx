import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import ServicesSection from '@/components/ServicesSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import TestimonialSpotlight from '@/components/TestimonialSpotlight';
import BlogCard from '@/components/BlogCard';
import { getAlbums, getBlogPosts } from '@/lib/content';
import { generatePhotographerSchema } from '@/lib/structured-data';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  url: '/',
});

export default function HomePage() {
  const allAlbums = getAlbums();
  // Filter out Product Fotografie from homepage
  const albums = allAlbums.filter((a) => a.id !== 'familie');
  const blogPosts = getBlogPosts().slice(0, 3);
  const photographerSchema = generatePhotographerSchema();

  const galleryItems = albums.slice(0, 6).map((album) => ({
    id: album.id,
    title: album.title,
    slug: album.slug,
    coverImage: album.coverImage,
    category: album.category,
    description: album.description,
    href: `/portfolio/${album.slug}/`,
  }));

  const albumServices = albums.map((a) => ({
    title: a.title,
    description: a.description,
    slug: a.slug,
  }));

  const brandingServices = [
    {
      title: 'Website Fotografie',
      description: 'Website bezoekers beslissen in 3 seconden. Geef ze een reden om te blijven. Professionele beelden voor je homepage, over ons en dienstenpagina\'s die vertrouwen wekken en converteren.',
      href: '/contact/',
    },
    {
      title: 'Social Media Content',
      description: 'Je concurrent post stockfoto\'s. Jij post content die er écht uitziet. Maandelijkse foto\'s voor Instagram en LinkedIn die consistent, authentiek en on-brand zijn.',
      href: '/contact/',
    },
    {
      title: 'Branding & Rebranding',
      description: 'Je merk verdient beelden die even sterk zijn als je ambities. Een volledig nieuw visueel verhaal voor bedrijven die zich herpositioneren of willen groeien.',
      href: '/contact/',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photographerSchema) }}
      />

      {/* Hero */}
      <Hero />

      {/* All content after hero */}
      <div className="relative z-10">

        {/* Services */}
        <ServicesSection services={brandingServices} />

        {/* Marquee ticker — visueel scheidingselement */}
        <MarqueeTicker />

        {/* Portfolio Gallery */}
        <Gallery
          items={galleryItems}
          columns={3}
          title="Portfolio"
          subtitle="Recent werk"
        />

        {/* Gouden accent lijn */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/[0.18] to-transparent" />

        {/* Marquee ticker — tweede scheidingselement */}
        <MarqueeTicker />

        {/* Gouden accent lijn */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/[0.18] to-transparent" />

        {/* Testimonial spotlight — eerlijke social proof */}
        <TestimonialSpotlight />

        {/* Divider — foto met quote */}
        <div className="relative overflow-hidden bg-[#1a1a1a]" style={{ height: '60vh' }}>
          <div className="absolute inset-0 w-full h-full">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              role="img"
              aria-label="Kineworks Turnhout — gefotografeerd door Tigran Media"
              style={{
                backgroundImage:
                  "url('/Kineworks13jan2026-114.jpg')",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-black z-10" style={{ opacity: 0.6 }} />
          {/* Fade aan bovenkant */}
          <div className="absolute top-0 left-0 right-0 h-20 z-[15] pointer-events-none bg-gradient-to-b from-[#0a0a0a] to-transparent" />
          {/* Fade aan onderkant */}
          <div className="absolute bottom-0 left-0 right-0 h-36 md:h-48 z-[15] pointer-events-none bg-gradient-to-b from-transparent to-[#1a1a1a]" />
          <div className="relative z-20 flex items-center justify-center w-full h-full">
            <div className="text-center px-4">
              <p className="text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body">
                Mijn overtuiging
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl 3xl:text-8xl 4xl:text-9xl 5xl:text-[10rem] font-heading font-bold tracking-[0.02em] text-gradient-gold max-w-3xl 4xl:max-w-5xl">
                Goede foto&rsquo;s verkopen. Slechte foto&rsquo;s kosten.
              </h2>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Blog Preview */}
        {blogPosts.length > 0 && (
          <section className="py-24 md:py-32 3xl:py-44 4xl:py-56 bg-primary-light">
            <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
              <div className="text-center mb-20 md:mb-24 4xl:mb-32">
                <p className="text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body">
                  Blog
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl font-heading font-bold tracking-[0.02em] text-gradient-gold">
                  Laatste Berichten
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 4xl:gap-12">
                {blogPosts.map((post, index) => (
                  <BlogCard
                    key={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    coverImage={post.coverImage}
                    date={post.date}
                    slug={post.slug}
                    category={post.category}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <CTA />

      </div>
    </>
  );
}
