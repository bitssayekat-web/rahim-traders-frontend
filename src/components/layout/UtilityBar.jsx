/**
 * ============================================================================
 *  UtilityBar — slim navy strip above the navigation (Figma 119:558)
 * ----------------------------------------------------------------------------
 *  Phone on the left, shop address on the right. The address hides on small
 *  phones so the bar stays a single line.
 * ============================================================================
 */

import phoneIcon from '../../assets/icons/phone.svg'
import locationIcon from '../../assets/icons/location.svg'
import { SITE } from '../../config/site'
import Container from '../ui/Container'

export default function UtilityBar() {
  const { phoneDisplay, phoneE164, addressShort } = SITE.contact

  return (
    <div className="bg-navy py-[9px] text-[13px] leading-[1.4]">
      <Container className="flex items-center justify-between gap-4">
        <a
          href={`tel:+${phoneE164}`}
          className="flex items-center gap-2 font-semibold text-sheet hover:underline"
        >
          <img src={phoneIcon} alt="" className="size-6" />
          {phoneDisplay}
        </a>

        <p className="hidden items-center gap-2 text-line-2 sm:flex">
          <img src={locationIcon} alt="" className="size-6" />
          <span className="truncate">{addressShort}</span>
        </p>
      </Container>
    </div>
  )
}
