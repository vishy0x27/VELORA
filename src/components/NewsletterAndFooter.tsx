import React, { useState, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface NewsletterAndFooterProps {
  onSelectCategory: (cat: string) => void;
}

export const NewsletterAndFooter: React.FC<NewsletterAndFooterProps> = ({ onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const newsletterRef = useRef<HTMLElement>(null);
  const isInView = useInView(newsletterRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  const scrollToShop = (cat: string) => {
    onSelectCategory(cat);
    const shop = document.getElementById('shop-section');
    if (shop) shop.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Newsletter Section */}
      <section ref={newsletterRef} className="py-24 bg-[#141513] border-t border-[#34342F] overflow-hidden">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: LUXURY_EASE }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#B6A58A] block mb-3 font-mono">
            THE PRIVATE DISPATCH
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#F4F0E8] font-normal mb-4">
            Be first to know.
          </h2>
          <p className="text-sm text-[#B8B5AC] font-light max-w-md mx-auto mb-8 leading-relaxed">
            New collections, considered edits, and stories from VELORA.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus('idle');
              }}
              className="flex-1 bg-[#101110] border border-[#34342F] px-4 py-3 text-xs text-[#F4F0E8] placeholder-[#85847C] focus:outline-none focus:border-[#B6A58A] transition-colors"
            />
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              type="submit"
              className="px-7 py-3 bg-[#F4F0E8] text-[#101110] text-xs font-sans tracking-[0.25em] uppercase font-medium hover:bg-[#B6A58A] transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B6A58A]"
            >
              {status === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>JOINED</span>
                </>
              ) : (
                <>
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </form>

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-rose-400 mt-3 font-mono"
            >
              Please provide a valid email address.
            </motion.p>
          )}

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-[#B6A58A] mt-3 font-mono"
            >
              You are now subscribed to the VELORA dispatch list (Demo state).
            </motion.p>
          )}

          <p className="text-[10px] text-[#85847C] uppercase tracking-widest mt-4">
            Demo subscription — No marketing emails are transmitted.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#101110] border-t border-[#34342F] pt-20 pb-12 text-[#B8B5AC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#34342F]">
            
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <span className="font-serif text-3xl tracking-[0.22em] text-[#F4F0E8] uppercase block mb-3">
                VELORA
              </span>
              <p className="font-serif italic text-base text-[#B6A58A] mb-4">
                "Less, but better."
              </p>
              <p className="text-xs text-[#85847C] font-light max-w-sm leading-relaxed">
                Contemporary luxury clothing for people who appreciate minimalism, quality, confidence, and timeless style.
              </p>
            </div>

            {/* Shop Links */}
            <div>
              <h5 className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#F4F0E8] mb-5">
                SHOP
              </h5>
              <ul className="space-y-3 text-xs font-light">
                <li>
                  <button onClick={() => scrollToShop('NEW ARRIVALS')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToShop('MEN')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                    Men
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToShop('WOMEN')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                    Women
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToShop('ALL')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                    All Collections
                  </button>
                </li>
              </ul>
            </div>

            {/* Information Links */}
            <div>
              <h5 className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#F4F0E8] mb-5">
                INFORMATION
              </h5>
              <ul className="space-y-3 text-xs font-light">
                <li><a href="#philosophy-section" className="hover:text-[#F4F0E8] transition-colors">About Us</a></li>
                <li><a href="#shop-section" className="hover:text-[#F4F0E8] transition-colors">Contact Client Care</a></li>
                <li><a href="#shop-section" className="hover:text-[#F4F0E8] transition-colors">Shipping Information</a></li>
                <li><a href="#shop-section" className="hover:text-[#F4F0E8] transition-colors">Complimentary Returns</a></li>
              </ul>
            </div>

            {/* Social & Legal */}
            <div>
              <h5 className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#F4F0E8] mb-5">
                EDITORIAL & SOCIAL
              </h5>
              <ul className="space-y-3 text-xs font-light">
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F4F0E8] transition-colors">Instagram</a></li>
                <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#F4F0E8] transition-colors">Pinterest</a></li>
                <li><span className="text-[#85847C]">Privacy Policy</span></li>
                <li><span className="text-[#85847C]">Terms and Conditions</span></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#85847C]">
            <p>© 2026 VELORA. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 font-mono tracking-widest uppercase">
              Contemporary Luxury Experience
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};
