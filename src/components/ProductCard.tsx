import React, { useState } from 'react';
import { Product, formatINR } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Eye, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails, index = 0 }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const size = selectedQuickSize || product.availableSizes[0];
    addToCart(product, size, 1);
    setFeedback(`Added Size ${size}`);
    setTimeout(() => setFeedback(null), 1800);
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.09, ease: LUXURY_EASE }}
      className="group relative flex flex-col bg-transparent cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(product)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#191A17] border border-[#34342F]/60 transition-colors duration-500 group-hover:border-[#B6A58A]/60">
        {/* Primary and Hover Image swap with smooth transform & crossfade */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100 group-hover:scale-103'
          }`}
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? 'opacity-100 scale-103' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Optional Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#101110]/92 backdrop-blur-md px-2.5 py-1 border border-[#34342F] transition-transform duration-300 group-hover:translate-x-0.5">
            <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#B6A58A]">
              {product.badge}
            </span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <span className="text-[9px] uppercase tracking-widest text-[#B8B5AC] bg-[#101110]/85 backdrop-blur-sm px-2 py-0.5 border border-[#34342F]/50">
            {product.category}
          </span>
        </div>

        {/* Quick Add Overlay on Desktop Hover & Mobile Friendly */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#101110] via-[#101110]/85 to-transparent translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col space-y-2">
          {/* Quick Size Selectors */}
          <div className="flex items-center justify-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
            {product.availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedQuickSize(size)}
                className={`w-7 h-7 text-[10px] font-mono transition-all duration-200 border cursor-pointer ${
                  selectedQuickSize === size
                    ? 'bg-[#B6A58A] text-[#101110] border-[#B6A58A] font-bold scale-105'
                    : 'bg-[#191A17]/95 text-[#F4F0E8] border-[#34342F] hover:border-[#B6A58A] hover:bg-[#1E201D]'
                }`}
                aria-label={`Select size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleQuickAdd}
              className="flex-1 py-2 bg-[#F4F0E8] text-[#101110] text-[10px] uppercase font-sans tracking-[0.2em] font-medium hover:bg-[#B6A58A] transition-colors duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg active:scale-98"
            >
              {feedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#101110]" />
                  <span>{feedback}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>QUICK ADD</span>
                </>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(product);
              }}
              className="p-2 bg-[#191A17] text-[#F4F0E8] border border-[#34342F] hover:border-[#B6A58A] hover:text-[#B6A58A] transition-colors duration-300 cursor-pointer"
              title="View Specifications"
              aria-label="View Specifications"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Meta Information with Refined Underline Interaction */}
      <div className="pt-4 pb-2 flex flex-col">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg text-[#F4F0E8] font-normal tracking-wide relative inline-block transition-colors duration-300">
            <span className="relative">
              {product.name}
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#B6A58A] transition-all duration-400 ease-out group-hover:w-full" />
            </span>
          </h3>
          <span className="font-sans text-sm text-[#F4F0E8] font-light">
            {formatINR(product.price)}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-[#85847C] mt-1 font-sans">
          <span>{product.colour}</span>
          <span className="text-[10px] tracking-wider uppercase text-[#B8B5AC]">
            {product.availableSizes.join(' · ')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
