/**
 * ============================================================================
 *  ScaledStage
 * ----------------------------------------------------------------------------
 *  Some Figma pieces are illustrations made of absolutely-positioned layers
 *  (hero product wheel, CTA bag, process panels). Re-flowing them would break
 *  the artwork, so instead we render them at their exact design size and
 *  uniformly scale the whole stage down to fit narrower screens.
 *
 *  The wrapper reserves `designHeight × scale` so content below never overlaps.
 * ============================================================================
 */

import { useLayoutEffect, useRef, useState } from 'react'

/**
 * @param {object} props
 * @param {number} props.designWidth   Artboard width in px (from Figma).
 * @param {number} props.designHeight  Artboard height in px (from Figma).
 * @param {number} [props.maxScale=1]  Never upscale beyond this.
 * @param {number} [props.minScale=0]  Never shrink below this — the stage is
 *                                     then cropped (centred) instead.
 * @param {string} [props.className]   Classes for the outer (fluid) wrapper.
 */
export default function ScaledStage({
  designWidth,
  designHeight,
  maxScale = 1,
  minScale = 0,
  className = '',
  children,
}) {
  const wrapperRef = useRef(null)
  const [scale, setScale] = useState(maxScale)

  // Recalculate on every wrapper resize (viewport change, sidebar, etc.)
  useLayoutEffect(() => {
    const node = wrapperRef.current
    if (!node) return undefined

    const update = () =>
      setScale(Math.min(maxScale, Math.max(minScale, node.clientWidth / designWidth)))
    update()

    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [designWidth, maxScale, minScale])

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: designHeight * scale }}
    >
      <div
        className="absolute top-0 left-1/2 origin-top"
        style={{
          width: designWidth,
          height: designHeight,
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
