/**
 * ============================================================================
 *  ProductCard — Figma component "Product Card / Shopping Bag" (119:543)
 * ----------------------------------------------------------------------------
 *  "Catalogue card: cut-out product image on a soft tile, category and name."
 *  The whole card links to the product details page, where the quote form
 *  lives ("Ask for Price →").
 * ============================================================================
 */

import { Link } from 'react-router-dom'
import { getCategoryLabel } from '../../services/productService'
import ImageSlot from './ImageSlot'

export default function ProductCard({ product }) {
  const { slug, name, categoryId, images } = product

  return (
    <Link to={`/products/${slug}`} className="group flex flex-col focus-visible:outline-none">
      {/* ---- Image tile: 224px tall, cut-out image centred at 200×170 ---- */}
      <div className="relative flex h-[224px] items-center justify-center overflow-hidden rounded-xl bg-lavender transition-shadow duration-300 group-hover:shadow-[0_12px_30px_-14px_rgba(0,0,89,0.35)] group-focus-visible:outline-2 group-focus-visible:outline-royal">
        {images[0] && (
          <ImageSlot
            src={images[0]}
            alt={name}
            className="h-[170px] w-[200px] rounded-[10px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* ---- Meta ---- */}
      <p className="pt-2 text-[13px] leading-[1.4] text-mid">{getCategoryLabel(categoryId)}</p>
      <h3 className="py-2 font-display text-lg leading-[1.3] font-extrabold tracking-[-0.015em] text-dark">
        {name}
      </h3>
      <span className="py-2 font-display text-base leading-[1.3] font-bold tracking-[-0.015em] text-royal">
        Ask for Price{' '}
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  )
}

/** Shimmer placeholder with the same footprint, shown while data loads. */
export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col" aria-hidden="true">
      <div className="h-[224px] rounded-xl bg-lavender" />
      <div className="mt-3 h-3 w-24 rounded bg-line" />
      <div className="mt-3 h-4 w-40 rounded bg-line" />
      <div className="mt-4 h-4 w-28 rounded bg-line" />
    </div>
  )
}
