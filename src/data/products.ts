export interface Product {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Unisex';
  price: number;
  colour: string;
  availableSizes: string[];
  images: [string, string]; // [primary, alternate hover]
  description: string;
  details: string[];
  careInstructions: string[];
  isNewArrival?: boolean;
  isFeatured?: boolean;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Essential Oversized Tee',
    category: 'Men',
    price: 1499,
    colour: 'Deep Obsidian',
    availableSizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A structural everyday essential sculpted in heavy 280 GSM combed organic cotton. Features dropped shoulders and clean raw-edge hems that drape naturally without clinging.',
    details: ['Heavyweight 280 GSM organic cotton', 'Relaxed boxy cut with dropped shoulder', 'Ribbed reinforced collar that retains structure'],
    careInstructions: ['Machine wash cold inside out', 'Hang flat to preserve drape', 'Do not tumble dry'],
    isNewArrival: true,
    isFeatured: true,
    badge: 'NEW'
  },
  {
    id: 'prod-02',
    name: 'Relaxed Linen Shirt',
    category: 'Men',
    price: 2499,
    colour: 'Warm Ivory',
    availableSizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Spun from pure European flax with an aerated, softened weave. Finished with natural mother-of-pearl buttons and a gently curved hem designed to be worn untucked.',
    details: ['100% Normandy washed linen', 'Subtle camp collar construction', 'Single rear pleat for ergonomic movement'],
    careInstructions: ['Gentle cycle 30°C', 'Warm iron while slightly damp', 'Dry clean optional'],
    isFeatured: true
  },
  {
    id: 'prod-03',
    name: 'Structured Everyday Jacket',
    category: 'Unisex',
    price: 4999,
    colour: 'Muted Charcoal',
    availableSizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An architectural outerwear layer blending minimalist tailoring with modular durability. Features hidden snap closures, dual welt pockets, and an unlined interior with bound seam finishes.',
    details: ['Double-weave technical twill blend', 'Concealed brushed horn buttons', 'Internal waterproof travel pocket'],
    careInstructions: ['Dry clean only', 'Store on structured wooden hanger'],
    isNewArrival: true,
    isFeatured: true,
    badge: 'SIGNATURE'
  },
  {
    id: 'prod-04',
    name: 'Signature Straight-Leg Trousers',
    category: 'Unisex',
    price: 2999,
    colour: 'Stone Sand',
    availableSizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Tailored with subtle double front pleats and a relaxed taper. Engineered with a semi-elasticated inner waistband for seamless all-day comfort without sacrificing sartorial poise.',
    details: ['70% cotton, 30% recycled Tencel', 'Mid-rise with pressed crease lines', 'Clean blind-stitch cuffs'],
    careInstructions: ['Cold gentle machine wash', 'Line dry in shade', 'Warm iron'],
    isFeatured: true
  },
  {
    id: 'prod-05',
    name: 'Minimal Knit Sweater',
    category: 'Men',
    price: 3499,
    colour: 'Oatmeal Melange',
    availableSizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Woven with a micro-ribbed 7-gauge stitch from responsibly farmed Merino wool. Delivers natural thermal regulation with an understated raglan sleeve structure.',
    details: ['Extra-fine Merino wool blend', 'Raglan sleeve for unrestricted movement', 'Resilient elasticated micro-cuff'],
    careInstructions: ['Hand wash cold with wool detergent', 'Dry flat on towel', 'Never hang knitwear'],
    isNewArrival: true
  },
  {
    id: 'prod-06',
    name: 'Sculpted Everyday Top',
    category: 'Women',
    price: 1799,
    colour: 'Pitch Black',
    availableSizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A body-skimming high-neck top constructed with high-gauge modal rib. Clean contouring lines hug the frame with featherlight softness and zero cling.',
    details: ['94% Austrian Modal, 6% Elastane', 'Mock funnel neckline with laser cut edge', 'Double-lined bodice for full opacity'],
    careInstructions: ['Gentle cycle in wash mesh bag', 'Tumble dry low or air dry'],
    isFeatured: true
  },
  {
    id: 'prod-07',
    name: 'Tailored Wide-Leg Trousers',
    category: 'Women',
    price: 2799,
    colour: 'Rich Espresso',
    availableSizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Fluid wide-leg silhouette that flows gracefully with each step. Designed with an ultra-clean high-rise waistband and understated tonal side adjusters.',
    details: ['Lightweight fluid crepe wool blend', 'Deep knife pleats at waistline', 'Slash side pockets with hand-stitch finish'],
    careInstructions: ['Professional dry clean recommended', 'Steam iron low heat'],
    isNewArrival: true,
    isFeatured: true,
    badge: 'EDITOR’S PICK'
  },
  {
    id: 'prod-08',
    name: 'The Everyday Overshirt',
    category: 'Unisex',
    price: 3299,
    colour: 'Olive Fatigue',
    availableSizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Constructed from heavy brushed cotton canvas, bridging the transition between tailored workwear and an effortless outer layer.',
    details: ['320 GSM brushed cotton canvas', 'Dual oversized chest patch pockets', 'Matte oxidized gunmetal hardware'],
    careInstructions: ['Wash warm with like colours', 'Tumble dry low', 'Iron medium'],
    isFeatured: true
  }
];

export const formatINR = (val: number): string => {
  return '₹' + val.toLocaleString('en-IN');
};
