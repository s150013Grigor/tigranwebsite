'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Service {
  title: string;
  description: string;
  href: string;
  price?: string;
}

interface AlbumService {
  title: string;
  description: string;
  slug: string;
}

interface ServicesSectionProps {
  albums?: AlbumService[];
  services?: Service[];
  title?: string;
  subtitle?: string;
}

export default function ServicesSection({
  albums = [],
  services: servicesProp,
  title = 'Onze Diensten',
  subtitle = 'Wat wij bieden',
}: ServicesSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const services: Service[] = servicesProp
    ? servicesProp
    : [
        ...albums.map((album) => ({
          title: album.title,
          description: album.description,
          href: `/portfolio/${album.slug}/`,
        })),
      ];

  return (
    <section ref={ref} className="py-24 md:py-32 3xl:py-44 4xl:py-56 bg-mesh-warm relative overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">

        {/* Sectie header */}
        <div className="mb-20 md:mb-24 4xl:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl tracking-[0.5em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>
          {/* Gouden decoratieve lijn */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.25, 0.4, 0.25, 1] }}
            className="block w-10 h-[1px] bg-accent/40 mb-5 origin-left"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-heading font-bold tracking-[0.02em] text-gradient-gold"
          >
            {title}
          </motion.h2>
        </div>

        {/* Editorial grid — dunne lijnen, grote nummers, asymmetrisch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/[0.07]">
          {services.map((service, index) => {
            const isLastOdd = index === services.length - 1 && services.length % 2 !== 0;

            return (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className={`group relative flex flex-col overflow-hidden border-b border-white/[0.07] px-6 py-10 sm:px-8 sm:py-12 3xl:px-12 3xl:py-16 4xl:px-16 4xl:py-20 hover:bg-white/[0.02] transition-colors duration-500
                ${isLastOdd ? 'sm:col-span-2 sm:max-w-[50%] sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0' : ''}
                ${index % 3 !== 2 ? 'lg:border-r lg:border-white/[0.07]' : ''}
                ${index % 2 === 0 && !isLastOdd ? 'sm:border-r sm:border-white/[0.07]' : ''}
                ${isLastOdd ? 'sm:border-r-0' : ''}
                `}
            >
              {/* Watermark nummer — overlapt de kaartrand voor diepte-effect */}
              <span
                className="absolute -right-3 -top-6 text-[7rem] lg:text-[8.5rem] 2xl:text-[10rem] 3xl:text-[12rem] font-heading font-bold text-white/[0.035] leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Klein accentnummer — bovenaan */}
              <span className="text-accent/50 text-xs tracking-[0.5em] font-body uppercase mb-8 3xl:mb-10 block">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Titel */}
              <h3 className="text-white font-heading text-2xl md:text-3xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl mb-5 group-hover:text-accent/90 transition-colors duration-400 relative z-10 leading-tight">
                {service.title}
              </h3>

              {/* Geanimeerde dunne lijn */}
              <span className="block w-8 h-[1px] bg-white/15 mb-5 group-hover:w-16 group-hover:bg-accent/70 transition-all duration-500 ease-out" />

              {/* Beschrijving */}
              <p className="text-gray-500 text-sm 2xl:text-base 3xl:text-base 4xl:text-lg leading-relaxed font-body relative z-10 max-w-sm">
                {service.description}
              </p>

              {service.price && (
                <p className="text-accent font-heading text-lg 3xl:text-xl 4xl:text-2xl mt-6 font-semibold relative z-10">
                  {service.price}
                </p>
              )}

              {/* Hover sweep lijn — onderkant */}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent/50 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
