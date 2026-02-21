'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const components = [
  { name: 'Hero', slug: 'hero', description: 'Volledig scherm hero secties met verschillende stijlen en animaties', icon: '🎬' },
  { name: 'Gallery', slug: 'gallery', description: 'Foto galerij layouts met diverse grid patronen en hover effecten', icon: '🖼️' },
  { name: 'Testimonials', slug: 'testimonials', description: 'Klantbeoordelingen in verschillende presentatiestijlen', icon: '⭐' },
  { name: 'CTA', slug: 'cta', description: 'Call-to-action secties met diverse achtergronden en layouts', icon: '📣' },
  { name: 'About', slug: 'about', description: 'Over ons secties met verschillende indelingen en stijlen', icon: '👤' },
  { name: 'Contact', slug: 'contact', description: 'Contactformulieren in diverse layouts en designs', icon: '✉️' },
  { name: 'FAQ', slug: 'faq', description: 'Veelgestelde vragen in verschillende presentatievormen', icon: '❓' },
  { name: 'Blog Cards', slug: 'blog-cards', description: 'Blog kaarten met diverse layouts, hovers en animaties', icon: '📝' },
  { name: 'Footer', slug: 'footer', description: 'Footer secties met verschillende indelingen en stijlen', icon: '🔻' },
  { name: 'Header', slug: 'header', description: 'Navigatie headers met diverse menu stijlen en effecten', icon: '🔝' },
];

export default function VariantenPage() {
  return (
    <main className="min-h-screen bg-primary pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-6">
            Component <span className="text-accent">Varianten</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ontdek 10 unieke variaties van elk component. Kies de stijl die het beste
            bij jouw merk past en combineer ze voor een perfect resultaat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component, index) => (
            <motion.div
              key={component.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/varianten/${component.slug}`}>
                <div className="group bg-surface border border-white/10 rounded-xl p-8 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1">
                  <span className="text-4xl mb-4 block">{component.icon}</span>
                  <h2 className="font-heading text-2xl text-white mb-2 group-hover:text-accent transition-colors">
                    {component.name}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">{component.description}</p>
                  <div className="flex items-center text-accent text-sm font-medium">
                    10 varianten bekijken
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
