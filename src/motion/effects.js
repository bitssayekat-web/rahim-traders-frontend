/**
 * ============================================================================
 *  Reusable scroll effects
 * ----------------------------------------------------------------------------
 *  Call these inside `useScrollMotion`, so selectors stay scoped to the
 *  section and everything is undone on unmount or breakpoint change.
 * ============================================================================
 */

import { gsap, ScrollTrigger } from './gsap'

/** Headings and blocks lift into place once, with a soft stop. */
export function liftIn(targets, vars = {}) {
  gsap.utils.toArray(targets).forEach((element) => {
    gsap.from(element, {
      y: 44,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'power3.out',
      ...vars,
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
    })
  })
}

/** Thin rules draw themselves across (`x`) or down (`y`). */
export function drawLines(targets, axis = 'x') {
  gsap.utils.toArray(targets).forEach((element) => {
    gsap.from(element, {
      [axis === 'x' ? 'scaleX' : 'scaleY']: 0,
      transformOrigin: '0% 0%',
      duration: 1.3,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: element, start: 'top 94%', once: true },
    })
  })
}

/**
 * Counts a stat up from zero the first time it enters the viewport. The final
 * text lives in `data-count`, and is what shows before and after counting.
 *
 * Runs on a timer rather than GSAP's frame ticker on purpose: browsers pause
 * animation frames for inactive windows, which would strand the number at 0.
 *
 * @returns {() => void} Stops counting and restores the final text.
 */
export function countUp(element, duration = 1800) {
  const finalText = element.dataset.count
  const target = Number(finalText.replace(/[^0-9]/g, ''))
  const suffix = finalText.replace(/[0-9,]/g, '')
  let timer

  ScrollTrigger.create({
    trigger: element,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const startedAt = performance.now()
      timer = setInterval(() => {
        const progress = Math.min((performance.now() - startedAt) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        element.textContent = `${Math.round(target * eased).toLocaleString('en-US')}${suffix}`
        if (progress === 1) clearInterval(timer)
      }, 33)
    },
  })

  return () => {
    clearInterval(timer)
    element.textContent = finalText
  }
}
