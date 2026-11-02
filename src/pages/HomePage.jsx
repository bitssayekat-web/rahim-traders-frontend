/**
 * ============================================================================
 *  HOME PAGE (Figma "Rahim Traders — Homepage" 119:557)
 * ----------------------------------------------------------------------------
 *  Section order mirrors the Figma frame top → bottom. Utility bar, nav and
 *  footer come from <SiteLayout>.
 * ============================================================================
 */

import ClientsSection from '../sections/home/ClientsSection'
import HeroSection from '../sections/home/HeroSection'
import ProcessSection from '../sections/home/ProcessSection'
import ValuesSection from '../sections/home/ValuesSection'
import WhatWeDoSection from '../sections/home/WhatWeDoSection'
import WhyChooseUsSection from '../sections/home/WhyChooseUsSection'
import ExploreProductsSection from '../sections/shared/ExploreProductsSection'
import HowToOrderSection from '../sections/shared/HowToOrderSection'
import { usePageTitle } from '../hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('Custom Packaging & Printing')

  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ValuesSection />
      <WhatWeDoSection />
      <ExploreProductsSection variant="featured" />
      <WhyChooseUsSection />
      <ProcessSection />
      <HowToOrderSection />
    </>
  )
}
