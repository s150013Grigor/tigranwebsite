'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const REVEAL_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  delay?: number;
  sizes?: string;
  priority?: boolean;
  imageClassName?: string;
  className?: string;
}

export default function ImageReveal({
  src,
  alt,
  aspectRatio,
  delay = 0,
  sizes = '100vw',
  priority = false,
  imageClassName = '',
  className = '',
}: ImageRevealProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Image — always visible, scale animates */}
      <motion.div
        className="absolute inset-0"
        initial={prefersReduced ? undefined : { scale: 1.08 }}
        whileInView={prefersReduced ? undefined : { scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: REVEAL_EASE, delay }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      </motion.div>

      {/* Overlay mask — slides up to reveal the image */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 z-10 bg-[#111111]"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: REVEAL_EASE, delay }}
        />
      )}
    </div>
  );
}
