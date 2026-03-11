import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Hero from '@/components/Hero';
import MarqueeTicker from '@/components/MarqueeTicker';
import { getAlbums, getBlogPosts } from '@/lib/content';
import { generatePhotographerSchema } from '@/lib/structured-data';
import { generateSEO } from '@/lib/seo';

const Gallery = dynamic(() => import('@/components/Gallery'));
const ServicesSection = dynamic(() => import('@/components/ServicesSection'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const CTA = dynamic(() => import('@/components/CTA'));
const TestimonialSpotlight = dynamic(() => import('@/components/TestimonialSpotlight'));
const BlogCard = dynamic(() => import('@/components/BlogCard'));

export const metadata: Metadata = generateSEO({
  url: '/',
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('nl-BE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function HomePage() {
  const allAlbums = getAlbums();
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

  const brandingServices = [
    {
      title: 'Website Fotografie',
      description: 'Website bezoekers beslissen in 3 seconden. Geef ze een reden om te blijven. Professionele beelden voor je homepage, over ons en dienstenpagina\'s die vertrouwen wekken en converteren.',
      href: '/website-fotografie/',
    },
    {
      title: 'Social Media Content',
      description: 'Je concurrent post stockfoto\'s. Jij post content die er écht uitziet. Maandelijkse foto\'s voor Instagram en LinkedIn die consistent, authentiek en on-brand zijn.',
      href: '/social-media-content/',
    },
    {
      title: 'Branding & Rebranding',
      description: 'Je merk verdient beelden die even sterk zijn als je ambities. Een volledig nieuw visueel verhaal voor bedrijven die zich herpositioneren of willen groeien.',
      href: '/branding-rebranding/',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photographerSchema) }}
      />

      {/* Hero spacer — hero is position:fixed, this reserves its height */}
      <div className="relative z-0 h-screen min-h-[600px] max-h-[1200px]">
        <Hero />
      </div>

      {/* Page content scrolls over the fixed hero */}
      <div className="relative z-10" style={{ boxShadow: '0 -20px 60px rgba(0,0,0,0.8)' }}>
        <ServicesSection services={brandingServices} />

        <MarqueeTicker />

        <Gallery
          items={galleryItems}
          columns={3}
          title="Portfolio"
          subtitle="Recent werk"
        />

        {/* Divider */}
        <div className="relative overflow-hidden bg-primary-light" style={{ height: '60vh' }}>
          <Image
            src="/Kineworks13jan2026-114.webp"
            alt="Kineworks Turnhout — gefotografeerd door Tigran Media"
            fill
            quality={80}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute top-0 left-0 right-0 h-20 z-[15] pointer-events-none bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-36 md:h-48 z-[15] pointer-events-none bg-gradient-to-b from-transparent to-[#111111]" />
          <div className="relative z-20 flex items-center justify-center w-full h-full">
            <div className="text-center px-4">
              <p className="text-white/60 text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body">
                Mijn overtuiging
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl 3xl:text-8xl 4xl:text-9xl 5xl:text-[10rem] font-heading font-bold tracking-[0.02em] text-white max-w-3xl 4xl:max-w-5xl">
                Goede foto&rsquo;s verkopen. Slechte foto&rsquo;s kosten.
              </h2>
            </div>
          </div>
        </div>

        <TestimonialSpotlight />

        <Testimonials />

        {blogPosts.length > 0 && (
          <section className="pt-12 pb-24 md:pt-16 md:pb-32 3xl:pt-24 3xl:pb-44 4xl:pt-28 4xl:pb-56 bg-primary-light">
            <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
              <div className="text-center mb-20 md:mb-24 4xl:mb-32">
                <p className="text-white/60 text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body">
                  Blog
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl font-heading font-bold tracking-[0.02em] text-white">
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
                    formattedDate={formatDate(post.date)}
                    slug={post.slug}
                    category={post.category}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </div>
    </>
  );
}
