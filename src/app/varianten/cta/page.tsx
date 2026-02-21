'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaCamera, FaPhone } from 'react-icons/fa';

/* ═══════ V1: Classic CTA ═══════ */
function V1() {
  return (
    <section className="bg-accent py-20">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="font-heading text-4xl text-primary mb-4">Klaar voor Jouw Fotoshoot?</h2>
        <p className="text-primary/70 mb-8 max-w-xl mx-auto">Neem vandaag nog contact met ons op en laten we samen prachtige beelden maken.</p>
        <button className="bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition">Neem Contact Op</button>
      </div>
    </section>
  );
}

/* ═══════ V2: Parallax BG ═══════ */
function V2() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=600&fit=crop')] bg-cover bg-fixed bg-center" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="font-heading text-4xl text-white mb-4">Laat Ons Jouw Verhaal Vertellen</h2>
          <p className="text-gray-300 mb-8">Professionele fotografie voor elk moment dat telt.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-accent text-primary px-8 py-3 font-semibold">Boek Nu</button>
            <button className="border border-white text-white px-8 py-3 hover:bg-white hover:text-primary transition">Meer Info</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════ V3: Split CTA ═══════ */
function V3() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="bg-accent p-16 flex items-center">
        <div>
          <h2 className="font-heading text-3xl text-primary mb-4">Zakelijke Fotografie</h2>
          <p className="text-primary/70 mb-6">De mooiste dag verdient de mooiste foto&apos;s.</p>
          <button className="bg-primary text-white px-6 py-3 font-semibold flex items-center gap-2">Meer Info <FaArrowRight /></button>
        </div>
      </div>
      <div className="bg-surface p-16 flex items-center">
        <div>
          <h2 className="font-heading text-3xl text-white mb-4">Portretfotografie</h2>
          <p className="text-gray-400 mb-6">Professionele portretten voor elk doel.</p>
          <button className="border border-accent text-accent px-6 py-3 font-semibold flex items-center gap-2 hover:bg-accent hover:text-primary transition">Boek Nu <FaArrowRight /></button>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V4: Minimal Line ═══════ */
function V4() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="border border-white/10 p-12 text-center">
          <span className="text-accent uppercase tracking-[0.3em] text-sm">Contact</span>
          <h2 className="font-heading text-4xl text-white mt-4 mb-8">Interesse? Laten We Praten.</h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@tigranmedia.be" className="text-accent hover:underline">info@tigranmedia.be</a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a href="tel:+32474114899" className="text-accent hover:underline">+32 474 11 48 99</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V5: Gradient Banner ═══════ */
function V5() {
  return (
    <section className="bg-gradient-to-r from-accent/20 via-primary to-accent/20 py-16">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="font-heading text-3xl text-white">Begin Vandaag Nog</h2>
          <p className="text-gray-400 mt-2">Vraag een gratis en vrijblijvend gesprek aan.</p>
        </div>
        <button className="bg-accent text-primary px-10 py-4 font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 whitespace-nowrap">
          <FaPhone /> Bel Ons
        </button>
      </div>
    </section>
  );
}

/* ═══════ V6: Card with Image ═══════ */
function V6() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-5xl mx-auto px-8">
        <div className="bg-surface rounded-2xl overflow-hidden grid md:grid-cols-2">
          <div className="bg-[url('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop')] bg-cover bg-center min-h-[300px]" />
          <div className="p-12 flex flex-col justify-center">
            <h2 className="font-heading text-3xl text-white mb-4">Gratis Kennismaking</h2>
            <p className="text-gray-400 mb-6">Plan een vrijblijvend gesprek en ontdek hoe we samen jouw visie kunnen realiseren.</p>
            <button className="bg-accent text-primary px-6 py-3 font-semibold w-fit">Plan Afspraak</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V7: Stats + CTA ═══════ */
function V7() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <div className="grid grid-cols-3 gap-8 mb-12">
          {[{ n: '500+', l: 'Tevreden Klanten' }, { n: '10K+', l: "Foto's Geleverd" }, { n: '8+', l: 'Jaar Ervaring' }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <p className="text-accent font-heading text-4xl">{s.n}</p>
              <p className="text-gray-400 text-sm mt-1">{s.l}</p>
            </motion.div>
          ))}
        </div>
        <h2 className="font-heading text-3xl text-white mb-4">Word Onze Volgende Tevreden Klant</h2>
        <button className="bg-accent text-primary px-8 py-3 font-semibold mt-4">Start Nu</button>
      </div>
    </section>
  );
}

/* ═══════ V8: Sticky Ribbon ═══════ */
function V8() {
  return (
    <section className="bg-accent">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCamera className="text-primary text-xl" />
          <p className="text-primary font-semibold">Boek nu je fotosessie met 10% korting!</p>
        </div>
        <button className="bg-primary text-white px-6 py-2 text-sm font-semibold hover:bg-primary/90 transition">Boek Nu</button>
      </div>
    </section>
  );
}

/* ═══════ V9: Full Width Dark ═══════ */
function V9() {
  return (
    <section className="bg-primary py-24 border-y border-white/5">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}>
          <span className="text-accent text-6xl font-heading">&ldquo;</span>
          <h2 className="font-heading text-3xl text-white -mt-4 mb-6">Ieder Moment Verdient Het Om Vastgelegd Te Worden</h2>
          <p className="text-gray-400 mb-8">Ontdek onze diensten en plannen. Wij staan klaar om jouw bijzondere momenten vast te leggen.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-accent text-primary px-8 py-3 font-semibold rounded-full">Diensten</button>
            <button className="border border-accent text-accent px-8 py-3 rounded-full hover:bg-accent hover:text-primary transition">Prijzen</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════ V10: Newsletter Style ═══════ */
function V10() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-xl mx-auto px-8 text-center">
        <h2 className="font-heading text-3xl text-white mb-2">Blijf Op De Hoogte</h2>
        <p className="text-gray-400 mb-6 text-sm">Ontvang tips, achter-de-schermen content en exclusieve aanbiedingen.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="jouw@email.be" className="flex-1 bg-primary border border-white/10 px-4 py-3 rounded text-white placeholder:text-gray-600 focus:border-accent outline-none" />
          <button className="bg-accent text-primary px-6 py-3 font-semibold rounded whitespace-nowrap">Aanmelden</button>
        </div>
        <p className="text-gray-600 text-xs mt-3">Geen spam, je kunt je op elk moment uitschrijven.</p>
      </div>
    </section>
  );
}

/* ═══════ Page ═══════ */
const variants = [
  { component: <V1 />, name: 'Classic Gold', desc: 'Accent achtergrond met donkere knop' },
  { component: <V2 />, name: 'Parallax Background', desc: 'Fixed achtergrondafbeelding met donkere overlay' },
  { component: <V3 />, name: 'Split CTA', desc: 'Twee gelijke helften met verschillende diensten' },
  { component: <V4 />, name: 'Minimal Line', desc: 'Minimalistische border-box met contactgegevens' },
  { component: <V5 />, name: 'Gradient Banner', desc: 'Gradient achtergrond met ronde actieknop' },
  { component: <V6 />, name: 'Card with Image', desc: 'Afgeronde kaart met afbeelding en tekst naast elkaar' },
  { component: <V7 />, name: 'Stats + CTA', desc: 'Statistieken boven de actie-oproep' },
  { component: <V8 />, name: 'Sticky Ribbon', desc: 'Compacte actiebalk met aanbiedingstekst' },
  { component: <V9 />, name: 'Full Width Quote', desc: 'Donkere sectie met inspirerend citaat en ronde knoppen' },
  { component: <V10 />, name: 'Newsletter', desc: 'E-mail aanmeldformulier met invoerveld' },
];

export default function CTAVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">CTA <span className="text-accent">Varianten</span></h1>
        <p className="text-gray-400 mt-2">10 unieke call-to-action secties om uit te kiezen</p>
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
