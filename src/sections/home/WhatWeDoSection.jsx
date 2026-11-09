/**
 * ============================================================================
 *  WHAT WE DO SECTION — services bento (Figma 119:745)
 * ----------------------------------------------------------------------------
 *  Desktop bento is a 4-column grid (289.5px tracks, 14px gap):
 *
 *    ┌───────────────┬───────────────┐
 *    │  Packaging    │  Garment      │
 *    │  (2 × 2)      ├───────┬───────┤
 *    │               │ Comm. │ UV &  │
 *    ├───────┬───────┴───────┴───────┤
 *    │ Laser │  Design & Branding    │
 *    └───────┴───────────────────────┘
 *
 *  Tablet: 2 columns. Phone: single column. `id="services"` = nav target.
 * ============================================================================
 */

import Container from '../../components/ui/Container'
import ImageSlot from '../../components/ui/ImageSlot'
import SectionHeader from '../../components/ui/SectionHeader'
import Swatch from '../../components/ui/Swatch'
import WhatsAppButton from '../../components/ui/WhatsAppButton'
import { SERVICES } from '../../data/content'
import { buildWhatsAppLink } from '../../utils/whatsapp'

const DESIGN_BRIEF_LINK = buildWhatsAppLink(
  "Hi Rahim Traders, I don't have artwork yet — can you help me design it?",
)

export default function WhatWeDoSection() {
  const { packaging, garment, commercial, uvDtf, laser, design } = SERVICES

  return (
    <section id="services" aria-labelledby="services-title" className="bg-navy py-20 lg:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          id="services-title"
          tone="dark"
          eyebrow="What we do"
          title="Packaging, printing and branding under one roof"
          intro="One team takes your job from artwork to finished, packed product."
        />

        {/* ================= Bento ================= */}
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-4">
          {/* ---- Packaging Solutions (large) ---- */}
          <BentoCard className="lg:col-span-2 lg:row-span-2 lg:h-[474px]">
            <CardHeading {...packaging} textWidth="max-w-[420px]" />
            <TagList tags={packaging.tags} />
            <div className="min-h-6 flex-1" />
            {/* Shots: 1 large + 2 stacked (photos 1, 2, 3 in that order) */}
            {/* Fixed row height stops the photos' natural size from stretching it */}
            <div className="grid h-[160px] shrink-0 grid-cols-[1.3fr_1fr] gap-2.5 sm:h-[220px]">
              <ImageSlot
                {...packaging.images[0]}
                tone="bg-night"
                className="size-full min-h-0 rounded-[14px]"
              />
              <div className="grid min-h-0 grid-rows-2 gap-2.5">
                {packaging.images.slice(1, 3).map((image) => (
                  <ImageSlot
                    key={image.alt}
                    {...image}
                    tone="bg-night"
                    className="size-full min-h-0 rounded-[14px]"
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* ---- Garment Accessories (wide) ---- */}
          <BentoCard className="sm:flex-row sm:items-start lg:col-span-2 lg:h-[230px]">
            <div className="flex flex-col gap-2.5 sm:max-w-[300px]">
              <CardHeading {...garment} />
              <TagList tags={garment.tags} />
            </div>
            <ImageSlot
              {...garment.images[0]}
              tone="bg-night"
              className="h-[178px] w-full rounded-[14px] sm:ml-auto sm:w-[215px] sm:shrink-0"
            />
          </BentoCard>

          {/* ---- Commercial Printing ---- */}
          <BentoCard className="lg:h-[230px]">
            <CardHeading {...commercial} textWidth="max-w-[237px]" />
            <div className="flex-1" />
            <ImageSlot
              {...commercial.images[0]}
              tone="bg-night"
              className="h-[70px] w-full shrink-0 rounded-[14px]"
            />
          </BentoCard>

          {/* ---- UV & DTF Printing ---- */}
          <BentoCard className="lg:h-[230px]">
            <CardHeading {...uvDtf} textWidth="max-w-[237px]" />
          </BentoCard>

          {/* ---- Laser Engraving ---- */}
          <BentoCard className="lg:h-[180px]">
            <CardHeading {...laser} textWidth="max-w-[237px]" />
          </BentoCard>

          {/* ---- Design & Branding (CTA) ---- */}
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-sheet/26 bg-royal p-[26px] sm:flex-row sm:items-center md:col-span-2 lg:col-span-3 lg:h-[180px]">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-h3 text-sheet">{design.title}</h3>
              <p className="max-w-[440px] text-sm leading-[1.5] text-sheet">{design.text}</p>
            </div>
            <WhatsAppButton to={DESIGN_BRIEF_LINK}>{design.cta}</WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 *  Sub-components
 * ------------------------------------------------------------------------ */

/** Frosted-glass card used by every service tile on navy. */
function BentoCard({ className = '', children }) {
  return (
    <article
      className={`flex flex-col gap-3 overflow-hidden rounded-[26px] border border-sheet/26 bg-sheet/5 p-[26px] backdrop-blur-[2px] ${className}`}
    >
      {children}
    </article>
  )
}

/** Swatch + title + description block. */
function CardHeading({ title, text, swatches, textWidth = '' }) {
  return (
    <>
      <Swatch tones={swatches} />
      <h3 className="text-h3 text-sheet">{title}</h3>
      <p className={`text-sm leading-[1.5] text-sheet ${textWidth}`}>{text}</p>
    </>
  )
}

/** Small translucent pills listing the products inside a service. */
function TagList({ tags }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-sheet/24 bg-sheet/10 px-2.5 py-1 text-[13px] leading-[1.4] text-sheet"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
