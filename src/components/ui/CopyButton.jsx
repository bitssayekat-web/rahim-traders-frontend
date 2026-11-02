/**
 * ============================================================================
 *  CopyButton — "Copy" pill used on the footer contact cards
 * ----------------------------------------------------------------------------
 *  Copies `value` to the clipboard and briefly confirms with "Copied".
 * ============================================================================
 */

import { useEffect, useState } from 'react'

const RESET_AFTER_MS = 1800

export default function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)

  // Revert the label after a short confirmation window
  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), RESET_AFTER_MS)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard can be blocked (insecure origin / permissions) — fail silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="shrink-0 rounded-full border border-sheet/20 px-3 py-2 text-[13px] leading-[1.4] font-semibold text-sheet transition-colors hover:bg-sheet/10"
    >
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}
