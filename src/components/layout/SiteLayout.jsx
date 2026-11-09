/**
 * ============================================================================
 *  SiteLayout — shared page chrome
 * ----------------------------------------------------------------------------
 *  Utility bar + navigation + routed page + footer. Also restores scroll
 *  position on navigation and scrolls to `#hash` targets (e.g. "/#services"
 *  from another page), which react-router does not do on its own.
 * ============================================================================
 */

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { getLenis, refreshTriggers, startSmoothScroll, watchPageHeight } from '../../motion/smoothScroll'
import Footer from './Footer'
import Navbar from './Navbar'
import UtilityBar from './UtilityBar'

export default function SiteLayout() {
  useEffect(startSmoothScroll, [])
  useEffect(watchPageHeight, [])
  useScrollManager()

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-royal px-4 py-2 text-sheet focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>

      <header className="relative z-30">
        <UtilityBar />
        <Navbar />
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

/**
 * Scroll to the hash target if present, otherwise back to the top whenever
 * the path changes. Runs after paint so the target section exists.
 */
function useScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    refreshTriggers()

    const lenis = getLenis()
    const target = hash ? document.getElementById(hash.slice(1)) : null

    if (target) {
      if (lenis) lenis.scrollTo(target, { offset: -16 })
      else target.scrollIntoView({ block: 'start' })
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash])
}
