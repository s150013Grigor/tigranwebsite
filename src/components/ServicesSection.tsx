'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  href: string;
  price?: string;
  problem?: string;
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
  title = 'Wat ik doe',
  subtitle = 'Diensten',
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

        {/* Section header */}
        <div className="mb-20 md:mb-24 4xl:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl tracking-[0.5em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>
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

        {/* Asymmetric layout: 1 featured large + 2 smaller stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 4xl:gap-10">
          {/* Featured service — large */}
          {services.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.4, 0.25, 1] }}
              className="lg:row-span-2"
            >
              <Link href={services[0].href} className="group block relative h-full">
                <div className="relative h-full min-h-[400px] lg:min-h-full overflow-hidden border border-white/[0.07] bg-primary-light/50 p-10 sm:p-12 3xl:p-16 4xl:p-20 flex flex-col justify-between hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(200,169,126,0.12)]">
                  {/* Watermark number */}
                  <span
                    className="absolute -right-4 -top-8 text-[10rem] lg:text-[14rem] 2xl:text-[18rem] font-heading font-bold text-white/[0.025] leading-none select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    01
                  </span>

                  <div className="relative z-10">
                    <span className="text-accent/50 text-xs tracking-[0.5em] font-body uppercase mb-6 3xl:mb-8 block">01</span>

                    <motion.h3
                      className="text-white font-heading text-3xl md:text-4xl 2xl:text-5xl 3xl:text-5xl 4xl:text-6xl mb-6 group-hover:text-accent/90 transition-colors duration-400 leading-tight"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {services[0].title}
                    </motion.h3>

                    <span className="block w-12 h-[1px] bg-white/15 mb-6 group-hover:w-20 group-hover:bg-accent/70 transition-all duration-500 ease-out" />

                    <p className="text-gray-400 text-base 2xl:text-lg 3xl:text-lg 4xl:text-xl leading-relaxed font-body max-w-lg">
                      {services[0].description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-10">
                    <span className="text-accent text-sm 3xl:text-base font-body tracking-wider uppercase group-hover:tracking-[0.3em] transition-all duration-500">
                      Meer info →
                    </span>
                  </div>

                  {/* Hover sweep line */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent/50 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </Link>
            </motion.div>
          )}

          {/* Smaller stacked services */}
          <div className="flex flex-col gap-6 4xl:gap-10">
            {services.slice(1).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + (index + 1) * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="flex-1"
              >
                <Link href={service.href} className="group block relative h-full">
                  <div className="relative h-full overflow-hidden border border-white/[0.07] bg-primary-light/30 p-8 sm:p-10 3xl:p-14 4xl:p-16 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(200,169,126,0.1)]">
                    {/* Watermark number */}
                    <span
                      className="absolute -right-2 -top-4 text-[7rem] lg:text-[9rem] 2xl:text-[11rem] font-heading font-bold text-white/[0.025] leading-none select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {String(index + 2).padStart(2, '0')}
                    </span>

                    <span className="text-accent/50 text-xs tracking-[0.5em] font-body uppercase mb-6 block">
                      {String(index + 2).padStart(2, '0')}
                    </span>

                    <h3 className="text-white font-heading text-2xl md:text-3xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl mb-4 group-hover:text-accent/90 transition-colors duration-400 relative z-10 leading-tight">
                      {service.title}
                    </h3>

                    <span className="block w-8 h-[1px] bg-white/15 mb-4 group-hover:w-16 group-hover:bg-accent/70 transition-all duration-500 ease-out" />

                    <p className="text-gray-500 text-sm 2xl:text-base 3xl:text-base 4xl:text-lg leading-relaxed font-body relative z-10 max-w-sm">
                      {service.description}
                    </p>

                    {service.price && (
                      <p className="text-accent font-heading text-lg 3xl:text-xl 4xl:text-2xl mt-6 font-semibold relative z-10">
                        {service.price}
                      </p>
                    )}

                    {/* Hover sweep line */}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent/50 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
