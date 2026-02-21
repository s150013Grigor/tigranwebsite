'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import testimonialsData from '@/content/testimonials.json';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
}

export default function Testimonials({
  title = 'Wat Klanten Zeggen',
  subtitle = 'Getuigenissen',
}: TestimonialsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const testimonials: Testimonial[] = testimonialsData;

  // Duplicate items for seamless infinite scroll
  const duplicated = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 3xl:py-44 4xl:py-56 bg-surface-dark overflow-hidden relative">
      {/* Warme gradient mesh overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 10%, rgba(200, 169, 126, 0.055) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 50% 40% at 10% 90%, rgba(200, 169, 126, 0.04) 0%, transparent 55%)',
        }}
      />
      <div className="relative z-10 max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="text-center mb-20 md:mb-24 4xl:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.5em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>
          {/* Gouden decoratieve lijn */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.25, 0.4, 0.25, 1] }}
            className="block w-10 h-[1px] bg-accent/40 mx-auto mb-5 origin-center"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-heading font-bold tracking-[0.02em] text-gradient-gold"
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
              <div className="bg-primary-light p-8 3xl:p-10 4xl:p-12 border border-white/5 hover:border-accent/20 transition-colors duration-300 h-full">
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'text-accent' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-accent text-sm 3xl:text-base 4xl:text-lg font-semibold mb-3 uppercase tracking-wider">
                  {testimonial.title}
                </h3>

                {/* Content */}
                <p className="text-gray-300 text-sm 3xl:text-base 4xl:text-lg leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.description}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-accent text-sm font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {testimonial.name}
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
