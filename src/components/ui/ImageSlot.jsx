/**
 * ============================================================================
 *  ImageSlot
 * ----------------------------------------------------------------------------
 *  Every "Image / …" layer in Figma is an empty placeholder waiting for a real
 *  photo. This component renders the photo when `src` is provided (e.g. from
 *  the API) and the design's flat placeholder colour otherwise, so the layout
 *  never shifts when images arrive.
 * ============================================================================
 */

/**
 * @param {object} props
 * @param {string} [props.src]       Image URL — omit to show the placeholder.
 * @param {string} props.alt         Always describe the product for a11y.
 * @param {string} [props.tone]      Placeholder background (Tailwind class).
 * @param {string} [props.className] Size / radius / layout classes.
 * @param {string} [props.position]  CSS object-position for the crop focus.
 * @param {object} [props.style]     Extra inline styles (e.g. animationDelay).
 */
export default function ImageSlot({ src, alt, tone = 'bg-placeholder', className = '', position, style }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`object-cover ${className}`}
        style={{ ...(position && { objectPosition: position }), ...style }}
      />
    )
  }

  return <div role="img" aria-label={alt} className={`${tone} ${className}`} style={style} />
}
