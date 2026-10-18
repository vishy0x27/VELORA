import React from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onExploreMore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout, onExploreMore }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    grandTotal,
    freeShippingThreshold,
  } = useCart();
  const shouldReduceMotion = useReducedMotion();

  if (!isCartOpen) return null;

  const diffToFree = freeShippingThreshold - subtotal;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-[#101110]/80 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={shouldReduceMotion ? false : { x: '100%' }}
          animate={{ x: 0 }}
          exit={shouldReduceMotion ? undefined : { x: '100%' }}
          transition={{ duration: 0.5, ease: LUXURY_EASE }}
          className="w-screen max-w-md bg-[#101110] border-l border-[#34342F] shadow-2xl flex flex-col justify-between relative z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#34342F] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-[#B6A58A]" />
              <h2 className="font-serif text-2xl text-[#F4F0E8] tracking-wide">
                Shopping Bag
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#B8B5AC] hover:text-[#F4F0E8] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] rounded"
              aria-label="Close Shopping Bag"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#191A17] border-b border-[#34342F] text-xs">
            {diffToFree > 0 ? (
              <p className="text-[#B8B5AC] font-light">
                Add <span className="font-medium text-[#F4F0E8]">{formatINR(diffToFree)}</span> more for complimentary shipping across India.
              </p>
            ) : (
              <p className="text-[#B6A58A] font-medium tracking-wide">
                ✓ Complimentary pan-India express shipping unlocked.
              </p>
            )}
            <div className="w-full bg-[#34342F] h-1.5 mt-2.5 overflow-hidden rounded-full">
              <motion.div
                className="bg-[#B6A58A] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: LUXURY_EASE }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#34342F]">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <ShoppingBag className="w-12 h-12 text-[#34342F] stroke-1 mb-4" />
                <p className="font-serif text-2xl text-[#F4F0E8] mb-2">Your bag is empty</p>
                <p className="text-xs text-[#85847C] max-w-xs mb-8 leading-relaxed">
                  Every considered piece in the VELORA collection is crafted to endure. Explore our newest edit.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreMore();
                  }}
                  className="px-6 py-3 bg-[#F4F0E8] text-[#101110] text-xs tracking-widest uppercase font-medium hover:bg-[#B6A58A] transition-colors cursor-pointer shadow-md"
                >
                  CONTINUE SHOPPING
                </button>
              </motion.div>
            ) : (
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.25 } }}
                    className="py-5 flex space-x-4"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-26 object-cover bg-[#191A17] border border-[#34342F]"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-base text-[#F4F0E8]">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#85847C] hover:text-rose-400 p-1 cursor-pointer transition-colors"
                            title="Remove Item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-[#85847C] mt-0.5">
                          Size: <span className="text-[#F4F0E8] font-mono">{item.size}</span> · {item.product.colour}
                        </p>
                        <p className="text-xs text-[#B8B5AC] mt-1">
                          {formatINR(item.product.price)} each
                        </p>
                      </div>

                      {/* Quantity Selector & Line Total */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#34342F] bg-[#191A17]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2.5 py-1 text-xs text-[#B8B5AC] hover:text-[#F4F0E8] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-mono text-[#F4F0E8]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2.5 py-1 text-xs text-[#B8B5AC] hover:text-[#F4F0E8] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-sans font-medium text-[#F4F0E8]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#34342F] bg-[#141513] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#85847C]">
                <span>SUBTOTAL</span>
                <span className="text-[#F4F0E8]">{formatINR(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#85847C]">
                <span>SHIPPING (PAN-INDIA)</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#B6A58A] font-mono">FREE</span>
                  ) : (
                    formatINR(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-serif text-[#F4F0E8] pt-2 border-t border-[#34342F]">
                <span>ESTIMATED TOTAL</span>
                <span className="text-lg font-sans font-light">{formatINR(grandTotal)}</span>
              </div>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full mt-4 py-4 bg-[#F4F0E8] text-[#101110] text-xs font-sans tracking-[0.25em] uppercase font-medium hover:bg-[#B6A58A] transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B6A58A]"
              >
                <span>PROCEED TO DEMO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <p className="text-[10px] text-center text-[#85847C] tracking-widest uppercase pt-2">
                Simulated checkout — No real transaction will occur
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
