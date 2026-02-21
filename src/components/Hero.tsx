'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Achtergrond beweegt op 25% van de scrollsnelheid → parallax effect
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  // Titel opgesplitst in woorden voor staggered reveal
  const titleWords = title.split(' ');

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">

      {/* ── Parallax achtergrond ── */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          y: bgY,
        }}
      />

      {/* ── Donkere overlay ── */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── Film grain texture overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Bottom fade — vloeiende overgang naar ServicesSection ── */}
      <div className="absolute bottom-0 left-0 right-0 h-36 md:h-48 z-[2] pointer-events-none bg-gradient-to-b from-transparent to-[#050505]" />

      {/* ── Content ── */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="text-center px-4 max-w-5xl 4xl:max-w-7xl 5xl:max-w-[90rem] mx-auto">

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-accent text-xs md:text-sm 2xl:text-base 3xl:text-lg tracking-[0.5em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>

          {/* Dunne gouden decoratieve lijn */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="block w-10 h-[1px] bg-accent/45 mx-auto mb-8 origin-center"
          />

          {/* Titel — woord-voor-woord staggered reveal met 3D perspectief */}
          <h1
            className="font-heading font-bold leading-[0.9] tracking-[-0.02em] mb-10 overflow-hidden"
            style={{ perspective: '1200px' }}
          >
            <span className="flex flex-wrap justify-center gap-x-5 md:gap-x-8">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 72, rotateX: -28 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.35 + i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-white
                    text-[3.25rem]
                    md:text-7xl
                    lg:text-[5.5rem]
                    xl:text-8xl
                    2xl:text-[9rem]
                    3xl:text-[10.5rem]
                    4xl:text-[13rem]
                    5xl:text-[15rem]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Beschrijving */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.78, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-gray-400 text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto mb-12 4xl:mb-16 font-body leading-relaxed tracking-wide"
          >
            {description}
          </motion.p>

          {/* CTA knoppen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.98, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-4 4xl:gap-6 justify-center"
          >
            <Link
              href={ctaLink}
              className="shimmer px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 bg-accent text-primary font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:bg-accent-light transition-all duration-300 inline-block"
            >
              {ctaText}
            </Link>
            <Link
              href={secondaryCtaLink}
              className="shimmer px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 border border-white/20 text-white font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:border-accent hover:text-accent transition-all duration-300 inline-block"
            >
              {secondaryCtaText}
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
