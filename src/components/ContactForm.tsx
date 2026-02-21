'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  showInfo?: boolean;
  apiEndpoint?: string;
}

export default function ContactForm({
  title = 'Neem Contact Op',
  subtitle = 'Laten we samenwerken',
  showInfo = true,
  apiEndpoint,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (apiEndpoint) {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to send');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={ref} className="py-20 3xl:py-28 4xl:py-36 bg-primary">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="text-center mb-16 4xl:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm 3xl:text-base 4xl:text-lg tracking-[0.3em] uppercase mb-4 font-body"
          >
            {subtitle}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl font-heading font-bold text-white"
          >
            {title}
          </motion.h2>
        </div>

        <div className={`grid ${showInfo ? 'grid-cols-1 lg:grid-cols-5 gap-12' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
          {/* Contact Info */}
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="text-white font-heading text-xl mb-6">
                  Contactgegevens
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:info@tigranmedia.be"
                    className="flex items-start text-gray-300 hover:text-accent transition-colors group"
                  >
                    <HiMail className="w-5 h-5 mr-4 mt-0.5 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-white">E-mail</p>
                      <p className="text-sm">info@tigranmedia.be</p>
                    </div>
                  </a>
                  <a
                    href="tel:+32474114899"
                    className="flex items-start text-gray-300 hover:text-accent transition-colors group"
                  >
                    <HiPhone className="w-5 h-5 mr-4 mt-0.5 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-white">Telefoon</p>
                      <p className="text-sm">+32 474 11 48 99</p>
                    </div>
                  </a>
                  <div className="flex items-start text-gray-300">
                    <HiLocationMarker className="w-5 h-5 mr-4 mt-0.5 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-white">Locatie</p>
                      <p className="text-sm">Vlaanderen, België</p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-300">
                    <HiClock className="w-5 h-5 mr-4 mt-0.5 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-white">Beschikbaarheid</p>
                      <p className="text-sm">Ma-Vr: 9:00 - 18:00</p>
                      <p className="text-sm">Za: 10:00 - 16:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-surface border border-white/5">
                <h4 className="text-white font-heading text-lg mb-3">Snelle Reactie</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ik reageer meestal binnen 24 uur op uw bericht. Voor dringende
                  vragen kunt u mij ook telefonisch bereiken.
                </p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={showInfo ? 'lg:col-span-3' : ''}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 3xl:px-5 3xl:py-4 4xl:px-6 4xl:py-5 bg-surface border border-white/10 text-white text-sm 3xl:text-base 4xl:text-lg focus:border-accent focus:outline-none transition-colors"
                    placeholder="Uw naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm 3xl:text-base 4xl:text-lg text-gray-400 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-white/10 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                    placeholder="uw@email.be"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-white/10 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                    placeholder="+32 ..."
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm text-gray-400 mb-2">
                    Type Fotoshoot
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-white/10 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">Selecteer een type</option>
                    <option value="zakelijk">Zakelijke Fotografie</option>
                    <option value="portret">Portretfotografie</option>
                    <option value="evenement">Evenementfotografie</option>
                    <option value="product">Productfotografie</option>
                    <option value="familie">Familiefotografie</option>
                    <option value="natuur">Natuurfotografie</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                  Bericht *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-white/10 text-white text-sm focus:border-accent focus:outline-none transition-colors resize-none"
                  placeholder="Vertel ons over uw project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 bg-accent text-primary font-body text-sm 3xl:text-base 4xl:text-lg uppercase tracking-wider hover:bg-accent-light transition-all duration-300 disabled:opacity-50"
              >
                {status === 'sending' ? 'Verzenden...' : 'Verstuur Bericht'}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-sm text-center">
                  Bedankt! Uw bericht is succesvol verzonden. We nemen snel contact met u op.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Er ging iets mis. Probeer het opnieuw of stuur een e-mail naar info@tigranmedia.be.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
