'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiCamera, HiHeart, HiSparkles, HiPhotograph, HiUsers, HiGlobe, HiHome } from 'react-icons/hi';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  price?: string;
}

const webdesignService: Service = {
  title: 'Webdesign',
  description: 'Professionele websites die uw merk online tot leven brengen. Modern, snel en responsive.',
  href: '/contact/',
  price: 'Op aanvraag',
};

interface AlbumService {
  title: string;
  description: string;
  slug: string;
}

interface ServicesSectionProps {
  albums?: AlbumService[];
  title?: string;
  subtitle?: string;
}

export default function ServicesSection({
  albums = [],
  title = 'Onze Diensten',
  subtitle = 'Wat wij bieden',
}: ServicesSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const services: Service[] = albums.map((album) => ({
    title: album.title,
    description: album.description,
    href: `/portfolio/${album.slug}/`,
  }));
  services.push(webdesignService);

  return (
    <section ref={ref} className="py-20 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-heading font-bold text-white"
          >
            {title}
          </motion.h2>
        </div>

        {/* Editorial grid — dunne lijnen, grote nummers, asymmetrisch */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.07]">
          {services.map((service, index) => (
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
              className={`group relative flex flex-col overflow-hidden border-b border-white/[0.07] px-8 py-12 3xl:px-12 3xl:py-16 4xl:px-16 4xl:py-20 hover:bg-white/[0.02] transition-colors duration-500 ${
                index % 2 === 0 ? 'md:border-r md:border-white/[0.07]' : ''
              }`}
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
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
              {service.price && (
                <p className="text-accent font-heading text-lg mt-4 font-semibold">
                  {service.price}
                </p>
              )}
            </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
