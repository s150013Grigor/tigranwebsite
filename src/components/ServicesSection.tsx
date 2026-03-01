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

const defaultServices: Service[] = [
  {
    icon: <HiCamera className="w-8 h-8" />,
    title: 'Portretfotografie',
    description: 'Professionele portretten die uw persoonlijkheid vastleggen. In studio of op locatie.',
    href: '/portfolio/portret/',
    price: 'Vanaf €80',
  },
  {
    icon: <HiGlobe className="w-8 h-8" />,
    title: 'Outdoor Fotografie',
    description: 'Prachtige buitenshoot op locatie. Natuurlijk licht en authentieke sfeer.',
    href: '/portfolio/natuur/',
    price: 'Vanaf €120',
  },
  {
    icon: <HiSparkles className="w-8 h-8" />,
    title: 'Zakelijke Fotografie',
    description: 'Professionele corporate foto\'s voor uw bedrijf, team en branding.',
    href: '/portfolio/product/',
    price: 'Vanaf €250',
  },
  {
    icon: <HiUsers className="w-8 h-8" />,
    title: 'Zakelijk Evenement',
    description: 'Dynamische fotografie voor bedrijfsevents, conferenties en speciale gelegenheden.',
    href: '/portfolio/evenement/',
    price: 'Vanaf €350',
  },
  {
    icon: <HiPhotograph className="w-8 h-8" />,
    title: 'Webdesign',
    description: 'Professionele websites die uw merk online tot leven brengen. Modern, snel en responsive.',
    href: '/contact/',
    price: 'Op aanvraag',
  },
  {
    icon: <HiHome className="w-8 h-8" />,
    title: 'Vastgoedfotografie',
    description: 'Professionele fotografie voor vastgoedverkoop en verhuur. Wij zorgen voor heldere, ruimtelijke en uitnodigende beelden.',
    href: '/contact/',
    price: 'Vanaf €250',
  },
];

interface ServicesSectionProps {
  services?: Service[];
  title?: string;
  subtitle?: string;
}

export default function ServicesSection({
  services = defaultServices,
  title = 'Onze Diensten',
  subtitle = 'Wat wij bieden',
}: ServicesSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-primary-light border border-white/5 hover:border-accent/30 transition-all duration-300"
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-white font-heading text-xl mb-3 group-hover:text-accent transition-colors">
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
          ))}
        </div>
      </div>
    </section>
  );
}
