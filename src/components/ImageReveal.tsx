'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <motion.div
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay }}
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
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={
        isInView
          ? { clipPath: 'inset(0% 0% 0% 0%)' }
          : { clipPath: 'inset(100% 0% 0% 0%)' }
      }
      transition={{ duration: 0.9, ease: REVEAL_EASE, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={isInView ? { scale: 1 } : { scale: 1.08 }}
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
    </motion.div>
  );
}
