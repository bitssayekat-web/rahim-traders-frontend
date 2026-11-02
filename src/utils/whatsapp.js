/**
 * ============================================================================
 *  WhatsApp helpers
 * ----------------------------------------------------------------------------
 *  The business takes orders by conversation ("No checkout. Just talk to us"),
 *  so every quote CTA opens a pre-filled WhatsApp chat.
 * ============================================================================
 */

import { SITE } from '../config/site'

/**
 * Build a `wa.me` deep-link with an optional pre-filled message.
 * @param {string} [message] Plain-text message; it is URL-encoded here.
 * @returns {string}
 */
export function buildWhatsAppLink(message = '') {
  const base = `https://wa.me/${SITE.contact.phoneE164}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Default greeting used by generic "Get a quote" buttons. */
export const DEFAULT_QUOTE_LINK = buildWhatsAppLink(
  'Hi Rahim Traders, I would like to get a quote.',
)

/**
 * Compose the quote request sent from the product details form.
 * Only non-empty fields are included so the message stays short.
 *
 * @param {object} params
 * @param {string} params.productName
 * @param {Record<string, string>} params.selections  e.g. { Size: '10"' }
 * @param {number|string} params.quantity
 * @param {string} params.note  Free-text message typed by the customer.
 * @returns {string}
 */
export function buildProductQuoteMessage({ productName, selections, quantity, note }) {
  const lines = [`Hi Rahim Traders, I'd like a quote for: ${productName}`]

  Object.entries(selections).forEach(([label, value]) => {
    if (value) lines.push(`• ${label}: ${value}`)
  })
  if (quantity) lines.push(`• Quantity: ${quantity} pcs`)
  if (note?.trim()) lines.push('', note.trim())

  return lines.join('\n')
}
