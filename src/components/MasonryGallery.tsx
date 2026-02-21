'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const aspectRatios = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[2/3]',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[5/6]',
  'aspect-square',
];

interface Photo {
  id: string;
  title: string;
  src: string;
  alt: string;
  slug: string;
  tags?: string[];
}

function MasonryItem({ photo, albumSlug, index }: { photo: Photo; albumSlug: string; index: number }) {
  const ratio = aspectRatios[index % aspectRatios.length];
  return (
    <motion.div
      className="break-inside-avoid mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      <Link
        href={`/portfolio/${albumSlug}/${photo.slug}/`}
        className="group block relative overflow-hidden rounded-sm"
      >
        <div className={`relative overflow-hidden ${ratio}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-white text-sm font-heading font-semibold">{photo.title}</h3>
            {photo.tags && photo.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {photo.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[10px] text-accent/80 uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function MasonryGallery({ photos, albumSlug }: { photos: Photo[]; albumSlug: string }) {
  return (
    <div className="columns-2 md:columns-3 gap-4">
      {photos.map((photo, index) => (
        <MasonryItem
          key={photo.id}
          photo={photo}
          albumSlug={albumSlug}
          index={index}
        />
      ))}
    </div>
  );
}
