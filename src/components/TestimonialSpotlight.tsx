'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const testimonial = {
  quote: "Tigran leest de sfeer intuïtief aan en levert foto's die barsten van energie — discreet tijdens de shoot, uitmuntend in kwaliteit.",
  name: 'Kineworks Turnhout',
  role: 'Kinesist',
  company: 'Turnhout',
  imageSrc: null,
};

export default function TestimonialSpotlight() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  const words = testimonial.quote.split(' ');
  const showImage = !!testimonial.imageSrc;

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 3xl:py-44 4xl:py-56 bg-primary relative overflow-hidden"
    >
      

      <div className="relative z-10 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 4xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        {/* Quote — word-by-word fade in */}
        <blockquote className="relative z-10">
          <p className="font-heading text-white text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-5xl 4xl:text-6xl leading-snug md:leading-snug tracking-[-0.01em] italic">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                animate={inView ? (shouldReduceMotion ? {} : { opacity: 1, y: 0 }) : {}}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : 0.3 + i * 0.06,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </blockquote>

        {/* Author */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={inView ? (shouldReduceMotion ? {} : { opacity: 1, y: 0 }) : {}}
          transition={{
            duration: 0.6,
            delay: shouldReduceMotion ? 0 : 0.3 + words.length * 0.06 + 0.2,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="mt-10 md:mt-14 flex items-center gap-4"
        >
          {/* Conditional portrait */}
          {showImage ? (
            <div className="w-14 h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
              <Image
                src={testimonial.imageSrc!}
                alt={`Foto van ${testimonial.name}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg 3xl:text-xl font-bold font-heading">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}

          <div>
            <p className="text-white font-body text-sm 3xl:text-base 4xl:text-lg font-semibold tracking-wide uppercase">
              {testimonial.name}
            </p>
            <p className="text-white/60 font-body text-xs 3xl:text-sm 4xl:text-base">
              {testimonial.role}
              {testimonial.company &&
                testimonial.role &&
                ' — '}
              {testimonial.company}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
