import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAlbums, getAlbumBySlug } from '@/lib/content';
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

export default function AlbumPage() {
  redirect('/portfolio/');
}
