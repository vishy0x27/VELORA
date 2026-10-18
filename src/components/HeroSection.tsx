import React, { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface HeroSectionProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onStoryClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Subtle parallax on scroll: image moves down gently creating deep perspective
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 0.75]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#101110] flex items-end pb-16 pt-32 overflow-hidden"
    >
      {/* Background Image with Cinematic Zoom and Scroll-linked Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={shouldReduceMotion ? {} : { y: imageY }}
          className="w-full h-[120%] -top-[10%] relative"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
            alt="VELORA Contemporary Luxury Campaign"
            initial={shouldReduceMotion ? { scale: 1.05 } : { scale: 1.14 }}
            animate={{ scale: 1.04 }}
            transition={{
              duration: 10,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] will-change-transform"
          />
        </motion.div>

        {/* Subtle Vignette & Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101110] via-[#101110]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101110]/85 via-[#101110]/20 to-[#101110]/50" />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#101110] pointer-events-none"
        />
      </div>

      <motion.div
        style={shouldReduceMotion ? {} : { y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full"
      >
        {/* Seasonal Badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: LUXURY_EASE }}
          className="mb-6 flex items-center space-x-3"
        >
          <span className="w-8 h-[1px] bg-[#B6A58A]" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-sans text-[#B6A58A]">
            COLLECTION 01 — 2026
          </span>
        </motion.div>

        {/* Editorial Headline with Clipped Reveals */}
        <div className="max-w-4xl">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-[6.75rem] font-normal leading-[0.95] tracking-tight text-[#F4F0E8] mb-8 drop-shadow-md">
            {/* Line 1 */}
            <div className="overflow-hidden pb-1">
              <motion.div
                initial={shouldReduceMotion ? false : { y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.4, ease: LUXURY_EASE }}
              >
                STYLE THAT
              </motion.div>
            </div>
            {/* Line 2 */}
            <div className="overflow-hidden pb-2">
              <motion.div
                initial={shouldReduceMotion ? false : { y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.58, ease: LUXURY_EASE }}
                className="italic font-light text-[#B6A58A]"
              >
                SPEAKS QUIETLY.
              </motion.div>
            </div>
          </h1>

          {/* Supporting Text */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.8, ease: LUXURY_EASE }}
            className="text-sm sm:text-base md:text-lg text-[#B8B5AC] font-light max-w-xl leading-relaxed tracking-wide mb-10"
          >
            Considered essentials. Exceptional silhouettes. A different perspective on everyday dressing.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.98, ease: LUXURY_EASE }}
            className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={onExploreClick}
              className="group relative inline-flex items-center justify-center px-9 py-4 bg-[#F4F0E8] text-[#101110] font-sans text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#B6A58A] hover:text-[#101110] transition-colors duration-400 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B6A58A] focus:ring-offset-2 focus:ring-offset-[#101110]"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </motion.button>

            <button
              onClick={onStoryClick}
              className="inline-flex items-center justify-center text-xs tracking-[0.25em] uppercase text-[#F4F0E8] hover:text-[#B6A58A] transition-colors py-3 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] rounded"
            >
              <span>DISCOVER VELORA</span>
              <span className="ml-3 block w-6 h-[1px] bg-[#B6A58A] group-hover:w-11 transition-all duration-400 ease-out" />
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex items-center justify-between pt-8 border-t border-[#34342F]/60 text-[#85847C] text-[10px] tracking-[0.3em] uppercase"
        >
          <span>01 / 04 — EDITORIAL INTRO</span>
          <button
            onClick={onExploreClick}
            className="flex items-center space-x-2 text-[#B8B5AC] hover:text-[#F4F0E8] transition-colors cursor-pointer focus:outline-none focus:text-[#F4F0E8]"
          >
            <span>SCROLL</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
