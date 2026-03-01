import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import ServicesSection from '@/components/ServicesSection';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import BlogCard from '@/components/BlogCard';
import { getAlbums, getBlogPosts } from '@/lib/content';
import { generatePhotographerSchema } from '@/lib/structured-data';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  url: '/',
});

export default function HomePage() {
  const albums = getAlbums();
  const blogPosts = getBlogPosts().slice(0, 3);
  const photographerSchema = generatePhotographerSchema();

  const galleryItems = albums.map((album) => ({
    id: album.id,
    title: album.title,
    slug: album.slug,
    coverImage: album.coverImage,
    category: album.category,
    description: album.description,
    href: `/portfolio/${album.slug}/`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photographerSchema) }}
      />

      {/* Hero - fixed background */}
      <Hero />

      {/* All content after hero scrolls over the fixed background */}
      <div className="relative z-10">
        {/* Services */}
        <ServicesSection />

        {/* Portfolio Gallery */}
        <Gallery
          items={galleryItems}
          columns={3}
          title="Portfolio"
          subtitle="Ons werk"
        />

        {/* Static Divider (formerly Parallax) */}
        <div className="relative overflow-hidden bg-black" style={{ height: '50vh' }}>
          <div className="absolute inset-0 w-full h-full">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1920&h=600&fit=crop)',
              }}
            />
          </div>
          <div className="absolute inset-0 bg-black z-10" style={{ opacity: 0.6 }} />
          <div className="relative z-20 flex items-center justify-center w-full h-full">
            <div className="text-center px-4">
              <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
                Kwaliteit & Passie
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white max-w-3xl">
                Elk Moment Verdient het om Vastgelegd te Worden
              </h2>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Blog Preview */}
        {blogPosts.length > 0 && (
          <section className="py-20 bg-primary-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
                  Blog
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                  Laatste Berichten
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
