/**
 * ============================================================================
 *  PRODUCT OVERVIEW SECTION — gallery + quote form (Figma 119:1404)
 * ----------------------------------------------------------------------------
 *  Left : main image + 3 thumbnails (click a thumbnail to swap the main view).
 *  Right: category, name, option chips (Size / Material / Printing /
 *         Finishing), quantity, message and a WhatsApp quote button.
 *
 *  There is no cart — submitting opens WhatsApp with a pre-filled summary of
 *  the selections. TODO(API): optionally POST the enquiry to the backend
 *  (e.g. /quotes) before redirecting, for lead tracking.
 * ============================================================================
 */

import { useId, useState } from 'react'
import whatsappIcon from '../../assets/icons/whatsapp-solid.svg'
import Container from '../../components/ui/Container'
import ImageSlot from '../../components/ui/ImageSlot'
import { getCategoryLabel } from '../../services/productService'
import { buildProductQuoteMessage, buildWhatsAppLink } from '../../utils/whatsapp'

/** Option groups rendered as chips, in display order. */
const OPTION_GROUPS = [
  { key: 'sizes', label: 'Size' },
  { key: 'materials', label: 'Material' },
  { key: 'printing', label: 'Printing' },
  { key: 'finishing', label: 'Finishing' },
]

const GALLERY_SLOTS = 4 // 1 main + 3 thumbnails, as designed

export default function ProductOverviewSection({ product }) {
  const { name, categoryId, images, options, minOrder } = product

  // ---- Form state ---------------------------------------------------------
  const [activeImage, setActiveImage] = useState(0)
  const [selections, setSelections] = useState({}) // { sizes: '10"', … }
  const [quantity, setQuantity] = useState(String(minOrder))
  const [message, setMessage] = useState('')

  const quantityNumber = Number(quantity)
  const isBelowMinimum = quantity !== '' && quantityNumber < minOrder

  const selectOption = (groupKey, value) =>
    setSelections((prev) => ({ ...prev, [groupKey]: prev[groupKey] === value ? undefined : value }))

  /** Build the WhatsApp message from the current form and open the chat. */
  const handleSubmit = (event) => {
    event.preventDefault()
    const text = buildProductQuoteMessage({
      productName: name,
      selections: Object.fromEntries(OPTION_GROUPS.map(({ key, label }) => [label, selections[key]])),
      quantity,
      note: message,
    })
    window.open(buildWhatsAppLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section aria-labelledby="product-title" className="bg-sheet pt-10 pb-20 lg:pt-16 lg:pb-28">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* ================= Gallery ================= */}
        <div className="flex flex-col gap-4 lg:gap-8">
          <ImageSlot
            src={images[activeImage]}
            alt={`${name} — image ${activeImage + 1}`}
            tone="bg-lavender"
            className="aspect-square w-full rounded-xl lg:aspect-auto lg:min-h-[400px] lg:flex-1"
          />

          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: GALLERY_SLOTS - 1 }, (_, i) => i + 1).map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImage((current) => (current === index ? 0 : index))}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={activeImage === index}
                className={`overflow-hidden rounded-xl outline-offset-2 transition-shadow ${
                  activeImage === index ? 'outline-2 outline-royal' : 'hover:shadow-md'
                }`}
              >
                <ImageSlot
                  src={images[index]}
                  alt=""
                  tone="bg-lavender"
                  className="aspect-[4/3] w-full lg:aspect-auto lg:h-[164px]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ================= Details + quote form ================= */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <p className="pt-2 text-[13px] leading-[1.4] text-mid">{getCategoryLabel(categoryId)}</p>
          <h1
            id="product-title"
            className="font-display text-[36px] font-bold tracking-[-0.03em] text-ink sm:text-[48px]"
          >
            {name}
          </h1>

          {OPTION_GROUPS.map(({ key, label }) =>
            options[key]?.length ? (
              <ChipGroup
                key={key}
                label={label}
                values={options[key]}
                selected={selections[key]}
                onSelect={(value) => selectOption(key, value)}
              />
            ) : null,
          )}

          {/* ---- Quantity ---- */}
          <Field label="Quantity" htmlFor="quantity">
            <input
              id="quantity"
              type="number"
              inputMode="numeric"
              min={minOrder}
              step={100}
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              aria-describedby="min-order"
              aria-invalid={isBelowMinimum}
              className={`h-[42px] w-36 rounded-full border bg-sheet px-[18px] text-[14.5px] font-medium text-ink-2 outline-none focus:border-royal ${
                isBelowMinimum ? 'border-magenta' : 'border-line-2'
              }`}
            />
            <p id="min-order" className={`font-display text-base leading-[1.3] font-bold tracking-[-0.015em] ${isBelowMinimum ? 'text-magenta' : 'text-dark'}`}>
              Minimum order: {minOrder.toLocaleString('en-US')} pcs
            </p>
          </Field>

          {/* ---- Message ---- */}
          <Field label="Message" htmlFor="message">
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
              className="h-[120px] w-full resize-none rounded-2xl border border-line-2 bg-sheet px-[18px] py-4 text-[14.5px] leading-[1.4] font-medium text-ink-2 outline-none placeholder:text-ink-2 focus:border-royal"
            />
          </Field>

          {/* ---- Submit ---- */}
          <button
            type="submit"
            className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-[22px] text-[15px] leading-none font-semibold text-sheet transition hover:brightness-95"
          >
            <img src={whatsappIcon} alt="" className="size-6" />
            Get a quote on WhatsApp
          </button>
        </form>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 *  Sub-components
 * ------------------------------------------------------------------------ */

/** Bold label + content block with the design's 8px vertical rhythm. */
function Field({ label, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-2.5 py-2">
      <label
        htmlFor={htmlFor}
        className="font-display text-base leading-[1.3] font-bold tracking-[-0.015em] text-dark"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

/** Single-select chip row (radio-group semantics). */
function ChipGroup({ label, values, selected, onSelect }) {
  const labelId = useId()

  return (
    <div className="flex flex-col gap-2.5 py-2">
      <p id={labelId} className="font-display text-base leading-[1.3] font-bold tracking-[-0.015em] text-dark">
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="flex flex-wrap gap-2.5">
        {values.map((value) => {
          const isSelected = selected === value
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(value)}
              className={`h-[42px] rounded-full border px-[18px] text-[14.5px] leading-[1.2] font-medium whitespace-nowrap transition-colors ${
                isSelected
                  ? 'border-royal bg-royal text-sheet'
                  : 'border-line-2 bg-sheet text-ink-2 hover:border-ink-3'
              }`}
            >
              {value}
            </button>
          )
        })}
      </div>
    </div>
  )
}
