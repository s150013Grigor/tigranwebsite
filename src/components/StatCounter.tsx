'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function StatCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  duration = 2,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const display = useTransform(rounded, (v) => `${prefix}${v}${suffix}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.25, 0.4, 0.25, 1],
      });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <motion.span
        className="block text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl 4xl:text-9xl font-heading font-bold text-accent leading-none mb-3"
      >
        {isInView ? (
          <motion.span>{display}</motion.span>
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </motion.span>
      <span className="text-gray-400 text-sm 3xl:text-base 4xl:text-lg font-body tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}
