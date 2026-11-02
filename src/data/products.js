/**
 * ============================================================================
 *  MOCK CATALOGUE DATA — temporary, until the backend API is connected
 * ----------------------------------------------------------------------------
 *  Shape mirrors what the API is expected to return so the UI does not change
 *  when `services/productService.js` switches from this file to `fetch()`.
 *
 *  Product {
 *    id:             string
 *    slug:           string                 → used in /products/:slug
 *    name:           string
 *    categoryId:     string                 → matches CATEGORIES[].id
 *    images:         string[]               → empty = render placeholder tile
 *    options:        { sizes, materials, printing, finishing }  (string[])
 *    minOrder:       number                 → pieces
 *    productionTime: string
 *  }
 *
 *  NOTE: The Figma file names 8 products and shows tab counts of 21. The other
 *  13 names below are illustrative placeholders taken from the products the
 *  design mentions elsewhere (hero wheel, services, process cards).
 * ============================================================================
 */

export const CATEGORIES = [
  { id: 'packaging-bags', label: 'Packaging & Bags' },
  { id: 'product-boxes', label: 'Product Boxes' },
  { id: 'garment-accessories', label: 'Garment Accessories' },
  { id: 'commercial-printing', label: 'Commercial Printing' },
]

/**
 * Default spec sheet — taken verbatim from the "Product details" frame.
 * Every mock product reuses it; real products will carry their own.
 */
const DEFAULT_SPEC = {
  options: {
    sizes: ['8"', '10"', '12"', '14"'],
    materials: ['Corrugated E-flute (Food-grade)', 'Kraft Corrugated'],
    printing: ['Flexo 1–2 colours', 'Offset CMYK'],
    finishing: ['Grease-resistant coating', 'Air vents'],
  },
  minOrder: 1000,
  productionTime: '10–12 working days',
}

/** Turns "Non-Woven Tissue Bag" into "non-woven-tissue-bag". */
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Factory keeps the mock list below compact and consistent. */
const makeProduct = (name, categoryId) => ({
  id: slugify(name),
  slug: slugify(name),
  name,
  categoryId,
  images: [],
  ...DEFAULT_SPEC,
})

export const PRODUCTS = [
  // ---- Packaging & Bags (6) — names from Figma -----------------------------
  makeProduct('Shopping Bag', 'packaging-bags'),
  makeProduct('Plastic Bag', 'packaging-bags'),
  makeProduct('Non-Woven Tissue Bag', 'packaging-bags'),
  makeProduct('Sherwani Bag', 'packaging-bags'),
  makeProduct('Courier Poly Bags', 'packaging-bags'),
  makeProduct('Zipper Poly Bag', 'packaging-bags'),

  // ---- Product Boxes (8) ---------------------------------------------------
  makeProduct('Gift Box', 'product-boxes'),
  makeProduct('Punjabi Box', 'product-boxes'),
  makeProduct('Pizza Box', 'product-boxes'),
  makeProduct('Burger Box', 'product-boxes'),
  makeProduct('Perfume Box', 'product-boxes'),
  makeProduct('Polo T-Shirt Box', 'product-boxes'),
  makeProduct('Mailer Box', 'product-boxes'),
  makeProduct('Sweet Box', 'product-boxes'),

  // ---- Garment Accessories (6) ---------------------------------------------
  makeProduct('Hangtag', 'garment-accessories'),
  makeProduct('Woven Label', 'garment-accessories'),
  makeProduct('Care Label', 'garment-accessories'),
  makeProduct('Lock Pin Tag', 'garment-accessories'),
  makeProduct('Printed Ribbon', 'garment-accessories'),
  makeProduct('Size Label', 'garment-accessories'),

  // ---- Commercial Printing (1) ---------------------------------------------
  makeProduct('Business Stationery', 'commercial-printing'),
]

/**
 * Display order of the home page "Explore our products" grid —
 * matches the 8 cards in the Figma homepage.
 */
export const FEATURED_PRODUCT_SLUGS = [
  'shopping-bag',
  'plastic-bag',
  'non-woven-tissue-bag',
  'sherwani-bag',
  'courier-poly-bags',
  'zipper-poly-bag',
  'gift-box',
  'punjabi-box',
]
