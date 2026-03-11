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
  aspectRatio = 'aspect-[4/3]',
  delay = 0,
  sizes,
  priority = false,
  imageClassName = '',
  className = '',
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
      initial={shouldReduceMotion ? {} : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={shouldReduceMotion ? {} : { clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: REVEAL_EASE }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={shouldReduceMotion ? {} : { scale: 1.08 }}
        whileInView={shouldReduceMotion ? {} : { scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, delay, ease: REVEAL_EASE }}
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
