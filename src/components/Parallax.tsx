'use client';

import { useRef, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
  imageAlt?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  direction?: 'up' | 'down';
  height?: string;
}

export default function Parallax({
  children,
  speed = 0.5,
  className = '',
  backgroundImage,
  imageAlt = '',
  overlay = true,
  overlayOpacity = 0.5,
  direction = 'up',
  height = '100vh',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const factor = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 500 * speed * factor]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  // Lokale paden (beginnen met /) → <Image> voor Next.js WebP optimalisatie
  const isLocalImage = backgroundImage?.startsWith('/');

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-black ${className}`}
      style={{ height }}
    >
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y }}
        >
          {isLocalImage ? (
            <div
              className="absolute inset-0 w-full"
              style={{ height: '150%', top: '-25%' }}
            >
              <Image
                src={backgroundImage}
                alt={imageAlt}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          ) : (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                height: '150%',
                top: '-25%',
              }}
            />
          )}
        </motion.div>
      )}
      {overlay && (
        <div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <motion.div
        className="relative z-20 flex items-center justify-center w-full h-full"
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
