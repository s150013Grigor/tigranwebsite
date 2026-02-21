'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiChevronDown } from 'react-icons/hi';

interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItemData[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  faqs,
  title = 'Veelgestelde Vragen',
  subtitle = 'FAQ',
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 3xl:py-28 4xl:py-36 bg-primary">
      <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl 5xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 4xl:px-16">
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

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-white/5 hover:border-white/10 transition-colors"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 3xl:p-8 4xl:p-10 text-left"
              >
                <span className="text-white font-body text-sm md:text-base 3xl:text-lg 4xl:text-xl pr-4">
                  {faq.question}
                </span>
                <HiChevronDown
                  className={`w-5 h-5 text-accent transition-transform duration-300 flex-shrink-0 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openId === faq.id ? 'auto' : 0,
                  opacity: openId === faq.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 3xl:px-8 4xl:px-10 pb-6 text-gray-400 text-sm 3xl:text-base 4xl:text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
