/**
 * ============================================================================
 *  Smooth scrolling (Lenis), driven by GSAP's ticker
 * ----------------------------------------------------------------------------
 *  Sharing one clock keeps scroll-linked animation perfectly in step with the
 *  page. Skipped entirely for visitors who prefer reduced motion.
 * ============================================================================
 */

import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, MEDIA, ScrollTrigger } from './gsap'

let instance = null

/** The live Lenis instance, or `null` when smooth scrolling is off. */
export const getLenis = () => instance

/** Starts smooth scrolling and returns a cleanup function. */
export function startSmoothScroll() {
  if (!window.matchMedia(MEDIA.motion).matches) return undefined

  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: true })
  const tick = (time) => lenis.raf(time * 1000)

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  instance = lenis

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    instance = null
  }
}

/**
 * Re-measures scroll positions whenever the page height changes (products
 * loading, images arriving), so triggers below that content stay accurate.
 */
export function watchPageHeight() {
  let lastHeight = document.body.scrollHeight
  let timer

  const observer = new ResizeObserver(() => {
    const height = document.body.scrollHeight
    if (Math.abs(height - lastHeight) < 2) return
    lastHeight = height
    clearTimeout(timer)
    timer = setTimeout(refreshTriggers, 200)
  })

  observer.observe(document.body)
  return () => {
    clearTimeout(timer)
    observer.disconnect()
  }
}

/** Puts triggers back in page order (pins first affect what's below them). */
export function refreshTriggers() {
  ScrollTrigger.sort()
  ScrollTrigger.refresh()
}
