import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrandIntroduction } from './components/BrandIntroduction';
import { ShoppingSection } from './components/ShoppingSection';
import { CampaignSection } from './components/CampaignSection';
import { CollectionPanels } from './components/CollectionPanels';
import { BrandStatistics } from './components/BrandStatistics';
import { WarmIvorySection } from './components/WarmIvorySection';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { NewsletterAndFooter } from './components/NewsletterAndFooter';
import { SearchOverlay, AccountModal } from './components/SearchAndAccountModals';
import { PRODUCTS, Product } from './data/products';

export const AppContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const scrollToShop = (category: string = 'ALL') => {
    setActiveCategory(category);
    const shop = document.getElementById('shop-section');
    if (shop) shop.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPhilosophy = () => {
    const phil = document.getElementById('philosophy-section');
    if (phil) phil.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#101110] text-[#F4F0E8] selection:bg-[#B6A58A] selection:text-[#101110]">
      {/* Fixed Luxury Header */}
      <Header
        onSelectCategory={scrollToShop}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      <main>
        {/* Full-width Cinematic Hero */}
        <HeroSection
          onExploreClick={() => scrollToShop('ALL')}
          onStoryClick={scrollToPhilosophy}
        />

        {/* Brand Philosophy Editorial */}
        <BrandIntroduction />

        {/* Dynamic Curated Shop with Filters & Instant Search */}
        <ShoppingSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onOpenDetails={(product) => setSelectedProduct(product)}
        />

        {/* Fashion Campaign Showcase */}
        <CampaignSection onExploreStory={scrollToPhilosophy} />

        {/* Men's & Women's Editorial Panels */}
        <CollectionPanels onSelectCategory={scrollToShop} />

        {/* Contrasting Warm Ivory Section */}
        <WarmIvorySection onShopClick={() => scrollToShop('ALL')} />

        {/* Minimalist Numerical Statistics */}
        <BrandStatistics />
      </main>

      {/* Newsletter & Luxury Footer */}
      <NewsletterAndFooter onSelectCategory={scrollToShop} />

      {/* Animated Modals and Drawers via AnimatePresence */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            key="product-details"
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSelectRelated={(p) => setSelectedProduct(p)}
            allProducts={PRODUCTS}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <CartDrawer
          key="cart-drawer"
          onOpenCheckout={() => setIsCheckoutOpen(true)}
          onExploreMore={() => scrollToShop('ALL')}
        />
      </AnimatePresence>

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal
            key="checkout-modal"
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay
            key="search-overlay"
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            products={PRODUCTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAccountOpen && (
          <AccountModal
            key="account-modal"
            isOpen={isAccountOpen}
            onClose={() => setIsAccountOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
