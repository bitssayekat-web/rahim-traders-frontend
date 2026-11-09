/**
 * ============================================================================
 *  Navbar — main navigation (Figma 119:568)
 * ----------------------------------------------------------------------------
 *  Desktop (≥ lg): logo · inline menu · WhatsApp CTA — exactly as designed.
 *  Mobile / tablet: logo · hamburger → slide-down panel with the same links
 *  and a full-width CTA. The panel closes on route change and on Escape.
 * ============================================================================
 */

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/brand/logo.svg'
import { NAV_LINKS } from '../../config/site'
import Container from '../ui/Container'
import SmartLink from '../ui/SmartLink'
import WhatsAppButton from '../ui/WhatsAppButton'

export default function Navbar() {
  const location = useLocation()
  const routeKey = location.pathname + location.hash

  // The menu remembers which route it was opened on, so it closes itself
  // automatically on navigation without a state-syncing effect.
  const [openOnRoute, setOpenOnRoute] = useState(null)
  const isOpen = openOnRoute === routeKey
  const setIsOpen = (open) => setOpenOnRoute(open ? routeKey : null)

  // Allow closing with the Escape key for keyboard users
  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setOpenOnRoute(null)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <nav aria-label="Main" className="relative bg-paper py-4">
      <Container className="flex items-center justify-between gap-6">
        {/* ---- Brand ---- */}
        <Link to="/" aria-label="Rahim Traders — home" className="shrink-0">
          <img src={logo} alt="Rahim Traders" className="h-10 w-auto sm:h-14" />
        </Link>

        {/* ---- Desktop menu ---- */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <SmartLink
                to={link.to}
                className="text-[15px] leading-[1.2] font-medium text-ink-2 transition-colors hover:text-royal"
              >
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>

        {/* Wrapper owns the visibility — Button sets its own `display` */}
        <div className="hidden lg:block">
          <WhatsAppButton size="sm" />
        </div>

        {/* ---- Mobile toggle ---- */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="flex size-11 items-center justify-center rounded-full border border-line-2 bg-sheet text-ink lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      {/* ---- Mobile panel ---- */}
      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full z-40 border-b border-line bg-paper shadow-[0_20px_40px_-20px_rgba(18,20,26,0.25)] lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <SmartLink
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-2 py-3 text-base font-medium text-ink-2 hover:bg-sheet hover:text-royal"
            >
              {link.label}
            </SmartLink>
          ))}
          <WhatsAppButton className="mt-3 w-full" />
        </Container>
      </div>
    </nav>
  )
}
