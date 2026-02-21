'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaFacebook } from 'react-icons/fa';

const info = { phone: '+32 474 11 48 99', email: 'info@tigranmedia.be', address: 'België', hours: 'Ma-Za: 09:00 - 18:00' };

function InputField({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder: string }) {
  return (
    <div>
      <label className="text-white text-sm block mb-1">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full bg-primary border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none transition" />
    </div>
  );
}

/* ═══════ V1: Classic Form ═══════ */
function V1() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-heading text-4xl text-white mb-4">Neem <span className="text-accent">Contact</span> Op</h2>
          <p className="text-gray-400 mb-8">We horen graag van je. Vul het formulier in en we nemen zo snel mogelijk contact met je op.</p>
          <div className="space-y-4">
            {[{ icon: <FaPhone />, text: info.phone }, { icon: <FaEnvelope />, text: info.email }, { icon: <FaMapMarkerAlt />, text: info.address }, { icon: <FaClock />, text: info.hours }].map((c, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-400"><span className="text-accent">{c.icon}</span>{c.text}</div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Naam" placeholder="Je naam" />
            <InputField label="Email" type="email" placeholder="je@email.be" />
          </div>
          <InputField label="Onderwerp" placeholder="Waar gaat het over?" />
          <div><label className="text-white text-sm block mb-1">Bericht</label><textarea placeholder="Je bericht..." rows={4} className="w-full bg-primary border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none transition resize-none" /></div>
          <button className="bg-accent text-primary px-8 py-3 font-semibold w-full">Verstuur</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V2: Card Form ═══════ */
function V2() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-primary p-10 rounded-2xl border border-white/10">
          <h2 className="font-heading text-3xl text-white text-center mb-2">Stuur een Bericht</h2>
          <p className="text-gray-500 text-center text-sm mb-8">We reageren binnen 24 uur</p>
          <div className="space-y-4">
            <InputField label="Volledige Naam" placeholder="Jan Janssens" />
            <InputField label="Email" type="email" placeholder="jan@voorbeeld.be" />
            <div><label className="text-white text-sm block mb-1">Bericht</label><textarea placeholder="Vertel ons over je project..." rows={4} className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none transition resize-none" /></div>
            <button className="bg-accent text-primary px-8 py-3 font-semibold w-full rounded">Versturen</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════ V3: Map + Form ═══════ */
function V3() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden">
        <div className="bg-surface/50 h-[500px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <FaMapMarkerAlt className="text-accent text-4xl mx-auto mb-4" />
            <p>Google Maps wordt hier geladen</p>
            <p className="text-sm text-gray-600 mt-2">België</p>
          </div>
        </div>
        <div className="bg-surface p-12 flex flex-col justify-center">
          <h2 className="font-heading text-3xl text-white mb-6">Bezoek Ons</h2>
          <div className="space-y-4">
            <InputField label="Naam" placeholder="Je naam" />
            <InputField label="Email" type="email" placeholder="je@email.be" />
            <InputField label="Telefoon" placeholder="+32..." />
            <button className="bg-accent text-primary px-6 py-3 font-semibold w-full">Afspraak Maken</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V4: Horizontal Info Bar ═══════ */
function V4() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-4 gap-6 mb-12">
          {[{ icon: <FaPhone className="text-2xl" />, label: 'Telefoon', value: info.phone }, { icon: <FaEnvelope className="text-2xl" />, label: 'Email', value: info.email }, { icon: <FaMapMarkerAlt className="text-2xl" />, label: 'Locatie', value: info.address }, { icon: <FaClock className="text-2xl" />, label: 'Openingstijden', value: info.hours }].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-surface p-6 rounded-xl text-center">
              <span className="text-accent block mb-3">{c.icon}</span>
              <p className="text-white text-sm font-semibold">{c.label}</p>
              <p className="text-gray-400 text-sm mt-1">{c.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Naam" placeholder="Je naam" />
            <InputField label="Email" type="email" placeholder="je@email.be" />
          </div>
          <div><label className="text-white text-sm block mb-1">Bericht</label><textarea placeholder="Je bericht..." rows={4} className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none transition resize-none" /></div>
          <button className="bg-accent text-primary px-8 py-3 font-semibold">Verstuur Bericht</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V5: Minimal Inline ═══════ */
function V5() {
  return (
    <section className="bg-primary py-20 border-y border-white/5">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <h2 className="font-heading text-5xl text-white mb-4">Laten We <span className="text-accent">Praten</span></h2>
        <p className="text-gray-400 mb-8">Stuur ons een bericht en we beantwoorden het binnen 24 uur.</p>
        <div className="flex gap-3 max-w-lg mx-auto">
          <input type="email" placeholder="Je emailadres" className="flex-1 bg-surface border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none" />
          <button className="bg-accent text-primary px-8 py-3 font-semibold rounded-full">Stuur</button>
        </div>
        <div className="flex justify-center gap-6 mt-8 text-gray-500 text-sm">
          <span className="flex items-center gap-2"><FaPhone className="text-accent" /> {info.phone}</span>
          <span className="flex items-center gap-2"><FaEnvelope className="text-accent" /> {info.email}</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V6: Service Select ═══════ */
function V6() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-3xl mx-auto px-8">
        <h2 className="font-heading text-4xl text-white text-center mb-8">Vraag een <span className="text-accent">Offerte</span> Aan</h2>
        <div className="bg-primary p-8 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Naam" placeholder="Je naam" />
            <InputField label="Email" type="email" placeholder="je@email.be" />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Type Fotografie</label>
            <select className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-white focus:border-accent outline-none">
              <option>Zakelijke Fotografie</option><option>Portretfotografie</option><option>Evenementfotografie</option><option>Productfotografie</option><option>Familiefotografie</option>
            </select>
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Voorkeursdatum</label>
            <input type="date" className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-white focus:border-accent outline-none" />
          </div>
          <div><label className="text-white text-sm block mb-1">Extra Details</label><textarea rows={3} placeholder="Vertel meer over je wensen..." className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none resize-none" /></div>
          <button className="bg-accent text-primary px-8 py-3 font-semibold w-full">Offerte Aanvragen</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V7: Social Focus ═══════ */
function V7() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="font-heading text-4xl text-white mb-4">Volg & <span className="text-accent">Contacteer</span> Ons</h2>
        <p className="text-gray-400 mb-10">Volg ons op social media of neem direct contact op.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[{ icon: <FaInstagram className="text-3xl" />, label: 'Instagram', handle: '@tigranmedia' }, { icon: <FaFacebook className="text-3xl" />, label: 'Facebook', handle: 'Tigran Media' }, { icon: <FaEnvelope className="text-3xl" />, label: 'Email', handle: info.email }, { icon: <FaPhone className="text-3xl" />, label: 'Telefoon', handle: info.phone }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="bg-surface p-6 rounded-xl hover:border-accent border border-transparent transition-colors cursor-pointer">
              <span className="text-accent block mb-3">{s.icon}</span>
              <p className="text-white text-sm font-semibold">{s.label}</p>
              <p className="text-gray-500 text-xs mt-1">{s.handle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ V8: Animated Steps ═══════ */
function V8() {
  const steps = ['Vul het formulier in', 'We nemen contact op', 'Plan je sessie', 'Geniet van je foto\'s'];
  return (
    <section className="bg-primary py-20">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex justify-between mb-16">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="text-center flex-1">
              <div className="w-10 h-10 bg-accent text-primary rounded-full flex items-center justify-center mx-auto mb-3 font-bold">{i + 1}</div>
              <p className="text-white text-sm">{s}</p>
              {i < steps.length - 1 && <div className="hidden md:block" />}
            </motion.div>
          ))}
        </div>
        <div className="max-w-xl mx-auto space-y-4">
          <InputField label="Naam" placeholder="Je naam" />
          <InputField label="Email" type="email" placeholder="je@email.be" />
          <InputField label="Telefoon" placeholder="+32..." />
          <button className="bg-accent text-primary px-8 py-3 font-semibold w-full">Start het Proces</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V9: Dark Elegant ═══════ */
function V9() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="border border-white/10 p-12 md:p-16">
          <div className="text-center mb-10">
            <span className="text-accent uppercase tracking-[0.3em] text-sm">Contact</span>
            <h2 className="font-heading text-4xl text-white mt-2">Schrijf Ons</h2>
          </div>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div><input placeholder="Naam" className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none transition" /></div>
              <div><input placeholder="Email" className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none transition" /></div>
            </div>
            <div><input placeholder="Onderwerp" className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none transition" /></div>
            <div><textarea placeholder="Je bericht..." rows={4} className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-gray-600 focus:border-accent outline-none transition resize-none" /></div>
            <div className="text-center">
              <button className="border border-accent text-accent px-12 py-3 hover:bg-accent hover:text-primary transition tracking-widest uppercase text-sm">Verstuur</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ V10: Chat Style ═══════ */
function V10() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-md mx-auto px-8">
        <div className="bg-surface rounded-2xl overflow-hidden">
          <div className="bg-accent px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-accent font-bold">TM</div>
            <div><p className="text-primary font-semibold text-sm">Tigran Media</p><p className="text-primary/60 text-xs">Online — antwoord binnen 1 uur</p></div>
          </div>
          <div className="p-6 space-y-3">
            <div className="bg-primary/50 px-4 py-3 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="text-white text-sm">Hallo! 👋 Hoe kunnen we je helpen?</p>
            </div>
            <div className="bg-primary/50 px-4 py-3 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="text-white text-sm">Stuur ons een bericht en we reageren zo snel mogelijk.</p>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-3">
            <input placeholder="Je naam" className="w-full bg-primary border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:border-accent outline-none" />
            <input placeholder="Je email" className="w-full bg-primary border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:border-accent outline-none" />
            <div className="flex gap-2">
              <input placeholder="Typ je bericht..." className="flex-1 bg-primary border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:border-accent outline-none" />
              <button className="bg-accent text-primary px-4 py-2.5 rounded-lg font-semibold text-sm">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ Page ═══════ */
const variants = [
  { component: <V1 />, name: 'Classic Form', desc: 'Contactinfo links, formulier rechts met twee kolommen' },
  { component: <V2 />, name: 'Card Form', desc: 'Gecentreerde kaart met formulier en afgeronde hoeken' },
  { component: <V3 />, name: 'Map + Form', desc: 'Kaart placeholder naast contactformulier' },
  { component: <V4 />, name: 'Info Bar + Form', desc: 'Vier info-kaarten boven het formulier' },
  { component: <V5 />, name: 'Minimal Inline', desc: 'Minimalistische inline email input met ronde knoppen' },
  { component: <V6 />, name: 'Service Select', desc: 'Offerte formulier met dienst-selectie en datumkiezer' },
  { component: <V7 />, name: 'Social Focus', desc: 'Focus op social media kanalen met contactkaarten' },
  { component: <V8 />, name: 'Steps Process', desc: 'Vier stappen visualisatie boven het formulier' },
  { component: <V9 />, name: 'Dark Elegant', desc: 'Elegante border-box met onderliggende input velden' },
  { component: <V10 />, name: 'Chat Style', desc: 'Chat-interface stijl met berichten en input veld' },
];

export default function ContactVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">Contact <span className="text-accent">Varianten</span></h1>
        <p className="text-gray-400 mt-2">10 unieke contactformulier secties om uit te kiezen</p>
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
