import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

export const BrandIntroduction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={sectionRef}
      id="philosophy-section"
      className="py-28 md:py-40 bg-[#101110] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
              className="flex items-center space-x-3 mb-6"
            >
              <span className="w-6 h-[1px] bg-[#B6A58A]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#B6A58A]">
                OUR PHILOSOPHY
              </span>
            </motion.div>

            {/* Editorial Heading - Clipped Reveals */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#F4F0E8] leading-[1.1] mb-8">
              <div className="overflow-hidden pb-1">
                <motion.div
                  initial={shouldReduceMotion ? false : { y: '105%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.15, ease: LUXURY_EASE }}
                >
                  Designed to be worn.
                </motion.div>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.div
                  initial={shouldReduceMotion ? false : { y: '105%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.3, ease: LUXURY_EASE }}
                  className="italic font-normal text-[#B6A58A]"
                >
                  Made to be remembered.
                </motion.div>
              </div>
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-6 text-[#B8B5AC] font-light leading-relaxed text-base md:text-lg max-w-xl">
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.45, ease: LUXURY_EASE }}
              >
                We believe great style begins with thoughtful design. Clean silhouettes, considered details, and versatile pieces come together to create a wardrobe that feels unmistakably your own.
              </motion.p>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.58, ease: LUXURY_EASE }}
                className="text-sm text-[#85847C] leading-normal font-sans tracking-wide"
              >
                VELORA exists as a measured counterweight to excessive trends. We craft contemporary pieces with deliberate proportions, tactile textures, and quiet longevity.
              </motion.p>
            </div>

            {/* Signature Quote Line */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.72, ease: LUXURY_EASE }}
              className="mt-12 pt-8 border-t border-[#34342F] flex items-center justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#F4F0E8]">MINDED IN PARIS & MILAN</p>
                <p className="text-[11px] text-[#85847C] tracking-widest mt-1">SARTORIAL EXPERTISE / 2026</p>
              </div>
              <span className="font-serif italic text-2xl text-[#B6A58A]">"Less, but better."</span>
            </motion.div>
          </div>

          {/* Right Asymmetrical Visual Composition */}
          <div ref={imageContainerRef} className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-[#34342F]/60 bg-[#191A17]">
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxY }}
                className="w-full h-[115%] -top-[7%] relative"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85"
                  alt="VELORA Atelier and Fabric Curation"
                  initial={shouldReduceMotion ? false : { scale: 1.15, opacity: 0.6 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.4, ease: LUXURY_EASE }}
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
            
            {/* Layered Accent Box */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30, x: -10 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.6, ease: LUXURY_EASE }}
              className="absolute -bottom-8 -left-6 sm:-left-10 bg-[#191A17] border border-[#34342F] p-6 max-w-xs shadow-2xl hidden sm:block"
            >
              <p className="text-[10px] tracking-widest uppercase text-[#B6A58A] mb-1 font-mono">
                MATERIAL INTEGRITY
              </p>
              <p className="text-xs text-[#F4F0E8] font-light leading-relaxed">
                Organic Aegean cottons, French flax linen, and regenerative Italian wools.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
