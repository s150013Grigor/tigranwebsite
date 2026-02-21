'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

/* ───────────────── Variant 1: Classic Centered ───────────────── */
function HeroV1() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative text-center px-4 z-10">
        <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl text-white mb-4">
          Tigran <span className="text-accent">Media</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-300 text-xl mb-8 max-w-xl mx-auto">
          Professionele fotografie voor elk moment
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <button className="bg-accent text-primary px-8 py-3 rounded font-semibold hover:bg-accent/90 transition">
            Ontdek Meer
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────── Variant 2: Split Screen ───────────────── */
function HeroV2() {
  return (
    <section className="relative h-[600px] flex overflow-hidden">
      <div className="w-1/2 bg-primary flex items-center justify-end pr-16 pl-8">
        <div className="max-w-md">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="border-l-4 border-accent pl-6">
            <h1 className="font-heading text-5xl text-white mb-4">Jouw Verhaal in Beeld</h1>
            <p className="text-gray-400 mb-6">Elk moment verdient een professionele blik. Wij vangen emoties, details en schoonheid.</p>
            <button className="border border-accent text-accent px-6 py-2 hover:bg-accent hover:text-primary transition">
              Portfolio Bekijken
            </button>
          </motion.div>
        </div>
      </div>
      <div className="w-1/2 bg-[url('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=960&h=1080&fit=crop')] bg-cover bg-center" />
    </section>
  );
}

/* ───────────────── Variant 3: Video Background Style ───────────────── */
function HeroV3() {
  return (
    <section className="relative h-[600px] flex items-end overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-16">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
          <span className="text-accent uppercase tracking-[0.3em] text-sm mb-4 block">Professionele Fotografie</span>
          <h1 className="font-heading text-6xl text-white mb-4">Momenten die<br />Blijven</h1>
          <div className="flex gap-4 mt-6">
            <button className="bg-white text-primary px-8 py-3 font-semibold hover:bg-gray-100 transition">Boek Nu</button>
            <button className="border border-white/30 text-white px-8 py-3 hover:border-white transition">Meer Info</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────── Variant 4: Minimal Typography ───────────────── */
function HeroV4() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-primary overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="relative text-center z-10">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
          <h1 className="font-heading text-8xl md:text-9xl text-white tracking-tight">
            T<span className="text-accent">.</span>M
          </h1>
          <div className="w-24 h-[1px] bg-accent mx-auto my-6" />
          <p className="text-gray-400 tracking-[0.5em] uppercase text-sm">Photography Studio</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────── Variant 5: Parallax Multi-Layer ───────────────── */
function HeroV5() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={ref} className="relative h-[600px] overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=1280&fit=crop')] bg-cover bg-center scale-110" />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div style={{ y: y2 }} className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-6xl text-white mb-6">Zakelijke Fotografie</h1>
          <p className="text-gray-300 text-lg mb-8">Met passie en oog voor detail</p>
          <button className="bg-accent/20 border border-accent text-accent px-10 py-4 rounded-full hover:bg-accent hover:text-primary transition-all">
            Ontdek Onze Stijl
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────── Variant 6: Asymmetric Cards ───────────────── */
function HeroV6() {
  return (
    <section className="relative h-[600px] bg-primary flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-12 gap-4 items-center">
        <div className="col-span-5">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="text-accent text-sm uppercase tracking-widest">Sinds 2018</span>
            <h1 className="font-heading text-5xl text-white mt-4 mb-6">Fotografie<br />met Ziel</h1>
            <p className="text-gray-400 mb-8">Authentieke beelden die het hart raken.</p>
            <button className="bg-accent text-primary px-6 py-3 font-semibold">Contact</button>
          </motion.div>
        </div>
        <div className="col-span-7 grid grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspect-[3/4] rounded-lg overflow-hidden bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop')] bg-cover" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="aspect-[3/4] rounded-lg overflow-hidden bg-[url('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=800&fit=crop')] bg-cover mt-12" />
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Variant 7: Full Overlay with Scroll Indicator ───────────────── */
function HeroV7() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="w-20 h-20 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-accent text-2xl">TM</span>
          </div>
          <h1 className="font-heading text-5xl text-white mb-4">Tigran Media</h1>
          <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
            <span>Portretten</span><span className="text-accent">•</span>
            <span>Portretten</span><span className="text-accent">•</span>
            <span>Evenementen</span>
          </div>
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────── Variant 8: Diagonal Split ───────────────── */
function HeroV8() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-primary" style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }} />
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="max-w-md">
            <h1 className="font-heading text-6xl text-white mb-4">Creatieve<br /><span className="text-accent">Fotografie</span></h1>
            <p className="text-gray-400 mb-6">Unieke perspectieven voor memorabele momenten.</p>
            <div className="flex gap-3">
              <button className="bg-accent text-primary px-6 py-3 font-semibold">Portfolio</button>
              <button className="text-white px-6 py-3 border border-white/20 hover:border-accent transition">Info</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Variant 9: Stacked Text ───────────────── */
function HeroV9() {
  return (
    <section className="relative h-[600px] bg-primary flex items-center overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=960&h=1080&fit=crop')] bg-cover bg-center opacity-30" />
      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          {['FOTO', 'GRA', 'FIE'].map((word, i) => (
            <motion.h1 key={word} initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.15 }} className="font-heading text-7xl md:text-8xl text-white leading-none">
              {word}<span className="text-accent">.</span>
            </motion.h1>
          ))}
          <p className="text-gray-400 mt-6 max-w-sm">Met Tigran Media leg je elk belangrijk moment vast in tijdloze beelden.</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────── Variant 10: Cinematic Bars ───────────────── */
function HeroV10() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-0 left-0 right-0 h-16 bg-primary z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-primary z-10" />
      <div className="relative z-20 h-full flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="text-center">
          <h1 className="font-heading text-6xl md:text-7xl text-white">
            THE <span className="text-accent italic">ART</span> OF LIGHT
          </h1>
          <div className="mt-6 flex items-center justify-center gap-8 text-white/60 text-sm uppercase tracking-widest">
            <span>Tigran Media</span>
            <span className="w-8 h-[1px] bg-accent" />
            <span>Belgium</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────── Page ───────────────── */
const variants = [
  { component: <HeroV1 />, name: 'Classic Centered', desc: 'Gecentreerde tekst met achtergrondafbeelding en overlay' },
  { component: <HeroV2 />, name: 'Split Screen', desc: 'Gesplitst scherm met tekst links en afbeelding rechts' },
  { component: <HeroV3 />, name: 'Bottom Aligned', desc: 'Tekst onderaan met gradient overlay van onder naar boven' },
  { component: <HeroV4 />, name: 'Minimal Typography', desc: 'Minimalistische typografie met dot-grid achtergrond' },
  { component: <HeroV5 />, name: 'Parallax Multi-Layer', desc: 'Meerdere parallax lagen met scroll-effect' },
  { component: <HeroV6 />, name: 'Asymmetric Cards', desc: 'Asymmetrische layout met meerdere afbeeldingskaarten' },
  { component: <HeroV7 />, name: 'Overlay + Scroll', desc: 'Zware overlay met scroll-indicator animatie' },
  { component: <HeroV8 />, name: 'Diagonal Split', desc: 'Diagonale verdeling tussen kleur en afbeelding' },
  { component: <HeroV9 />, name: 'Stacked Text', desc: 'Gestapelde typografie met halftransparante achtergrond' },
  { component: <HeroV10 />, name: 'Cinematic Bars', desc: 'Filmische stijl met horizontale balken boven en onder' },
];

export default function HeroVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">
          Hero <span className="text-accent">Varianten</span>
        </h1>
        <p className="text-gray-400 mt-2">10 unieke hero secties om uit te kiezen</p>
      </div>

      {variants.map((v, i) => (
        <div key={i} className="mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <span className="text-accent font-mono text-sm">Variant {i + 1}</span>
            <h2 className="font-heading text-2xl text-white">{v.name}</h2>
            <p className="text-gray-500 text-sm">{v.desc}</p>
          </div>
          {v.component}
        </div>
      ))}
    </main>
  );
}
