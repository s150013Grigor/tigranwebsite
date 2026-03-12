'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function PortfolioGrid({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  );
  const next = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className="columns-2 lg:columns-3 gap-[5px]">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="break-inside-avoid mb-[5px] cursor-pointer group"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto block transition-[filter] duration-300 group-hover:brightness-75"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white/60 hover:text-white text-4xl leading-none z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Sluiten"
          >
            ×
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-5xl leading-none z-10 px-3 py-4 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Vorige foto"
          >
            ‹
          </button>

          {/* Photo — stopPropagation so clicking image doesn't close */}
          <div
            className="relative flex items-center justify-center"
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-5xl leading-none z-10 px-3 py-4 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Volgende foto"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
