import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';
import { X, CheckCircle, ShieldAlert, Lock } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from '../utils/motion';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, shippingFee, grandTotal, clearCart } = useCart();
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    fullName: 'Aditya Sharma',
    email: 'aditya.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Signature Enclave, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.fullName.trim()) err.fullName = 'Full name is required';
    if (!formData.email.includes('@')) err.email = 'Valid email is required';
    if (!formData.phone.trim()) err.phone = 'Phone number is required';
    if (!formData.address.trim()) err.address = 'Street address is required';
    if (!formData.city.trim()) err.city = 'City is required';
    if (!formData.state.trim()) err.state = 'State is required';
    if (!formData.pincode.trim()) err.pincode = 'PIN code is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderId = 'VEL-2026-' + Math.floor(1000 + Math.random() * 9000);
      setOrderConfirmed(generatedOrderId);
      clearCart();
      setIsSubmitting(false);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-12">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#101110]/90 backdrop-blur-md"
      />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.45, ease: LUXURY_EASE }}
        className="relative z-10 bg-[#101110] border border-[#34342F] max-w-4xl w-full my-8 p-6 sm:p-10 shadow-2xl shadow-black/80"
      >
        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#85847C] hover:text-[#F4F0E8] p-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B6A58A] rounded"
          aria-label="Close Checkout"
        >
          <X className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          {orderConfirmed ? (
            /* Confirmation Screen */
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: LUXURY_EASE }}
              className="text-center py-12 max-w-lg mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.1 }}
              >
                <CheckCircle className="w-16 h-16 text-[#B6A58A] mx-auto mb-6 stroke-[1.5]" />
              </motion.div>

              <span className="text-[11px] font-mono tracking-widest uppercase text-[#B6A58A] block mb-2">
                DEMO ORDER RECEIVED
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] mb-4">
                Thank You for Your Order
              </h2>
              <p className="text-sm text-[#B8B5AC] font-light leading-relaxed mb-6">
                Your demonstration order <span className="font-mono text-[#F4F0E8] font-bold">#{orderConfirmed}</span> has been logged in this browser session.
              </p>

              <div className="bg-[#191A17] border border-[#34342F] p-5 text-left text-xs space-y-2 mb-8">
                <div className="flex justify-between text-[#85847C]">
                  <span>Shipping to:</span>
                  <span className="text-[#F4F0E8]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between text-[#85847C]">
                  <span>Destination:</span>
                  <span className="text-[#F4F0E8]">{formData.city}, {formData.pincode}</span>
                </div>
                <div className="flex justify-between text-[#85847C]">
                  <span>Notification:</span>
                  <span className="text-[#F4F0E8]">{formData.email}</span>
                </div>
              </div>

              <div className="bg-[#1E201D] border border-amber-900/40 p-4 text-xs text-amber-200/80 mb-8 flex items-start space-x-3 text-left">
                <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-300 mt-0.5" />
                <p>
                  <strong>DEMO NOTICE:</strong> No actual payment was collected, and no parcel will be dispatched. This simulated checkout fulfills the technical project specification.
                </p>
              </div>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={onClose}
                className="px-8 py-3.5 bg-[#F4F0E8] text-[#101110] text-xs font-sans tracking-[0.25em] uppercase font-medium hover:bg-[#B6A58A] transition-colors cursor-pointer shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B6A58A]"
              >
                RETURN TO STOREFRONT
              </motion.button>
            </motion.div>
          ) : (
            /* Checkout Form & Order Summary */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-b border-[#34342F] pb-4 mb-8">
                <div className="flex items-center space-x-2 text-[#B6A58A] text-xs font-mono uppercase tracking-widest mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Simulated Secure Checkout</span>
                </div>
                <h2 className="font-serif text-3xl text-[#F4F0E8]">Delivery & Review</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form Column */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#85847C] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-2.5 text-[#F4F0E8] focus:border-[#B6A58A] outline-none transition-colors"
                      />
                      {errors.fullName && <p className="text-[10px] text-rose-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#85847C] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-2.5 text-[#F4F0E8] focus:border-[#B6A58A] outline-none transition-colors"
                      />
                      {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#85847C] mb-1">
                      Phone Number (Pan-India) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-2.5 text-[#F4F0E8] focus:border-[#B6A58A] outline-none transition-colors"
                    />
                    {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#85847C] mb-1">
                      Street Address & Apartment *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-2.5 text-[#F4F0E8] focus:border-[#B6A58A] outline-none transition-colors"
                    />
                    {errors.address && <p className="text-[10px] text-rose-400 mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#85847C] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-2.5 text-[#F4F0E8] focus:border-[#B6A58A] outline-none transition-colors"
                      />
                      {errors.city && <p className="text-[10px] text-rose-400 mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#85847C] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-2.5 text-[#F4F0E8] focus:border-[#B6A58A] outline-none transition-colors"
                      />
                      {errors.state && <p className="text-[10px] text-rose-400 mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#85847C] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full bg-[#191A17] border border-[#34342F] text-xs px-3 py-2.5 text-[#F4F0E8] focus:border-[#B6A58A] outline-none transition-colors"
                      />
                      {errors.pincode && <p className="text-[10px] text-rose-400 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  {/* Demonstration Alert */}
                  <div className="p-3 bg-[#191A17] border border-[#34342F] text-[11px] text-[#B8B5AC] font-light">
                    ✦ Fictional Demonstration Order — No cards or payment credentials required.
                  </div>

                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full py-4 bg-[#F4F0E8] text-[#101110] text-xs font-sans tracking-[0.25em] uppercase font-medium hover:bg-[#B6A58A] transition-colors duration-300 disabled:opacity-50 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B6A58A]"
                  >
                    {isSubmitting ? 'GENERATING DEMO ORDER...' : `COMPLETE ORDER (${formatINR(grandTotal)})`}
                  </motion.button>
                </form>

                {/* Order Summary Column */}
                <div className="lg:col-span-5 bg-[#191A17] border border-[#34342F] p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#B6A58A] mb-4 pb-2 border-b border-[#34342F]">
                      Order Summary ({items.length} items)
                    </h4>

                    <div className="max-h-60 overflow-y-auto divide-y divide-[#34342F] pr-2">
                      {items.map((it) => (
                        <div key={it.id} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-3">
                            <img
                              src={it.product.images[0]}
                              alt={it.product.name}
                              className="w-10 h-12 object-cover border border-[#34342F]"
                            />
                            <div>
                              <p className="font-serif text-[#F4F0E8]">{it.product.name}</p>
                              <p className="text-[10px] text-[#85847C]">
                                Size {it.size} × {it.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-[#F4F0E8]">
                            {formatINR(it.product.price * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#34342F] pt-4 mt-6 space-y-2 text-xs">
                    <div className="flex justify-between text-[#85847C]">
                      <span>Subtotal</span>
                      <span className="text-[#F4F0E8]">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#85847C]">
                      <span>Pan-India Shipping</span>
                      <span>{shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-serif text-[#F4F0E8] pt-2 border-t border-[#34342F]">
                      <span>Grand Total</span>
                      <span className="font-sans font-light">{formatINR(grandTotal)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
