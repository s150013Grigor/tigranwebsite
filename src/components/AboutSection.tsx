'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function AboutSection({
  title = 'Over Tigran Media',
  subtitle = 'Uw verhaal, mijn passie',
  description = 'Als professionele fotograaf in Vlaanderen geloof ik dat elke foto een verhaal vertelt. Mijn passie ligt in het vastleggen van authentieke momenten — van zakelijke portretten tot bruisende evenementen. Met een persoonlijke, creatieve aanpak zorg ik ervoor dat elke shoot uniek is en uw verhaal op de mooiste manier verteld wordt. Ik werk in heel Vlaanderen en daarbuiten, altijd op zoek naar het perfecte licht en het juiste moment.',
  image = 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop',
}: AboutSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id="about" className="py-20 3xl:py-28 4xl:py-36 bg-primary-light">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 4xl:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src={image}
                alt="Tigran - Professionele fotograaf"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent" />
          </motion.div>

          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body"
            >
              {subtitle}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl 2xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-heading font-bold text-white mb-6"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 leading-relaxed mb-8 font-body text-base 2xl:text-lg 3xl:text-lg 4xl:text-xl 5xl:text-2xl"
            >
              {description}
            </motion.p>

            {/* Approach highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 4xl:gap-6">
              {[
                { title: 'Persoonlijke Aanpak', text: 'Elke shoot wordt volledig afgestemd op uw wensen en stijl' },
                { title: 'Creatieve Visie', text: 'Artistieke beelden die opvallen en een verhaal vertellen' },
                { title: 'Snelle Levering', text: 'Professioneel bewerkte foto\u2019s binnen afgesproken termijn' },
                { title: 'Heel Vlaanderen', text: 'Beschikbaar in elke stad en gemeente in Vlaanderen' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="p-4 3xl:p-6 4xl:p-8 bg-primary/50 border border-white/5"
                >
                  <p className="text-white font-heading font-semibold text-sm 3xl:text-base 4xl:text-lg mb-1">{item.title}</p>
                  <p className="text-gray-400 text-xs 3xl:text-sm 4xl:text-base">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
