/**
 * ============================================================================
 *  Footer (Figma 119:1045)
 * ----------------------------------------------------------------------------
 *  Printing-press photo under a dark gradient overlay, then four columns:
 *  Brand + contact cards · Quick links · Our products · Follow us.
 *  Columns collapse to 2-up on tablet and a single stack on phones.
 *  `id="contact"` is the target of the "Contact" nav link.
 * ============================================================================
 */

import pressPhoto from '../../assets/footer/printing-press-bg.png'
import logoWhite from '../../assets/brand/logo-white.svg'
import phoneIcon from '../../assets/icons/phone-outline.svg'
import mailIcon from '../../assets/icons/mail.svg'
import facebookIcon from '../../assets/icons/facebook.svg'
import instagramIcon from '../../assets/icons/instagram.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import { SITE } from '../../config/site'
import { FOOTER_PRODUCT_LINKS, FOOTER_QUICK_LINKS } from '../../data/content'
import { DEFAULT_QUOTE_LINK } from '../../utils/whatsapp'
import Container from '../ui/Container'
import CopyButton from '../ui/CopyButton'
import SmartLink from '../ui/SmartLink'

const SOCIALS = [
  { label: 'Facebook', href: SITE.social.facebook, icon: facebookIcon },
  { label: 'Instagram', href: SITE.social.instagram, icon: instagramIcon },
  { label: 'WhatsApp', href: DEFAULT_QUOTE_LINK, icon: whatsappIcon },
]

/** Computed once at module load — avoids an impure call during render. */
const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const { phoneDisplay, email, addressFull } = SITE.contact

  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-footer pt-[72px] pb-7">
      {/* ---- Background photo + overlay ---- */}
      <img
        src={pressPhoto}
        alt=""
        className="absolute inset-0 -z-20 size-full object-cover object-[50%_55%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(10,13,18,0.94)] via-[rgba(10,13,18,0.8)] via-45% to-[rgba(10,13,18,0.97)]" />

      <Container className="flex flex-col gap-11">
        {/* ================= Columns ================= */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[420px_170px_260px_auto] lg:gap-12">
          {/* ---- Brand + contact ---- */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <img src={logoWhite} alt="Rahim Traders" className="h-14 w-auto self-start" />
            <address className="max-w-[320px] text-sm leading-[1.5] text-sheet not-italic">
              {addressFull}
            </address>

            <ContactCard icon={phoneIcon} label="Phone & WhatsApp" value={phoneDisplay} />
            <ContactCard icon={mailIcon} label="Email" value={email} />
          </div>

          {/* ---- Link groups ---- */}
          <LinkColumn title="Quick links" links={FOOTER_QUICK_LINKS} />
          <LinkColumn title="Our products" links={FOOTER_PRODUCT_LINKS} />

          {/* ---- Social ---- */}
          <div className="flex flex-col gap-3">
            <h2 className="text-eyebrow text-ink-3">Follow us</h2>
            <ul className="flex gap-2.5">
              {SOCIALS.map(({ label, href, icon }) => (
                <li key={label}>
                  <SmartLink
                    to={href}
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full border border-sheet/15 bg-sheet/8 transition-colors hover:bg-sheet/15"
                  >
                    <img src={icon} alt="" className="size-5" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= Bottom bar ================= */}
        <div className="flex flex-col gap-2 border-t border-sheet/10 pt-[22px] text-[13px] leading-[1.4] text-ink-3 sm:flex-row sm:justify-between">
          <p>© {CURRENT_YEAR} Rahim Traders</p>
          <p>{SITE.tagline}</p>
        </div>
      </Container>
    </footer>
  )
}

/* ---------------------------------------------------------------------------
 *  Sub-components
 * ------------------------------------------------------------------------ */

/** Frosted card showing a contact value with a copy-to-clipboard action. */
function ContactCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-sheet/12 bg-sheet/6 px-[18px] py-3.5">
      <img src={icon} alt="" className="size-5 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[13px] leading-[1.4] text-ink-3">{label}</span>
        <span className="truncate text-[15.5px] leading-[1.3] font-semibold text-sheet">{value}</span>
      </div>
      <CopyButton value={value} label={label} />
    </div>
  )
}

/** Eyebrow heading + vertical list of links. */
function LinkColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-eyebrow text-mid">{title}</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <SmartLink
              to={link.to}
              className="text-sm leading-[1.5] text-sheet transition-colors hover:text-periwinkle"
            >
              {link.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
