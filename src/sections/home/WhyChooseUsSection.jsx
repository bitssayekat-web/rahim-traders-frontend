/**
 * ============================================================================
 *  WHY CHOOSE US SECTION (Figma 119:837)
 * ----------------------------------------------------------------------------
 *  1. Header  — eyebrow, H2, intro.
 *  2. Metrics — navy band with three big stats (stacks on phones).
 *  3. Body    — "Dieline · 3D preview" card + 2 × 2 grid of pillars.
 *  `id="why-us"` = nav target.
 * ============================================================================
 */

import boxPreview from '../../assets/why/box-3d-preview.png'
import gridLineH from '../../assets/why/grid-line-h.svg'
import gridLineV from '../../assets/why/grid-line-v.svg'
import Container from '../../components/ui/Container'
import SectionHeader from '../../components/ui/SectionHeader'
import Swatch from '../../components/ui/Swatch'
import { METRICS, PILLARS } from '../../data/content'

/* Blueprint grid: 13 vertical lines every 8.108%, 8 horizontal every 12.903% */
const GRID_V = Array.from({ length: 13 }, (_, i) => i * 8.108)
const GRID_H = Array.from({ length: 8 }, (_, i) => i * 12.903)

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="bg-paper py-20 lg:py-28">
      <Container className="flex flex-col gap-8">
        <div className="pb-3">
          <SectionHeader
            id="why-title"
            eyebrow="Why choose us"
            title="Packaging that makes a first impression"
            intro="We print for small shops and established brands alike, with the same care on a short run as on a large order."
            titleWidth="lg:max-w-[620px]"
            introWidth="lg:max-w-[420px]"
          />
        </div>

        {/* ================= Metrics ================= */}
        <dl className="grid grid-cols-1 overflow-hidden rounded-[28px] bg-navy md:grid-cols-3">
          {METRICS.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex flex-col gap-4 p-8 lg:p-10 ${
                index > 0 ? 'border-t border-lavender md:border-t-0 md:border-l' : ''
              }`}
            >
              <dd className="order-1 font-display text-[56px] leading-none font-bold tracking-[-0.035em] text-sheet lg:text-[72px] xl:text-[88px]">
                {metric.value}
              </dd>
              <dt className="order-2 flex items-center gap-2.5 text-base leading-[1.55] text-line-2">
                <Swatch tones={[metric.tone]} width="w-[26px]" />
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* ================= Body ================= */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* ---- 3D box preview card ---- */}
          <figure className="relative aspect-[592/454] overflow-hidden rounded-3xl border border-line bg-cobalt">
            {/* Blueprint grid lines */}
            <div className="absolute inset-0" aria-hidden="true">
              {GRID_V.map((left) => (
                <img key={`v${left}`} src={gridLineV} alt="" className="absolute top-0 h-full w-px max-w-none" style={{ left: `${left}%` }} />
              ))}
              {GRID_H.map((top) => (
                <img key={`h${top}`} src={gridLineH} alt="" className="absolute left-0 h-px w-full max-w-none" style={{ top: `${top}%` }} />
              ))}
            </div>

            {/* Mock-up image: 500 × 360 centred (+5px), scaled with the card */}
            <img
              src={boxPreview}
              alt="3D preview of a Rahim Traders mailer box on its dieline"
              className="absolute top-[calc(50%+1.1%)] left-1/2 w-[84.46%] -translate-x-1/2 -translate-y-1/2 rounded-2xl object-cover"
            />

            <figcaption className="absolute top-[17px] left-[19px] text-[11px] leading-[1.4] tracking-[0.08em] text-ink-3">
              DIELINE · 3D PREVIEW
            </figcaption>
          </figure>

          {/* ---- Pillars 2 × 2 ---- */}
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:content-start">
            {PILLARS.map((pillar) => (
              <li
                key={pillar.title}
                className="flex flex-col gap-1.5 rounded-3xl border border-line bg-sheet p-[22px]"
              >
                <span className={`flex size-12 items-center justify-center rounded-[14px] ${pillar.tone}`}>
                  <img src={pillar.icon} alt="" className="size-[22px]" />
                </span>
                <span className="h-6 lg:h-10" aria-hidden="true" />
                <h3 className="font-display text-[19px] leading-[1.3] font-semibold tracking-[-0.015em] text-ink">
                  {pillar.title}
                </h3>
                <p className="max-w-[240px] text-sm leading-[1.5] text-ink-3">{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
