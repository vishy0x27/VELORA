import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface CampaignSectionProps {
  onExploreStory: () => void;
}

export const CampaignSection: React.FC<CampaignSectionProps> = ({ onExploreStory }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section className="relative py-32 bg-[#101110] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Full-bleed Editorial Canvas with Parallax Mask */}
        <div
          ref={containerRef}
          className="relative min-h-[600px] w-full overflow-hidden border border-[#34342F] bg-[#191A17]"
        >
          {/* Parallax Image Layer */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: parallaxY }}
            className="absolute inset-0 w-full h-[125%] -top-[12%]"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2000&q=85"
              alt="The VELORA Campaign - High Fashion Minimalism"
              initial={shouldReduceMotion ? false : { scale: 1.12, opacity: 0.6 }}
              animate={isInView ? { scale: 1.02, opacity: 1 } : {}}
              transition={{ duration: 1.4, ease: LUXURY_EASE }}
              className="w-full h-full object-cover object-top filter brightness-[0.72] contrast-[1.05]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#101110]/92 via-[#101110]/45 to-transparent pointer-events-none" />

          {/* Overlay Typography with Staggered Clipped Reveals */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-2xl flex flex-col justify-end min-h-[600px]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
              className="flex items-center space-x-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-[#B6A58A]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#B6A58A]">
                THE VELORA CAMPAIGN
              </span>
            </motion.div>

            {/* Clipped Headline Lines */}
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#F4F0E8] leading-tight mb-6">
              <div className="overflow-hidden pb-1">
                <motion.div
                  initial={shouldReduceMotion ? false : { y: '105%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.18, ease: LUXURY_EASE }}
                >
                  An expression of
                </motion.div>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.div
                  initial={shouldReduceMotion ? false : { y: '105%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.35, ease: LUXURY_EASE }}
                  className="italic font-light text-[#B6A58A]"
                >
                  individuality.
                </motion.div>
              </div>
            </h2>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.52, ease: LUXURY_EASE }}
              className="text-sm sm:text-base text-[#B8B5AC] font-light leading-relaxed mb-8 max-w-lg"
            >
              Beyond trends and seasons, we create pieces that leave room for personal expression. Sculpted for effortless presence.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.68, ease: LUXURY_EASE }}
            >
              <button
                onClick={onExploreStory}
                className="px-8 py-3.5 bg-transparent border border-[#F4F0E8] text-[#F4F0E8] text-xs font-sans tracking-[0.25em] uppercase hover:bg-[#F4F0E8] hover:text-[#101110] transition-all duration-400 ease-out cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A]"
              >
                EXPLORE THE STORY
              </button>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
