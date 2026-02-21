'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendar, FaArrowRight, FaClock, FaTag } from 'react-icons/fa';

const posts = [
  { title: 'Tips voor de Perfecte Portretfoto', excerpt: 'Ontdek onze beste tips om de mooiste portretten vast te leggen.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop', date: '15 Jan 2024', cat: 'Portret', reading: '5 min' },
  { title: 'Waarom Professionele Fotografie voor je Bedrijf', excerpt: 'Leer waarom professionele fotografie een essentiële investering is voor elk bedrijf.', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop', date: '10 Jan 2024', cat: 'Zakelijk', reading: '4 min' },
  { title: 'De Beste Fotolocaties in Vlaanderen', excerpt: 'Een gids vol prachtige locaties voor je volgende fotosessie in Vlaanderen.', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=600&fit=crop', date: '5 Jan 2024', cat: 'Locaties', reading: '6 min' },
];

/* ═══════ V1: Classic Cards ═══════ */
function V1() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-accent text-xs uppercase tracking-widest">{p.cat}</span>
            <h3 className="font-heading text-xl text-white mt-1 mb-2 group-hover:text-accent transition">{p.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{p.excerpt}</p>
            <span className="text-gray-500 text-xs flex items-center gap-1"><FaCalendar /> {p.date}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V2: Horizontal Cards ═══════ */
function V2() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-4xl mx-auto px-8 space-y-6">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="group flex gap-6 bg-surface rounded-xl overflow-hidden cursor-pointer hover:ring-1 hover:ring-accent/30 transition">
            <div className="w-64 flex-shrink-0">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="py-6 pr-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span className="bg-accent/20 text-accent px-2 py-0.5 rounded">{p.cat}</span>
                <span>{p.date}</span>
              </div>
              <h3 className="font-heading text-xl text-white group-hover:text-accent transition">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{p.excerpt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V3: Overlay Cards ═══════ */
function V3() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-accent text-xs uppercase tracking-widest">{p.cat}</span>
              <h3 className="font-heading text-xl text-white mt-1">{p.title}</h3>
              <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{p.excerpt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V4: Featured + List ═══════ */
function V4() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="group cursor-pointer">
          <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4">
            <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <span className="text-accent text-xs uppercase">{posts[0].cat}</span>
          <h3 className="font-heading text-2xl text-white mt-1 mb-2 group-hover:text-accent transition">{posts[0].title}</h3>
          <p className="text-gray-400 text-sm">{posts[0].excerpt}</p>
        </motion.div>
        <div className="space-y-6 flex flex-col justify-center">
          {posts.slice(1).map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="group flex gap-4 cursor-pointer pb-6 border-b border-white/5 last:border-0">
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-accent text-xs">{p.cat}</span>
                <h3 className="text-white font-semibold group-hover:text-accent transition text-sm">{p.title}</h3>
                <span className="text-gray-500 text-xs mt-1 flex items-center gap-1"><FaCalendar /> {p.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V5: Minimal Text ═══════ */
function V5() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-3xl mx-auto px-8 space-y-8">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="group cursor-pointer border-b border-white/5 pb-8">
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
              <span>{p.date}</span>
              <span className="text-accent">{p.cat}</span>
              <span className="flex items-center gap-1"><FaClock /> {p.reading}</span>
            </div>
            <h3 className="font-heading text-2xl text-white group-hover:text-accent transition">{p.title}</h3>
            <p className="text-gray-400 mt-2">{p.excerpt}</p>
            <span className="text-accent text-sm mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Lees meer <FaArrowRight className="text-xs" /></span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V6: Card with Border ═══════ */
function V6() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="border border-white/10 rounded-xl overflow-hidden group cursor-pointer hover:border-accent/30 transition">
            <div className="aspect-video overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-accent text-xs font-semibold uppercase">{p.cat}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500 text-xs">{p.date}</span>
              </div>
              <h3 className="font-heading text-lg text-white group-hover:text-accent transition">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{p.excerpt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V7: Dark Glassmorphism ═══════ */
function V7() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="backdrop-blur bg-white/5 p-6 rounded-xl border border-white/10 group cursor-pointer">
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <span className="text-accent text-xs">{p.cat} — {p.date}</span>
            <h3 className="text-white font-heading text-lg mt-1 group-hover:text-accent transition">{p.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V8: Magazine Style ═══════ */
function V8() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-12 gap-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="col-span-8 group cursor-pointer relative aspect-[16/9] overflow-hidden rounded-xl">
            <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
            <div className="absolute bottom-0 p-8">
              <span className="bg-accent text-primary px-3 py-1 rounded text-xs font-bold uppercase">{posts[0].cat}</span>
              <h3 className="font-heading text-3xl text-white mt-3">{posts[0].title}</h3>
              <p className="text-gray-300 mt-2 max-w-xl">{posts[0].excerpt}</p>
            </div>
          </motion.div>
          <div className="col-span-4 space-y-6">
            {posts.slice(1).map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="group cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-lg mb-3">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-accent text-xs">{p.cat}</span>
                <h3 className="text-white text-sm font-semibold group-hover:text-accent transition">{p.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V9: Number Badge ═══════ */
function V9() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group cursor-pointer relative">
            <div className="absolute -top-3 -left-3 z-10 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-bold">{i + 1}</div>
            <div className="bg-primary p-6 rounded-xl">
              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2"><FaTag className="text-accent" /> {p.cat}<FaClock /> {p.reading}</div>
              <h3 className="text-white font-heading text-lg group-hover:text-accent transition">{p.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V10: Compact Row ═══════ */
function V10() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-5xl mx-auto px-8">
        <div className="border border-white/10 rounded-xl divide-y divide-white/5">
          {posts.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-6 p-4 group cursor-pointer hover:bg-surface transition">
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-semibold group-hover:text-accent transition truncate">{p.title}</h3>
                <p className="text-gray-500 text-xs mt-0.5 truncate">{p.excerpt}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="text-accent text-xs font-semibold">{p.cat}</span>
                <p className="text-gray-600 text-xs">{p.date}</p>
              </div>
              <FaArrowRight className="text-gray-600 group-hover:text-accent transition flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ Page ═══════ */
const variants = [
  { component: <V1 />, name: 'Classic Cards', desc: 'Standaard kaarten met afbeelding, categorie en datum' },
  { component: <V2 />, name: 'Horizontal Cards', desc: 'Horizontale kaarten met afbeelding links' },
  { component: <V3 />, name: 'Overlay Cards', desc: 'Tekst over de afbeelding met gradient' },
  { component: <V4 />, name: 'Featured + List', desc: 'Groot uitgelicht item met kleine lijst ernaast' },
  { component: <V5 />, name: 'Minimal Text', desc: 'Tekst-georiënteerde lijst zonder afbeeldingen' },
  { component: <V6 />, name: 'Border Cards', desc: 'Kaarten met subtiele border en hover effect' },
  { component: <V7 />, name: 'Glassmorphism', desc: 'Semitransparante kaarten op foto-achtergrond' },
  { component: <V8 />, name: 'Magazine Style', desc: 'Groot hero-artikel met kleinere items ernaast' },
  { component: <V9 />, name: 'Number Badge', desc: 'Genummerde badge op elke kaart' },
  { component: <V10 />, name: 'Compact Row', desc: 'Compacte rij-layout met thumbnail en pijl' },
];

export default function BlogCardsVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">Blog Cards <span className="text-accent">Varianten</span></h1>
        <p className="text-gray-400 mt-2">10 unieke blog kaart stijlen om uit te kiezen</p>
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
