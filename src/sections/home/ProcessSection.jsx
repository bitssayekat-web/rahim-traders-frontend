/**
 * ============================================================================
 *  FROM DESIGN TO DELIVERY — 4 step process (Figma 119:922)
 * ----------------------------------------------------------------------------
 *  Desktop: 3-column grid → row 1 = Step 1 (2 cols) + Step 2 (1 col),
 *                            row 2 = Step 3 (1 col) + Step 4 (2 cols).
 *  Each step card shows a small animated illustration on the dark "night"
 *  tile (motion inspired by the Rahim Traders concept artifact):
 *    1. chat bubbles arrive in turn      3. scan line sweeps the press sheet
 *    2. sketch → visual wipe + handle    4. boxes drop onto the stack + QC pop
 *  Keyframes live in index.css; all loops stop under prefers-reduced-motion.
 *  Tablet/phone: one card per row. `id="process"` = nav target.
 * ============================================================================
 */

import dotIcon from '../../assets/process/dot.svg'
import dashedLine from '../../assets/process/dashed-line.svg'
import cmykBar from '../../assets/process/cmyk-bar.svg'
import checkIcon from '../../assets/icons/check.svg'
import shoppingBagThumb from '../../assets/process/shopping-bag-thumb.jpg'
import poloBox from '../../assets/process/polo-tshirt-box.jpg'
import wovenLabels from '../../assets/process/woven-labels.jpg'
import burgerBox from '../../assets/process/burger-box.jpg'
import perfumeBox from '../../assets/process/perfume-box.jpg'
import giftBox from '../../assets/process/gift-box.jpg'
import Container from '../../components/ui/Container'
import ImageSlot from '../../components/ui/ImageSlot'
import ScaledStage from '../../components/ui/ScaledStage'
import { PROCESS_STEPS } from '../../data/content'

const TOTAL_STEPS = PROCESS_STEPS.length

/** Which illustration + grid span belongs to each step. */
const STEP_LAYOUT = {
  1: { span: 'lg:col-span-2', Panel: ChatPanel },
  2: { span: '', Panel: VisualPanel },
  3: { span: '', Panel: PressPanel },
  4: { span: 'lg:col-span-2', Panel: PackingPanel },
}

export default function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-navy py-20 lg:py-28">
      <Container className="flex flex-col gap-10">
        {/* ================= Header ================= */}
        <header className="flex flex-col gap-3.5">
          <p className="flex items-center gap-2.5 text-base leading-[1.55] text-sheet">
            <img src={dotIcon} alt="" className="size-3.5" />
            {TOTAL_STEPS} step process
          </p>
          <h2 id="process-title" className="text-h2 text-sheet">
            From design to delivery
          </h2>
          <p className="max-w-[560px] text-base leading-[1.55] text-white-mid sm:text-[19px]">
            A simple, streamlined process that brings your ideas to life with quality and care.
          </p>
        </header>

        {/* ================= Steps ================= */}
        <ol className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PROCESS_STEPS.map(({ step, title, text }) => {
            const { span, Panel } = STEP_LAYOUT[step]
            return (
              <li
                key={step}
                className={`flex flex-col gap-3 rounded-[26px] border border-sheet/26 bg-sheet/5 p-[26px] backdrop-blur-[2px] lg:min-h-[422px] ${span}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-h3 text-sheet">
                    <span className="sr-only">Step {step}: </span>
                    {title}
                  </h3>
                  <ProgressDiamonds current={step} />
                </div>
                <p className="text-base leading-[1.55] text-sheet">{text}</p>
                <div className="relative flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-[18px] bg-night">
                  <Panel />
                </div>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 *  ProgressDiamonds — 4 rotated squares, first `current` filled magenta
 * ------------------------------------------------------------------------ */
function ProgressDiamonds({ current }) {
  return (
    <span className="flex shrink-0 gap-[7px]" aria-hidden="true">
      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
        <span key={index} className="flex size-[11.3px] items-center justify-center">
          <span className={`size-2 rotate-45 rounded-[1px] ${index < current ? 'bg-magenta' : 'bg-step-off'}`} />
        </span>
      ))}
    </span>
  )
}

/* ---------------------------------------------------------------------------
 *  Step illustrations
 * ------------------------------------------------------------------------ */

/** Step 1 — WhatsApp-style chat; the reply lands ~1.4s after the request. */
function ChatPanel() {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-3 p-4" aria-hidden="true">
      <div className="flex max-w-[328px] animate-chat-you flex-col gap-[3px] self-start rounded-t-2xl rounded-br-2xl rounded-bl-[4px] bg-sheet px-3.5 py-3">
        <span className="text-[13px] leading-[1.4] text-ink-3">YOU</span>
        <p className="text-sm leading-[1.5] text-ink">
          Hi, we need printed shopping bags with our logo. Here&apos;s the artwork.
        </p>
        <span className="flex items-center gap-2 self-start rounded-[10px] bg-chip py-[5px] pr-2 pl-[5px]">
          <ImageSlot src={shoppingBagThumb} alt="" className="size-[30px] rounded-md" />
          <span className="text-[13px] leading-[1.4] text-ink">logo-artwork.pdf</span>
        </span>
      </div>

      <div className="flex max-w-[328px] animate-chat-us flex-col gap-[3px] self-start rounded-t-2xl rounded-br-[4px] rounded-bl-2xl bg-whatsapp px-3.5 py-3 text-sheet">
        <span className="text-[13px] leading-[1.4]">RAHIM TRADERS</span>
        <p className="text-sm leading-[1.5]">Got it. Which size and quantity do you need?</p>
      </div>
    </div>
  )
}

/**
 * Step 2 — the approved visual with a grayscale "sketch" copy on top. The
 * sketch is clipped from the right and wipes 30% ↔ 70%; the magenta handle
 * (with its two knobs) rides the same edge.
 */
function VisualPanel() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <img src={dashedLine} alt="" className="absolute top-[28px] left-0 h-px w-full max-w-none" />
      <img src={dashedLine} alt="" className="absolute bottom-[27px] left-0 h-px w-full max-w-none" />

      <div className="absolute top-1/2 left-1/2 size-[184px] -translate-1/2 overflow-hidden rounded-[14px] shadow-[0_20px_40px_-20px_#000]">
        <img src={poloBox} alt="" className="absolute inset-0 size-full object-cover" />
        <img
          src={poloBox}
          alt=""
          className="absolute inset-0 size-full animate-sketch-wipe object-cover [clip-path:inset(0_50%_0_0)] [filter:grayscale(1)_contrast(1.6)_brightness(1.15)]"
        />
        {/* Handle: rest position 50%, animated with the wipe */}
        <span className="absolute inset-y-0 left-1/2 w-0.5 animate-sketch-handle bg-magenta">
          <span className="absolute top-1.5 -left-[7px] h-3 w-4 rounded border-2 border-magenta bg-night" />
          <span className="absolute bottom-1.5 -left-[7px] h-3 w-4 rounded border-2 border-magenta bg-night" />
        </span>
      </div>
    </div>
  )
}

/** Step 3 — press sheet with 6 imposed labels, CMYK bar and a moving scan line. */
function PressPanel() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="flex flex-col gap-[7px] rounded-md bg-sheet p-3 shadow-[0_20px_40px_-20px_#000]">
        {[0, 1].map((row) => (
          <div key={row} className="flex gap-[7px]">
            {[0, 1, 2].map((col) => (
              <ImageSlot key={col} src={wovenLabels} alt="" className="size-[62px] rounded-[3px]" />
            ))}
          </div>
        ))}
        <img src={cmykBar} alt="" className="h-2 w-[200px] max-w-none" />
      </div>
      {/* Scanning laser — wider than the sheet, glowing cyan (rest: mid-sheet) */}
      <span className="absolute top-[47%] -left-5 h-0.5 w-[264px] animate-press-scan bg-cyan shadow-[0_0_18px_0_rgba(18,163,214,0.9)]" />
    </div>
  )
}

/** Boxes on the packing stack, back → front, with their drop delay. */
const PACKED_BOXES = [
  { src: burgerBox, position: 'left-[170px] top-0', delay: '0s' },
  { src: perfumeBox, position: 'left-[130px] top-[14px]', delay: '0.35s' },
  { src: giftBox, position: 'left-0 top-[28px]', delay: '0.7s' },
]

/** Step 4 — finished boxes drop onto the stack, then "Quality checked" pops. */
function PackingPanel() {
  return (
    // Artboard = bounding box of the Figma group (boxes + badge), 470 × 215
    <ScaledStage designWidth={470} designHeight={215} className="max-w-[470px]">
      <div className="relative size-full" aria-hidden="true">
        {PACKED_BOXES.map(({ src, position, delay }) => (
          <ImageSlot
            key={src}
            src={src}
            alt=""
            className={`absolute h-[150px] w-[225px] animate-stack-drop rounded-xl border-3 border-night shadow-[0_20px_30px_-16px_rgba(0,0,0,0.5)] ${position}`}
            style={{ animationDelay: delay }}
          />
        ))}
        <span className="absolute top-[178px] left-[320px] flex origin-left animate-qc-pop items-center gap-2 rounded-full bg-sheet px-3 py-[7px]">
          <img src={checkIcon} alt="" className="size-4" />
          <span className="text-[13px] leading-[1.4] font-semibold whitespace-nowrap text-whatsapp-ink">
            Quality checked
          </span>
        </span>
      </div>
    </ScaledStage>
  )
}
