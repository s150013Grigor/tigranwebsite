'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const photos = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop', title: 'Zakelijk', cat: 'Zakelijk' },
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop', title: 'Portret', cat: 'Portret' },
  { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=600&fit=crop', title: 'Evenement', cat: 'Evenement' },
  { src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop', title: 'Natuur', cat: 'Natuur' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop', title: 'Feest', cat: 'Zakelijk' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop', title: 'Ceremonie', cat: 'Zakelijk' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop', title: 'Studio', cat: 'Portret' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', title: 'Headshot', cat: 'Portret' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop', title: 'Concert', cat: 'Evenement' },
];

/* ───────────────── V1: Standard Grid ───────────────── */
function GalleryV1() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.slice(0, 6).map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group relative aspect-[4/3] overflow-hidden rounded-lg">
              <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-heading text-lg">{p.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── V2: Masonry ───────────────── */
function GalleryV2() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="break-inside-avoid group relative overflow-hidden rounded-lg">
              <img src={p.src} alt={p.title} className={`w-full object-cover ${i % 3 === 0 ? 'h-80' : i % 3 === 1 ? 'h-64' : 'h-96'} group-hover:scale-105 transition-transform duration-500`} />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70">
                <p className="text-white text-sm font-heading">{p.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── V3: Carousel Style ───────────────── */
function GalleryV3() {
  return (
    <section className="bg-primary py-16 overflow-hidden">
      <div className="flex gap-4 px-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-primary scrollbar-thumb-accent">
        {photos.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex-shrink-0 w-80 group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <p className="text-white font-heading mt-3">{p.title}</p>
            <p className="text-accent text-sm">{p.cat}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── V4: Full Width Featured ───────────────── */
function GalleryV4() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg group">
            <img src={photos[0].src} alt={photos[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end p-6">
              <h3 className="text-white font-heading text-2xl">{photos[0].title}</h3>
            </div>
          </div>
          {photos.slice(1, 5).map((p, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg group">
              <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition text-sm">{p.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── V5: Hover Reveal ───────────────── */
function GalleryV5() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-6">
        {photos.slice(0, 6).map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="group relative aspect-square overflow-hidden">
            <img src={p.src} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent transition-colors m-4" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform bg-accent p-4">
              <p className="text-primary font-semibold">{p.title}</p>
              <p className="text-primary/70 text-sm">{p.cat}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── V6: Numbered Grid ───────────────── */
function GalleryV6() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {photos.slice(0, 6).map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-none group">
                <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex items-start gap-3 mt-3">
                <span className="text-accent font-heading text-2xl">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-white font-heading">{p.title}</p>
                  <p className="text-gray-500 text-sm">{p.cat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── V7: Stacked Cards ───────────────── */
function GalleryV7() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-4xl mx-auto px-8 space-y-6">
        {photos.slice(0, 4).map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} className={`flex gap-6 items-center ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}>
            <div className="w-1/2 aspect-[4/3] overflow-hidden rounded-lg">
              <img src={p.src} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="w-1/2">
              <span className="text-accent text-sm uppercase tracking-widest">{p.cat}</span>
              <h3 className="font-heading text-3xl text-white mt-2">{p.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">Professioneel vastgelegd door Tigran Media met oog voor detail en emotie.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── V8: Lightbox Tiles ───────────────── */
function GalleryV8() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-4 gap-2">
          {photos.map((p, i) => (
            <motion.div key={i} whileHover={{ zIndex: 10, scale: 1.05 }} className="relative aspect-square overflow-hidden cursor-pointer">
              <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
              <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute inset-0 bg-accent/80 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary font-heading text-xl">{p.title}</p>
                  <p className="text-primary/70 text-sm mt-1">Bekijk foto</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── V9: Filmstrip ───────────────── */
function GalleryV9() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="border-t border-b border-white/10 py-8">
          <div className="flex gap-1 overflow-hidden">
            {photos.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex-shrink-0 w-48 group">
                <div className="h-2 bg-white/5 flex justify-around items-center px-1 mb-1">
                  {[...Array(6)].map((_, j) => <div key={j} className="w-2 h-1 bg-white/20 rounded-sm" />)}
                </div>
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="h-2 bg-white/5 flex justify-around items-center px-1 mt-1">
                  {[...Array(6)].map((_, j) => <div key={j} className="w-2 h-1 bg-white/20 rounded-sm" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── V10: Polaroid Style ───────────────── */
function GalleryV10() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {photos.slice(0, 8).map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, rotate: -5 + Math.random() * 10 }} whileInView={{ opacity: 1, rotate: -3 + (i % 3) * 3 }} whileHover={{ rotate: 0, scale: 1.05 }} className="bg-white p-3 pb-16 shadow-xl cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-800 font-heading text-center mt-4 text-sm">{p.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Page ───────────────── */
const variants = [
  { component: <GalleryV1 />, name: 'Standard Grid', desc: 'Klassiek responsive grid met hover zoom en overlay' },
  { component: <GalleryV2 />, name: 'Masonry', desc: 'Pinterest-stijl masonry layout met variërende hoogtes' },
  { component: <GalleryV3 />, name: 'Carousel', desc: 'Horizontaal scrollbare kaarten met categorielabels' },
  { component: <GalleryV4 />, name: 'Featured Bento', desc: 'Bento grid met één grote uitgelichte foto' },
  { component: <GalleryV5 />, name: 'Grayscale Reveal', desc: 'Grijswaarden naar kleur bij hover met accent border' },
  { component: <GalleryV6 />, name: 'Numbered Grid', desc: 'Genummerd grid met typografische details' },
  { component: <GalleryV7 />, name: 'Stacked Cards', desc: 'Afwisselend links/rechts uitgelijnde kaarten' },
  { component: <GalleryV8 />, name: 'Lightbox Tiles', desc: 'Compact grid met accent-kleur hover overlay' },
  { component: <GalleryV9 />, name: 'Filmstrip', desc: 'Filmrol-stijl horizontale strip met perforaties' },
  { component: <GalleryV10 />, name: 'Polaroid', desc: 'Polaroid-foto stijl met rotaties en witte rand' },
];

export default function GalleryVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">
          Gallery <span className="text-accent">Varianten</span>
        </h1>
        <p className="text-gray-400 mt-2">10 unieke galerij layouts om uit te kiezen</p>
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
