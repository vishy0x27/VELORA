import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { LUXURY_EASE } from '../utils/motion';

interface HeaderProps {
  onSelectCategory: (category: string) => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectCategory,
  onOpenSearch,
  onOpenAccount,
}) => {
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'NEW ARRIVALS', filter: 'NEW ARRIVALS' },
    { label: 'MEN', filter: 'MEN' },
    { label: 'WOMEN', filter: 'WOMEN' },
    { label: 'COLLECTIONS', filter: 'ALL' },
  ];

  const handleNavClick = (filter: string) => {
    onSelectCategory(filter);
    setMobileMenuOpen(false);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-out ${
          isScrolled
            ? 'bg-[#101110]/92 backdrop-blur-md border-b border-[#34342F]/80 py-3.5 shadow-2xl shadow-black/40'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Brand Wordmark */}
          <a
            href="#"
            className="group flex flex-col items-start transition-opacity hover:opacity-85 focus:outline-none focus:ring-1 focus:ring-[#B6A58A] p-0.5 rounded-sm"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-[0.22em] font-normal uppercase text-[#F4F0E8] transition-colors duration-300 group-hover:text-[#F4F0E8]">
              VELORA
            </span>
            <span className="text-[9px] tracking-widest text-[#B6A58A] uppercase -mt-1 hidden sm:block opacity-90 transition-opacity duration-300 group-hover:opacity-100">
              Less, But Better
            </span>
          </a>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.08, ease: LUXURY_EASE }}
                onClick={() => handleNavClick(link.filter)}
                className="text-[11px] font-sans tracking-[0.24em] text-[#B8B5AC] hover:text-[#F4F0E8] uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B6A58A] hover:after:w-full after:transition-all after:duration-400 after:ease-out cursor-pointer focus:outline-none focus:text-[#F4F0E8]"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-6">
            <motion.button
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={onOpenSearch}
              className="text-[#B8B5AC] hover:text-[#F4F0E8] transition-colors p-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] rounded"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5 stroke-[1.5] transition-transform duration-300 hover:scale-105" />
            </motion.button>

            <motion.button
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              onClick={onOpenAccount}
              className="hidden sm:block text-[11px] tracking-[0.2em] uppercase text-[#B8B5AC] hover:text-[#F4F0E8] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] px-1 py-0.5 rounded"
            >
              ACCOUNT
            </motion.button>

            <motion.button
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 text-[#B8B5AC] hover:text-[#F4F0E8] transition-colors flex items-center cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] rounded"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5] transition-transform duration-300 hover:scale-105" />
              {totalCount > 0 && (
                <motion.span
                  key={totalCount}
                  initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1.5 -right-2 bg-[#B6A58A] text-[#101110] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md shadow-[#B6A58A]/30"
                >
                  {totalCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[#F4F0E8] p-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] rounded"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            className="fixed inset-0 z-50 bg-[#101110] flex flex-col justify-between p-8 md:hidden"
          >
            <div className="flex items-center justify-between border-b border-[#34342F] pb-6">
              <span className="font-serif text-2xl tracking-[0.2em] text-[#F4F0E8]">
                VELORA
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#B8B5AC] hover:text-[#F4F0E8] p-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-6 my-auto">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.5, ease: LUXURY_EASE }}
                  onClick={() => handleNavClick(link.filter)}
                  className="text-left font-serif text-3xl tracking-wider text-[#F4F0E8] hover:text-[#B6A58A] transition-colors flex items-center justify-between group cursor-pointer focus:outline-none"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-5 h-5 text-[#85847C] group-hover:text-[#B6A58A] group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>

            <div className="pt-8 border-t border-[#34342F] flex flex-col space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="text-left text-xs tracking-widest text-[#B8B5AC] uppercase cursor-pointer"
              >
                Client Concierge / Account
              </button>
              <p className="text-[11px] text-[#85847C] tracking-widest uppercase">
                Contemporary Luxury Essentials — 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
