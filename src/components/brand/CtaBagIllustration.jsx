/**
 * ============================================================================
 *  CtaBagIllustration — "3D Bag Illustration" (How to Order › 119:1025)
 * ----------------------------------------------------------------------------
 *  Branded shopping bag + hang tag + cube, built from the Figma vector layers
 *  on a fixed 440 × 360 artboard. Wrap it in <ScaledStage> to make it fluid.
 * ============================================================================
 */

import shadow from '../../assets/cta-bag/v0.svg'
import tagString from '../../assets/cta-bag/v1.svg'
import hangTag from '../../assets/cta-bag/v2.svg'
import handleBack from '../../assets/cta-bag/v3.svg'
import handleFront from '../../assets/cta-bag/v4.svg'
import bagFront from '../../assets/cta-bag/v5.svg'
import bagSide from '../../assets/cta-bag/v6.svg'
import bagTop from '../../assets/cta-bag/v7.svg'
import stripeCyan from '../../assets/cta-bag/v8.svg'
import stripeMagenta from '../../assets/cta-bag/v9.svg'
import stripeYellow from '../../assets/cta-bag/v10.svg'
import stripeBlack from '../../assets/cta-bag/v11.svg'
import cubeTop from '../../assets/cta-bag/v12.svg'
import cubeLeft from '../../assets/cta-bag/v13.svg'
import cubeRight from '../../assets/cta-bag/v14.svg'

export const BAG_ARTBOARD = { width: 440, height: 360 }

/**
 * Layer insets copied from Figma as [top, right, bottom, left] percentages,
 * plus an optional bleed (stroke overflow) in the same order.
 */
const LAYERS = [
  { src: shadow, inset: '86.67% 15.91% 3.33% 20.45%' },
  { src: tagString, inset: '16.67% 70.45% 80.56% 13.64%', bleed: '-4.95% -0.1%' },
  { src: handleBack, inset: '17.36% 38.64% 72.22% 43.18%', bleed: '-9.33% -4.38% 0 -4.38%' },
  { src: handleFront, inset: '19.1% 40.91% 69.44% 39.77%', bleed: '-8.48% -4.12% 0 -4.12%' },
  { src: bagFront, inset: '30% 31.82% 11.67% 34.09%' },
  { src: bagSide, inset: '25.56% 23.18% 11.67% 68.18%' },
  { src: bagTop, inset: '25.56% 23.18% 70% 34.09%' },
  { src: stripeCyan, inset: '84.44% 57.39% 11.67% 34.09%' },
  { src: stripeMagenta, inset: '84.44% 48.86% 11.67% 42.61%' },
  { src: stripeYellow, inset: '84.44% 40.34% 11.67% 51.14%' },
  { src: stripeBlack, inset: '84.44% 31.82% 11.67% 59.66%' },
  { src: cubeTop, inset: '61.67% 2.27% 28.33% 81.82%' },
  { src: cubeLeft, inset: '66.67% 10.91% 16.67% 81.82%' },
  { src: cubeRight, inset: '66.67% 2.27% 16.67% 89.09%' },
]

export default function CtaBagIllustration() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: BAG_ARTBOARD.width, height: BAG_ARTBOARD.height }}
      role="img"
      aria-label="Rahim Traders branded shopping bag with a hang tag"
    >
      {/* ---- Vector layers (back → front, as stacked in Figma) ---- */}
      {LAYERS.slice(0, 2).map(renderLayer)}

      {/* ---- Hang tag: 70×108 group rotated −6°, centred in its frame ---- */}
      <div
        className="absolute flex items-center justify-center"
        style={{ inset: '20.73% 69.17% 47.4% 12.44%' }}
      >
        <img src={hangTag} alt="" className="block h-[108px] w-[70px] max-w-none -rotate-6" />
      </div>

      {LAYERS.slice(2).map(renderLayer)}

      {/* ---- Live text on the artwork ---- */}
      <span className="absolute top-[118px] left-[84px] flex size-[21px] items-center justify-center">
        <span className="-rotate-6 font-display text-[15px] leading-[1.3] font-extrabold tracking-[-0.015em] whitespace-nowrap text-sheet">
          RT
        </span>
      </span>
      <span className="absolute top-[200px] left-[168px] font-display text-base leading-[1.3] font-extrabold tracking-[-0.015em] whitespace-nowrap text-ink">
        RAHIM traders
      </span>
    </div>
  )
}

/** Renders one absolutely-positioned vector, honouring stroke bleed. */
function renderLayer({ src, inset, bleed }, index) {
  return (
    <div key={index} className="absolute" style={{ inset }}>
      {bleed ? (
        <div className="absolute" style={{ inset: bleed }}>
          <img src={src} alt="" className="block size-full max-w-none" />
        </div>
      ) : (
        <img src={src} alt="" className="absolute inset-0 block size-full max-w-none" />
      )}
    </div>
  )
}
