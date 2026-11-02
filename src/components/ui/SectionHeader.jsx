/**
 * ============================================================================
 *  SectionHeader
 * ----------------------------------------------------------------------------
 *  The recurring "eyebrow + H2 on the left, intro paragraph bottom-right"
 *  header used by What We Do and Why Choose Us. Stacks on small screens.
 * ============================================================================
 */

/**
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} [props.intro]
 * @param {'light'|'dark'} [props.tone]  `dark` = white text on navy.
 * @param {string} [props.titleWidth]    Max width of the H2 (from Figma).
 * @param {string} [props.introWidth]    Max width of the intro (from Figma).
 * @param {string} [props.id]            Id for aria-labelledby on the section.
 */
export default function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = 'light',
  titleWidth = 'lg:max-w-[720px]',
  introWidth = 'lg:max-w-[360px]',
  id,
}) {
  const isDark = tone === 'dark'

  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-3">
        <p className={`text-eyebrow ${isDark ? 'text-sheet' : 'text-ink-3'}`}>{eyebrow}</p>
        <h2 id={id} className={`text-h2 ${titleWidth} ${isDark ? 'text-sheet' : 'text-ink'}`}>
          {title}
        </h2>
      </div>

      {intro && (
        <p className={`text-base leading-[1.55] ${introWidth} ${isDark ? 'text-sheet' : 'text-ink-2'}`}>
          {intro}
        </p>
      )}
    </header>
  )
}
