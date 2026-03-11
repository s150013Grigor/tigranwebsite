'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

interface PhotoCardProps {
  title: string;
  src: string;
  alt: string;
  href: string;
  tags?: string[];
  index?: number;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PhotoCard({
  title,
  src,
  alt,
  href,
  tags = [],
  index = 0,
}: PhotoCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index < 5 ? index * 0.08 : 0, ease: EASE_OUT_EXPO }}
    >
      <Link href={href} className="group block relative overflow-hidden">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-out" />
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-out">
            <h3 className="text-white text-sm font-heading font-semibold translate-y-2 group-hover:translate-y-0 transition-transform duration-[250ms] ease-out">{title}</h3>
            {tags.length > 0 && (
              <div className="flex gap-2 mt-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-[250ms] ease-out delay-[50ms]">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-white/60 uppercase tracking-wider"
                  >
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
