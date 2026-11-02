/**
 * ============================================================================
 *  useAsync — tiny data-fetching hook
 * ----------------------------------------------------------------------------
 *  Runs an async function whenever `deps` change and exposes
 *  `{ data, loading, error }`. Stale responses are ignored, so quickly
 *  switching filter tabs can never render an older result over a newer one.
 *
 *  Kept dependency-free on purpose; swap for TanStack Query later if caching
 *  / refetching becomes necessary.
 * ============================================================================
 */

import { useEffect, useState } from 'react'

/**
 * @template T
 * @param {() => Promise<T>} asyncFn
 * @param {unknown[]} deps  Re-run trigger (same semantics as useEffect).
 * @returns {{ data: T | undefined, loading: boolean, error: Error | null }}
 */
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: undefined, loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, loading: true, error: null }))

    asyncFn()
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ data: undefined, loading: false, error }))

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
