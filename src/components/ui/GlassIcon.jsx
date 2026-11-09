/**
 * ============================================================================
 *  GlassIcon — frosted-glass illustrated icons
 * ----------------------------------------------------------------------------
 *  Each icon is two stacked shapes: a solid gradient piece at the back and a
 *  tinted glass piece in front. The "frost" is real: a blurred copy of the
 *  back shape is clipped to the front shape, so it never depends on the CSS
 *  backdrop-filter and stays crisp at any size. White glyphs sit on the
 *  overlap, where the colour is strongest.
 *
 *  Used by the Values strip and the Why Choose Us pillars.
 * ============================================================================
 */

import { useId } from 'react'

/** Gradient stops [light, deep] for each colour. */
const TONES = {
  cyan: ['#4fd0f7', '#0a84d0'],
  magenta: ['#ff7db3', '#d9207c'],
  amber: ['#ffd24d', '#f5841f'],
  violet: ['#c07bff', '#7b3fe4'],
}

/** Rounded rectangle as a path, so every shape can share one renderer. */
const roundedRect = (x, y, w, h, r) =>
  `M${x + r} ${y}H${x + w - r}a${r} ${r} 0 0 1 ${r} ${r}V${y + h - r}a${r} ${r} 0 0 1 -${r} ${r}H${x + r}a${r} ${r} 0 0 1 -${r} -${r}V${y + r}a${r} ${r} 0 0 1 ${r} -${r}Z`

/** Circle as a path, for the same reason. */
const circle = (cx, cy, r) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 -${r * 2} 0Z`

/**
 * Artwork on a 64 × 64 grid.
 *   back / front  path data for the two layers
 *   fill          white filled glyph path
 *   stroke        white outlined glyph path
 */
const ICONS = {
  premium: {
    back: 'M26 8H50L60 20L38 44L16 20Z',
    front: 'M16 20H44L56 34L30 60L4 34Z',
    fill: 'M30 26L33 33L40 36L33 39L30 46L27 39L20 36L27 33Z',
  },
  clock: {
    back: circle(41, 23, 18),
    front: circle(29, 36, 23),
    stroke: 'M29 24V36L38 41',
  },
  pencil: {
    back: roundedRect(26, 6, 32, 32, 9),
    front: roundedRect(8, 20, 38, 38, 11),
    stroke: 'M19 48L21 41L33 29L38 34L26 46Z',
  },
  support: {
    back: roundedRect(20, 6, 40, 34, 10),
    front: 'M14 18H38a10 10 0 0 1 10 10V42a10 10 0 0 1 -10 10H24L14 60V52a10 10 0 0 1 -10 -10V28a10 10 0 0 1 10 -10Z',
    stroke: 'M16 39V34a10 10 0 0 1 20 0V39M16 37V41M36 37V41',
  },
  printer: {
    back: roundedRect(18, 4, 28, 32, 5),
    front: roundedRect(5, 24, 54, 30, 10),
    stroke: 'M18 44H46',
    fill: circle(48, 33, 2.5),
  },
  custom: {
    back: roundedRect(24, 6, 34, 36, 9),
    front: 'M14 18H38a8 8 0 0 1 8 8V58L26 50L6 58V26a8 8 0 0 1 8 -8Z',
    stroke: 'M26 28V42M19 35H33',
  },
  person: {
    back: circle(32, 20, 15),
    front: 'M8 58C8 42 20 30 32 30C44 30 56 42 56 58a4 4 0 0 1 -4 4H12a4 4 0 0 1 -4 -4Z',
    stroke: 'M25 47L30 52L40 41',
  },
  truck: {
    back: roundedRect(4, 12, 38, 32, 7),
    front: 'M24 22H44a4 4 0 0 1 3 1.4L58 36V46a6 6 0 0 1 -6 6H24a6 6 0 0 1 -6 -6V28a6 6 0 0 1 6 -6Z',
    fill: `${circle(28, 52, 5)}${circle(48, 52, 5)}`,
    stroke: 'M41 28H45L51 36H41Z',
  },
}

/**
 * @param {object} props
 * @param {keyof typeof ICONS} props.name
 * @param {keyof typeof TONES} props.tone
 * @param {string} [props.className]  Size classes, e.g. `size-12`.
 */
export default function GlassIcon({ name, tone, className = '' }) {
  // React's ids can contain characters that are unsafe inside url(#…)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const { back, front, fill, stroke } = ICONS[name]
  const [light, deep] = TONES[tone]

  return (
    <svg viewBox="0 0 64 64" className={`overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <filter id={`${uid}b`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={`${uid}s`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={deep} floodOpacity="0.35" />
        </filter>
        <clipPath id={`${uid}c`}>
          <path d={front} />
        </clipPath>
      </defs>

      {/* ---- Solid back piece + soft coloured glow ---- */}
      <path d={back} fill={`url(#${uid}g)`} filter={`url(#${uid}s)`} />

      {/* ---- Frosted front piece: blurred back, colour tint, glass edge ---- */}
      <g filter={`url(#${uid}s)`}>
        <g clipPath={`url(#${uid}c)`}>
          <rect width="64" height="64" fill="#ffffff" />
          <path d={back} fill={`url(#${uid}g)`} filter={`url(#${uid}b)`} />
        </g>
        <path d={front} fill={`url(#${uid}g)`} fillOpacity="0.55" />
        <path d={front} fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="1" />
      </g>

      {/* ---- White glyph on the overlap ---- */}
      {fill && <path d={fill} fill="#ffffff" />}
      {stroke && (
        <path
          d={stroke}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
