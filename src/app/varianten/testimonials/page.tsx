'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const reviews = [
  { name: 'Sophie & Thomas', role: 'Evenement', text: 'Tigran heeft ons evenement op de mooiste manier vastgelegd. Elke foto vertelt een verhaal.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Jan De Vries', role: 'Portretfotografie', text: 'Professioneel, creatief en met oog voor detail. De portretten zijn werkelijk prachtig geworden.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { name: 'Lisa Janssens', role: 'Evenement', text: 'Fantastische samenwerking! De sfeer van het evenement is perfect gevangen in de foto\'s.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
];

/* ═══════ V1: Classic Cards ═══════ */
function V1() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="bg-surface p-8 rounded-xl border border-white/10">
            <div className="flex gap-1 mb-4">{[...Array(r.rating)].map((_, j) => <FaStar key={j} className="text-accent" />)}</div>
            <p className="text-gray-300 mb-6 italic">&ldquo;{r.text}&rdquo;</p>
            <div className="flex items-center gap-3">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
              <div><p className="text-white font-semibold text-sm">{r.name}</p><p className="text-accent text-xs">{r.role}</p></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V2: Large Quote ═══════ */
function V2() {
  const r = reviews[0];
  return (
    <section className="bg-primary py-20">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <FaQuoteLeft className="text-accent/30 text-5xl mx-auto mb-6" />
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-heading text-3xl md:text-4xl text-white leading-relaxed mb-8">{r.text}</motion.p>
        <div className="flex items-center justify-center gap-4">
          <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full border-2 border-accent" />
          <div className="text-left"><p className="text-white font-semibold">{r.name}</p><p className="text-accent text-sm">{r.role}</p></div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V3: Side by Side ═══════ */
function V3() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-accent uppercase tracking-widest text-sm">Wat klanten zeggen</span>
          <h2 className="font-heading text-4xl text-white mt-2">Onze Klanten Spreken</h2>
        </div>
        <div className="space-y-6">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-4 items-start border-l-2 border-accent pl-6">
              <div>
                <p className="text-gray-300 text-sm italic">&ldquo;{r.text}&rdquo;</p>
                <p className="text-white text-sm mt-2 font-semibold">{r.name} <span className="text-accent font-normal">— {r.role}</span></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V4: Dark Overlap Cards ═══════ */
function V4() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="flex-1 bg-primary p-8 rounded-2xl relative">
              <FaQuoteLeft className="text-accent/20 text-3xl absolute top-4 right-4" />
              <div className="flex gap-1 text-xs mb-3">{[...Array(r.rating)].map((_, j) => <FaStar key={j} className="text-yellow-500" />)}</div>
              <p className="text-gray-300 text-sm mb-6">{r.text}</p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full" />
                <p className="text-white text-sm">{r.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V5: Horizontal Scroll ═══════ */
function V5() {
  return (
    <section className="bg-primary py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <h2 className="font-heading text-3xl text-white">Ervaringen</h2>
      </div>
      <div className="flex gap-6 px-8 overflow-x-auto pb-4">
        {[...reviews, ...reviews].map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex-shrink-0 w-96 bg-surface p-6 rounded-xl border border-white/5">
            <p className="text-gray-300 italic mb-4">&ldquo;{r.text}&rdquo;</p>
            <div className="flex items-center gap-3">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full" />
              <div><p className="text-white text-sm font-semibold">{r.name}</p><p className="text-gray-500 text-xs">{r.role}</p></div>
              <div className="ml-auto flex gap-0.5">{[...Array(r.rating)].map((_, j) => <FaStar key={j} className="text-accent text-xs" />)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V6: Minimal List ═══════ */
function V6() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-3xl mx-auto px-8 space-y-12">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <div className="flex gap-1 justify-center mb-4">{[...Array(r.rating)].map((_, j) => <FaStar key={j} className="text-accent" />)}</div>
            <p className="text-white text-xl font-heading italic">&ldquo;{r.text}&rdquo;</p>
            <p className="text-gray-500 mt-4">{r.name} — {r.role}</p>
            {i < reviews.length - 1 && <div className="w-16 h-[1px] bg-accent/30 mx-auto mt-8" />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V7: Photo Background ═══════ */
function V7() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=600&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-primary/90" />
      <div className="relative z-10 max-w-5xl mx-auto px-8 grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }} className="backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10">
            <p className="text-gray-200 text-sm italic mb-4">&ldquo;{r.text}&rdquo;</p>
            <p className="text-accent text-sm font-semibold">{r.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V8: Avatar Prominent ═══════ */
function V8() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="text-center">
            <img src={r.avatar} alt={r.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-accent/30 object-cover" />
            <h3 className="text-white font-heading text-lg">{r.name}</h3>
            <p className="text-accent text-sm mb-4">{r.role}</p>
            <p className="text-gray-400 text-sm italic">&ldquo;{r.text}&rdquo;</p>
            <div className="flex gap-1 justify-center mt-4">{[...Array(r.rating)].map((_, j) => <FaStar key={j} className="text-yellow-500 text-sm" />)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V9: Gradient Cards ═══════ */
function V9() {
  const gradients = ['from-accent/20 to-transparent', 'from-blue-500/20 to-transparent', 'from-purple-500/20 to-transparent'];
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className={`bg-gradient-to-br ${gradients[i]} p-8 rounded-2xl border border-white/5`}>
            <FaQuoteRight className="text-white/10 text-2xl mb-4" />
            <p className="text-white mb-6">{r.text}</p>
            <div className="flex items-center gap-3">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full" />
              <div><p className="text-white text-sm font-bold">{r.name}</p><p className="text-gray-400 text-xs">{r.role}</p></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V10: Timeline ═══════ */
function V10() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-2xl mx-auto px-8">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} className="relative pl-8 pb-10 border-l border-white/10">
            <div className="absolute left-0 top-0 w-3 h-3 bg-accent rounded-full -translate-x-[7px]" />
            <p className="text-gray-300 italic text-sm">&ldquo;{r.text}&rdquo;</p>
            <div className="flex items-center gap-2 mt-3">
              <img src={r.avatar} alt={r.name} className="w-6 h-6 rounded-full" />
              <p className="text-white text-sm">{r.name}</p>
              <span className="text-accent text-xs ml-auto">{r.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ Page ═══════ */
const variants = [
  { component: <V1 />, name: 'Classic Cards', desc: 'Drie kaarten met sterren, quote en avatar' },
  { component: <V2 />, name: 'Large Quote', desc: 'Één grote uitgelichte quote met groot lettertype' },
  { component: <V3 />, name: 'Side by Side', desc: 'Titel links, reviews rechts met accent border' },
  { component: <V4 />, name: 'Dark Overlap', desc: 'Donkere overlappende kaarten met quote-icoon' },
  { component: <V5 />, name: 'Horizontal Scroll', desc: 'Horizontaal scrollbare review kaarten' },
  { component: <V6 />, name: 'Minimal List', desc: 'Minimalistische gestapelde quotes met scheidingslijnen' },
  { component: <V7 />, name: 'Photo Background', desc: 'Glasmorfisme kaarten op foto-achtergrond' },
  { component: <V8 />, name: 'Avatar Prominent', desc: 'Grote ronde avatar centraal met tekst eronder' },
  { component: <V9 />, name: 'Gradient Cards', desc: 'Kaarten met kleurverloop achtergrond' },
  { component: <V10 />, name: 'Timeline', desc: 'Verticale tijdlijn met quotes' },
];

export default function TestimonialsVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">Testimonials <span className="text-accent">Varianten</span></h1>
        <p className="text-gray-400 mt-2">10 unieke testimonial secties om uit te kiezen</p>
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
