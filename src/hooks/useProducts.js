/**
 * ============================================================================
 *  Catalogue hooks — thin wrappers around `productService`
 * ----------------------------------------------------------------------------
 *  Components call these instead of the service directly, so loading / error
 *  handling is consistent everywhere.
 * ============================================================================
 */

import {
  getCategories,
  getFeaturedProducts,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from '../services/productService'
import { useAsync } from './useAsync'

export const useCategories = () => useAsync(getCategories, [])

/** @param {string | null} categoryId  `null` = all products */
export const useProducts = (categoryId) =>
  useAsync(() => getProducts({ categoryId }), [categoryId])

export const useFeaturedProducts = () => useAsync(getFeaturedProducts, [])

export const useProduct = (slug) => useAsync(() => getProductBySlug(slug), [slug])

export const useRelatedProducts = (slug, limit = 4) =>
  useAsync(() => getRelatedProducts(slug, limit), [slug, limit])
