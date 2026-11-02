/**
 * ============================================================================
 *  Container
 * ----------------------------------------------------------------------------
 *  The Figma frames use a 1200px content column centred in 1440px. Below that
 *  width we fall back to fluid gutters (16px → 24px → 40px).
 * ============================================================================
 */

export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 xl:box-content xl:px-0 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
