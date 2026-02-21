'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

export default function Gallery({
  items,
  columns = 3,
  title,
  subtitle,
}: GalleryProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section ref={ref} className="py-24 md:py-32 3xl:py-44 4xl:py-56 bg-primary">
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
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body"
              >
                {subtitle}
              </motion.p>
            )}
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-10 text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-heading font-bold tracking-[0.02em] text-gradient-gold"
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-6 4xl:gap-10`}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={item.href} className="group block relative overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Caption inschuif — standaard transition zonder arbitrary easing */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {item.category && (
                      <span className="text-accent text-xs tracking-[0.2em] uppercase mb-2 block font-body">
                        {item.category}
                      </span>
                    )}
                    {/* Dunne gouden lijn */}
                    <span className="block w-0 h-[1px] bg-accent mb-3 transition-all duration-500 ease-out group-hover:w-8" />
                    <h3 className="text-white text-xl 3xl:text-2xl 4xl:text-3xl font-heading font-semibold">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-300 text-sm mt-2 line-clamp-2 font-body">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-surface p-4 3xl:p-6 4xl:p-8 group-hover:bg-surface-light transition-colors duration-300">
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
        </div>
      </div>
    </section>
  );
}
