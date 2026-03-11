'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  imageSrc?: string;
  index?: number;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  company,
  imageSrc,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4 }}
      className="group relative bg-primary-light p-8 3xl:p-10 4xl:p-12 border border-white/5 hover:border-white/15 transition-all duration-500 h-full flex flex-col"
    >
      {/* Gold quote mark */}
      <span
        className="absolute top-6 right-8 text-6xl 3xl:text-7xl 4xl:text-8xl font-heading text-white/10 leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote */}
      <p className="text-white/80 text-sm 3xl:text-base 4xl:text-lg leading-relaxed mb-8 italic relative z-10 flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 relative z-10">
        {imageSrc ? (
          <div className="w-12 h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
            <Image
              src={imageSrc}
              alt={`Foto van ${name}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
            <span className="text-white text-sm 3xl:text-base font-bold font-heading">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-white text-sm 3xl:text-base font-semibold font-body">
            {name}
          </p>
          {(role || company) && (
            <p className="text-white/50 text-xs 3xl:text-sm font-body">
              {role && company ? `${role}, ${company}` : role || company}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
