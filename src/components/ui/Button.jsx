/**
 * ============================================================================
 *  Button — Figma component "Button" (node 119:493)
 * ----------------------------------------------------------------------------
 *  "Pill button. Styles: Dark (primary), Light (secondary), WhatsApp,
 *   White (on blue), Ghost (on blue)." — plus `royal`, the blue hero CTA.
 *
 *  Renders as:
 *    • <SmartLink> when `to` is given (internal route, anchor or external URL)
 *    • <button>    otherwise
 * ============================================================================
 */

import SmartLink from './SmartLink'

const VARIANTS = {
  dark: 'bg-ink text-sheet hover:bg-ink/85',
  light: 'bg-sheet text-ink border border-line hover:border-line-2 hover:bg-paper',
  royal: 'bg-royal text-sheet hover:bg-royal/90',
  whatsapp: 'bg-whatsapp text-sheet hover:brightness-95',
  white: 'bg-sheet text-dark hover:bg-lavender',
  ghost: 'border border-sheet/50 text-sheet hover:bg-sheet/10',
}

const SIZES = {
  sm: 'h-10 px-[22px]', // 40px — navigation bar
  md: 'h-12 px-[22px]', // 48px — default
  lg: 'h-14 px-[22px]', // 56px — product quote form
}

export default function Button({
  variant = 'dark',
  size = 'md',
  to,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full',
    'text-[15px] leading-none font-semibold whitespace-nowrap',
    'transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ')

  if (to) {
    return (
      <SmartLink to={to} className={classes} {...rest}>
        {children}
      </SmartLink>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
