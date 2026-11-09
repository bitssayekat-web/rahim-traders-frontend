/**
 * ============================================================================
 *  GSAP setup
 * ----------------------------------------------------------------------------
 *  The one place GSAP plugins are registered, plus the media queries that
 *  decide which motion runs. `TRACK` must match the `track:` variant in
 *  index.css, because CSS lays out the sideways process section.
 * ============================================================================
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NO_REDUCE = '(prefers-reduced-motion: no-preference)'

export const MEDIA = {
  motion: NO_REDUCE,
  desktop: `(min-width: 1024px) and ${NO_REDUCE}`,
  track: `(min-width: 1024px) and (min-height: 720px) and ${NO_REDUCE}`,
}

export { gsap, ScrollTrigger }
