/**
 * ============================================================================
 *  HOW TO ORDER — CTA panel (home + listing pages)
 * ----------------------------------------------------------------------------
 *  "No checkout. Just talk to us." Royal-blue panel: copy on the left, actions
 *  and contact details on the right, with concentric rings radiating from
 *  behind the actions. Stacks on small screens.
 *  `id="how-to-order"` = footer link target.
 * ============================================================================
 */

import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import WhatsAppButton from '../../components/ui/WhatsAppButton'
import { SITE } from '../../config/site'

/** Ring diameters in px, all centred on the actions column. */
const RING_DIAMETERS = [220, 324, 452, 614]

export default function HowToOrderSection() {
  const { phoneDisplay, phoneE164, email } = SITE.contact

  return (
    <section id="how-to-order" aria-labelledby="order-title" className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-10 overflow-hidden rounded-[36px] bg-royal p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
          {/* ================= Text ================= */}
          <div className="flex flex-col gap-3">
            <p className="text-eyebrow text-sheet">How to order</p>
            <h2 id="order-title" className="text-h2 text-sheet">
              No checkout.
              <br />
              Just talk to us.
            </h2>
            <p className="max-w-[480px] text-base leading-[1.55] text-sheet sm:text-[19px]">
              Custom work is priced by quotation. Either way, you&apos;ll speak to a person before
              anything is printed.
            </p>
          </div>

          {/* ================= Actions + rings ================= */}
          <div className="relative flex shrink-0 flex-col gap-4">
            {RING_DIAMETERS.map((diameter) => (
              <span
                key={diameter}
                aria-hidden="true"
                // The widest rings would cross the copy once the panel stacks
                className={`absolute top-1/2 left-1/2 -translate-1/2 rounded-full border border-sheet/25 ${
                  diameter > 324 ? 'max-lg:hidden' : ''
                }`}
                style={{ width: diameter, height: diameter }}
              />
            ))}

            <div className="relative flex flex-wrap gap-2.5">
              <WhatsAppButton />
              <Button to={`mailto:${email}`} variant="ghost">
                Email
              </Button>
            </div>

            <p className="relative flex flex-wrap gap-x-5 gap-y-1 text-[13px] leading-[1.4] text-sheet">
              <a href={`tel:+${phoneE164}`} className="hover:underline">
                {phoneDisplay}
              </a>
              <a href={`mailto:${email}`} className="break-all hover:underline">
                {email}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
