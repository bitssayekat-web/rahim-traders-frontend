/**
 * ============================================================================
 *  SmartLink
 * ----------------------------------------------------------------------------
 *  One link component for every destination type so callers never have to
 *  decide between <a> and <Link>:
 *    • "/products", "/#services"  → react-router <Link> (client-side nav)
 *    • "#contact"                 → in-page anchor <a>
 *    • "https://…", "mailto:", "tel:" → plain <a> (new tab for http)
 * ============================================================================
 */

import { Link } from 'react-router-dom'

const isExternal = (to) => /^(https?:|mailto:|tel:)/.test(to)

export default function SmartLink({ to, children, ...rest }) {
  if (isExternal(to)) {
    const opensTab = to.startsWith('http')
    return (
      <a
        href={to}
        {...(opensTab && { target: '_blank', rel: 'noopener noreferrer' })}
        {...rest}
      >
        {children}
      </a>
    )
  }

  if (to.startsWith('#')) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  )
}
