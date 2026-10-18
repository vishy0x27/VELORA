import React, { useState, useMemo, useRef } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface ShoppingSectionProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onOpenDetails: (product: Product) => void;
}

export const ShoppingSection: React.FC<ShoppingSectionProps> = ({
  activeCategory,
  onCategoryChange,
  onOpenDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const categories = ['ALL', 'MEN', 'WOMEN', 'UNISEX', 'NEW ARRIVALS'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      let matchesCategory = true;
      if (activeCategory === 'MEN') matchesCategory = p.category === 'Men';
      else if (activeCategory === 'WOMEN') matchesCategory = p.category === 'Women';
      else if (activeCategory === 'UNISEX') matchesCategory = p.category === 'Unisex';
      else if (activeCategory === 'NEW ARRIVALS') matchesCategory = Boolean(p.isNewArrival);

      // Search filter
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.colour.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [activeCategory, searchQuery, sortOption]);

  return (
    <section
      ref={sectionRef}
      id="shop-section"
      className="py-24 bg-[#101110] border-t border-[#34342F]/50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-6 h-[1px] bg-[#B6A58A]" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#B6A58A]">
                THE CATALOGUE
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#F4F0E8]">
              The Latest Edit
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-[#85847C] mt-2">
              New pieces. Timeless perspective.
            </p>
          </motion.div>

          {/* Live Search & Count */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
            className="mt-6 md:mt-0 flex items-center space-x-4"
          >
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search styles, fabrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-2.5 pl-9 text-[#F4F0E8] placeholder-[#85847C] focus:outline-none focus:border-[#B6A58A] transition-colors rounded-none"
              />
              <Search className="w-4 h-4 text-[#85847C] absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-xs text-[#85847C] hover:text-[#F4F0E8] cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs & Sorting Toolbar */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: LUXURY_EASE }}
          className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-10 border-b border-[#34342F] gap-4"
        >
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`relative px-4 py-2 text-[11px] uppercase font-sans tracking-[0.2em] transition-all duration-300 border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#F4F0E8] text-[#101110] border-[#F4F0E8] font-medium shadow-md'
                    : 'bg-transparent text-[#B8B5AC] border-[#34342F] hover:border-[#B6A58A] hover:text-[#F4F0E8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-3 text-xs text-[#B8B5AC]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B6A58A]" />
            <span className="uppercase tracking-widest text-[10px]">SORT:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'newest')}
              className="bg-[#191A17] border border-[#34342F] text-xs text-[#F4F0E8] px-3 py-1.5 focus:outline-none focus:border-[#B6A58A] uppercase tracking-wider cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </motion.div>

        {/* Product Grid / Empty State with Smooth Motion */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout={!shouldReduceMotion}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod, index) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  index={index}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-[#191A17]/40 border border-[#34342F] p-8"
          >
            <p className="font-serif text-2xl text-[#F4F0E8] mb-2">No matching silhouettes found</p>
            <p className="text-sm text-[#85847C] mb-6">
              Try adjusting your category selection or clear your search term "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('ALL');
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#B6A58A] text-[#101110] text-xs font-sans tracking-widest uppercase font-medium hover:bg-[#F4F0E8] transition-colors cursor-pointer"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>RESET FILTERS</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
