import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MasonryGallery from '@/components/MasonryGallery';
import CTA from '@/components/CTA';
import { getAlbums, getAlbumBySlug, getPhotosByAlbum } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export function generateStaticParams() {
  const albums = getAlbums();
  return albums.map((album) => ({ album: album.slug }));
}

export function generateMetadata({ params }: { params: { album: string } }): Metadata {
  const album = getAlbumBySlug(params.album);
  if (!album) return {};
  
  return generateSEO({
    title: album.title,
    description: album.description,
    image: album.coverImage,
    url: `/portfolio/${album.slug}`,
  });
}

export default function AlbumPage({ params }: { params: { album: string } }) {
  const album = getAlbumBySlug(params.album);
  if (!album) return <div className="pt-32 text-center text-white">Album niet gevonden</div>;

  const photos = getPhotosByAlbum(album.id);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: album.title, url: `/portfolio/${album.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={album.coverImage}
          alt={album.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16 pb-16 w-full">
            <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <Link href="/portfolio/" className="hover:text-accent transition-colors">Portfolio</Link>
              <span>/</span>
              <span className="text-white">{album.title}</span>
            </nav>
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
              {album.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              {album.title}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              {album.description}
            </p>
            <p className="text-gray-500 text-sm mt-4">
              {photos.length} foto&apos;s
            </p>
          </div>
        </div>
      </div>

      {/* Photo Grid - Masonry */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
          <MasonryGallery photos={photos} albumSlug={album.slug} />
        </div>
      </section>

      {/* CTA */}
      <CTA
        title={`${album.title} Nodig?`}
        description={`Bent u geïnteresseerd in ${album.title.toLowerCase()}? Neem contact op voor een vrijblijvende offerte.`}
        variant="gradient"
      />
    </>
  );
}
