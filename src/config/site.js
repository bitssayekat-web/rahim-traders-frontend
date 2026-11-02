/**
 * ============================================================================
 *  Site configuration
 * ----------------------------------------------------------------------------
 *  Single source of truth for business details that appear in several places
 *  (utility bar, CTA panel, footer, WhatsApp deep-links). When the backend is
 *  ready these can move to a `/settings` endpoint; components only import
 *  from here, so nothing else needs to change.
 * ============================================================================
 */

export const SITE = {
  name: 'Rahim Traders',
  tagline: 'Custom packaging & printing · Islampur, Dhaka',

  contact: {
    phoneDisplay: '+880 1920-825261',
    /** E.164 without "+" — the format wa.me / tel: links expect. */
    phoneE164: '8801920825261',
    email: 'rahimtraders.online@gmail.com',
    addressShort: '31/A, Sayed Awlad Hossain Lane, Islampur, Dhaka 1100',
    addressFull:
      '31/A, Sayed Awlad Hossain Lane, Lion Tower Goli, Islampur, Dhaka, Bangladesh 1100',
  },

  // TODO(content): replace "#" with the real social profile URLs.
  social: {
    facebook: '#',
    instagram: '#',
  },
}

/** Base URL for the future REST API (set VITE_API_BASE_URL in `.env`). */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

/**
 * Primary navigation. `to` values are router paths; hash targets
 * (`/#services`) scroll to the matching section `id` on the home page.
 */
export const NAV_LINKS = [
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/#services' },
  { label: 'Why us', to: '/#why-us' },
  { label: 'Process', to: '/#process' },
  { label: 'Contact', to: '#contact' },
]
