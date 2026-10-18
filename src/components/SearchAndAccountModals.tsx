import React from 'react';
import { Product, formatINR } from '../data/products';
import { Search, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

export const SearchOverlay: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
}> = ({ isOpen, onClose, products, onSelectProduct }) => {
  const [query, setQuery] = React.useState('');
  const shouldReduceMotion = useReducedMotion();

  if (!isOpen) return null;

  const matches = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.colour.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#101110]/95 backdrop-blur-md"
      />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.45, ease: LUXURY_EASE }}
        className="relative z-10 p-6 sm:p-12 max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between border-b border-[#34342F] pb-4">
          <div className="flex items-center space-x-3 w-full">
            <Search className="w-6 h-6 text-[#B6A58A]" />
            <input
              type="text"
              autoFocus
              placeholder="SEARCH SILHOUETTES, COLOURWAYS, FABRICS..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-xl sm:text-2xl text-[#F4F0E8] placeholder-[#85847C] font-serif w-full focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="text-[#B8B5AC] hover:text-[#F4F0E8] p-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] rounded"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {query && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="mt-10"
          >
            <p className="text-xs uppercase tracking-widest text-[#85847C] mb-6">
              Found {matches.length} matching pieces
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {matches.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="flex space-x-3 cursor-pointer p-2 border border-transparent hover:border-[#34342F] transition-all bg-[#191A17]/60 group"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-20 object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div>
                    <h5 className="font-serif text-sm text-[#F4F0E8] group-hover:text-[#B6A58A] transition-colors">
                      {item.name}
                    </h5>
                    <p className="text-xs text-[#85847C]">{formatINR(item.price)}</p>
                    <span className="text-[10px] text-[#B6A58A] uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const AccountModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#101110]/85 backdrop-blur-sm"
      />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, ease: LUXURY_EASE }}
        className="relative z-10 bg-[#101110] border border-[#34342F] max-w-md w-full p-8 shadow-2xl shadow-black/80"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#85847C] hover:text-[#F4F0E8] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] p-1 rounded"
          aria-label="Close portal"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-[10px] font-mono tracking-widest text-[#B6A58A] uppercase block mb-2">
          CLIENT CONCIERGE
        </span>
        <h3 className="font-serif text-2xl text-[#F4F0E8] mb-4">VELORA Private Portal</h3>
        <p className="text-xs text-[#B8B5AC] font-light leading-relaxed mb-6">
          Access your curated sizing profile, previous order logs, and early access notifications.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Client Email"
            className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-3 text-[#F4F0E8] outline-none focus:border-[#B6A58A] transition-colors"
          />
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3 bg-[#F4F0E8] text-[#101110] text-xs font-sans tracking-widest uppercase font-medium hover:bg-[#B6A58A] transition-colors duration-300 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B6A58A]"
          >
            REQUEST ACCESS CODE
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
