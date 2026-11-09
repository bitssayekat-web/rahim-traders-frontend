/**
 * ============================================================================
 *  CLIENTS SECTION — "Brands we've printed for" (Figma 119:672)
 * ----------------------------------------------------------------------------
 *  The Figma row (1824px) is wider than the frame, implying a moving strip.
 *  We render the list twice and slide it by -50% for a seamless loop; the
 *  edges fade out via a CSS mask. Hover pauses the motion.
 * ============================================================================
 */

import logotype from '../../assets/clients/logotype.svg'
import { CLIENT_LOGOMARKS } from '../../data/content'

export default function ClientsSection() {
  // Duplicate so the -50% translate lands exactly on the second copy
  const loop = [...CLIENT_LOGOMARKS, ...CLIENT_LOGOMARKS]

  return (
    <section aria-labelledby="clients-title" className="flex flex-col items-center gap-[22px] bg-sheet py-16">
      <h2 id="clients-title" className="text-eyebrow text-ink-3">
        Brands we&apos;ve printed for
      </h2>

      <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {loop.map((mark, index) => (
            <li
              key={index}
              aria-hidden={index >= CLIENT_LOGOMARKS.length}
              className="shrink-0 pr-14"
            >
              <div className="relative h-7 w-[168px]">
                <ClientLogo mark={mark} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Brand mark + word mark, positioned with the Figma insets (6 : 1 lock-up). */
function ClientLogo({ mark }) {
  return (
    <>
      <img src={mark} alt="" className="absolute inset-y-0 left-0 h-full w-[21.67%] max-w-none" />
      <img
        src={logotype}
        alt="Client brand"
        className="absolute top-[23.45%] left-[27.38%] h-[51.55%] w-[72.32%] max-w-none"
      />
    </>
  )
}
