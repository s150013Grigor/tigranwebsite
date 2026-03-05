'use client';

import { motion } from 'framer-motion';

interface AvailabilityBadgeProps {
  available?: boolean;
  /** TODO: Tigran — vul hier de juiste beschikbaarheidstekst in, bijv. "Beschikbaar vanaf juni" of "2 plekken vrij" */
  message?: string;
}

export default function AvailabilityBadge({
  available = true,
  message = '2 plekken vrij',
}: AvailabilityBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5 3xl:h-3 3xl:w-3">
        {available && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
            animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 3xl:h-3 3xl:w-3 ${
            available ? 'bg-green-400' : 'bg-red-400'
          }`}
        />
      </span>
      <span className="text-[0.65rem] 3xl:text-xs 4xl:text-sm text-gray-400 font-body tracking-wide whitespace-nowrap">
        {/* TODO: Tigran — pas de beschikbaarheidstekst aan */}
        {message}
      </span>
    </div>
  );
}
