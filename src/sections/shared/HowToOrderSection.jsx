/**
 * ============================================================================
 *  HOW TO ORDER — CTA panel (Figma 119:1013 home · 119:1218 listing)
 * ----------------------------------------------------------------------------
 *  "No checkout. Just talk to us." Royal-blue panel with WhatsApp + Email
 *  actions on the left and the 3D bag illustration on the right.
 *  `id="how-to-order"` = footer link target.
 * ============================================================================
 */

import CtaBagIllustration, { BAG_ARTBOARD } from '../../components/brand/CtaBagIllustration'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import ScaledStage from '../../components/ui/ScaledStage'
import { SITE } from '../../config/site'
import { DEFAULT_QUOTE_LINK } from '../../utils/whatsapp'

export default function HowToOrderSection() {
  const { phoneDisplay, phoneE164, email } = SITE.contact

  return (
    <section id="how-to-order" aria-labelledby="order-title" className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-center gap-6 overflow-hidden rounded-[36px] bg-royal p-8 sm:p-12 lg:flex-row lg:p-16">
          {/* ================= Text ================= */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <p className="text-eyebrow text-sheet">How to order</p>
            <h2 id="order-title" className="text-h2 text-sheet">
              No checkout.
              <br />
              Just talk to us.
            </h2>
            <p className="max-w-[480px] text-base leading-[1.55] text-sheet sm:text-[19px]">
              Some products have fixed prices; custom work is priced by quotation. Either way,
              you&apos;ll speak to a person before anything is printed.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-3">
              <Button to={DEFAULT_QUOTE_LINK} variant="whatsapp">
                Get a quote on WhatsApp
              </Button>
              <Button to={`mailto:${email}`} variant="ghost">
                Email
              </Button>
            </div>

            <p className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] leading-[1.4] text-sheet">
              <a href={`tel:+${phoneE164}`} className="hover:underline">
                {phoneDisplay}
              </a>
              <a href={`mailto:${email}`} className="break-all hover:underline">
                {email}
              </a>
            </p>
          </div>

          {/* ================= Illustration ================= */}
          <ScaledStage
            designWidth={BAG_ARTBOARD.width}
            designHeight={BAG_ARTBOARD.height}
            className="max-w-[440px] shrink-0"
          >
            <CtaBagIllustration />
          </ScaledStage>
        </div>
      </Container>
    </section>
  )
}
