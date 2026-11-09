/**
 * ============================================================================
 *  Marketing copy & static section content
 * ----------------------------------------------------------------------------
 *  Text for the home page sections, kept out of the JSX so copy edits (or a
 *  future CMS) never require touching layout code. All strings are taken
 *  verbatim from the Figma file.
 * ============================================================================
 */

// ---- Icons ------------------------------------------------------------------
import diamondIcon from '../assets/icons/diamond.svg'
import clockIcon from '../assets/icons/clock.svg'
import pencilIcon from '../assets/icons/pencil.svg'
import headsetIcon from '../assets/icons/headset.svg'
import printerIcon from '../assets/icons/printer.svg'
import customIcon from '../assets/icons/custom.svg'
import userIcon from '../assets/icons/user.svg'
import truckIcon from '../assets/icons/truck.svg'

// ---- Service photos (web-sized copies of /assets, named by service) ---------
import packagingPhoto1 from '../assets/services/packaging-solutions-1.jpg'
import packagingPhoto2 from '../assets/services/packaging-solutions-2.jpg'
import packagingPhoto3 from '../assets/services/packaging-solutions-3.jpg'
import garmentPhoto from '../assets/services/garments-accessories.webp'
import commercialPhoto from '../assets/services/commercial-printing.jpg'

// ---- Client logos -----------------------------------------------------------
import logomark1 from '../assets/clients/logomark-1.svg'
import logomark2 from '../assets/clients/logomark-2.svg'
import logomark3 from '../assets/clients/logomark-3.svg'
import logomark4 from '../assets/clients/logomark-4.svg'
import logomark5 from '../assets/clients/logomark-5.svg'
import logomark6 from '../assets/clients/logomark-6.svg'

/* ----------------------------------------------------------------------------
 *  HERO — product wheel
 *  Cards sit on a circle every 40° (9 × 40° = 360°). `angle` is clockwise
 *  from 12 o'clock, exactly as rotated in Figma.
 * ------------------------------------------------------------------------- */
export const HERO_WHEEL_ITEMS = [
  { label: 'Shopping Bag', angle: 0 },
  { label: 'Punjabi Box', angle: 40 },
  { label: 'Pizza Box', angle: 80 },
  { label: 'Woven Labels', angle: 120 },
  { label: 'Polo T-Shirt Box', angle: 160 },
  { label: 'Perfume Box', angle: 200 },
  { label: 'Gift Box', angle: 240 },
  { label: 'Hangtag', angle: 280 },
  { label: 'Business Stationery', angle: 320 },
]

/* ----------------------------------------------------------------------------
 *  CLIENTS — "Brands we've printed for" marquee
 *  Placeholder brand marks from Figma; swap with real client logos.
 * ------------------------------------------------------------------------- */
export const CLIENT_LOGOMARKS = [
  logomark1,
  logomark2,
  logomark3,
  logomark4,
  logomark5,
  logomark6,
  logomark1,
]

/* ----------------------------------------------------------------------------
 *  VALUES strip
 * ------------------------------------------------------------------------- */
export const VALUES = [
  { title: 'Premium Quality', text: 'Made to impress', icon: diamondIcon, tone: 'bg-cyan-deep' },
  { title: 'Reliable Turnaround', text: 'Planned with care', icon: clockIcon, tone: 'bg-magenta-deep' },
  { title: 'Custom Solutions', text: 'Built for your needs', icon: pencilIcon, tone: 'bg-sun-deep' },
  { title: 'Helpful Support', text: 'From idea to delivery', icon: headsetIcon, tone: 'bg-ink' },
]

/* ----------------------------------------------------------------------------
 *  WHAT WE DO — service bento cards
 *  `swatches` = the little CMYK bars above each title.
 *  `images`   = photos for the card's image slots, in slot order. `position`
 *               is the CSS object-position used to keep the subject in frame
 *               when the photo is cropped into a wide/narrow slot.
 * ------------------------------------------------------------------------- */
export const SERVICES = {
  packaging: {
    title: 'Packaging Solutions',
    text: 'Bags and carry packaging, product boxes and courier packaging printed with your brand.',
    tags: ['Shopping bags', 'Non-woven bags', 'Poly & courier bags', 'Product boxes'],
    swatches: ['bg-cyan'],
    images: [
      { src: packagingPhoto1, alt: 'Kraft product boxes with a folded garment inside', position: 'center' },
      { src: packagingPhoto2, alt: 'Plain kraft cube box', position: 'center' },
      { src: packagingPhoto3, alt: 'Pink paper gift bag with ribbon handle', position: '50% 38%' },
    ],
  },
  garment: {
    title: 'Garment Accessories',
    text: 'Tags, labels and finishing pieces for clothing brands and garment businesses.',
    tags: ['Hangtags', 'Woven & care labels', 'Lock pin tags', 'Ribbon print'],
    swatches: ['bg-sun'],
    images: [
      { src: garmentPhoto, alt: 'Woven labels, kraft hangtag, barcode stickers and safety pins', position: 'center' },
    ],
  },
  commercial: {
    title: 'Commercial Printing',
    text: 'Stationery and day-to-day business printing.',
    swatches: ['bg-magenta'],
    images: [
      { src: commercialPhoto, alt: 'CMYK ink cartridges inside a printer', position: '50% 55%' },
    ],
  },
  uvDtf: {
    title: 'UV & DTF Printing',
    text: 'UV and DTF printing for short runs and custom pieces.',
    swatches: ['bg-cyan', 'bg-magenta'],
  },
  laser: {
    title: 'Laser Engraving',
    text: 'Engraved marks and personalisation.',
    swatches: ['bg-sheet'],
  },
  design: {
    title: 'Design & Branding',
    text: "No artwork yet? Share your idea and we'll turn it into a print-ready visual before production.",
    cta: 'Start with your idea',
  },
}

/* ----------------------------------------------------------------------------
 *  WHY CHOOSE US — metrics + pillars
 *  TODO(API): metrics could come from a stats endpoint later.
 * ------------------------------------------------------------------------- */
export const METRICS = [
  { value: '18+', label: 'Years of excellence', tone: 'bg-cyan' },
  { value: '32,870+', label: 'Projects completed', tone: 'bg-magenta' },
  { value: '99%', label: 'Client satisfaction rate', tone: 'bg-sun' },
]

export const PILLARS = [
  { title: 'Modern Equipment', text: 'Up-to-date printing machines.', icon: printerIcon, tone: 'bg-cyan-deep' },
  { title: 'Custom Solutions', text: 'Sizes, materials and finishes to suit you.', icon: customIcon, tone: 'bg-magenta-deep' },
  { title: 'Skilled Professionals', text: 'An experienced print and finishing team.', icon: userIcon, tone: 'bg-sun-deep' },
  { title: 'On-Time Delivery', text: 'Timelines agreed before we print.', icon: truckIcon, tone: 'bg-ink' },
]

/* ----------------------------------------------------------------------------
 *  FROM DESIGN TO DELIVERY — 4 step process
 * ------------------------------------------------------------------------- */
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Share your requirements',
    text: 'Tell us what you need: the product, size, quantity and any artwork you already have.',
  },
  {
    step: 2,
    title: 'Design to visual',
    text: 'We turn your idea into a design and share the visual for approval.',
  },
  {
    step: 3,
    title: 'Printing & production',
    text: 'The approved visual goes to print as a quality finished product.',
  },
  {
    step: 4,
    title: 'Packing & quality check',
    text: 'Every order is checked and packed before it leaves us. Your visual, our print.',
  },
]

/* ----------------------------------------------------------------------------
 *  FOOTER link groups
 * ------------------------------------------------------------------------- */
export const FOOTER_QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/#services' },
  { label: 'Our process', to: '/#process' },
  { label: 'About us', to: '/#why-us' },
  { label: 'How to order', to: '/#how-to-order' },
]

export const FOOTER_PRODUCT_LINKS = [
  { label: 'Bags & Carry Packaging', to: '/products?category=packaging-bags' },
  { label: 'Boxes & Packaging', to: '/products?category=product-boxes' },
  { label: 'Commercial Printing & Stationery', to: '/products?category=commercial-printing' },
  { label: 'Garment Accessories, Tags & Labels', to: '/products?category=garment-accessories' },
  { label: 'UV & DTF Printing', to: '/#services' },
  { label: 'Laser Engraving', to: '/#services' },
]
