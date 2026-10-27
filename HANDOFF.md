# Handoff — Beyond The Fall Initiative website

Read this first, then `AGENTS.md` (Next.js version rules).

## 1. Where things stand

**Finished and verified:** homepage (navbar, hero, What We Do, Stories & Insights, Our Impact).
Each was checked at 320–1920px wide with no horizontal overflow, and `tsc` and `eslint` were clean.

**In progress, not working yet: the Get Support page (`/get-support`).**
All the component files are written, but the page is not wired up and nothing has been type-checked or tested.
See §6 for the exact next steps.

## 2. Project basics

- **What it is:** a site for **Beyond The Fall Initiative (BTF)**. BTF helps individuals and small business owners in Nigeria rebuild after setbacks.
  - Tagline: *"A fall should never mean the end of someone's story."*
  - BTF is connected to Abayomi Alvin's storytelling platform **Beyond Before** (YouTube: `@AbayomiAlvinTv`).
- **Important:** per the brief, org details, the application procedure, eligibility and programmes are **NOT confirmed**. Never present invented details as fact. Use clearly flagged placeholders.
- **App root:** `btf-initiative/` (the parent folder name has a space, so the app lives in this subfolder).
- **Run:** `npm run dev` from `btf-initiative/`. Port 3000 is taken on this machine, so the server may run on **http://localhost:3001** (it was on 3000 on 2026-10-27).
- **Stack:**

  | Package | Version | Notes |
  |---|---|---|
  | Next.js | 16.4.3 | App Router, Turbopack, `cacheComponents` + `partialPrefetching` on |
  | React | 19.3 | |
  | TypeScript | — | |
  | Tailwind CSS | v4 | CSS-first config in `src/app/globals.css`; there is no `tailwind.config` |
  | lucide-react | — | Icons |

- **Next 16 differences already hit:**
  - On `next/image`, `priority` is deprecated. Use `preload`.
  - When in doubt, read `node_modules/next/dist/docs/`.
- **`next.config.ts`:**
  - `turbopack.root: __dirname`, because a stray `package-lock.json` in the user's home folder confused root detection.
  - `images.remotePatterns` allows `https://i.ytimg.com/vi/**` (YouTube thumbnails).

## 3. User preferences (strict)

- **Responsiveness must be "on point" at every width.**
  - Test at least 320, 390, 768, 1024, 1280, 1366×768 and 1920.
  - Also check short laptop screens: there is a custom `short:` variant for that (≥1024px wide and ≤896px tall).
  - The user got annoyed when the cramped 1024–1279px range was missed.
- **Strict design system.**
  - Use tokens and shared components only.
  - No one-off hex colours, font sizes or spacing.
- **Fonts:** body is **Satoshi** (self-hosted, `next/font/local`, `src/app/fonts/`). Headings are **Rethink Sans** (`next/font/google`). Both are wired in `src/app/layout.tsx`.
- **No generic, plain or "AI slop" looks.** The user explicitly rejected:
  - flat backgrounds
  - bare thumbnails
  - blank cards

  They want texture, real cards, and photos fading into cards.
- **Reference images:** the user sends a screenshot of another site for most sections. Match its *layout and structure* in BTF branding, not its colours or copy.
- **Messages:** short, with typos. Infer the intent and don't over-ask.

## 4. Design system

### Colour tokens

Taken from the client's Beyond The Fall logo (2026-10-27): ink black, mustard sun, paper. Defined in `:root` in `globals.css` and exposed as Tailwind colours.
(Tokens were renamed from the old maroon/sage set: `maroon`→`night`, `sage`→`sun`, `sage-soft`→`sun-tint`, `sage-tint`→`paper`.)

| Token | Value | Use |
|---|---|---|
| `paper` | `#f0ede6` | Light section backgrounds (the logo's paper) |
| `surface` | `#fff` | Cards, white heading blocks |
| `ink` | `#1c1c1b` | Body text (the logo's black) |
| `muted` | `#625e56` | Secondary text |
| `line` | `#e0dacd` | Borders |
| `night` / `night-deep` | `#1f1e1b` / `#121110` | Dark sections / overlays |
| `primary` | `#e6a114` | Mustard: buttons, highlight blocks, brand squares. **Text on it is `primary-foreground` (ink), never white.** Hover `#cc8c0a`. |
| `primary-ink` | `#8a5a00` | Mustard-family *text* on light backgrounds (plain mustard text fails contrast) |
| `sun` | `#f4c75b` | Highlights on dark, tag labels |
| `sun-tint` | `#f7ebc8` | Pale chips, hover, heading lead block on white sections |

Focus rings are ink on light and mustard on dark (`on-dark`). There is no dark mode, on purpose.

### Type

The fluid type scale is `text-display`, `text-h1` to `text-h4` and `text-lead`, all built with `clamp()`. `h1`–`h6` get Rethink Sans automatically.

### Utilities (in `globals.css`)

| Utility | Purpose |
|---|---|
| `container-site` | Max width 80rem, fluid 16–40px gutter |
| `section-space` | Section top/bottom padding, 64–120px |
| `texture-grain` | Film-grain overlay. Use it at roughly `opacity-[0.07] mix-blend-overlay`. |
| `texture-glow` | Terracotta and sage radial glows for dark sections |
| `short:` | Custom variant for short laptop screens |
| `animate-step-forward` / `animate-step-back` | Step transitions |
| `on-dark` / `on-light` | Focus-ring colour helpers. Put them on dark sections and on light cards inside them. |

### Components (`src/components/`)

**`ui/`**
- `Tag`: the brand label, a terracotta square plus a sage label. Used as every section eyebrow.
- `Button` and `buttonClasses()` (`ui/button.tsx`), plus `ButtonLink` (`ui/button-link.tsx`).
  - Variants: `primary`, `light`, `ghost`.
  - Sizes: `md`, `lg`, `responsive`.
- `RisingSteps`: the brand-square "steps" motif, used decoratively.

**Other**
- `icons.tsx`: hand-made SVG icons (arrows, check, play, pause, close, chevron).
- `logo.tsx`: a placeholder BTF mark.
- `site-header.tsx`: fixed header and a full-screen mobile menu.
- `page-placeholder.tsx`: the "coming soon" stub page.

### Content and assets

- **Content lives in `src/content/*.ts`** (`home.ts`, `get-support.ts`), not in JSX.
- **Photos:** free Unsplash stock photos, credited in `src/assets/hero/CREDITS.md`.
  - Dark and terracotta cards use `grayscale` plus a gradient fading into the card colour.
  - Light cards use full-colour photos fading to white.

### Motion (GSAP 3.15 + @gsap/react, `src/components/motion/`)

- `SmoothScroll` wraps every page in the root layout (`#smooth-wrapper > #smooth-content`). **ScrollSmoother runs only at ≥1024px with a fine pointer and no reduced-motion**; touch devices keep native scrolling.
- The header is `fixed` outside the wrapper; `#smooth-content` has `pt-(--header-height)`.
- **Reveals:** add `data-reveal="title" | "image" | "up" | "stagger"` to an element (see `reveals.ts`). `BlockTitle`, `SteppedFrame`, `Tag` and `FactSheet` reveal automatically. An inline script in `layout.tsx` adds `html.reveal` (CSS hides `[data-reveal]` until GSAP takes over). It's skipped for reduced motion and undone after 4s if JS never starts.
- **CSS `sticky` breaks inside ScrollSmoother.** Add `data-sticky` next to the sticky class and it's pinned with ScrollTrigger instead when smoothing is on (same CSS `top`, sticks until its parent ends).
- **Hydration:** GSAP must not touch an element before React hydrates it (streamed page content arrives later), or hydration fails. Reveals and pins check `isHydrated()` and retry every 100ms.
- Scrolling to an element in code: use `scrollToElement()` from `smooth-scroll.tsx`, not `scrollIntoView`.

## 5. Homepage map (`src/app/page.tsx`)

Redesigned 2026-10-27 from the user's "Latent" conference screenshots. That design language is now the house style:
grid backgrounds, block headings, stepped photos, bracket labels, square bordered panels.

| Order | Section | Background | Description | Files |
|---|---|---|---|---|
| 1 | Hero | `sage-tint` + grid | Block-highlight h1, CTAs, avatar proof row; stepped photo with label chip and fact sheet | `home/hero.tsx` |
| 2 | What We Do | `sage-tint` + grid | Staggered block heading; 3-column bordered panel (stepped photo + statement, pixel "04" + photo, checklist) | `home/what-we-do.tsx` |
| 3 | Ribbon | Maroon | Scrolling words with brand-square separators (`HeroRibbon`, exported from hero.tsx) | `home/hero.tsx` |
| 4 | Stories & Insights | Textured maroon | Centred statement with inline photo pills; split video cards (sticky stack from 1024px, swipe row below); `<dialog>` player. Video 1 has its own kicker/guest/summary from YouTube | `home/stories-insights.tsx`, `video-gallery.tsx` |
| 5 | Partners | `sage-tint` + grid | Staggered block heading + "Become a partner"; bordered grid: featured principal tile (2×2), 7 partner tiles, "Partner with us" tile. 2 cols → 4 cols at 1024px | `home/partners.tsx` |
| 6 | Our Impact | `sage-tint` + grid | Staggered block heading; one bordered panel: people as tabs (selected = maroon tile; 2×2 on phones/tablets, a column from 1024px) and the story card (stepped photo, `01 / Story`, quote). Accessible tabs | `home/impact-stories.tsx`, `impact-tabs.tsx` |

New shared pieces in `components/ui/`: `BlockTitle` (line-height 1.3 matches Rethink Sans' background box, so stacked blocks meet flush; don't lower it), `SteppedFrame`, `BrandSquare`, `PixelText` (digits + the letters needed so far; add glyphs as needed), `IndexLabel`, `FactSheet`, `Ribbon`, `PillText`, `GridBackdrop`. `BlockTitle` options: `fit` (phones fill the width) or `fit="always"` (fills its column at every width — only where the column has a definite width), and `surface="white"` on white sections (the lead block turns sage so it stays visible). New utilities in `globals.css`: `texture-grid`, `clip-steps`.
Stories & Insights uses `overflow-clip`, not `overflow-hidden`: `hidden` would break the sticky cards.

**Footer** (`site-footer.tsx`, content in `footerContent` in `lib/navigation.ts`): light grid background; stepped photo banner ("Your comeback can / start today.") with a `FactSheet` + Get Support; logo/about, bracket-labelled link columns, a YouTube link styled as an input pill (there is no newsletter backend, so no email form); a `PixelText` "BEYOND THE FALL" wordmark (two lines on phones); copyright + back-to-top pill.

The featured partner tile has a stock photo of food being handed out (`assets/partners/food-handout.jpg`), placeholder like the partners themselves.

**Our Story** (`/our-story`, content in `src/content/our-story.ts`, components in `src/components/our-story/`), copy supplied by the client:
hero (fitted h1 + stepped photo + fact sheet) → How it started (white; sticky heading/photo, three numbered chapters, highlighted question) → Founder (dark; his supplied photo, role chips, bio, "Connect" → his YouTube channel) → Purpose (three numbered beliefs) → Mission & Vision (`id="mission"`, target of the homepage "Our Mission" button) → Values (4 panels) → Ribbon → Looking ahead (maroon; statement with photo pills) → Closing CTA (three audience paths).

Other routes (`/what-we-do`, `/our-impact`, `/get-involved`) are `PagePlaceholder` stubs.

## 6. Next steps — finish Get Support (`/get-support`)

The user's ask: a "really cool" application flow that shows **one question at a time** with a "2 of 7" progress indicator, not one long form.

### Already written (untested)

| File | What it holds |
|---|---|
| `src/content/get-support.ts` | Intro copy, the 7 steps (name, contact, location, business, setback, support, final), options, Nigerian states. **Placeholder questions.** |
| `src/lib/support-application.ts` | `SupportApplication` type, `emptyApplication`, `validateStep()` and `validateAll()`. Shared by the client and the server. |
| `src/app/get-support/actions.ts` | `submitApplication` server action. It validates and returns ok, but **stores and sends nothing** (TODO). |
| `src/components/support/fields.tsx` | `TextField`, `TextAreaField` (Ctrl/Cmd+Enter continues), `SelectField`, `ChoiceGroup` (radio/checkbox option cards), `CheckboxField` |
| `src/components/support/support-application.tsx` | The whole flow (detailed below) |

How `support-application.tsx` works:
- **Stages:** welcome → questions → done.
- **Desktop:** a maroon textured aside on the left with the step list (done steps show a sage tick, the current one is terracotta). The question panel is on the right.
- **Phones:** the aside only shows on the welcome screen. Back/Continue sit in a sticky bottom bar.
- **Behaviour:**
  - The step container is keyed so it re-mounts, which plays the slide animation.
  - Focus moves to the first field on fine-pointer devices, and to the heading on touch.
  - Enter submits the current step.

### To do, in order

1. **Wire up the page.** Replace `src/app/get-support/page.tsx`, which is still the `PagePlaceholder` stub:
   ```tsx
   import type { Metadata } from "next";
   import { SupportApplication } from "@/components/support/support-application";

   export const metadata: Metadata = {
     title: "Get Support",
     description: "Apply for support from Beyond The Fall Initiative — seven short questions about you, your business and what happened.",
   };

   export default function GetSupportPage() {
     return (
       <main id="main" className="flex flex-1 flex-col">
         <SupportApplication />
       </main>
     );
   }
   ```
2. **Run the checks.** From `btf-initiative/`, run `npx tsc --noEmit && npx eslint src` and fix whatever comes up. Watch these points:
   - the discriminated-union props on `ChoiceGroup`
   - `replaceAll` (`tsconfig` lib includes `esnext`, so it should be fine)
   - the server action being imported into a client component
   - `has-[:focus-visible]:` classes
3. **Test it in a browser:**
   - Walk all 7 steps and check that validation errors show and receive focus.
   - Check Back, and that the success screen shows.
   - Check that the mobile sticky bar isn't covering content.
   - Test at every width listed in §3, plus a short laptop (1366×768). The desktop aside must not overflow.
4. **Confirm the CSS is fresh** (see §8). For example, check that `animate-step-forward` exists in the served CSS.

## 7. Placeholders that must be replaced before launch (tell the user)

- **Impact stories** (`impactStories` in `src/content/home.ts`): invented people and stories. The stock portraits show *other* real people. This must not ship as-is.
- **Hero proof row** (`heroProof`): the "120+" figure and city list are invented; the avatars are stock portraits.
- **Get Support:**
  - The questions are drafts.
  - `submitApplication` stores nothing. Ask the user where applications should go (email, CRM or database).
- **Partner logos** (`partners` in `src/content/home.ts`, rendered by `components/home/partners.tsx`), including their tiers/roles: the organisations are invented. Never use real company logos without a confirmed partnership and permission.
- **Logo:** the client's logo (`src/assets/brand/logo.png`, trimmed with a transparent background from their square artwork). A vector (SVG) version would be sharper if they have one. Favicon (`src/app/favicon.ico` 16/32/48, `icon.png` 512, `apple-icon.png` 180) is a crop of the logo: the figure on the cliff and the sun, cut at a black horizon above the lettering.
- **Founder:** the photo (`src/assets/our-story/abayomi-alvin.png`) was supplied by the client. "Connect With Our Founder" goes to his YouTube channel until there's a proper contact route.
- **Photos:** all stock. They should become real BTF beneficiaries, with consent.
- **"Our Mission" button:** links to `/our-story#mission`, which doesn't exist yet.

## 8. Gotchas

- **Stale CSS:** Tailwind with Turbopack sometimes serves stale CSS after edits, so new classes or variants are missing.
  - Fix: stop the dev server, delete `.next`, and run `npm run dev` again.
  - Verify by fetching the page's CSS chunk and grepping for the new class.
- **`react-hooks/set-state-in-effect` lint rule:** don't call `setState` directly in an effect body. Use event handlers, `requestAnimationFrame`, or `useSyncExternalStore`, as `hero-carousel.tsx` does for reduced motion.
- **The `//` lint rule:** a literal `//` in JSX text trips `react/jsx-no-comment-textnodes`. Wrap it as `{`${n}//`}`.
- **Screenshot testing so far** drove headless Edge (`C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`) over CDP:
  - `Emulation.setDeviceMetricsOverride` with `mobile: true` for phones.
  - Scroll through the page first so lazy images load.
  - Capture one section at a time by hiding the others. A hero sized to `100svh` reflows when `captureBeyondViewport` is used.
  - The script lived in a temporary folder and is gone. Recreate it, or use Playwright.
- **Accessibility conventions:**
  - Focus rings come from the global `:focus-visible` style.
  - Respect `prefers-reduced-motion`; the global rule already kills transitions.
  - Icons inside labelled controls are `aria-hidden`.
  - Real tabs, dialog and form semantics throughout.
