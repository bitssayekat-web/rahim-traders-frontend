/**
 * ============================================================================
 *  DielineBox — press sheet that prints, then folds into a 3D box
 * ----------------------------------------------------------------------------
 *  Lives in the "Dieline · 3D preview" card (Why Choose Us). One timeline
 *  plays on a continuous loop, paused only while the card is off-screen:
 *    1. a CMYK roller prints the flat cross-shaped net, row by row
 *    2. the side, back, bottom and top panels fold up around the front
 *    3. the finished box rotates to show its other faces
 *    4. after a short hold it all plays backwards to the blank sheet
 *
 *  Sizes use `--s` (one face), set in container units, so it scales with the
 *  card. The classes describe the finished box, which is what visitors see
 *  when motion is off; GSAP flattens it into the net before animating.
 *  The parent must be an `@container`.
 * ============================================================================
 */

import boxPhoto from '../../assets/process/polo-tshirt-box.jpg'
import bagPhoto from '../../assets/process/shopping-bag-thumb.jpg'
import { useScrollMotion } from '../../hooks/useScrollMotion'
import { gsap } from '../../motion/gsap'
import LogoStack from './LogoStack'

const INK_HIDDEN = 'inset(0% 0% 100% 0%)'
const INK_SHOWN = 'inset(0% 0% 0% 0%)'
const FOLDS_AT = 1.7 // timeline position where printing hands over to folding
const SQUARE = { rotation: 0, rotationX: 0, rotationY: 0, skewX: 0, skewY: 0 }
const HOLD_SECONDS = 1.2 // pause on the finished box and on the blank sheet

/* Tailwind classes shared by every face. */
const FACE = 'absolute size-(--s) bg-sheet [transform-style:preserve-3d]'

export default function DielineBox() {
  const scope = useScrollMotion(({ desktop }, root) => {
    const spin = root.querySelector('[data-spin]')

    // ---- Start as a flat net with nothing printed on it ----
    // Every component is reset explicitly: GSAP decomposes the resting 3D angle
    // into rotation and skew, and any leftover would lean the sheet.
    gsap.set(spin, { xPercent: -50, ...SQUARE, scale: 1 })
    gsap.set('[data-cube]', { '--lift': 0 })
    gsap.set('[data-face]', SQUARE)
    gsap.set('[data-ink-row]', { clipPath: INK_HIDDEN })
    gsap.set('[data-fold-line]', { opacity: 1 })
    gsap.set('[data-floor]', { opacity: 0 })

    gsap
      .timeline({
        defaults: { ease: 'power2.inOut' },
        repeat: -1,
        yoyo: true,
        repeatDelay: HOLD_SECONDS,
        // Starts when the card appears, and rests while it's off-screen
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          end: 'bottom top',
          toggleActions: 'play pause play pause',
        },
      })
      // ---- 1. Print: roller travels down, ink follows it ----
      .fromTo('[data-sheet-roller]', { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0)
      .fromTo('[data-sheet-roller]', { yPercent: 0 }, { yPercent: 100, duration: 1.5, ease: 'power1.inOut' }, 0)
      .to('[data-ink-row="top"]', { clipPath: INK_SHOWN, duration: 0.45, ease: 'none' }, 0.05)
      .to('[data-ink-row="middle"]', { clipPath: INK_SHOWN, duration: 0.5, ease: 'none' }, 0.45)
      .to('[data-ink-row="bottom"]', { clipPath: INK_SHOWN, duration: 0.45, ease: 'none' }, 0.95)
      .to('[data-sheet-roller]', { opacity: 0, duration: 0.15 }, 1.45)

      // ---- 2. Fold: panels close up one after another ----
      .to(spin, { xPercent: 0, rotationX: -22, rotationY: -34, scale: 1.35, duration: 1 }, FOLDS_AT)
      .to('[data-cube]', { '--lift': 1, duration: 1 }, FOLDS_AT)
      .to('[data-face="left"]', { rotationY: -90, duration: 0.8 }, FOLDS_AT + 0.25)
      .to('[data-face="right"]', { rotationY: 90, duration: 0.8 }, FOLDS_AT + 0.4)
      .to('[data-face="back"]', { rotationY: 90, duration: 0.8 }, FOLDS_AT + 0.6)
      .to('[data-face="bottom"]', { rotationX: -90, duration: 0.8 }, FOLDS_AT + 0.8)
      .to('[data-face="top"]', { rotationX: 90, duration: 0.8 }, FOLDS_AT + 1)
      .to('[data-floor]', { opacity: 1, duration: 0.6 }, FOLDS_AT + 1.2)
      .to('[data-fold-line]', { opacity: 0, duration: 0.5 }, FOLDS_AT + 1.5)

      // ---- 3. Reveal: the finished box turns to show its other faces ----
      .to(spin, { rotationY: -214, duration: 1.4, ease: 'power1.inOut' }, FOLDS_AT + 1.9)

    // ---- Sheet leans toward the cursor (mouse users on desktop) ----
    if (!desktop || !window.matchMedia('(pointer: fine)').matches) return undefined

    const card = root.parentElement
    const tiltX = gsap.quickTo(root, 'rotationX', { duration: 0.8, ease: 'power3.out' })
    const tiltY = gsap.quickTo(root, 'rotationY', { duration: 0.8, ease: 'power3.out' })
    gsap.set(root, { transformPerspective: 1200 })

    const onMove = (event) => {
      const bounds = root.getBoundingClientRect()
      tiltY(((event.clientX - bounds.left) / bounds.width - 0.5) * 8)
      tiltX(-((event.clientY - bounds.top) / bounds.height - 0.5) * 6)
    }
    const onLeave = () => {
      tiltX(0)
      tiltY(0)
    }

    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)
    return () => {
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
    }
  })

  return (
    <div
      ref={scope}
      role="img"
      aria-label="A printed Rahim Traders mailer box folding up from its flat dieline"
      className="absolute inset-x-[7.7%] top-[11.5%] bottom-[9.2%] flex flex-col rounded-[28px] border border-sheet/30 bg-sheet/14 px-[3.5%] py-[2.5%] text-[9px] tracking-[0.14em] text-sheet/75 uppercase shadow-[0_20px_50px_-24px_rgba(0,0,89,0.55)] backdrop-blur-[10px] [--s:14cqw] sm:text-[11px]"
    >
      <CropMark className="-top-3 -left-3" />
      <CropMark className="-top-3 -right-3" />
      <CropMark className="-bottom-3 -left-3" />
      <CropMark className="-right-3 -bottom-3" />

      <div className="flex items-center justify-between">
        <span>Job 32,871 · Mailer box</span>
        <span className="hidden sm:inline">4/0 CMYK · 350 gsm</span>
      </div>

      {/* ================= 3D scene ================= */}
      <div data-scene className="relative grid flex-1 place-items-center [perspective:1100px]">
        {/* Shadow that appears once the box stands up */}
        <span
          data-floor
          className="absolute bottom-[3%] left-1/2 h-[calc(var(--s)*0.34)] w-[calc(var(--s)*2.6)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,89,0.55),transparent)]"
        />

        <div
          data-spin
          className="relative size-(--s) [transform-style:preserve-3d] [transform:rotateX(-22deg)_rotateY(-36deg)_scale(1.35)]"
        >
          <div
            data-cube
            className="absolute inset-0 [--lift:1] [transform-style:preserve-3d] [transform:translateZ(calc(var(--s)*0.5*var(--lift)))]"
          >
            {/* ---- Front: the other panels hinge off this one ---- */}
            <div className={`${FACE} top-0 left-0`}>
              <Ink row="middle" className="grid place-items-center bg-sheet p-[12%]">
                <LogoStack className="w-full" />
              </Ink>
              <FoldLine />

              <div
                data-face="left"
                className={`${FACE} top-0 right-full origin-right [transform:rotateY(-90deg)]`}
              >
                <Ink row="middle">
                  <img src={boxPhoto} alt="" className="size-full object-cover" />
                </Ink>
                <FoldLine />
              </div>

              <div
                data-face="right"
                className={`${FACE} top-0 left-full origin-left [transform:rotateY(90deg)]`}
              >
                <Ink row="middle">
                  <img src={bagPhoto} alt="" className="size-full object-cover" />
                </Ink>
                <FoldLine />

                <div
                  data-face="back"
                  className={`${FACE} top-0 left-full origin-left [transform:rotateY(90deg)]`}
                >
                  <Ink row="middle" className="flex flex-col justify-between bg-royal p-[11%] text-sheet">
                    <span className="text-[calc(var(--s)*0.075)] leading-none opacity-80">Rahim Traders</span>
                    <span className="font-display text-[calc(var(--s)*0.2)] leading-[0.95] font-extrabold tracking-normal normal-case">
                      We
                      <br />
                      Print<span className="text-sun">.</span>
                    </span>
                    <span className="block h-[5%] rounded-full bg-[linear-gradient(90deg,var(--color-cyan)_0_25%,var(--color-magenta)_25%_50%,var(--color-sun)_50%_75%,var(--color-ink)_75%)]" />
                  </Ink>
                  <FoldLine />
                </div>
              </div>

              <div
                data-face="top"
                className={`${FACE} bottom-full left-0 origin-bottom [transform:rotateX(90deg)]`}
              >
                <Ink row="top" className="grid grid-cols-4">
                  <i className="bg-cyan" />
                  <i className="bg-magenta" />
                  <i className="bg-sun" />
                  <i className="bg-ink" />
                </Ink>
                <FoldLine />
              </div>

              <div
                data-face="bottom"
                className={`${FACE} top-full left-0 origin-top [transform:rotateX(-90deg)]`}
              >
                <Ink
                  row="bottom"
                  className="flex flex-col items-center justify-center gap-1 bg-navy p-[8%] text-center text-[calc(var(--s)*0.07)] leading-snug text-sheet/80"
                >
                  <span>Made in Dhaka</span>
                  <span className="text-sun">Quality is our signature</span>
                </Ink>
                <FoldLine />
              </div>
            </div>
          </div>
        </div>

        {/* CMYK roller that prints the sheet */}
        <span
          data-sheet-roller
          className="pointer-events-none absolute inset-x-[4%] top-0 bottom-1.5 opacity-0"
        >
          <span className="block h-1.5 rounded-full bg-[linear-gradient(90deg,var(--color-cyan)_0_25%,var(--color-magenta)_25%_50%,var(--color-sun)_50%_75%,var(--color-ink)_75%)] shadow-[0_0_24px_6px_rgba(255,255,255,0.45)]" />
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="flex gap-1" aria-hidden="true">
          <i className="size-2.5 bg-cyan sm:size-3.5" />
          <i className="size-2.5 bg-magenta sm:size-3.5" />
          <i className="size-2.5 bg-sun sm:size-3.5" />
          <i className="size-2.5 bg-ink sm:size-3.5" />
        </span>
        <svg viewBox="0 0 24 24" className="size-4 shrink-0 sm:size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="12" cy="12" r="6" />
          <path d="M12 1v22M1 12h22" />
        </svg>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 *  Sub-components
 * ------------------------------------------------------------------------ */

/** Printed artwork on a face; `row` decides when the roller reaches it. */
function Ink({ row, className = '', children }) {
  return (
    <div data-ink-row={row} className={`absolute inset-0 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

/** Dashed crease shown while the net is flat. */
function FoldLine() {
  return (
    <span
      data-fold-line
      className="pointer-events-none absolute inset-0 opacity-0 outline-[1.5px] -outline-offset-1 outline-navy/30 outline-dashed"
    />
  )
}

/** Printer's registration cross at each corner of the sheet. */
function CropMark({ className }) {
  return (
    <span className={`absolute size-6 opacity-70 ${className}`} aria-hidden="true">
      <span className="absolute inset-x-0 top-1/2 h-px bg-sheet" />
      <span className="absolute inset-y-0 left-1/2 w-px bg-sheet" />
    </span>
  )
}
