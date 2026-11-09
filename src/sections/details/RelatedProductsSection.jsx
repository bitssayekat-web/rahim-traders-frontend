/**
 * ============================================================================
 *  RELATED PRODUCTS — "Products you may like" (Figma 119:1479)
 * ----------------------------------------------------------------------------
 *  Four product cards (24px gap) fetched by `useRelatedProducts`.
 * ============================================================================
 */

import ProductGrid from '../../components/ui/ProductGrid'
import { useRelatedProducts } from '../../hooks/useProducts'
import { useScrollMotion } from '../../hooks/useScrollMotion'
import { liftIn } from '../../motion/effects'

const RELATED_LIMIT = 4

export default function RelatedProductsSection({ slug }) {
  const { data, loading, error } = useRelatedProducts(slug, RELATED_LIMIT)
  const scope = useScrollMotion(() => liftIn('h2'))

  return (
    <section ref={scope} aria-labelledby="related-title" className="bg-paper py-16">
      <div className="mx-auto flex max-w-[1188px] flex-col gap-8 px-4 sm:px-6 lg:px-10 xl:box-content xl:px-0">
        <h2
          id="related-title"
          className="font-display text-[28px] font-extrabold tracking-[-0.035em] text-ink sm:text-[36px] xl:px-1"
        >
          Products you may like
        </h2>

        <ProductGrid
          products={data}
          loading={loading}
          error={error}
          skeletonCount={RELATED_LIMIT}
          className="gap-x-6 gap-y-10"
        />
      </div>
    </section>
  )
}
