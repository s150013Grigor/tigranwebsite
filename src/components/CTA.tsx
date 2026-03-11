'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Parallax from './Parallax';

interface CTAProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  variant?: 'parallax' | 'solid' | 'gradient';
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CTA({
  title = 'Klaar om te zien wat echte foto\'s doen voor je bedrijf?',
  description = 'Plan een vrijblijvende kennismaking en ontdek of we matchen. Geen verkooppraatje, gewoon een eerlijk gesprek over jouw merk en hoe ik dat visueel kan versterken.',
  ctaText = 'Plan een kennismaking',
  ctaLink = '/contact/',
  secondaryCtaText = 'Bekijk Portfolio',
  secondaryCtaLink = '/portfolio/',
  backgroundImage = '/DSCF6090-2.webp',
  variant = 'parallax',
}: CTAProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0 },
      };

  const content = (
    <div className="text-center px-4 max-w-3xl 4xl:max-w-5xl 5xl:max-w-6xl mx-auto pt-10 pb-20 3xl:pt-14 3xl:pb-28 4xl:pt-18 4xl:pb-36">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        className="text-white/50 text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body"
      >
        Laten we praten
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.35, delay: 0.08, ease: EASE_OUT_EXPO }}
        className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-heading font-bold tracking-[0.02em] text-white mb-6"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.35, delay: 0.16, ease: EASE_OUT_EXPO }}
        className="text-white/80 text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl mb-10 font-body leading-relaxed"
      >
        {description}
      </motion.p>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.35, delay: 0.24, ease: EASE_OUT_EXPO }}
        className="flex flex-col sm:flex-row gap-4 4xl:gap-6 justify-center"
      >
        <Link
          href={ctaLink}
          className="px-8 py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 bg-white text-primary font-body text-sm 3xl:text-base 4xl:text-lg uppercase tracking-wider hover:brightness-110 transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
        >
          {ctaText}
        </Link>
        {secondaryCtaText && secondaryCtaLink && (
          <Link
            href={secondaryCtaLink}
            className="px-8 py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 border border-white/30 text-white font-body text-sm 3xl:text-base 4xl:text-lg uppercase tracking-wider hover:border-white/30 hover:text-white transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
          >
            {secondaryCtaText}
          </Link>
        )}
      </motion.div>
    </div>
  );

  if (variant === 'parallax') {
    return (
      <Parallax
        backgroundImage={backgroundImage}
        imageAlt="Tigran Media fotograaf in actie"
        speed={0.3}
        overlayOpacity={0.7}
        height="auto"
      >
        {content}
      </Parallax>
    );
  }

  if (variant === 'gradient') {
    return (
      <section className="bg-gradient-to-br from-primary via-surface-dark to-primary">
        {content}
      </section>
    );
  }

  return (
    <section className="bg-surface-dark">
      {content}
    </section>
  );
}
