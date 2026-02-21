'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiCamera, HiSparkles, HiPhotograph, HiUsers, HiGlobe, HiHome } from 'react-icons/hi';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  price?: string;
}

// Icon mapping by category/index
const iconSet = [
  <HiCamera className="w-8 h-8" key="cam" />,
  <HiGlobe className="w-8 h-8" key="globe" />,
  <HiSparkles className="w-8 h-8" key="spark" />,
  <HiUsers className="w-8 h-8" key="users" />,
  <HiHome className="w-8 h-8" key="home" />,
  <HiPhotograph className="w-8 h-8" key="photo" />,
];

// Webdesign is always appended as a static service
const webdesignService: Service = {
  icon: <HiPhotograph className="w-8 h-8" />,
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Build services from albums + webdesign
  const services: Service[] = albums.map((album, i) => ({
    icon: iconSet[i % iconSet.length],
    title: album.title,
    description: album.description,
    href: `/portfolio/${album.slug}/`,
  }));
  services.push(webdesignService);

  return (
    <section ref={ref} className="py-20 3xl:py-28 4xl:py-36 bg-primary-dark">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="text-center mb-16 4xl:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl tracking-[0.3em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-heading font-bold text-white"
          >
            {title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 4xl:gap-12">
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 3xl:p-10 4xl:p-12 bg-primary-light border border-white/5 hover:border-accent/30 transition-all duration-300"
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-white font-heading text-xl 3xl:text-2xl 4xl:text-3xl mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm 2xl:text-base 3xl:text-base 4xl:text-lg 5xl:text-xl leading-relaxed">
                {service.description}
              </p>
              {service.price && (
                <p className="text-accent font-heading text-lg 3xl:text-xl 4xl:text-2xl mt-4 font-semibold">
                  {service.price}
                </p>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
