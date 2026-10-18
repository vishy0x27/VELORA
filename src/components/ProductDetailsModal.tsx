import React, { useState } from 'react';
import { Product, formatINR } from '../data/products';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck, Truck, RotateCcw, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onSelectRelated,
  allProducts,
}) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<'details' | 'care' | 'shipping' | null>('details');
  const shouldReduceMotion = useReducedMotion();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select an available size to continue.');
      return;
    }
    setValidationError(null);
    addToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const related = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.category === 'Unisex'))
    .slice(0, 3);

  const toggleAccordion = (section: 'details' | 'care' | 'shipping') => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#101110]/85 backdrop-blur-md"
      />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.45, ease: LUXURY_EASE }}
        className="relative z-10 bg-[#101110] border border-[#34342F] max-w-5xl w-full my-8 max-h-[92vh] overflow-y-auto shadow-2xl shadow-black/70"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto block z-20 bg-[#191A17] border border-[#34342F] p-2.5 text-[#B8B5AC] hover:text-[#F4F0E8] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A]"
          aria-label="Close Product Details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 p-6 sm:p-10 -mt-10">
          
          {/* Left: Gallery & Image Switcher */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="aspect-[3/4] w-full bg-[#191A17] border border-[#34342F] overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={product.images[activeImageIdx]}
                  src={product.images[activeImageIdx]}
                  alt={product.name}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
            </div>
            {/* Gallery Thumbnails */}
            <div className="flex space-x-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-24 border overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none ${
                    activeImageIdx === idx
                      ? 'border-[#B6A58A] opacity-100 scale-102 shadow-md'
                      : 'border-[#34342F] opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Spec & Purchase Controller */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#B6A58A] uppercase mb-2">
                VELORA ESSENTIALS / {product.category}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] font-normal mb-3">
                {product.name}
              </h2>

              <p className="font-sans text-xl text-[#F4F0E8] font-light mb-6">
                {formatINR(product.price)}
              </p>

              <p className="text-sm text-[#B8B5AC] font-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Colour Row */}
              <div className="mb-6 pb-6 border-b border-[#34342F]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-widest text-[#85847C]">COLOUR:</span>
                  <span className="text-[#F4F0E8]">{product.colour}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full border border-[#B6A58A] bg-[#1E201D] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#B6A58A]" />
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="uppercase tracking-widest text-[#85847C]">SELECT SIZE:</span>
                  <span className="text-[11px] text-[#B6A58A] underline cursor-pointer">Fit Guide</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        setValidationError(null);
                      }}
                      className={`py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer focus:outline-none ${
                        selectedSize === sz
                          ? 'bg-[#B6A58A] text-[#101110] border-[#B6A58A] font-bold shadow-md scale-102'
                          : 'bg-[#191A17] text-[#F4F0E8] border-[#34342F] hover:border-[#B6A58A]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {validationError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-rose-400 mt-2 font-mono"
                  >
                    {validationError}
                  </motion.p>
                )}
              </div>

              {/* Quantity Picker & Add to Cart */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center border border-[#34342F] bg-[#191A17]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-3.5 text-xs text-[#B8B5AC] hover:text-[#F4F0E8] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-3.5 text-xs font-mono text-[#F4F0E8]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-3.5 text-xs text-[#B8B5AC] hover:text-[#F4F0E8] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#F4F0E8] text-[#101110] text-xs font-sans tracking-[0.25em] uppercase font-medium hover:bg-[#B6A58A] transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B6A58A]"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#101110]" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <span>ADD TO SHOPPING BAG</span>
                  )}
                </motion.button>
              </div>

              {/* Accordions */}
              <div className="border-t border-[#34342F] divide-y divide-[#34342F] text-xs">
                
                {/* Details Accordion */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('details')}
                    className="w-full flex items-center justify-between text-[#F4F0E8] uppercase tracking-wider py-1 cursor-pointer focus:outline-none"
                  >
                    <span>Product Specifications</span>
                    {openAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === 'details' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: LUXURY_EASE }}
                        className="overflow-hidden"
                      >
                        <ul className="pt-3 pb-1 space-y-1.5 text-[#B8B5AC] font-light list-disc list-inside">
                          {product.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fabric & Care Accordion */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('care')}
                    className="w-full flex items-center justify-between text-[#F4F0E8] uppercase tracking-wider py-1 cursor-pointer focus:outline-none"
                  >
                    <span>Fabrication & Garment Care</span>
                    {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === 'care' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: LUXURY_EASE }}
                        className="overflow-hidden"
                      >
                        <ul className="pt-3 pb-1 space-y-1.5 text-[#B8B5AC] font-light list-disc list-inside">
                          {product.careInstructions.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shipping Accordion */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex items-center justify-between text-[#F4F0E8] uppercase tracking-wider py-1 cursor-pointer focus:outline-none"
                  >
                    <span>Shipping & Complimentary Returns</span>
                    {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === 'shipping' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: LUXURY_EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-1 space-y-2 text-[#B8B5AC] font-light">
                          <p>Complimentary express shipping across India on all orders over ₹2,999.</p>
                          <p>14-day hassle-free doorstep returns and exchanges.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Badges */}
              <div className="mt-6 pt-4 border-t border-[#34342F] grid grid-cols-3 gap-2 text-[10px] text-[#85847C] tracking-wider uppercase">
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#B6A58A]" />
                  <span>Pan-India Courier</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#B6A58A]" />
                  <span>14-Day Return</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B6A58A]" />
                  <span>100% Genuine</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Bar */}
        {related.length > 0 && (
          <div className="border-t border-[#34342F] p-6 sm:p-10 bg-[#141513]">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#B6A58A] mb-6">
              COMPLETE THE LOOK
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectRelated(rel);
                    setSelectedSize('');
                    setActiveImageIdx(0);
                  }}
                  className="flex items-center space-x-4 cursor-pointer group"
                >
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-16 h-20 object-cover border border-[#34342F] group-hover:border-[#B6A58A] transition-colors"
                  />
                  <div>
                    <p className="font-serif text-sm text-[#F4F0E8] group-hover:text-[#B6A58A] transition-colors">
                      {rel.name}
                    </p>
                    <p className="text-xs text-[#85847C]">{formatINR(rel.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
