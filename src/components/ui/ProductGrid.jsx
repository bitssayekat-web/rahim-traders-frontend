/**
 * ============================================================================
 *  ProductGrid
 * ----------------------------------------------------------------------------
 *  Responsive catalogue grid: 1 → 2 → 3 → 4 columns. Spacing matches Figma
 *  (48px row gap, 28px column gap at desktop). Handles loading / error / empty
 *  states so every page using it behaves the same.
 * ============================================================================
 */

import { useScrollMotion } from '../../hooks/useScrollMotion'
import { gsap, ScrollTrigger } from '../../motion/gsap'
import ProductCard, { ProductCardSkeleton } from './ProductCard'

export default function ProductGrid({
  products,
  loading = false,
  error = null,
  skeletonCount = 8,
  className = 'gap-x-7 gap-y-12',
}) {
  // Cards rise and ease up to full size in small groups as they enter
  const scope = useScrollMotion(() => {
    if (loading || !products?.length) return

    const cards = gsap.utils.toArray('[data-product]')
    gsap.set(cards, { y: 36, scale: 0.96, autoAlpha: 0 })
    ScrollTrigger.batch(cards, {
      start: 'top 94%',
      once: true,
      onEnter: (group) =>
        gsap.to(group, { y: 0, scale: 1, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
    })
  }, [products, loading])

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
    <ul ref={scope} className={gridClasses}>
      {products.map((product) => (
        <li key={product.id} data-product>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
