'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  overlayOpacity?: number;
}

export default function Hero({
  title = 'Tigran Media',
  subtitle = 'Professionele Fotografie',
  description = 'Momenten vastleggen die een leven lang meegaan. Portretten, evenementen, zakelijke fotografie en meer in heel Vlaanderen.',
  backgroundImage = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&h=1080&fit=crop',
  ctaText = 'Bekijk Portfolio',
  ctaLink = '/portfolio/',
  secondaryCtaText = 'Neem Contact Op',
  secondaryCtaLink = '/contact/',
  overlayOpacity = 0.55,
}: HeroProps) {
  return (
    <div className="relative h-screen">
      {/* Fixed background that stays in place while content scrolls over */}
      <div
        className="fixed inset-0 w-full h-screen bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Overlay */}
      <div
        className="fixed inset-0 w-full h-screen bg-black z-0"
        style={{ opacity: overlayOpacity }}
      />
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="text-center px-4 max-w-4xl 4xl:max-w-6xl 5xl:max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-accent text-sm md:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl tracking-[0.4em] uppercase mb-6 font-body"
          >
            {subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl 3xl:text-8xl 4xl:text-9xl 5xl:text-[10rem] font-heading font-bold text-white leading-tight mb-6"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl 2xl:text-2xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl 5xl:max-w-5xl mx-auto mb-10 4xl:mb-14 font-body leading-relaxed"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 4xl:gap-6 justify-center"
          >
            <Link
              href={ctaLink}
              className="px-8 py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 bg-accent text-primary font-body text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl uppercase tracking-wider hover:bg-accent-light transition-all duration-300 inline-block"
            >
              {ctaText}
            </Link>
            <Link
              href={secondaryCtaLink}
              className="px-8 py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 border border-white/30 text-white font-body text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl uppercase tracking-wider hover:border-accent hover:text-accent transition-all duration-300 inline-block"
            >
              {secondaryCtaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
