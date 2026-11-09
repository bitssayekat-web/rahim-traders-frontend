/**
 * ============================================================================
 *  SPECIFICATION SECTION — two-column spec table (Figma 119:1454)
 * ----------------------------------------------------------------------------
 *  Rows are derived from the product object, so API data drops straight in.
 *  Uses a <dl> for correct term/description semantics; stacks on phones.
 * ============================================================================
 */

import { useScrollMotion } from '../../hooks/useScrollMotion'
import { drawLines, liftIn } from '../../motion/effects'
import { getCategoryLabel } from '../../services/productService'

/** "a · b · c" — the separator used throughout the design. */
const join = (list = []) => list.join(' · ')

export default function SpecificationSection({ product }) {
  const scope = useScrollMotion(() => {
    liftIn('h2')
    drawLines('[data-rule-x]')
  })

  const rows = [
    ['Category', getCategoryLabel(product.categoryId)],
    ['Sizes', join(product.options.sizes)],
    ['Materials', join(product.options.materials)],
    ['Printing', join(product.options.printing)],
    ['Finishing', join(product.options.finishing)],
    ['Minimum order', `${product.minOrder.toLocaleString('en-US')} pcs`],
    ['Production time', product.productionTime],
  ].filter(([, value]) => Boolean(value))

  return (
    <section ref={scope} aria-labelledby="spec-title" className="bg-paper pt-16">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-4 pb-8 sm:px-6 lg:px-10 xl:box-content xl:px-0">
        <h2 id="spec-title" className="font-display text-[28px] font-extrabold tracking-[-0.035em] text-ink sm:text-[36px]">
          Specification
        </h2>

        <dl className="overflow-hidden rounded-2xl bg-sheet font-display font-extrabold">
          {rows.map(([term, value], index) => (
            <div
              key={term}
              className="relative flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
            >
              {index < rows.length - 1 && (
                <span data-rule-x className="absolute inset-x-0 bottom-0 h-px bg-divider" />
              )}
              <dt className="text-base text-ink-soft sm:flex-1 sm:text-xl">{term}</dt>
              <dd className="text-base text-ink sm:flex-1 sm:text-xl">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
