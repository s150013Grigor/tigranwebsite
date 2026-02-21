'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CityAboutProps {
  cityName: string;
  text: string;
  photographerImage?: string;
}

export default function CityAbout({
  cityName,
  text,
  photographerImage = 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&h=800&fit=crop',
}: CityAboutProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 3xl:py-28 4xl:py-36 bg-primary-dark">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photographer Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative aspect-[3/4] max-h-[500px] overflow-hidden"
          >
            <Image
              src={photographerImage}
              alt={`Fotograaf in ${cityName} — Tigran Media`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
              Lokale Expertise
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Mijn Werk in {cityName}
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              {text.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
