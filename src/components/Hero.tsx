'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effect for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Hero headline — woord-voor-woord reveal
  const headlineWords = ['Stockfoto\'s', 'kosten', 'je', 'klanten.'];
  const headlineWords2 = ['Echte', 'foto\'s', 'brengen', 'ze.'];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-primary">

      {/* ── Film grain texture overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Subtle gold ambient glow ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 75% 40%, rgba(200, 169, 126, 0.06) 0%, transparent 70%), ' +
              'radial-gradient(ellipse 40% 50% at 10% 80%, rgba(200, 169, 126, 0.03) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 lg:h-80 z-[3] pointer-events-none bg-gradient-to-b from-transparent to-[#050505]" />

      {/* ── Content: Asymmetric layout ── */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-28 pb-16 lg:pt-32 lg:pb-16">

            {/* ── Left: Copy ── */}
            <div className="lg:col-span-7 xl:col-span-7">

              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-accent text-xs md:text-sm 2xl:text-base tracking-[0.5em] uppercase mb-6 font-body"
              >
                Content & Branding Fotografie
              </motion.p>

              {/* Decorative line */}
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="block w-12 h-[1px] bg-accent/50 mb-8 origin-left"
              />

              {/* H1 — Line 1: woord-voor-woord staggered reveal */}
              <h1
                className="font-heading font-bold leading-[1.05] tracking-[-0.02em] mb-2"
                style={{ perspective: '1200px' }}
              >
                <span className="flex flex-wrap gap-x-3 md:gap-x-5">
                  {headlineWords.map((word, i) => (
                    <motion.span
                      key={`h1-${i}`}
                      initial={{ opacity: 0, y: 60, rotateX: -20 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + i * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block text-white
                        text-[2.5rem]
                        sm:text-5xl
                        md:text-6xl
                        lg:text-5xl
                        xl:text-6xl
                        2xl:text-7xl
                        3xl:text-8xl
                        4xl:text-[7rem]
                        5xl:text-[8.5rem]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                {/* Line 2 */}
                <span className="flex flex-wrap gap-x-3 md:gap-x-5 mt-1">
                  {headlineWords2.map((word, i) => (
                    <motion.span
                      key={`h2-${i}`}
                      initial={{ opacity: 0, y: 60, rotateX: -20 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + (headlineWords.length + i) * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block text-accent
                        text-[2.5rem]
                        sm:text-5xl
                        md:text-6xl
                        lg:text-5xl
                        xl:text-6xl
                        2xl:text-7xl
                        3xl:text-8xl
                        4xl:text-[7rem]
                        5xl:text-[8.5rem]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-gray-400 text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl max-w-xl 2xl:max-w-2xl mt-8 mb-10 font-body leading-relaxed"
              >
                Ik maak content die jouw bedrijf er zo uitziet als het eigenlijk is — professioneel, menselijk, en herkenbaar.
              </motion.p>

              {/* CTAs + Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 4xl:gap-6"
              >
                <Link
                  href="/contact/"
                  className="shimmer px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 bg-accent text-primary font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:bg-accent-light hover:scale-[1.02] transition-all duration-300 inline-block"
                >
                  Bekijk of we matchen →
                </Link>
                <Link
                  href="/portfolio/"
                  className="shimmer px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 border border-white/20 text-white font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:border-accent hover:text-accent transition-all duration-300 inline-block"
                >
                  Bekijk Portfolio
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Portrait photo ── */}
            <div className="lg:col-span-5 xl:col-span-5 relative">
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)', scale: 0.95, filter: 'blur(8px)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.div style={{ scale: photoScale }}>
                  <div className="relative aspect-[3/4] lg:aspect-[3/4] overflow-hidden">
                    {/* TODO: Tigran — vervang door een professioneel portret in /public/tigran-portret.jpg */}
                    <picture className="block w-full h-full">
                      <source srcSet="/zelfportret.webp" type="image/webp" />
                      <Image
                        src="/Zelfportret8feb2026.jpg"
                        alt="Tigran — content fotograaf gespecialiseerd in commerciële fotografie voor KMO's in de Kempen"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        priority
                      />
                    </picture>

                    {/* Subtle gold border accent */}
                    <div className="absolute inset-0 border border-accent/10" />

                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                  </div>
                </motion.div>

                {/* Decorative gold corner */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 3xl:w-32 3xl:h-32 border-l-2 border-b-2 border-accent/30 pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-24 h-24 3xl:w-32 3xl:h-32 border-r-2 border-t-2 border-accent/30 pointer-events-none" />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
