'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaPlus, FaMinus, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const faqs = [
  { q: 'Hoeveel kost een fotosessie?', a: 'Onze prijzen variëren afhankelijk van het type fotografie en de duur van de sessie. Neem contact op voor een persoonlijke offerte.' },
  { q: 'Hoe lang duurt het voor ik mijn foto\'s ontvang?', a: 'Gemiddeld leveren we de bewerkte foto\'s binnen 2-3 weken na de fotosessie. Bij spoedopdrachten zijn kortere levertijden mogelijk.' },
  { q: 'Kan ik een locatie kiezen voor de fotosessie?', a: 'Absoluut! We werken zowel in onze studio als op locatie. We helpen je graag bij het kiezen van de perfecte locatie.' },
  { q: 'Hoeveel bewerkte foto\'s ontvang ik?', a: 'Het aantal bewerkte foto\'s hangt af van het gekozen pakket. Bij een standaard sessie ontvang je gemiddeld 30-50 bewerkte foto\'s.' },
];

/* ═══════ V1: Classic Accordion ═══════ */
function V1() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-primary py-16">
      <div className="max-w-3xl mx-auto px-8">
        <h2 className="font-heading text-3xl text-white text-center mb-10">Veelgestelde Vragen</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="text-white font-medium">{f.q}</span>
                {open === i ? <FaMinus className="text-accent flex-shrink-0" /> : <FaPlus className="text-accent flex-shrink-0" />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-gray-400 text-sm">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V2: Side by Side ═══════ */
function V2() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
        <div className="sticky top-24">
          <span className="text-accent uppercase tracking-widest text-sm">FAQ</span>
          <h2 className="font-heading text-4xl text-white mt-2 mb-4">Heb Je Vragen?</h2>
          <p className="text-gray-400">Hier vind je antwoorden op de meest gestelde vragen. Staat jouw vraag er niet bij? Neem dan gerust contact op.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <FaChevronRight className={`text-accent text-xs transition-transform ${open === i ? 'rotate-90' : ''}`} />
                  <span className="text-white">{f.q}</span>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-gray-400 text-sm mt-3 pl-6">{f.a}</motion.p>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V3: Cards Grid ═══════ */
function V3() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-heading text-3xl text-white text-center mb-10">Antwoorden op Jouw Vragen</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-surface p-6 rounded-xl border border-white/5">
              <h3 className="text-white font-semibold mb-3 flex items-start gap-2">
                <span className="text-accent font-heading text-xl">{String(i + 1).padStart(2, '0')}</span>
                {f.q}
              </h3>
              <p className="text-gray-400 text-sm pl-8">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V4: Tabs Style ═══════ */
function V4() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-primary py-16">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="font-heading text-3xl text-white text-center mb-10">FAQ</h2>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {faqs.map((f, i) => (
            <button key={i} onClick={() => setActive(i)} className={`px-4 py-2 rounded-full text-sm transition ${active === i ? 'bg-accent text-primary font-semibold' : 'bg-surface text-gray-400 hover:text-white'}`}>
              Vraag {i + 1}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-surface p-8 rounded-xl">
            <h3 className="text-white font-heading text-xl mb-4">{faqs[active].q}</h3>
            <p className="text-gray-400">{faqs[active].a}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═══════ V5: Minimal Underline ═══════ */
function V5() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-primary py-16">
      <div className="max-w-3xl mx-auto px-8">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-white/5">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left group">
              <span className="text-white group-hover:text-accent transition">{f.q}</span>
              <FaChevronDown className={`text-accent text-sm transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="text-gray-400 text-sm pb-6">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V6: Two Column List ═══════ */
function V6() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-heading text-3xl text-white text-center mb-12">Alles Wat Je Wilt Weten</h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {faqs.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                {f.q}
              </h3>
              <p className="text-gray-400 text-sm pl-4">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V7: Bubble Style ═══════ */
function V7() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-2xl mx-auto px-8 space-y-4">
        <h2 className="font-heading text-3xl text-white text-center mb-8">Vragen & Antwoorden</h2>
        {faqs.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="space-y-2">
            <div className="bg-accent text-primary px-5 py-3 rounded-2xl rounded-bl-none inline-block font-medium text-sm">{f.q}</div>
            <div className="bg-surface text-gray-300 px-5 py-3 rounded-2xl rounded-tl-none ml-8 text-sm">{f.a}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V8: Numbered Large ═══════ */
function V8() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-primary py-16">
      <div className="max-w-4xl mx-auto px-8">
        {faqs.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="border-b border-white/5 py-8">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-start gap-6 text-left">
              <span className="text-accent/30 font-heading text-5xl">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <h3 className="text-white font-heading text-xl">{f.q}</h3>
                <AnimatePresence>
                  {open === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-gray-400 mt-3 overflow-hidden">{f.a}</motion.p>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════ V9: Search + FAQ ═══════ */
function V9() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-primary py-16">
      <div className="max-w-3xl mx-auto px-8">
        <h2 className="font-heading text-3xl text-white text-center mb-4">Hulp Nodig?</h2>
        <div className="relative mb-10">
          <input placeholder="Zoek in onze FAQ..." className="w-full bg-surface border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none" />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">🔍</span>
        </div>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="bg-surface rounded-lg">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="text-white text-sm">{f.q}</span>
                <FaChevronDown className={`text-accent text-xs transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="px-4 pb-4 text-gray-400 text-sm">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V10: Hover Reveal ═══════ */
function V10() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-heading text-3xl text-white text-center mb-10">Veel Gesteld</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((f, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-surface p-6 rounded-xl cursor-pointer group border border-transparent hover:border-accent/30 transition-colors">
              <h3 className="text-white font-semibold group-hover:text-accent transition-colors">{f.q}</h3>
              <p className="text-gray-400 text-sm mt-2 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ Page ═══════ */
const variants = [
  { component: <V1 />, name: 'Classic Accordion', desc: 'Standaard accordion met plus/min iconen' },
  { component: <V2 />, name: 'Side by Side', desc: 'Sticky header links, FAQ rechts' },
  { component: <V3 />, name: 'Cards Grid', desc: 'Genummerde kaarten in 2-koloms grid' },
  { component: <V4 />, name: 'Tabs Style', desc: 'Tab-navigatie met geanimeerde content wisseling' },
  { component: <V5 />, name: 'Minimal Underline', desc: 'Minimalistische lijst met chevron animatie' },
  { component: <V6 />, name: 'Two Column List', desc: 'Twee kolommen met bullet-points' },
  { component: <V7 />, name: 'Chat Bubbles', desc: 'Vraag-antwoord in chat-bubbel stijl' },
  { component: <V8 />, name: 'Numbered Large', desc: 'Grote nummers met uitklapbare antwoorden' },
  { component: <V9 />, name: 'Search + FAQ', desc: 'Zoekbalk bovenaan met uitklapbare items' },
  { component: <V10 />, name: 'Hover Reveal', desc: 'Antwoord verschijnt bij hover over de kaart' },
];

export default function FAQVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">FAQ <span className="text-accent">Varianten</span></h1>
        <p className="text-gray-400 mt-2">10 unieke FAQ secties om uit te kiezen</p>
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
