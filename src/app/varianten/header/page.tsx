'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaPhone, FaInstagram, FaSearch, FaChevronDown } from 'react-icons/fa';

const navLinks = ['Home', 'Portfolio', 'Blog', 'FAQ', 'Contact'];

/* ═══════ V1: Classic Fixed ═══════ */
function V1() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-primary/95 backdrop-blur border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <span className="font-heading text-xl text-white">Tigran<span className="text-accent">Media</span></span>
        <nav className="hidden md:flex gap-6">{navLinks.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">{l}</a>)}</nav>
        <button className="bg-accent text-primary px-4 py-2 text-sm font-semibold hidden md:block">Boek Nu</button>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden bg-surface">
            <div className="px-8 py-4 space-y-3">{navLinks.map(l => <a key={l} className="block text-gray-400 hover:text-accent transition cursor-pointer">{l}</a>)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════ V2: Transparent Overlay ═══════ */
function V2() {
  return (
    <header className="bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <span className="font-heading text-2xl text-white">T<span className="text-accent">.</span>M</span>
        <nav className="flex gap-8">{navLinks.map(l => <a key={l} className="text-white/70 hover:text-white text-sm uppercase tracking-widest transition cursor-pointer">{l}</a>)}</nav>
        <div className="flex items-center gap-4"><FaInstagram className="text-white/70 hover:text-accent transition cursor-pointer" /><FaPhone className="text-white/70 hover:text-accent transition cursor-pointer" /></div>
      </div>
    </header>
  );
}

/* ═══════ V3: Centered Logo ═══════ */
function V3() {
  return (
    <header className="bg-primary border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center py-4 border-b border-white/5">
          <span className="font-heading text-2xl text-white">Tigran<span className="text-accent">Media</span></span>
          <p className="text-gray-600 text-xs mt-0.5 tracking-widest uppercase">Photography Studio</p>
        </div>
        <nav className="flex justify-center gap-8 py-3">{navLinks.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">{l}</a>)}</nav>
      </div>
    </header>
  );
}

/* ═══════ V4: Side Logo ═══════ */
function V4() {
  return (
    <header className="bg-surface">
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="w-10 h-10 bg-accent rounded flex items-center justify-center text-primary font-bold font-heading">TM</div>
          <nav className="hidden md:flex gap-6">{navLinks.map(l => <a key={l} className="text-gray-400 hover:text-white text-sm transition cursor-pointer">{l}</a>)}</nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm hidden lg:block">{'+32 474 11 48 99'}</span>
          <button className="border border-accent text-accent px-4 py-1.5 text-sm hover:bg-accent hover:text-primary transition">Contact</button>
        </div>
      </div>
    </header>
  );
}

/* ═══════ V5: Top Bar + Nav ═══════ */
function V5() {
  return (
    <header>
      <div className="bg-accent">
        <div className="max-w-7xl mx-auto px-8 py-1.5 flex items-center justify-between text-primary text-xs">
          <span>📞 +32 474 11 48 99 — info@tigranmedia.be</span>
          <div className="flex gap-3"><FaInstagram className="cursor-pointer" /><span>NL</span></div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="font-heading text-xl text-white">Tigran<span className="text-accent">Media</span></span>
          <nav className="flex gap-6">{navLinks.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">{l}</a>)}</nav>
          <button className="bg-accent text-primary px-5 py-2 text-sm font-semibold">Offerte</button>
        </div>
      </div>
    </header>
  );
}

/* ═══════ V6: Minimal Underline ═══════ */
function V6() {
  return (
    <header className="bg-primary">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <span className="font-heading text-xl text-white tracking-widest">TIGRAN</span>
        <nav className="flex gap-8">{navLinks.map(l => <a key={l} className="text-gray-400 hover:text-white text-sm transition cursor-pointer relative group">{l}<span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] bg-accent transition-all" /></a>)}</nav>
        <FaSearch className="text-gray-400 hover:text-accent cursor-pointer transition" />
      </div>
    </header>
  );
}

/* ═══════ V7: Pill Navigation ═══════ */
function V7() {
  return (
    <header className="bg-primary py-4">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <span className="font-heading text-xl text-white">T<span className="text-accent">M</span></span>
        <nav className="bg-surface rounded-full px-2 py-1 flex gap-1">
          {navLinks.map((l, i) => (
            <a key={l} className={`px-4 py-2 rounded-full text-sm transition cursor-pointer ${i === 0 ? 'bg-accent text-primary font-semibold' : 'text-gray-400 hover:text-white'}`}>{l}</a>
          ))}
        </nav>
        <button className="text-accent text-sm font-semibold">Boek Nu →</button>
      </div>
    </header>
  );
}

/* ═══════ V8: Dropdown Ready ═══════ */
function V8() {
  const [dropOpen, setDropOpen] = useState(false);
  return (
    <header className="bg-primary/95 backdrop-blur border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <span className="font-heading text-xl text-white">Tigran<span className="text-accent">Media</span></span>
        <nav className="flex gap-6 items-center">
          <a className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">Home</a>
          <div className="relative">
            <button onClick={() => setDropOpen(!dropOpen)} className="text-gray-400 hover:text-accent text-sm transition flex items-center gap-1">Portfolio <FaChevronDown className={`text-xs transition-transform ${dropOpen ? 'rotate-180' : ''}`} /></button>
            <AnimatePresence>
              {dropOpen && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute top-full left-0 mt-2 bg-surface border border-white/10 rounded-lg py-2 min-w-[160px]">
                  {['Zakelijk', 'Portretten', 'Evenementen', 'Natuur'].map(s => <a key={s} className="block px-4 py-2 text-gray-400 hover:text-accent hover:bg-white/5 text-sm transition cursor-pointer">{s}</a>)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">Blog</a>
          <a className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">Contact</a>
        </nav>
        <button className="bg-accent text-primary px-4 py-2 text-sm font-semibold">Contact</button>
      </div>
    </header>
  );
}

/* ═══════ V9: Full Width Menu ═══════ */
function V9() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-primary relative z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <span className="font-heading text-xl text-white">Tigran<span className="text-accent">Media</span></span>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white flex items-center gap-2 text-sm">
          <span>{menuOpen ? 'Sluiten' : 'Menu'}</span>
          <div className="w-8 flex flex-col gap-1.5">
            <span className={`h-[2px] bg-accent transition-transform ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`h-[2px] bg-accent transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] bg-accent transition-transform ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-accent text-sm uppercase tracking-widest mb-4">Navigatie</h3>
                {navLinks.map(l => <a key={l} className="block text-white font-heading text-3xl hover:text-accent transition cursor-pointer mb-2">{l}</a>)}
              </div>
              <div>
                <h3 className="text-accent text-sm uppercase tracking-widest mb-4">Contact</h3>
                <p className="text-gray-400">info@tigranmedia.be</p>
                <p className="text-gray-400">+32 474 11 48 99</p>
              </div>
              <div>
                <h3 className="text-accent text-sm uppercase tracking-widest mb-4">Social</h3>
                <div className="flex gap-4"><FaInstagram className="text-gray-400 hover:text-accent text-2xl cursor-pointer transition" /></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════ V10: Sidebar Toggle ═══════ */
function V10() {
  const [sideOpen, setSideOpen] = useState(false);
  return (
    <>
      <header className="bg-primary border-b border-white/5 relative z-40">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="font-heading text-xl text-white">T<span className="text-accent">M</span></span>
          <nav className="hidden md:flex gap-6">{navLinks.map(l => <a key={l} className="text-gray-400 hover:text-accent text-sm transition cursor-pointer">{l}</a>)}</nav>
          <button onClick={() => setSideOpen(true)} className="md:hidden text-white"><FaBars /></button>
        </div>
      </header>
      <AnimatePresence>
        {sideOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSideOpen(false)} className="fixed inset-0 bg-black/60 z-50" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }} className="fixed right-0 top-0 bottom-0 w-72 bg-surface z-50 p-8">
              <button onClick={() => setSideOpen(false)} className="text-white mb-8"><FaTimes className="text-xl" /></button>
              <div className="space-y-4">{navLinks.map(l => <a key={l} className="block text-white font-heading text-2xl hover:text-accent transition cursor-pointer">{l}</a>)}</div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-gray-400 text-sm">info@tigranmedia.be</p>
                <p className="text-gray-400 text-sm">+32 474 11 48 99</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════ Page ═══════ */
const variants = [
  { component: <V1 />, name: 'Classic Fixed', desc: 'Standaard header met hamburger menu op mobiel' },
  { component: <V2 />, name: 'Transparent Overlay', desc: 'Transparante header over content heen' },
  { component: <V3 />, name: 'Centered Logo', desc: 'Logo gecentreerd boven de navigatie' },
  { component: <V4 />, name: 'Side Logo', desc: 'Vierkant logo-icoon met telefoonnummer' },
  { component: <V5 />, name: 'Top Bar + Nav', desc: 'Accent infobalk boven de navigatie' },
  { component: <V6 />, name: 'Minimal Underline', desc: 'Minimalistische stijl met hover-underline effect' },
  { component: <V7 />, name: 'Pill Navigation', desc: 'Ronde pill-stijl navigatieknoppen' },
  { component: <V8 />, name: 'Dropdown Ready', desc: 'Met uitklapbaar dropdown submenu' },
  { component: <V9 />, name: 'Full Width Menu', desc: 'Volledig breed overlay menu met drie kolommen' },
  { component: <V10 />, name: 'Sidebar Toggle', desc: 'Slide-in zijbalk menu van rechts' },
];

export default function HeaderVariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link href="/varianten" className="text-accent hover:underline text-sm">← Terug naar varianten</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-white mt-4">Header <span className="text-accent">Varianten</span></h1>
        <p className="text-gray-400 mt-2">10 unieke header/navigatie stijlen om uit te kiezen</p>
      </div>
      {variants.map((v, i) => (
        <div key={i} className="mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <span className="text-accent font-mono text-sm">Variant {i + 1}</span>
            <h2 className="font-heading text-2xl text-white">{v.name}</h2>
            <p className="text-gray-500 text-sm">{v.desc}</p>
          </div>
          <div className="border border-white/10 rounded-xl overflow-hidden mx-4 lg:mx-8">
            {v.component}
          </div>
        </div>
      ))}
    </main>
  );
}
