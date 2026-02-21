'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

export default function CTA({
  title = 'Klaar om Herinneringen te Creëren?',
  description = 'Boek vandaag uw fotoshoot en laat uw mooiste momenten professioneel vastleggen door Tigran Media.',
  ctaText = 'Neem Contact Op',
  ctaLink = '/contact/',
  secondaryCtaText = 'Bekijk Portfolio',
  secondaryCtaLink = '/portfolio/',
  backgroundImage = 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1920&h=800&fit=crop',
  variant = 'parallax',
}: CTAProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const content = (
    <div ref={ref} className="text-center px-4 max-w-3xl 4xl:max-w-5xl 5xl:max-w-6xl mx-auto py-20 3xl:py-28 4xl:py-36">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body"
      >
        Laten we samenwerken
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-heading font-bold tracking-[0.02em] text-gradient-gold mb-6"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-300 text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl mb-10 font-body leading-relaxed"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 4xl:gap-6 justify-center"
      >
        <Link
          href={ctaLink}
          className="px-8 py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 bg-accent text-primary font-body text-sm 3xl:text-base 4xl:text-lg uppercase tracking-wider hover:bg-accent-light transition-all duration-300 inline-block"
        >
          {ctaText}
        </Link>
        {secondaryCtaText && secondaryCtaLink && (
          <Link
            href={secondaryCtaLink}
            className="px-8 py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 border border-white/30 text-white font-body text-sm 3xl:text-base 4xl:text-lg uppercase tracking-wider hover:border-accent hover:text-accent transition-all duration-300 inline-block"
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
