/**
 * ============================================================================
 *  EXPLORE OUR PRODUCTS SECTION (Figma 119:816 home · 119:1199 listing)
 * ----------------------------------------------------------------------------
 *  Shared by the home page and the product listing page:
 *
 *    variant="featured" (home)    → curated 8 products + "View all" button,
 *                                   tabs filter within the full catalogue.
 *    variant="catalogue" (listing)→ full catalogue, tighter top padding,
 *                                   active tab synced to `?category=` so the
 *                                   footer links and shared URLs work.
 * ============================================================================
 */

import { Link, useSearchParams } from 'react-router-dom'
import Container from '../../components/ui/Container'
import FilterTabs from '../../components/ui/FilterTabs'
import ProductGrid from '../../components/ui/ProductGrid'
import { useCategories, useFeaturedProducts, useProducts } from '../../hooks/useProducts'

const HOME_GRID_LIMIT = 8

export default function ExploreProductsSection({ variant = 'featured' }) {
  const isCatalogue = variant === 'catalogue'

  // ---- Active category lives in the URL (?category=…) -------------------
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category')

  const handleTabChange = (categoryId) => {
    const next = new URLSearchParams(searchParams)
    if (categoryId) next.set('category', categoryId)
    else next.delete('category')
    setSearchParams(next, { replace: true, preventScrollReset: true })
  }

  // ---- Data -------------------------------------------------------------
  const { data: categories = [] } = useCategories()
  const filtered = useProducts(activeCategory)
  const featured = useFeaturedProducts()

  // Home shows the curated list on "All", otherwise the filtered category
  const showFeatured = !isCatalogue && !activeCategory
  const source = showFeatured ? featured : filtered
  const products = isCatalogue ? source.data : source.data?.slice(0, HOME_GRID_LIMIT)

  const totalCount = categories.reduce((sum, category) => sum + category.count, 0)
  const tabs = [{ id: null, label: 'All', count: totalCount }, ...categories]

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className={`bg-sheet pb-20 lg:pb-28 ${isCatalogue ? 'pt-10 lg:pt-16' : 'pt-20 lg:pt-28'}`}
    >
      <Container className="flex flex-col gap-7">
        {/* ---- Header ---- */}
        <div className="flex items-center justify-between gap-4">
          <h2 id="products-title" className="text-h2 text-ink">
            Explore our products
          </h2>

          {!isCatalogue && (
            // Carries the selected category over to the listing page
            <Link
              to={{ pathname: '/products', search: activeCategory ? `?category=${activeCategory}` : '' }}
              className="shrink-0 rounded-lg border border-line-2 bg-sheet px-[22px] py-3.5 text-[15px] leading-[1.2] font-medium text-ink shadow-[0_2px_6px_-2px_rgba(18,20,26,0.08)] transition-colors hover:border-ink-3"
            >
              View all
            </Link>
          )}
        </div>

        {/* ---- Category tabs ---- */}
        <FilterTabs items={tabs} activeId={activeCategory} onChange={handleTabChange} />

        {/* ---- Grid ---- */}
        <ProductGrid
          products={products}
          loading={source.loading}
          error={source.error}
          skeletonCount={isCatalogue ? 12 : HOME_GRID_LIMIT}
        />
      </Container>
    </section>
  )
}
