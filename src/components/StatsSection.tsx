'use client';

import { motion } from 'framer-motion';
import StatCounter from './StatCounter';

/** TODO: Tigran — vul de exacte cijfers in op basis van je echte projectdata */
const stats = [
  { value: 30, label: 'Projecten afgerond', suffix: '+' },
  { value: 5, label: 'Regio\'s bediend', suffix: '' },
  { value: 8, label: 'Sectoren', suffix: '+' },
  { value: 100, label: 'Tevreden klanten', suffix: '%' },
];

export default function StatsSection() {
  return (
    <section className="py-20 md:py-28 3xl:py-36 4xl:py-44 bg-primary relative overflow-hidden">
      {/* Subtle gold accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200, 169, 126, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 4xl:mb-28"
        >
          <p className="text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.5em] uppercase mb-4 font-body">
            In cijfers
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 4xl:text-8xl font-heading font-bold tracking-[0.02em] text-gradient-gold">
            Resultaten die tellen
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 4xl:gap-16">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>

        {/* Decorative divider */}
        <div className="mt-16 md:mt-20 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>
    </section>
  );
}
