---
name: Athenaeum Obsidian
colors:
  surface: '#121315'
  surface-dim: '#121315'
  surface-bright: '#38393b'
  surface-container-lowest: '#0d0e10'
  surface-container-low: '#1b1c1e'
  surface-container: '#1f2022'
  surface-container-high: '#292a2c'
  surface-container-highest: '#343537'
  on-surface: '#e3e2e5'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e3e2e5'
  inverse-on-surface: '#303033'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c5c6cd'
  on-secondary: '#2e3035'
  secondary-container: '#47494e'
  on-secondary-container: '#b7b8be'
  tertiary: '#cfcece'
  on-tertiary: '#2f3131'
  tertiary-container: '#b3b3b3'
  on-tertiary-container: '#444545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e2e2e9'
  secondary-fixed-dim: '#c5c6cd'
  on-secondary-fixed: '#191c20'
  on-secondary-fixed-variant: '#45474c'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#121315'
  on-background: '#e3e2e5'
  surface-variant: '#343537'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 2.5rem
    fontWeight: '500'
    lineHeight: 3rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 1.375rem
    fontWeight: '500'
    lineHeight: 1.875rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: 0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0.005em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

The design system establishes a focused, intellectual sanctuary tailored for academic study, literary cataloging, and personal synthesis. Drawing inspiration from modern high-performance dark interfaces like Linear and Obsidian, it tempers technical discipline with classical bibliographic warmth. The experience honors deep reading, long-form reflection, and cross-referencing ideas without sensory fatigue.

The visual style blends modern dark minimalism with scholarly editorial craft:
- **Quiet Canvas:** Deep pitch and obsidian foundations (`#0B0C0E` and `#121316`) that reduce screen glare during sustained nighttime contemplation.
- **Micro-Structured Enclosures:** High-density nested card surfaces contained by precise graphite outlines, inspired by physical index-card archives and classical zettelkasten cabinets.
- **Restrained Brilliance:** Rare, purposeful flashes of antique gold (`#D4AF37`) serving as focused signposts for curated tags, active states, and cross-thematic bridges.
- **Bibliographic Gravity:** High-contrast editorial serif headings juxtaposed with sharp, neutral sans-serif data labels, grounding philosophical and literary concepts in legible, structured elegance.

## Colors

The palette revolves around deep pitch obsidian, structured graphite borders, crisp paper whites, and a focused gold accent.

- **Primary (`#D4AF37`):** Antique Gold. Reserved exclusively for key interactive highlights, thematic metadata badges, and active navigational focus. It represents intellectual illumination within a dark atmosphere.
- **Secondary (`#222429`):** Graphite Border. Used for structural containment, card outlines, inner dividers, and hovering state thresholds.
- **Tertiary (`#9E9E9E`):** Parchment Dust. A neutral, desaturated gray dedicated to secondary counts, author names, category notes, and helper descriptions.
- **Neutral (`#0B0C0E`):** Obsidian Black. The primary backdrop foundation, paired with `#121316` for surface card elevations and nested containers.
- **Content Whites:**
  - High Emphasis (`#EDEDED`): Headings, active work titles, and theme titles.
  - Low Emphasis (`#636773`): Micro-captions, subtle chevron arrows, and disabled actions.

## Typography

The type system creates an intentional dual rhythm:
1. **Newsreader** anchors book titles, conceptual overarching themes, and chapter dividers with classical bibliographic authority.
2. **Hanken Grotesk** drives structural taxonomy, metadata counts ("3 fichas"), author bylines, and interactive controls with razor-sharp utilitarian clarity.

Typography scales linearly down on mobile screens for headlines to avoid clumsy wrapping on literary titles. Secondary labels use loose tracking (`+0.02em` to `+0.04em`) to ensure instant legibility against pitch-black backgrounds even at smaller font scales.

## Layout & Spacing

The spatial model balances compact indexical density with generous breath between thematic clusters:

- **Desktop (>= 1024px):** Employs a centered, reading-optimized max container width of `880px` to `1120px`. The 2-column thematic grid divides cards evenly with `1.5rem` gutters.
- **Mobile (< 768px):** Collapses into a single-column stacked index. Outer canvas margins reduce to `1rem` to prioritize content surface.
- **Vertical Rhythm:** Nested cards use tight internal row gaps (`space-sm` / `0.5rem`) within group modules, while thematic parent containers separate with `space-xl` (`2.25rem`) to maintain clear topical grouping.

## Elevation & Depth

Visual hierarchy does not use diffuse blurs or heavy drop shadows; depth is conveyed through **surface tiering and low-contrast borders**:

- **Canvas Base (`#0B0C0E`):** The primary deep foundation.
- **Layer 1 - Parent Card (`#121316`):** Contained by a solid 1px border of `#222429`. Serves as the overarching topical enclosure.
- **Layer 2 - Nested Item / Record Row (`#17191E` or transparent with `#1F2126` border):** Creates tactile containment for individual book references and index cards.
- **Layer 3 - Interactive Hover:** Transitions the background to `#1B1D23` and brightens the border from `#222429` to `#32353E`, accented by an optional gold micro-sheen on key icons.

## Shapes

The design system adopts a **level 2 roundedness** (`0.5rem` / `8px` baseline):

- **Main Parent Cards:** `rounded-lg` (`1rem` / `16px`) to frame comprehensive thematic sections cleanly.
- **Inner Work / Index Rows:** `rounded-md` (`0.5rem` / `8px`) to nest harmoniously inside parent containers without clipping.
- **Chips, Pills, and Tags:** `rounded-md` (`0.375rem` - `0.5rem`) to maintain compact, file-folder indexing aesthetics without resorting to overly rounded bubbles.

## Components

### Theme & Index Cards (Parent Containers)
- Surface: `#121316` with a uniform 1px solid border in `#222429`.
- Header: Features a distinct icon (e.g., Lucide `book-open` or `tag`) in `#D4AF37` or `#9E9E9E`, paired with Newsreader medium typography in `#EDEDED`.
- Padding: `1.5rem` desktop, `1rem` mobile.

### Interactive Work Rows
- Enclosed row components representing individual books (e.g., *A Morte de Ivan Ilitch*).
- Surface: `#121316` default, transitioning to `#181A20` on hover.
- Border: 1px solid `#1E2026`.
- Leading Icon: Book spine glyph in `#7E828E`.
- Trailing Control: Subtle directional chevron in `#4A4D57`.
- Hover behavior: Subtle 150ms border highlight to `#2E323B`, shifting the title color to pure white (`#FFFFFF`).

### Thematic Grid Badges & Counts
- Composed of a two-line cluster: Theme Name in `#EDEDED` (`title-md`) stacked over count metadata in `#9E9E9E` (`label-sm`, e.g., "3 fichas").
- Displayed in structured 2-column or 3-column subgrids within parent modules.

### Buttons & Quick Filters
- **Primary:** Antique Gold background (`#D4AF37`), dark graphite typography (`#0B0C0E`), semi-bold `label-md`.
- **Secondary / Ghost:** Transparent background, 1px border `#222429`, text `#EDEDED`, hovering to `#1C1D24`.

### Input Fields & Search Queries
- Surface: `#0E1013` with 1px border `#222429`. Focus ring: 1px border in `#D4AF37` with no heavy outer glow. Text rendered in `#EDEDED` with `#5A5D66` placeholder text.