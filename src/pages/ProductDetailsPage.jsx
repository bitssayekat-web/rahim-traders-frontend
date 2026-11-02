/**
 * ============================================================================
 *  PRODUCT DETAILS PAGE (Figma "Rahim Traders — Product details" 119:1346)
 * ----------------------------------------------------------------------------
 *  Route: /products/:slug
 *  Overview (gallery + quote form) → Specification → Products you may like.
 *  Shows a skeleton while loading and the 404 view for unknown slugs.
 * ============================================================================
 */

import { useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import { useProduct } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import ProductOverviewSection from '../sections/details/ProductOverviewSection'
import RelatedProductsSection from '../sections/details/RelatedProductsSection'
import SpecificationSection from '../sections/details/SpecificationSection'
import NotFoundPage from './NotFoundPage'

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const { data: product, loading, error } = useProduct(slug)

  usePageTitle(product?.name ?? 'Product')

  if (loading) return <DetailsSkeleton />
  if (error || !product) return <NotFoundPage />

  return (
    // `key` resets the quote form when navigating between products
    <div key={product.slug}>
      <ProductOverviewSection product={product} />
      <SpecificationSection product={product} />
      <RelatedProductsSection slug={product.slug} />
    </div>
  )
}

/** Layout-matching placeholder to avoid a jump when data arrives. */
function DetailsSkeleton() {
  return (
    <Container className="grid animate-pulse grid-cols-1 gap-8 pt-10 pb-20 lg:grid-cols-2 lg:pt-16" aria-busy="true">
      <div className="aspect-square rounded-xl bg-lavender" />
      <div className="flex flex-col gap-4">
        <div className="h-3 w-28 rounded bg-line" />
        <div className="h-12 w-2/3 rounded bg-line" />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-10 w-full rounded-full bg-paper" />
        ))}
      </div>
    </Container>
  )
}
