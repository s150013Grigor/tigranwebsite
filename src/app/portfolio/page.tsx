import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CTA from '@/components/CTA';
import Parallax from '@/components/Parallax';
import { getAlbums } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Portfolio',
  description: 'Bekijk het portfolio van Tigran Media. Professionele fotografie in portretten, evenementen, producten en meer.',
  url: '/portfolio',
});

export default function PortfolioPage() {
  const albums = getAlbums();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <Parallax
        backgroundImage="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&h=800&fit=crop"
        speed={0.3}
        overlayOpacity={0.65}
        height="60vh"
      >
        <div className="text-center px-4">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
            Ons Werk
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            Portfolio
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ontdek onze collectie van professionele fotografie. Kies een categorie om onze foto&apos;s te bekijken.
          </p>
        </div>
      </Parallax>

      {/* Category Grid */}
      <section className="py-20 3xl:py-28 4xl:py-36 bg-primary">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
          <div className="text-center mb-16 4xl:mb-24">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
              Categorie&euml;n
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Kies een Categorie
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/portfolio/${album.slug}/`}
                className="group relative block overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl md:text-2xl font-heading font-bold group-hover:text-accent transition-colors duration-300">
                    {album.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                    {album.description}
                  </p>
                  <span className="inline-flex items-center text-accent text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Bekijk foto&apos;s &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Wilt u ook zulke foto's?"
        description="Neem contact op voor een vrijblijvende offerte en ontdek wat Tigran Media voor u kan betekenen."
      />
    </>
  );
}
