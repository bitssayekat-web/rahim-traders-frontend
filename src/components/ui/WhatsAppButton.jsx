/**
 * ============================================================================
 *  WhatsAppButton — the site's primary call to action
 * ----------------------------------------------------------------------------
 *  Green pill with the WhatsApp glyph. Ordering happens by conversation, so
 *  every button that opens a chat uses this component to stay identical.
 *
 *  `to` defaults to the generic quote chat; pass a link from
 *  `buildWhatsAppLink()` for a pre-filled message.
 * ============================================================================
 */

import whatsappIcon from '../../assets/icons/whatsapp-solid.svg'
import { DEFAULT_QUOTE_LINK } from '../../utils/whatsapp'
import Button from './Button'

export default function WhatsAppButton({
  to = DEFAULT_QUOTE_LINK,
  children = 'Get a quote on WhatsApp',
  ...rest
}) {
  return (
    <Button to={to} variant="whatsapp" {...rest}>
      <img src={whatsappIcon} alt="" className="size-[18px]" />
      {children}
    </Button>
  )
}
