'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  href: string;
}

interface ServicesSectionProps {
  services?: Service[];
  title?: string;
  subtitle?: string;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServicesSection({
  services = [],
  title = 'Wat ik doe',
  subtitle = 'Diensten',
}: ServicesSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0 },
      };

  const containerVariants = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      };

  const itemVariants = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: EASE_OUT_EXPO },
        },
      };

  return (
    <section className="pt-12 pb-24 md:pt-16 md:pb-32 3xl:pt-24 3xl:pb-44 4xl:pt-28 4xl:pb-56 bg-black relative overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">

        <div className="mb-20 md:mb-24 4xl:mb-32">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="text-white/50 text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl tracking-[0.5em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>
          <motion.span
            initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
            whileInView={shouldReduceMotion ? {} : { scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 0.4, 0.25, 1] }}
            className="block w-10 h-[1px] bg-white/20 mb-5 origin-left"
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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 4xl:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="flex"
            >
              <div className="relative flex flex-col h-full w-full border border-white/[0.07] bg-primary-light/30 p-8 sm:p-10 3xl:p-14 4xl:p-16 hover:border-white/15 transition-all duration-500 group">
                <span className="text-white/20 text-xs tracking-[0.5em] font-body uppercase mb-8 block">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="text-white font-heading text-2xl md:text-3xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl mb-4 leading-tight">
                  {service.title}
                </h3>

                <span className="block w-8 h-[1px] bg-white/15 mb-6" />

                <p className="text-white/50 text-sm 2xl:text-base 3xl:text-base 4xl:text-lg leading-relaxed font-body flex-1">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-8 inline-flex items-center text-white text-sm 3xl:text-base font-body tracking-wider uppercase hover:tracking-[0.3em] transition-all duration-500 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                >
                  Ontdek {service.title} →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
