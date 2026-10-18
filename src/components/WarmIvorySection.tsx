import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

export const WarmIvorySection: React.FC<{ onShopClick: () => void }> = ({ onShopClick }) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-[#F5F2EB] text-[#101110] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: LUXURY_EASE }}
            className="lg:col-span-4"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#85847C] block mb-3 font-mono">
              SUSTAINED TAILORING
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-6">
              "We believe clothing should quiet the world, not compete with it."
            </h3>
            <p className="text-sm text-[#474740] font-light leading-relaxed mb-8">
              Constructed in limited single-batch runs. Every stitch, bind, and lining is inspected to provide decades of daily ritual.
            </p>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={onShopClick}
              className="px-8 py-3.5 bg-[#101110] text-[#F4F0E8] text-xs font-sans tracking-[0.25em] uppercase hover:bg-[#34342F] transition-colors duration-300 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-[#101110]"
            >
              SHOP THE ARCHIVE
            </motion.button>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Image 1 */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.2, ease: LUXURY_EASE }}
              className="aspect-[4/5] bg-stone-200 overflow-hidden shadow-lg border border-stone-300/50"
            >
              <img
                src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
                alt="Tactile tailoring"
                className="w-full h-full object-cover filter contrast-[1.05] hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>

            {/* Image 2 - Offset */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.35, ease: LUXURY_EASE }}
              className="aspect-[4/5] bg-stone-200 overflow-hidden shadow-lg border border-stone-300/50 sm:translate-y-8"
            >
              <img
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80"
                alt="Tactile wool drape"
                className="w-full h-full object-cover filter contrast-[1.05] hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
