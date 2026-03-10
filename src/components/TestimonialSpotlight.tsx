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
      {/* Subtle warm gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(200,169,126,0.045) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 40% 40% at 80% 70%, rgba(200,169,126,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 4xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        {/* Decorative gold quote mark */}
        <motion.span
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.6 }}
          animate={inView ? (shouldReduceMotion ? {} : { opacity: 1, scale: 1 }) : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="block text-accent/20 font-heading text-[8rem] md:text-[12rem] 3xl:text-[14rem] 4xl:text-[16rem] leading-none select-none -mb-16 md:-mb-24 3xl:-mb-28"
          aria-hidden="true"
        >
          &ldquo;
        </motion.span>

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
            <div className="w-14 h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 rounded-full overflow-hidden border-2 border-accent/30 flex-shrink-0">
              <Image
                src={testimonial.imageSrc!}
                alt={`Foto van ${testimonial.name}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-accent text-lg 3xl:text-xl font-bold font-heading">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}

          <div>
            <p className="text-accent font-body text-sm 3xl:text-base 4xl:text-lg font-semibold tracking-wide uppercase">
              {testimonial.name}
            </p>
            <p className="text-gray-500 font-body text-xs 3xl:text-sm 4xl:text-base">
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
