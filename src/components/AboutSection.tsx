'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={ref} id="about" className="py-24 md:py-32 3xl:py-28 4xl:py-36 bg-primary-light">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 4xl:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={shouldReduceMotion ? {} : { x: -30 }}
            animate={inView ? (shouldReduceMotion ? {} : { x: 0 }) : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              {/* TODO: Tigran — zorg voor een hoge-kwaliteit portretfoto in /public/tigran-portret.jpg */}
              <picture className="block w-full h-full">
                <source srcSet="/zelfportret.webp" type="image/webp" />
                <Image
                  src="/Zelfportret8feb2026.jpg"
                  alt="Tigran — content fotograaf voor KMO's en ondernemers in de Kempen regio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </picture>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-white/20" />
          </motion.div>

          {/* Content — POV copy */}
          <div>
            <motion.p
              initial={{ y: 10 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-white/50 text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body"
            >
              Wie ik ben
            </motion.p>
            <motion.h2
              initial={{ y: 20 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl 2xl:text-5xl 4xl:text-6xl 5xl:text-7xl font-heading font-bold text-white mb-6"
            >
              Over Tigran
            </motion.h2>

            {/* Provocative opening */}
            <motion.p
              initial={{ y: 20 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white font-heading text-xl md:text-2xl 2xl:text-3xl 4xl:text-4xl italic leading-snug mb-6"
            >
              &ldquo;De meeste KMO&rsquo;s investeren duizenden euro&rsquo;s in hun website — en vullen hem dan met beelden die niets zeggen.&rdquo;
            </motion.p>

            <motion.div
              initial={{ y: 20 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-white/80 leading-relaxed font-body text-base 2xl:text-lg 3xl:text-lg 4xl:text-xl 5xl:text-2xl">
                Ik ben Tigran, 18 jaar, content fotograaf vanuit de Kempen. Ik werk met KMO&rsquo;s en ondernemers die snappen dat hun beelden méér moeten doen dan &ldquo;er leuk uitzien&rdquo; — ze moeten klanten overtuigen, vertrouwen wekken, en je verhaal vertellen zonder dat je er een woord aan hoeft toe te voegen.
              </p>

              <p className="text-white/80 leading-relaxed font-body text-base 2xl:text-lg 3xl:text-lg 4xl:text-xl 5xl:text-2xl">
                Ik schiet met een Fujifilm X-M5, werk van dichtbij met je bedrijf, en begrijp het verschil tussen een mooie foto en een foto die converteert. Geen opgestelde stock-sfeer. Geen generieker-dan-generiek. Content die voelt alsof het écht bij jou hoort — want dat doet het.
              </p>

              <p className="text-white/60 leading-relaxed font-body text-sm 2xl:text-base 3xl:text-base 4xl:text-lg">
                Website foto&rsquo;s, social media content, branding shoots — ik maak het soort beelden waar je klanten bij blijven hangen. Letterlijk.
              </p>
            </motion.div>

            {/* Approach highlights — compact, no bullet list */}
            <motion.div
              initial={{ y: 20 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 4xl:gap-6 mt-8"
            >
              {[
                { title: 'Persoonlijk', text: 'Ik werk rechtstreeks met jou — geen account managers, geen omwegen' },
                { title: 'Resultaatgericht', text: 'Foto\'s die niet alleen mooi zijn, maar je bedrijf ook echt verder helpen' },
                { title: 'Kempen & Antwerpen', text: 'Lokaal gevestigd, persoonlijk contact, snel inzetbaar' },
                { title: 'Op maat', text: 'Geen standaardpakketten — elke shoot wordt afgestemd op jouw merk' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ y: 20 }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + index * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="p-4 3xl:p-6 4xl:p-8 bg-primary/50 border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <p className="text-white font-heading font-semibold text-sm 3xl:text-base 4xl:text-lg mb-1">{item.title}</p>
                  <p className="text-white/60 text-xs 3xl:text-sm 4xl:text-base">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
