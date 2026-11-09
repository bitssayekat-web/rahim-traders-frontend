# Rahim Traders — Website Frontend

React 19 + Vite + Tailwind CSS v4 build of the Figma design
([Final-design](https://www.figma.com/design/rmDrlFkplBbKTQPcXVqrkQ/calculus-effort-manegment?node-id=70-325)):
Home, Product listing and Product details — fully responsive.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run lint
```

## Routes

| Path               | Page                                        |
| ------------------ | ------------------------------------------- |
| `/`                | Home                                        |
| `/products`        | Product listing (`?category=<id>` filters)  |
| `/products/:slug`  | Product details + WhatsApp quote form       |

## Folder structure

```
src/
├── assets/          Figma-exported SVG/PNG (icons, brand, hero, footer…)
├── components/
│   ├── layout/      UtilityBar, Navbar, Footer, SiteLayout (page chrome)
│   ├── ui/          Button, Container, FilterTabs, ProductCard, ProductGrid,
│   │                ImageSlot, ScaledStage, SectionHeader, Swatch, CopyButton,
│   │                WhatsAppButton (primary CTA)
│   └── brand/       LogoStack (hero wheel brand lock-up)
├── sections/        One file per Figma section, grouped by page
│   ├── home/        Hero, Clients, Values, WhatWeDo, WhyChooseUs, Process
│   ├── shared/      ExploreProducts, HowToOrder (used on several pages)
│   └── details/     ProductOverview, Specification, RelatedProducts
├── pages/           HomePage, ProductListingPage, ProductDetailsPage, 404
├── services/        productService.js  ← the ONLY data entry point
├── hooks/           useAsync, useProducts (+ variants), usePageTitle
├── data/            Mock catalogue + static marketing copy
├── config/site.js   Phone, email, address, nav links, API base URL
├── utils/           WhatsApp deep-link builders
└── index.css        Tailwind + design tokens from Figma variables
```

## Connecting the backend API

1. Create `.env` with `VITE_API_BASE_URL=https://api.example.com`.
2. In `src/services/productService.js`, replace each function body with the
   commented `request(...)` call (marked `TODO(API)`).
3. Keep the response shape documented at the top of `src/data/products.js`
   (`slug`, `name`, `categoryId`, `images[]`, `options{}`, `minOrder`,
   `productionTime`). Images: pass real URLs in `images[]` — the empty
   placeholder tiles are replaced automatically by `<ImageSlot>`.

Nothing in `components/`, `sections/` or `pages/` needs to change.

## Notes

- Ordering has no checkout: every quote button opens WhatsApp with a
  pre-filled message (product, chosen options, quantity, note).
- The Figma file names 8 products; the other 13 in `data/products.js` are
  placeholders so the tab counts (21 / 6 / 8 / 6 / 1) match the design.
- Social links in `config/site.js` are `#` until the real URLs are known.
