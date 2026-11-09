/**
 * ============================================================================
 *  VALUES SECTION — four brand promises (Figma 119:710)
 * ----------------------------------------------------------------------------
 *  Desktop: one row with vertical dividers. Tablet: 2 × 2. Phone: stacked
 *  with horizontal dividers.
 * ============================================================================
 */

import Container from '../../components/ui/Container'
import GlassIcon from '../../components/ui/GlassIcon'
import { VALUES } from '../../data/content'
import { useScrollMotion } from '../../hooks/useScrollMotion'
import { drawLines } from '../../motion/effects'

/** Which breakpoints show each item's top rule and left rule. */
const TOP_RULE = ['hidden', 'sm:hidden', 'lg:hidden', 'lg:hidden']
const LEFT_RULE = ['hidden', 'hidden sm:block', 'hidden lg:block', 'hidden sm:block']

export default function ValuesSection() {
  const scope = useScrollMotion(() => {
    drawLines('[data-rule-x]')
    drawLines('[data-rule-y]', 'y')
  })

  return (
    <section ref={scope} aria-label="Our values" className="border-y border-line bg-sheet py-12">
      <Container>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <li
              key={value.title}
              className={[
                'relative flex items-center gap-3.5 py-[22px]',
                index % 2 === 1 && 'sm:pl-6',
                index === 2 && 'lg:pl-6',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span data-rule-x className={`absolute inset-x-0 top-0 h-px bg-line ${TOP_RULE[index]}`} />
              <span data-rule-y className={`absolute inset-y-0 left-0 w-px bg-line ${LEFT_RULE[index]}`} />
              <GlassIcon name={value.icon} tone={value.tone} className="size-12 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[15.5px] leading-[1.3] font-semibold text-dark">{value.title}</h3>
                <p className="text-sm leading-[1.5] text-mid">{value.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
