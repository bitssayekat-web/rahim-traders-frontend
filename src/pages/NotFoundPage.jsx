/**
 * ============================================================================
 *  404 — unknown route or product slug
 * ============================================================================
 */

import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <Container className="flex flex-col items-center gap-5 py-28 text-center">
      <p className="text-eyebrow text-ink-3">Error 404</p>
      <h1 className="text-h2 text-ink">We couldn’t find that page</h1>
      <p className="max-w-md text-ink-2">
        The link may be outdated, or the product is no longer listed.
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <Button to="/products" variant="royal">
          Browse products
        </Button>
        <Button to="/" variant="light">
          Back to home
        </Button>
      </div>
    </Container>
  )
}
