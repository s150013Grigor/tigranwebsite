'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCamera, FaAward, FaHeart, FaUsers } from 'react-icons/fa';

const stats = [
  { icon: <FaCamera />, value: '500+', label: 'Projecten' },
  { icon: <FaAward />, value: '8+', label: 'Jaar Ervaring' },
  { icon: <FaHeart />, value: '100%', label: 'Passie' },
  { icon: <FaUsers />, value: '400+', label: 'Tevreden Klanten' },
];
const bio = 'Tigran is een professionele fotograaf gevestigd in België, gespecialiseerd in zakelijke shoots, portretten en evenementen. Met meer dan 8 jaar ervaring en een passie voor het vastleggen van authentieke momenten.';
const avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop';
const studio = 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop';

/* ═══════ V1: Classic Two Column ═══════ */
function V1() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
          <img src={avatar} alt="Tigran" className="rounded-lg w-full aspect-[3/4] object-cover" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-accent rounded-lg" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
          <span className="text-accent uppercase tracking-widest text-sm">Over Ons</span>
          <h2 className="font-heading text-4xl text-white mt-2 mb-6">Het Verhaal Achter de Lens</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">{bio}</p>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <div key={i}><p className="text-accent font-heading text-2xl">{s.value}</p><p className="text-gray-500 text-sm">{s.label}</p></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════ V2: Full Width Image Behind ═══════ */
function V2() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          <img src={avatar} alt="Tigran" className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-accent object-cover" />
          <h2 className="font-heading text-4xl text-white mb-4">Tigran — Fotograaf</h2>
          <p className="text-gray-400 leading-relaxed mb-8">{bio}</p>
          <div className="flex justify-center gap-8">
            {stats.slice(0, 3).map((s, i) => (
              <div key={i} className="text-center"><p className="text-accent font-heading text-3xl">{s.value}</p><p className="text-gray-500 text-xs">{s.label}</p></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════ V3: Timeline ═══════ */
function V3() {
  const events = [
    { year: '2016', text: 'Eerste camera gekocht en passie ontdekt' },
    { year: '2018', text: 'Tigran Media opgericht als professioneel bedrijf' },
    { year: '2020', text: 'Eerste grote fotoreportage in Antwerpen' },
    { year: '2024', text: '500+ tevreden klanten en groeiend team' },
  ];
  return (
    <section className="bg-primary py-20">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="font-heading text-4xl text-white text-center mb-16">Ons <span className="text-accent">Verhaal</span></h2>
        <div className="space-y-0">
          {events.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} className="flex gap-6 items-start pb-12 relative">
              <div className="flex-shrink-0 w-20 text-right">
                <span className="text-accent font-heading text-xl">{e.year}</span>
              </div>
              <div className="relative">
                <div className="w-3 h-3 bg-accent rounded-full" />
                {i < events.length - 1 && <div className="absolute top-3 left-[5px] w-[2px] h-full bg-white/10" />}
              </div>
              <p className="text-gray-400 pt-0">{e.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V4: Card Style ═══════ */
function V4() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-5xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-primary rounded-2xl overflow-hidden grid md:grid-cols-5">
          <div className="col-span-2 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop')] bg-cover bg-center min-h-[400px]" />
          <div className="col-span-3 p-12">
            <span className="text-accent text-sm uppercase tracking-widest">De Fotograaf</span>
            <h2 className="font-heading text-3xl text-white mt-2 mb-4">Tigran</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{bio}</p>
            <div className="flex gap-6">
              {stats.slice(0, 3).map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-accent">{s.icon}</span>
                  <div><p className="text-white text-sm font-bold">{s.value}</p><p className="text-gray-500 text-xs">{s.label}</p></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════ V5: Skills Focus ═══════ */
function V5() {
  const skills = [
    { name: 'Zakelijke Fotografie', pct: 95 },
    { name: 'Portretfotografie', pct: 90 },
    { name: 'Evenementfotografie', pct: 85 },
    { name: 'Beeldbewerking', pct: 92 },
  ];
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-heading text-4xl text-white mb-6">Expertise & <span className="text-accent">Vaardigheden</span></h2>
          <p className="text-gray-400 mb-8">{bio}</p>
          <div className="space-y-4">
            {skills.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1"><span className="text-white">{s.name}</span><span className="text-accent">{s.pct}%</span></div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} transition={{ duration: 1, delay: i * 0.15 }} className="h-full bg-accent rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={studio} alt="Studio" className="rounded-lg w-full aspect-[4/3] object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ═══════ V6: Overlap Layout ═══════ */
function V6() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="grid grid-cols-12 gap-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="col-span-5 row-span-2">
            <img src={avatar} alt="Tigran" className="w-full h-full object-cover rounded-lg" />
          </motion.div>
          <div className="col-span-7 bg-surface p-12 rounded-lg">
            <h2 className="font-heading text-4xl text-white mb-4">Over <span className="text-accent">Tigran Media</span></h2>
            <p className="text-gray-400 leading-relaxed">{bio}</p>
          </div>
          <div className="col-span-7 grid grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-surface p-4 rounded-lg text-center">
                <span className="text-accent text-xl">{s.icon}</span>
                <p className="text-white font-heading text-xl mt-2">{s.value}</p>
                <p className="text-gray-500 text-xs">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V7: Quote Highlight ═══════ */
function V7() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading text-4xl text-white mb-6">Wie Is Tigran?</h2>
          <p className="text-gray-400 leading-relaxed mb-6">{bio}</p>
          <button className="bg-accent text-primary px-6 py-3 font-semibold">Meer Weten</button>
        </div>
        <div className="flex items-center">
          <blockquote className="border-l-4 border-accent pl-6">
            <p className="text-white font-heading text-2xl italic leading-relaxed">&ldquo;Fotografie is niet wat je ziet, maar wat je voelt.&rdquo;</p>
            <cite className="text-accent text-sm mt-4 block not-italic">— Tigran, Fotograaf</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V8: Minimal Bio ═══════ */
function V8() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-2xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <img src={avatar} alt="Tigran" className="w-full h-full rounded-full object-cover" />
            <div className="absolute inset-0 rounded-full border-2 border-accent border-dashed animate-spin-slow" style={{ animationDuration: '20s' }} />
          </div>
          <h2 className="font-heading text-3xl text-white">Tigran</h2>
          <p className="text-accent text-sm uppercase tracking-widest mt-1 mb-6">Professioneel Fotograaf</p>
          <p className="text-gray-400 leading-relaxed">{bio}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════ V9: Full Width Dark ═══════ */
function V9() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="font-heading text-4xl text-white mb-4">Onze <span className="text-accent">Missie</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed">Wij geloven dat elk moment het verdient om op een authentieke en artistieke manier vastgelegd te worden. Onze missie is om emoties te vertalen naar tijdloze beelden.</p>
          </div>
          <div>
            <h2 className="font-heading text-4xl text-white mb-4">Onze <span className="text-accent">Visie</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed">De toonaangevende fotograaf worden in Vlaanderen, bekend om onze unieke stijl en persoonlijke aanpak. Kwalitatieve fotografie toegankelijk maken voor iedereen.</p>
          </div>
          <div>
            <h2 className="font-heading text-4xl text-white mb-4">Onze <span className="text-accent">Waarden</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed">Authenticiteit, creativiteit en klantgerichtheid staan centraal in alles wat we doen. We bouwen aan langdurige relaties met onze klanten.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V10: Video Placeholder ═══════ */
function V10() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video bg-surface rounded-xl flex items-center justify-center group cursor-pointer">
          <img src={studio} alt="Studio" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-50" />
          <div className="relative z-10 w-16 h-16 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-primary ml-1" />
          </div>
        </div>
        <div>
          <span className="text-accent text-sm uppercase tracking-widest">Behind The Scenes</span>
          <h2 className="font-heading text-3xl text-white mt-2 mb-4">Bekijk Hoe Wij Werken</h2>
          <p className="text-gray-400 leading-relaxed mb-6">Ontdek onze werkwijze, van het eerste gesprek tot de finale levering. Transparantie en kwaliteit staan centraal.</p>
          <ul className="space-y-2 text-gray-400 text-sm">
            {['Persoonlijk kennismakingsgesprek', 'Moodboard en stijlbepaling', 'Professionele fotosessie', 'Beeldbewerking en levering'].map((t, i) => (
              <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═══════ Page ═══════ */
const variants = [
  { component: <V1 />, name: 'Classic Two Column', desc: 'Foto links met decoratief frame, stats rechts' },
  { component: <V2 />, name: 'Centered Portrait', desc: 'Gecentreerd portret met achtergrondfoto' },
  { component: <V3 />, name: 'Timeline', desc: 'Verticale tijdlijn met bedrijfsgeschiedenis' },
  { component: <V4 />, name: 'Card Style', desc: 'Afgeronde kaart met foto en info naast elkaar' },
  { component: <V5 />, name: 'Skills Focus', desc: 'Animatie voortgangsbalken voor vaardigheden' },
  { component: <V6 />, name: 'Overlap Layout', desc: 'Overlappende grid met foto en content blokken' },
  { component: <V7 />, name: 'Quote Highlight', desc: 'Bio met inspirerend citaat aan de zijkant' },
  { component: <V8 />, name: 'Minimal Bio', desc: 'Minimalistisch gecentreerd portret met roterende border' },
  { component: <V9 />, name: 'Mission Vision Values', desc: 'Drie kolommen met missie, visie en waarden' },
  { component: <V10 />, name: 'Video Placeholder', desc: 'Video preview met play-knop en werkwijze lijst' },
];

export default function AboutVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">About <span className="text-accent">Varianten</span></h1>
        <p className="text-gray-400 mt-2">10 unieke over-ons secties om uit te kiezen</p>
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
