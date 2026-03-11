'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import testimonialsData from '@/content/testimonials.json';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  description: string;
  role?: string;
  company?: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Testimonials({
  title = 'Wat Klanten Zeggen',
  subtitle = 'Getuigenissen',
}: TestimonialsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  const testimonials: Testimonial[] = testimonialsData;

  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  const fadeUp = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 3xl:py-44 4xl:py-56 bg-surface-dark overflow-hidden relative">
      
      <div className="relative z-10 max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="text-center mb-20 md:mb-24 4xl:mb-32">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="text-white/50 text-sm 3xl:text-base 4xl:text-lg tracking-[0.5em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>
          <motion.span
            initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
            whileInView={shouldReduceMotion ? {} : { scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 0.4, 0.25, 1] }}
            className="block w-10 h-[1px] bg-white/20 mx-auto mb-5 origin-center"
          />
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-heading font-bold tracking-[0.02em] text-white"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {/* Infinite marquee carousel */}
      <div className="relative group">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-dark to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee md:animate-marquee-desktop group-hover:[animation-play-state:paused]">
          {duplicated.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[400px] 3xl:w-[480px] 4xl:w-[560px] 5xl:w-[640px] mx-4"
            >
              <div className="bg-primary-light p-8 3xl:p-10 4xl:p-12 border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                {/* Gold quote mark */}
                <span
                  className="block text-4xl 3xl:text-5xl font-heading text-white/10 leading-none mb-4 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Content */}
                <p className="text-white/80 text-sm 3xl:text-base 4xl:text-lg leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.description}&rdquo;
                </p>

                {/* Author with company/role */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3 border border-white/20">
                    <span className="text-white text-sm font-bold font-heading">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {testimonial.name}
                    </p>
                    {/* TODO: Tigran — voeg 'role' en 'company' toe aan testimonials.json voor elke klant */}
                    <p className="text-white/50 text-xs">
                      {testimonial.role && testimonial.company
                        ? `${testimonial.role}, ${testimonial.company}`
                        : testimonial.company || testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
