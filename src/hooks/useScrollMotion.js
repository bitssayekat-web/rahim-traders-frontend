/**
 * ============================================================================
 *  useScrollMotion — runs GSAP code for one section
 * ----------------------------------------------------------------------------
 *  Attach the returned ref to the section. `setup` receives
 *  `{ desktop, track }` and the section element, and only runs when motion is
 *  allowed; every tween and
 *  ScrollTrigger it creates is reverted on unmount or breakpoint change.
 * ============================================================================
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, MEDIA } from '../motion/gsap'

export function useScrollMotion(setup, deps = []) {
  const scope = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia(scope.current ?? undefined)
    media.add(MEDIA, ({ conditions }) => setup(conditions, scope.current))
    return () => media.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}
