'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  category?: string;
  description?: string;
  href: string;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  title?: string;
  subtitle?: string;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Gallery({
  items,
  columns = 3,
  title,
  subtitle,
}: GalleryProps) {
  const shouldReduceMotion = useReducedMotion();

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const headingVariants = shouldReduceMotion
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
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
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
    <section className="py-24 md:py-32 3xl:py-44 4xl:py-56 bg-primary">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        {(title || subtitle) && (
          <div className="relative text-center mb-20 md:mb-24 4xl:mb-32 overflow-hidden">
            {/* Decoratieve watermark — overlapt subtiel de inhoud */}
            {title && (
              <span
                className="absolute inset-0 flex items-center justify-center font-heading font-bold italic text-white/[0.025] leading-none select-none pointer-events-none text-[5rem] md:text-[7rem] lg:text-[9rem] 2xl:text-[11rem] whitespace-nowrap"
                aria-hidden="true"
              >
                {title}
              </span>
            )}
            {subtitle && (
              <motion.p
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="relative z-10 text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body"
              >
                {subtitle}
              </motion.p>
            )}
            {title && (
              <motion.h2
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
                className="relative z-10 text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-heading font-bold tracking-[0.02em] text-gradient-gold"
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}

        <motion.div
          className={`grid ${gridCols[columns]} gap-6 4xl:gap-10`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              variants={index < 5 ? itemVariants : undefined}
              initial={index >= 5 && !shouldReduceMotion ? { opacity: 0, y: 32 } : undefined}
              whileInView={index >= 5 && !shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
              viewport={index >= 5 ? { once: true, margin: '-80px' } : undefined}
              transition={index >= 5 ? { duration: 0.45, ease: EASE_OUT_EXPO } : undefined}
            >
              <Link href={item.href} className="group block relative overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-out" />
                  {/* Hover text — fade up */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-out">
                    {item.category && (
                      <span className="text-accent text-xs tracking-[0.2em] uppercase mb-2 font-body translate-y-2 group-hover:translate-y-0 transition-transform duration-[250ms] ease-out">
                        {item.category}
                      </span>
                    )}
                    <span className="text-white text-sm font-body tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-[250ms] ease-out delay-[50ms]">
                      Bekijk project →
                    </span>
                  </div>
                </div>
                <div className="bg-surface p-4 3xl:p-6 4xl:p-8 group-hover:bg-surface-light transition-colors duration-[250ms] group-hover:shadow-[0_4px_24px_-6px_rgba(0,0,0,0.4)]">
                  <h3 className="text-white font-heading text-lg 3xl:text-xl 4xl:text-2xl">{item.title}</h3>
                  {item.category && (
                    <p className="text-accent text-xs tracking-wider uppercase mt-1 font-body">
                      {item.category}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
