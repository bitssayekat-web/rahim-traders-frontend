/**
 * ============================================================================
 *  PRODUCT LISTING PAGE (Figma "Rahim Traders — Product listing" 119:1141)
 * ----------------------------------------------------------------------------
 *  Full catalogue with category tabs (synced to ?category=) + order CTA.
 * ============================================================================
 */

import ExploreProductsSection from '../sections/shared/ExploreProductsSection'
import HowToOrderSection from '../sections/shared/HowToOrderSection'
import { usePageTitle } from '../hooks/usePageTitle'

export default function ProductListingPage() {
  usePageTitle('Products')

  return (
    <>
      <ExploreProductsSection variant="catalogue" />
      <HowToOrderSection />
    </>
  )
}
