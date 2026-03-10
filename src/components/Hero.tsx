'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? { initial: {}, animate: {} }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE_OUT_EXPO },
        };

  const imageSettle = shouldReduceMotion
    ? { initial: {}, animate: {} }
    : {
        initial: { scale: 1.03 },
        animate: { scale: 1 },
        transition: { duration: 1.2, ease: EASE_OUT_EXPO },
      };

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">

      {/* ── Film grain texture overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage: "url('/noise.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Subtle gold ambient glow ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 75% 40%, rgba(200, 169, 126, 0.06) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 40% 50% at 10% 80%, rgba(200, 169, 126, 0.03) 0%, transparent 60%)',
        }}
      />

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
                {...fadeUp(0)}
                className="text-accent text-xs md:text-sm 2xl:text-base tracking-[0.5em] uppercase mb-6 font-body"
              >
                Content & Branding Fotografie
              </motion.p>

              {/* Decorative line */}
              <motion.span
                {...fadeUp(0)}
                className="block w-12 h-[1px] bg-accent/50 mb-8"
              />

              {/* H1 */}
              <motion.h1
                {...fadeUp(0)}
                className="font-heading font-bold leading-[1.05] tracking-[-0.02em] mb-2"
              >
                <span className="block text-white
                  text-[2.5rem]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-5xl
                  xl:text-6xl
                  2xl:text-7xl
                  3xl:text-8xl
                  4xl:text-[7rem]
                  5xl:text-[8.5rem]">
                  Stockfoto&apos;s kosten je klanten.
                </span>
                <span className="block text-accent
                  text-[2.5rem]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-5xl
                  xl:text-6xl
                  2xl:text-7xl
                  3xl:text-8xl
                  4xl:text-[7rem]
                  5xl:text-[8.5rem] mt-1">
                  Echte foto&apos;s brengen ze.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                {...fadeUp(0.08)}
                className="text-gray-400 text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl max-w-xl 2xl:max-w-2xl mt-8 mb-10 font-body leading-relaxed"
              >
                Ik maak content die jouw bedrijf er zo uitziet als het eigenlijk is — professioneel, menselijk, en herkenbaar.
              </motion.p>

              {/* CTAs */}
              <motion.div
                {...fadeUp(0.16)}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 4xl:gap-6"
              >
                <Link
                  href="/contact/"
                  className="shimmer px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 bg-accent text-primary font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:bg-accent-light transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
                >
                  Bekijk of we matchen →
                </Link>
                <Link
                  href="/portfolio/"
                  className="shimmer px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 border border-white/20 text-white font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:border-accent hover:text-accent transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
                >
                  Bekijk Portfolio
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Portrait photo ── */}
            <div className="lg:col-span-5 xl:col-span-5 relative">
              <div className="relative">
                <div className="relative aspect-[3/4] lg:aspect-[3/4] overflow-hidden">
                  {/*
                    Mobile gets zelfportret-mobile.webp (14 KB, 800×1067)
                    Desktop gets zelfportret-desktop.webp (179 KB, 3120×4160)
                    Both are 3:4 portrait crops from the original RAW.
                  */}
                  <motion.div
                    {...imageSettle}
                    className="absolute inset-0"
                  >
                    <picture>
                      <source
                        media="(max-width: 1023px)"
                        srcSet="/zelfportret-mobile.webp"
                        type="image/webp"
                      />
                      <source
                        media="(min-width: 1024px)"
                        srcSet="/zelfportret-desktop.webp"
                        type="image/webp"
                      />
                      <Image
                        src="/zelfportret-desktop.webp"
                        alt="Tigran — content fotograaf gespecialiseerd in commerciële fotografie voor KMO's in de Kempen"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1023px) 100vw, 42vw"
                        priority
                        fetchPriority="high"
                      />
                    </picture>
                  </motion.div>
                  {/* Subtle gold border accent */}
                  <div className="absolute inset-0 border border-accent/10" />

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                </div>

                {/* Decorative gold corner */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 3xl:w-32 3xl:h-32 border-l-2 border-b-2 border-accent/30 pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-24 h-24 3xl:w-32 3xl:h-32 border-r-2 border-t-2 border-accent/30 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
