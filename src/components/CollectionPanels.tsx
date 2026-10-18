import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface CollectionPanelsProps {
  onSelectCategory: (cat: string) => void;
}

export const CollectionPanels: React.FC<CollectionPanelsProps> = ({ onSelectCategory }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  const handlePanelClick = (category: string) => {
    onSelectCategory(category);
    const shop = document.getElementById('shop-section');
    if (shop) shop.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#101110]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Men's Panel */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
            onClick={() => handlePanelClick('MEN')}
            className="group relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-[#191A17] cursor-pointer border border-[#34342F] focus:outline-none focus:ring-1 focus:ring-[#B6A58A]"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handlePanelClick('MEN');
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
              alt="VELORA Men's Collection"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 group-hover:scale-106 group-hover:brightness-90 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101110] via-[#101110]/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B6A58A] mb-2 font-mono">
                COLLECTION — 01
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] font-normal mb-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                MEN
              </h3>
              <p className="text-sm text-[#B8B5AC] font-light mb-6 transition-colors duration-300 group-hover:text-[#F4F0E8]">
                "Everyday, redefined."
              </p>
              <div className="flex items-center space-x-3 text-xs tracking-[0.25em] uppercase text-[#F4F0E8] group-hover:text-[#B6A58A] transition-colors duration-300">
                <span>EXPLORE MENSWEAR</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" />
              </div>
            </div>
          </motion.div>

          {/* Women's Panel */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.16, ease: LUXURY_EASE }}
            onClick={() => handlePanelClick('WOMEN')}
            className="group relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-[#191A17] cursor-pointer border border-[#34342F] focus:outline-none focus:ring-1 focus:ring-[#B6A58A]"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handlePanelClick('WOMEN');
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
              alt="VELORA Women's Collection"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 group-hover:scale-106 group-hover:brightness-90 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101110] via-[#101110]/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B6A58A] mb-2 font-mono">
                COLLECTION — 02
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] font-normal mb-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                WOMEN
              </h3>
              <p className="text-sm text-[#B8B5AC] font-light mb-6 transition-colors duration-300 group-hover:text-[#F4F0E8]">
                "Form meets feeling."
              </p>
              <div className="flex items-center space-x-3 text-xs tracking-[0.25em] uppercase text-[#F4F0E8] group-hover:text-[#B6A58A] transition-colors duration-300">
                <span>EXPLORE WOMENSWEAR</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
