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

const SERVICE_OPTIONS = [
  { value: '', label: 'Selecteer een type' },
  { value: 'website', label: 'Website Fotografie' },
  { value: 'social-media', label: 'Social Media Content' },
  { value: 'branding', label: 'Branding & Rebranding' },
  { value: 'anders', label: 'Anders' },
];

export default function ContactForm({
  title = 'Plan een Kennismaking',
  subtitle = 'Laten we praten',
  showInfo = true,
  apiEndpoint,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    projectDescription: '',
    preferredDate: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (!apiEndpoint) throw new Error('No endpoint configured');

      // Build an enriched message that includes all new fields,
      // so the existing Lambda receives the full context
      const enrichedMessage = [
        formData.projectDescription
          ? `Projectbeschrijving:\n${formData.projectDescription}`
          : '',
        formData.preferredDate
          ? `Gewenste datum/periode: ${formData.preferredDate}`
          : '',
        formData.message ? `Aanvullend bericht:\n${formData.message}` : '',
      ]
        .filter(Boolean)
        .join('\n\n');

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: enrichedMessage || formData.message,
        }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        projectDescription: '',
        preferredDate: '',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 3xl:px-5 3xl:py-4 4xl:px-6 4xl:py-5 bg-surface border border-white/10 text-white text-sm 3xl:text-base 4xl:text-lg focus:border-accent focus:outline-none transition-colors';
  const labelClass = 'block text-sm 3xl:text-base 4xl:text-lg text-gray-400 mb-2';

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
              {/* Naam & E-mail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Uw naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="uw@email.be"
                  />
                </div>
              </div>

              {/* Telefoon & Type project */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+32 ..."
                  />
                </div>
                <div>
                  <label htmlFor="service" className={labelClass}>
                    Type project
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Projectbeschrijving */}
              <div>
                <label htmlFor="projectDescription" className={labelClass}>
                  Korte projectbeschrijving
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  rows={3}
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Beschrijf kort je project, doelen en wensen..."
                />
              </div>

              {/* Gewenste datum/periode */}
              <div>
                <label htmlFor="preferredDate" className={labelClass}>
                  Gewenste datum/periode
                </label>
                <input
                  type="text"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Bv. maart 2026, eerste week april, flexibel..."
                />
              </div>

              {/* Aanvullend bericht */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  Aanvullend bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Nog iets dat je wilt delen..."
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
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center"
                >
                  Bedankt! Je bericht is verzonden. Je ontvangt een bevestiging per e-mail.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  Er ging iets mis. Probeer het opnieuw of stuur een e-mail naar info@tigranmedia.be.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
