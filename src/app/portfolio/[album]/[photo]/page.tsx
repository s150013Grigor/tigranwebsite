import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAlbums, getPhotosByAlbum, getPhotoBySlug, getAlbumBySlug } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema, generateImageSchema } from '@/lib/structured-data';

export function generateStaticParams() {
  const albums = getAlbums();
  const params: { album: string; photo: string }[] = [];
  
  albums.forEach((album) => {
    const photos = getPhotosByAlbum(album.id);
    photos.forEach((photo) => {
      params.push({ album: album.slug, photo: photo.slug });
    });
  });
  
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { album: string; photo: string };
}): Metadata {
  const photo = getPhotoBySlug(params.album, params.photo);
  if (!photo) return {};
  const album = getAlbumBySlug(params.album);

  return generateSEO({
    title: `${photo.title} — ${album?.title || 'Portfolio'}`,
    description: photo.description,
    image: photo.src,
    url: `/portfolio/${params.album}/${params.photo}`,
  });
}

export default function PhotoPage({
  params,
}: {
  params: { album: string; photo: string };
}) {
  const album = getAlbumBySlug(params.album);
  const photo = getPhotoBySlug(params.album, params.photo);
  
  if (!photo || !album) {
    return <div className="pt-32 text-center text-white">Foto niet gevonden</div>;
  }

  const albumPhotos = getPhotosByAlbum(album.id);
  const currentIndex = albumPhotos.findIndex((p) => p.id === photo.id);
  const prevPhoto = currentIndex > 0 ? albumPhotos[currentIndex - 1] : null;
  const nextPhoto = currentIndex < albumPhotos.length - 1 ? albumPhotos[currentIndex + 1] : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: album.title, url: `/portfolio/${album.slug}` },
    { name: photo.title, url: `/portfolio/${album.slug}/${photo.slug}` },
  ]);

  const imageSchema = generateImageSchema({
    name: photo.title,
    description: photo.description,
    url: `/portfolio/${album.slug}/${photo.slug}`,
    contentUrl: photo.src,
    width: photo.width,
    height: photo.height,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />

      <div className="pt-24 pb-16 bg-primary min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio/" className="hover:text-accent transition-colors">Portfolio</Link>
            <span>/</span>
            <Link href={`/portfolio/${album.slug}/`} className="hover:text-accent transition-colors">
              {album.title}
            </Link>
            <span>/</span>
            <span className="text-white">{photo.title}</span>
          </nav>

          {/* Main Image */}
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface mb-8">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>

          {/* Photo Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {photo.title}
              </h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                {photo.description}
              </p>
              {photo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface text-accent text-xs uppercase tracking-wider border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-surface border border-white/5">
                <h3 className="text-white font-heading text-lg mb-4">Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Album</dt>
                    <dd className="text-white">{album.title}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Fotograaf</dt>
                    <dd className="text-white">Tigran</dd>
                  </div>
                </dl>
              </div>

              <Link
                href="/contact/"
                className="block w-full text-center px-6 py-3 bg-accent text-primary text-sm uppercase tracking-wider hover:bg-accent-light transition-colors"
              >
                Interesse? Neem contact op
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
            {prevPhoto ? (
              <Link
                href={`/portfolio/${album.slug}/${prevPhoto.slug}/`}
                className="text-gray-400 hover:text-accent transition-colors text-sm"
              >
                ← {prevPhoto.title}
              </Link>
            ) : (
              <div />
            )}
            <Link
              href={`/portfolio/${album.slug}/`}
              className="text-accent text-sm hover:underline"
            >
              Terug naar album
            </Link>
            {nextPhoto ? (
              <Link
                href={`/portfolio/${album.slug}/${nextPhoto.slug}/`}
                className="text-gray-400 hover:text-accent transition-colors text-sm"
              >
                {nextPhoto.title} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
