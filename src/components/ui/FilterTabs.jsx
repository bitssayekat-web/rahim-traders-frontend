/**
 * ============================================================================
 *  FilterTabs — Figma component "Tab" (Active / Default)
 * ----------------------------------------------------------------------------
 *  Pill tabs with a count badge used to filter the catalogue. Horizontally
 *  scrollable on small screens instead of wrapping to several rows.
 * ============================================================================
 */

/**
 * @param {object} props
 * @param {Array<{ id: string|null, label: string, count?: number }>} props.items
 * @param {string|null} props.activeId
 * @param {(id: string|null) => void} props.onChange
 * @param {string} [props.ariaLabel]
 */
export default function FilterTabs({ items, activeId, onChange, ariaLabel = 'Filter products' }) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item) => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id ?? 'all'}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={[
              'flex h-[42px] shrink-0 items-center gap-2 rounded-full border px-[18px] whitespace-nowrap',
              'transition-colors duration-200',
              isActive
                ? 'border-navy bg-royal text-sheet'
                : 'border-line-2 bg-sheet text-ink-2 hover:border-ink-3',
            ].join(' ')}
          >
            <span className="text-[14.5px] leading-[1.2] font-medium">{item.label}</span>
            {item.count !== undefined && (
              <span className={`text-[11px] leading-[1.4] ${isActive ? 'text-sheet' : 'text-ink-3'}`}>
                {item.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
