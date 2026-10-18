import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

export const BrandStatistics: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    {
      num: '08',
      title: 'CURATED ESSENTIAL STYLES',
      subtitle: 'Zero excess. Every item intentional.',
    },
    {
      num: '04',
      title: 'CORE COLOUR PALETTES',
      subtitle: 'Obsidian, Ivory, Charcoal & Oatmeal.',
    },
    {
      num: '01',
      title: 'DISTINCT POINT OF VIEW',
      subtitle: 'Understated elegance for modern life.',
    },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-[#191A17] border-y border-[#34342F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#34342F]">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.num}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: LUXURY_EASE }}
              className={`flex flex-col ${idx !== 0 ? 'md:pl-10 pt-8 md:pt-0' : ''}`}
            >
              <span className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light text-[#B6A58A] leading-none mb-3">
                {stat.num}
              </span>
              <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#F4F0E8] font-medium mb-1">
                {stat.title}
              </h4>
              <p className="text-xs text-[#85847C] font-light tracking-wide">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
