/**
 * ============================================================================
 *  HERO SECTION (Figma "Hero" 119:615)
 * ----------------------------------------------------------------------------
 *  1. Hero Copy  — eyebrow pill, display headline, intro, two CTAs.
 *  2. Product Wheel — 9 product cards on a 344px-radius circle that slowly
 *     rotates around the brand lock-up (Figma layer: "Product Wheel (rotates)").
 *
 *  The wheel is an illustration, so it lives on a fixed 1440 × 450 artboard
 *  inside <ScaledStage>; on phones it shrinks to 50% and crops the sides.
 * ============================================================================
 */

import ringOuter from '../../assets/hero/wheel-ring-outer.png'
import ringInner from '../../assets/hero/wheel-ring-inner.png'
import LogoStack from '../../components/brand/LogoStack'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import ImageSlot from '../../components/ui/ImageSlot'
import ScaledStage from '../../components/ui/ScaledStage'
import { HERO_WHEEL_ITEMS } from '../../data/content'
import { DEFAULT_QUOTE_LINK } from '../../utils/whatsapp'

/* ---- Wheel geometry (px, measured on the 1440 × 450 Figma artboard) ---- */
const STAGE = { width: 1440, height: 450 }
const WHEEL_CENTER = { x: 720.5, y: 489 } // pivot of the rotating ring
const WHEEL_RADIUS = 344 // pivot → card centre
const CARD = { width: 202.75, height: 230.5 }

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col items-center gap-10 bg-[linear-gradient(178.6deg,var(--color-azure)_6.9%,var(--color-sheet)_74.7%)] pt-12 sm:pt-[72px]"
    >
      {/* ================= Hero Copy ================= */}
      <Container className="flex flex-col items-center gap-[22px] text-center">
        <p className="rounded-full border border-sheet bg-sheet px-4 py-[7px] text-[13px] leading-[1.4] text-mid shadow-[0_10px_30px_-12px_rgba(18,20,26,0.12)]">
          Custom packaging &amp; printing · Islampur, Dhaka
        </p>

        <h1
          id="hero-title"
          className="font-display text-[40px] leading-[1.06] font-bold tracking-[-0.035em] text-dark sm:text-[56px] lg:text-[74px]"
        >
          Custom Packaging.
          <br />
          Exceptional Printing.
        </h1>

        <p className="max-w-[640px] text-base leading-[1.55] text-mid sm:text-[19px]">
          From custom bags and branded boxes to high-quality printing solutions, we help bring your
          brand to life with packaging designed to make a lasting impression.
        </p>

        <div className="flex flex-wrap justify-center gap-2.5">
          <Button to={DEFAULT_QUOTE_LINK} variant="royal">
            Get a quote →
          </Button>
          <Button to="/products" variant="light">
            Browse products
          </Button>
        </div>
      </Container>

      {/* ================= Product Wheel ================= */}
      <ScaledStage designWidth={STAGE.width} designHeight={STAGE.height} minScale={0.5}>
        <ProductWheel />
      </ScaledStage>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 *  ProductWheel — static rings + logo, rotating ring of cards
 * ------------------------------------------------------------------------ */
function ProductWheel() {
  return (
    <div className="relative size-full" aria-hidden="true">
      {/* ---- Decorative dashed rings behind the logo ---- */}
      <img
        src={ringOuter}
        alt=""
        className="absolute top-[279px] left-[calc(50%+0.5px)] size-[267px] max-w-none -translate-x-1/2"
      />
      <img
        src={ringInner}
        alt=""
        className="absolute top-[304px] left-[calc(50%+0.5px)] size-[217px] max-w-none -translate-x-1/2"
      />

      {/* ---- Brand lock-up at the centre ---- */}
      <LogoStack className="absolute top-[365px] left-[674px] w-[95px]" />

      {/* ---- Rotating ring (pivot = wheel centre). Pauses on hover. ---- */}
      <div
        className="absolute size-0 animate-wheel hover:[animation-play-state:paused]"
        style={{ left: WHEEL_CENTER.x, top: WHEEL_CENTER.y }}
      >
        {HERO_WHEEL_ITEMS.map((item) => (
          <WheelCard key={item.label} {...item} />
        ))}
      </div>
    </div>
  )
}

/**
 * One "Wheel Card / …" — white frame, gradient tile, image slot and label.
 * Positioned 12 o'clock above the pivot, then rotated by `angle` around it.
 */
function WheelCard({ label, angle, image }) {
  return (
    <figure
      className="absolute flex flex-col gap-[8.5px] rounded-[19.2px] bg-sheet px-[9.6px] pt-[9.6px] pb-[10.7px] drop-shadow-[0_27.7px_26.7px_rgba(23,51,110,0.3)]"
      style={{
        width: CARD.width,
        height: CARD.height,
        left: -CARD.width / 2,
        top: -(WHEEL_RADIUS + CARD.height / 2),
        transform: `rotate(${angle}deg)`,
        transformOrigin: `${CARD.width / 2}px ${WHEEL_RADIUS + CARD.height / 2}px`,
      }}
    >
      {/* Tile: soft radial gradient frame around the product image */}
      <div className="flex min-h-0 flex-1 flex-col rounded-[12.8px] bg-[radial-gradient(50%_50%_at_50%_50%,#ffffff_0%,#eef2f8_80%)] p-[17px]">
        <ImageSlot src={image} alt={label} className="min-h-0 flex-1 rounded-[8.5px]" />
      </div>
      <figcaption className="truncate font-display text-[14.94px] leading-[1.3] font-semibold tracking-[-0.015em] text-ink">
        {label}
      </figcaption>
    </figure>
  )
}
