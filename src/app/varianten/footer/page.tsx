'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowUp, FaHeart, FaCamera } from 'react-icons/fa';

const links = ['Home', 'Portfolio', 'Blog', 'FAQ', 'Contact'];
const services = ['Zakelijk', 'Portretten', 'Evenementen', 'Productfoto', 'Familie'];
const contact = { phone: '+32 474 11 48 99', email: 'info@tigranmedia.be', address: 'België' };

/* ═══════ V1: Classic 4 Column ═══════ */
function V1() {
  return (
    <footer className="bg-surface pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12 mb-12">
        <div><h3 className="font-heading text-xl text-white mb-4">Tigran<span className="text-accent">Media</span></h3><p className="text-gray-500 text-sm">Professionele fotografie in België sinds 2018.</p></div>
        <div><h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Navigatie</h4><ul className="space-y-2">{links.map(l => <li key={l}><a className="text-gray-400 hover:text-accent text-sm transition">{l}</a></li>)}</ul></div>
        <div><h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Diensten</h4><ul className="space-y-2">{services.map(s => <li key={s}><a className="text-gray-400 hover:text-accent text-sm transition">{s}</a></li>)}</ul></div>
        <div><h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Contact</h4><ul className="space-y-2"><li className="text-gray-400 text-sm flex items-center gap-2"><FaPhone className="text-accent" />{contact.phone}</li><li className="text-gray-400 text-sm flex items-center gap-2"><FaEnvelope className="text-accent" />{contact.email}</li></ul></div>
      </div>
      <div className="max-w-7xl mx-auto px-8 border-t border-white/5 pt-6 flex justify-between items-center"><p className="text-gray-600 text-xs">© 2024 Tigran Media</p><div className="flex gap-4"><FaInstagram className="text-gray-500 hover:text-accent cursor-pointer transition" /><FaFacebook className="text-gray-500 hover:text-accent cursor-pointer transition" /></div></div>
    </footer>
  );
}

/* ═══════ V2: Minimal Centered ═══════ */
function V2() {
  return (
    <footer className="bg-primary py-12 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h3 className="font-heading text-2xl text-white mb-4">Tigran<span className="text-accent">Media</span></h3>
        <div className="flex justify-center gap-6 mb-6">{links.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">{l}</a>)}</div>
        <div className="flex justify-center gap-4 mb-6"><FaInstagram className="text-gray-500 hover:text-accent cursor-pointer text-xl transition" /><FaFacebook className="text-gray-500 hover:text-accent cursor-pointer text-xl transition" /></div>
        <p className="text-gray-600 text-xs">© 2024 Tigran Media. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}

/* ═══════ V3: CTA Footer ═══════ */
function V3() {
  return (
    <footer className="bg-surface">
      <div className="bg-accent py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="font-heading text-3xl text-primary mb-4">Klaar voor prachtige foto&apos;s?</h3>
          <button className="bg-primary text-white px-8 py-3 font-semibold">Neem Contact Op</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© 2024 Tigran Media</p>
        <div className="flex gap-6">{links.map(l => <a key={l} className="text-gray-400 hover:text-white text-sm transition cursor-pointer">{l}</a>)}</div>
        <div className="flex gap-3"><FaInstagram className="text-gray-500 hover:text-accent cursor-pointer transition" /><FaFacebook className="text-gray-500 hover:text-accent cursor-pointer transition" /></div>
      </div>
    </footer>
  );
}

/* ═══════ V4: Dark Gradient ═══════ */
function V4() {
  return (
    <footer className="bg-gradient-to-b from-primary to-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div><h3 className="font-heading text-3xl text-white">Tigran<span className="text-accent">.</span></h3><p className="text-gray-500 text-sm mt-4">{contact.email}</p><p className="text-gray-500 text-sm">{contact.phone}</p></div>
          <div className="md:text-center"><h4 className="text-white font-semibold mb-4">Pagina&apos;s</h4><div className="flex flex-col md:flex-row md:justify-center gap-3">{links.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">{l}</a>)}</div></div>
          <div className="md:text-right"><h4 className="text-white font-semibold mb-4">Social</h4><div className="flex md:justify-end gap-4"><FaInstagram className="text-gray-400 hover:text-accent cursor-pointer text-xl transition" /><FaFacebook className="text-gray-400 hover:text-accent cursor-pointer text-xl transition" /></div></div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center"><p className="text-gray-600 text-xs">Made with <FaHeart className="inline text-accent text-xs" /> by Tigran Media</p></div>
      </div>
    </footer>
  );
}

/* ═══════ V5: Split Dark ═══════ */
function V5() {
  return (
    <footer className="grid md:grid-cols-2">
      <div className="bg-surface p-12"><h3 className="font-heading text-3xl text-white mb-4">Tigran Media</h3><p className="text-gray-400 text-sm mb-6">Professionele fotografie voor al je bijzondere momenten.</p><div className="flex gap-3"><FaInstagram className="text-gray-400 hover:text-accent cursor-pointer text-xl transition" /><FaFacebook className="text-gray-400 hover:text-accent cursor-pointer text-xl transition" /></div></div>
      <div className="bg-primary p-12 grid grid-cols-2 gap-8">
        <div><h4 className="text-accent text-sm uppercase tracking-widest mb-4">Links</h4><ul className="space-y-2">{links.map(l => <li key={l}><a className="text-gray-400 hover:text-white text-sm transition cursor-pointer">{l}</a></li>)}</ul></div>
        <div><h4 className="text-accent text-sm uppercase tracking-widest mb-4">Contact</h4><p className="text-gray-400 text-sm mb-2">{contact.email}</p><p className="text-gray-400 text-sm">{contact.phone}</p></div>
      </div>
    </footer>
  );
}

/* ═══════ V6: Logo Large ═══════ */
function V6() {
  return (
    <footer className="bg-primary py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h3 className="font-heading text-6xl text-white mb-2">T<span className="text-accent">.</span>M</h3>
        <p className="text-accent text-sm uppercase tracking-[0.5em] mb-8">Photography</p>
        <div className="flex justify-center gap-8 mb-8">{links.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer uppercase tracking-widest">{l}</a>)}</div>
        <div className="w-16 h-[1px] bg-accent mx-auto mb-6" />
        <p className="text-gray-600 text-xs">© 2024 Tigran Media — {contact.email}</p>
      </div>
    </footer>
  );
}

/* ═══════ V7: Newsletter Footer ═══════ */
function V7() {
  return (
    <footer className="bg-surface pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-8 mb-12 text-center">
          <h3 className="text-white font-heading text-xl mb-2">Schrijf je in voor updates</h3>
          <p className="text-gray-400 text-sm mb-4">Ontvang tips en achter-de-schermen content.</p>
          <div className="flex gap-2 max-w-md mx-auto"><input placeholder="je@email.be" className="flex-1 bg-primary border border-white/10 rounded px-4 py-2 text-white text-sm placeholder:text-gray-600 outline-none focus:border-accent" /><button className="bg-accent text-primary px-6 py-2 font-semibold text-sm rounded">Aanmelden</button></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2024 Tigran Media</p>
          <div className="flex gap-6">{links.map(l => <a key={l} className="text-gray-500 hover:text-accent text-xs transition cursor-pointer">{l}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════ V8: Compact Bar ═══════ */
function V8() {
  return (
    <footer className="bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <span className="text-white font-heading text-lg">Tigran<span className="text-accent">Media</span></span>
        <div className="flex gap-6">{links.slice(0, 4).map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer hidden md:inline">{l}</a>)}</div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm hidden md:inline">{contact.email}</span>
          <FaInstagram className="text-gray-500 hover:text-accent cursor-pointer transition" />
        </div>
      </div>
    </footer>
  );
}

/* ═══════ V9: Map Style ═══════ */
function V9() {
  return (
    <footer className="bg-surface">
      <div className="h-48 bg-primary/50 flex items-center justify-center"><FaMapMarkerAlt className="text-accent text-3xl mr-3" /><span className="text-gray-500">Google Maps Placeholder — België</span></div>
      <div className="max-w-7xl mx-auto px-8 py-8 grid md:grid-cols-3 gap-8">
        <div><h3 className="font-heading text-xl text-white mb-2">Tigran Media</h3><p className="text-gray-500 text-sm">Professionele fotografie</p></div>
        <div className="text-center"><div className="flex justify-center gap-6">{links.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">{l}</a>)}</div></div>
        <div className="md:text-right"><p className="text-gray-400 text-sm">{contact.email}</p><p className="text-gray-400 text-sm">{contact.phone}</p></div>
      </div>
    </footer>
  );
}

/* ═══════ V10: Animated Reveal ═══════ */
function V10() {
  return (
    <footer className="bg-primary py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <FaCamera className="text-accent text-3xl mx-auto mb-4" />
          <h3 className="font-heading text-2xl text-white">Tigran Media</h3>
          <p className="text-gray-500 text-sm mt-1">Fotografie met Passie</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-center gap-6 mb-6">
          {links.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">{l}</a>)}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center gap-4 mb-8">
          <FaInstagram className="text-gray-500 hover:text-accent cursor-pointer text-xl transition" />
          <FaFacebook className="text-gray-500 hover:text-accent cursor-pointer text-xl transition" />
        </motion.div>
        <div className="text-center border-t border-white/5 pt-6">
          <p className="text-gray-600 text-xs">© 2024 Tigran Media — Alle rechten voorbehouden</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════ Page ═══════ */
const variants = [
  { component: <V1 />, name: 'Classic 4 Column', desc: 'Vier kolommen met brand, navigatie, diensten en contact' },
  { component: <V2 />, name: 'Minimal Centered', desc: 'Alles gecentreerd in een minimalistische stijl' },
  { component: <V3 />, name: 'CTA Footer', desc: 'Met prominente call-to-action balk bovenaan' },
  { component: <V4 />, name: 'Dark Gradient', desc: 'Gradient van donker naar zwart met 3 kolommen' },
  { component: <V5 />, name: 'Split Dark', desc: 'Twee helften met verschillende achtergrondkleuren' },
  { component: <V6 />, name: 'Logo Large', desc: 'Groot logo centraal met horizontale navigatie' },
  { component: <V7 />, name: 'Newsletter', desc: 'Nieuwsbrief aanmeldblok boven de footer' },
  { component: <V8 />, name: 'Compact Bar', desc: 'Compacte enkele regel footer balk' },
  { component: <V9 />, name: 'Map Style', desc: 'Kaart placeholder bovenaan de footer' },
  { component: <V10 />, name: 'Animated Reveal', desc: 'Scroll-animatie met gestaffeld verschijnen' },
];

export default function FooterVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">Footer <span className="text-accent">Varianten</span></h1>
        <p className="text-gray-400 mt-2">10 unieke footer stijlen om uit te kiezen</p>
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
