/**
 * ============================================================================
 *  Product service — the ONLY place the UI gets catalogue data from
 * ----------------------------------------------------------------------------
 *  Right now every function resolves local mock data (see `data/products.js`).
 *  When the backend is ready, replace each body with the commented `fetch`
 *  call — the signatures and return shapes stay the same, so pages, hooks and
 *  components need zero changes.
 * ============================================================================
 */

import { API_BASE_URL } from '../config/site'
import { CATEGORIES, FEATURED_PRODUCT_SLUGS, PRODUCTS } from '../data/products'

/** Simulated network latency so loading states are exercised during dev. */
const MOCK_DELAY_MS = 250
const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS))

/**
 * Shared JSON fetcher for the real API (unused until the backend lands).
 * Throws on non-2xx so callers can surface an error state.
 */
// eslint-disable-next-line no-unused-vars
async function request(path, init) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
    ...init,
  })
  if (!response.ok) throw new Error(`API ${response.status}: ${path}`)
  return response.json()
}

/**
 * List categories with live product counts (drives the filter tabs).
 * @returns {Promise<Array<{ id: string, label: string, count: number }>>}
 */
export async function getCategories() {
  // TODO(API): return request('/categories')
  const withCounts = CATEGORIES.map((category) => ({
    ...category,
    count: PRODUCTS.filter((product) => product.categoryId === category.id).length,
  }))
  return delay(withCounts)
}

/**
 * List products, optionally filtered by category.
 * @param {{ categoryId?: string | null }} [params]
 */
export async function getProducts({ categoryId = null } = {}) {
  // TODO(API): return request(`/products${categoryId ? `?category=${categoryId}` : ''}`)
  const list = categoryId ? PRODUCTS.filter((p) => p.categoryId === categoryId) : PRODUCTS
  return delay(list)
}

/** Products highlighted on the home page, in the curated order. */
export async function getFeaturedProducts() {
  // TODO(API): return request('/products?featured=true')
  const featured = FEATURED_PRODUCT_SLUGS.map((slug) => PRODUCTS.find((p) => p.slug === slug))
  return delay(featured.filter(Boolean))
}

/**
 * Single product for the details page.
 * @param {string} slug
 * @returns {Promise<object | null>} `null` when not found (→ 404 UI).
 */
export async function getProductBySlug(slug) {
  // TODO(API): return request(`/products/${slug}`)
  return delay(PRODUCTS.find((p) => p.slug === slug) ?? null)
}

/**
 * "Products you may like" — same category first, topped up from the rest.
 * @param {string} slug   Current product (excluded from results).
 * @param {number} [limit=4]
 */
export async function getRelatedProducts(slug, limit = 4) {
  // TODO(API): return request(`/products/${slug}/related?limit=${limit}`)
  const current = PRODUCTS.find((p) => p.slug === slug)
  const others = PRODUCTS.filter((p) => p.slug !== slug)
  const sameCategory = others.filter((p) => p.categoryId === current?.categoryId)
  const rest = others.filter((p) => p.categoryId !== current?.categoryId)
  return delay([...sameCategory, ...rest].slice(0, limit))
}

/** Lookup helper for rendering a category label from its id. */
export const getCategoryLabel = (categoryId) =>
  CATEGORIES.find((c) => c.id === categoryId)?.label ?? ''
