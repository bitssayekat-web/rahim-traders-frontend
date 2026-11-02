/**
 * ============================================================================
 *  ProductGrid
 * ----------------------------------------------------------------------------
 *  Responsive catalogue grid: 1 → 2 → 3 → 4 columns. Spacing matches Figma
 *  (48px row gap, 28px column gap at desktop). Handles loading / error / empty
 *  states so every page using it behaves the same.
 * ============================================================================
 */

import ProductCard, { ProductCardSkeleton } from './ProductCard'

export default function ProductGrid({
  products,
  loading = false,
  error = null,
  skeletonCount = 8,
  className = 'gap-x-7 gap-y-12',
}) {
  const gridClasses = `grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${className}`

  if (error) {
    return (
      <p role="alert" className="rounded-xl bg-paper p-6 text-ink-2">
        We couldn’t load products right now. Please refresh the page or contact us on WhatsApp.
      </p>
    )
  }

  if (loading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return <p className="rounded-xl bg-paper p-6 text-ink-2">No products in this category yet.</p>
  }

  return (
    <ul className={gridClasses}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
