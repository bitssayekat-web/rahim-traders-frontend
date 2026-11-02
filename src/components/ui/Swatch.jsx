/**
 * ============================================================================
 *  Swatch — the small CMYK "ink bars" used as accents above titles & labels
 * ============================================================================
 */

/**
 * @param {{ tones: string[], width?: string }} props
 *   tones  Tailwind bg classes, e.g. ['bg-cyan', 'bg-magenta']
 *   width  Tailwind width class (22px in cards, 26px in metrics)
 */
export default function Swatch({ tones, width = 'w-[22px]' }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {tones.map((tone, index) => (
        <span key={index} className={`h-1.5 rounded-[3px] ${width} ${tone}`} />
      ))}
    </span>
  )
}
