/**
 * ============================================================================
 *  VALUES SECTION — four brand promises (Figma 119:710)
 * ----------------------------------------------------------------------------
 *  Desktop: one row with vertical dividers. Tablet: 2 × 2. Phone: stacked
 *  with horizontal dividers.
 * ============================================================================
 */

import Container from '../../components/ui/Container'
import { VALUES } from '../../data/content'

export default function ValuesSection() {
  return (
    <section aria-label="Our values" className="border-y border-line bg-sheet py-12">
      <Container>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <li
              key={value.title}
              className={[
                'flex items-center gap-3.5 py-[22px]',
                // Dividers: top border on stacked rows, left border between columns
                index > 0 && 'border-t border-line sm:border-t-0',
                index % 2 === 1 && 'sm:border-l sm:pl-6',
                index >= 2 && 'sm:border-t lg:border-t-0',
                index === 2 && 'lg:border-l lg:pl-6',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className={`flex size-[42px] shrink-0 items-center justify-center rounded-xl ${value.tone}`}>
                <img src={value.icon} alt="" className="size-5" />
              </span>
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
