/**
 * ============================================================================
 *  LogoStack — stacked "printer + RAHIM traders" mark (hero wheel centre)
 * ----------------------------------------------------------------------------
 *  Figma ships this lock-up as 35 vector layers (Hero › Group 119:636).
 *  Positions below are converted from the design's insets to percentages of
 *  the 95 × 60 lock-up, so it scales cleanly with any width.
 * ============================================================================
 */

import v0 from '../../assets/hero/logo-stack/v0.svg'
import v1 from '../../assets/hero/logo-stack/v1.svg'
import v2 from '../../assets/hero/logo-stack/v2.svg'
import v3 from '../../assets/hero/logo-stack/v3.svg'
import v4 from '../../assets/hero/logo-stack/v4.svg'
import v5 from '../../assets/hero/logo-stack/v5.svg'
import v6 from '../../assets/hero/logo-stack/v6.svg'
import v7 from '../../assets/hero/logo-stack/v7.svg'
import v8 from '../../assets/hero/logo-stack/v8.svg'
import v9 from '../../assets/hero/logo-stack/v9.svg'
import v10 from '../../assets/hero/logo-stack/v10.svg'
import v11 from '../../assets/hero/logo-stack/v11.svg'
import v12 from '../../assets/hero/logo-stack/v12.svg'
import v13 from '../../assets/hero/logo-stack/v13.svg'
import v14 from '../../assets/hero/logo-stack/v14.svg'
import v15 from '../../assets/hero/logo-stack/v15.svg'
import v16 from '../../assets/hero/logo-stack/v16.svg'
import v17 from '../../assets/hero/logo-stack/v17.svg'
import v18 from '../../assets/hero/logo-stack/v18.svg'
import v19 from '../../assets/hero/logo-stack/v19.svg'
import v20 from '../../assets/hero/logo-stack/v20.svg'
import v21 from '../../assets/hero/logo-stack/v21.svg'
import v22 from '../../assets/hero/logo-stack/v22.svg'
import v23 from '../../assets/hero/logo-stack/v23.svg'
import v24 from '../../assets/hero/logo-stack/v24.svg'
import v25 from '../../assets/hero/logo-stack/v25.svg'
import v26 from '../../assets/hero/logo-stack/v26.svg'
import v27 from '../../assets/hero/logo-stack/v27.svg'
import v28 from '../../assets/hero/logo-stack/v28.svg'
import v29 from '../../assets/hero/logo-stack/v29.svg'

/** [src, top%, left%, width%, height%] — relative to the 95×60 lock-up. */
const LAYERS = [
  // "RAHIM" letter tiles — dark squares, CMYK plates and baseline strips
  [v0, 48.16, 0, 18.21, 28.88],
  [v0, 48.16, 20.33, 18.36, 28.88],
  [v1, 48.16, 40.82, 18.36, 28.88],
  [v1, 48.16, 61.31, 18.21, 28.88],
  [v2, 48.16, 81.79, 18.21, 28.88],
  [v3, 62.57, 0, 18.21, 14.48],
  [v3, 62.57, 20.33, 18.36, 14.48],
  [v4, 62.57, 40.82, 18.36, 14.48],
  [v4, 62.57, 61.31, 18.21, 14.48],
  [v5, 62.57, 81.79, 18.21, 14.48],
  [v6, 75.54, 0, 18.21, 1.5],
  [v6, 75.54, 20.33, 18.36, 1.5],
  [v7, 75.54, 40.82, 18.36, 1.5],
  [v8, 75.54, 81.79, 18.21, 1.5],
  [v9, 75.54, 61.31, 18.21, 1.5],
  // Letter glyphs R A H I M
  [v10, 50.86, 23.67, 11.84, 23.41],
  [v11, 50.86, 44.01, 11.84, 23.41],
  [v12, 50.86, 68.89, 3.03, 23.41],
  [v13, 50.71, 83.46, 14.87, 23.71],
  [v14, 50.86, 3.19, 11.84, 23.41],
  // "traders" word mark
  [v15, 82.15, 0, 4.1, 17.55],
  [v16, 86.57, 13.66, 4.1, 13.13],
  [v17, 86.57, 26.71, 8.35, 13.43],
  [v18, 82, 45.52, 8.35, 18],
  [v19, 86.57, 64.34, 8.19, 13.43],
  [v20, 86.57, 82.55, 4.1, 13.13],
  [v21, 86.57, 95.14, 4.86, 13.43],
  // Printer icon + CMYK ink drops
  [v22, 0, 39.61, 10.17, 6.23],
  [v23, 8.4, 32.63, 17.15, 21.98],
  [v24, 0, 49.77, 10.62, 6.23],
  [v25, 8.4, 49.77, 17.6, 21.98],
  [v26, 28.06, 40.21, 6.68, 11.55],
  [v27, 28.06, 46.13, 3.64, 11.55],
  [v28, 28.06, 53.11, 6.53, 11.55],
  [v29, 28.06, 49.77, 4.1, 11.55],
]

export default function LogoStack({ className = '' }) {
  return (
    <div className={`relative aspect-[95/60] ${className}`} role="img" aria-label="Rahim Traders">
      {LAYERS.map(([src, top, left, width, height], index) => (
        <img
          key={index}
          src={src}
          alt=""
          className="absolute block max-w-none"
          style={{ top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%` }}
        />
      ))}
    </div>
  )
}
