---
name: Precision Industrial Performance
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#a73a00'
  on-secondary: '#ffffff'
  secondary-container: '#fd651e'
  on-secondary-container: '#571a00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001d31'
  on-tertiary-container: '#188ace'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:      { fontFamily: Chivo, fontSize: 48px, fontWeight: '800', lineHeight: 56px, letterSpacing: -0.03em }
  headline-lg:  { fontFamily: Chivo, fontSize: 36px, fontWeight: '700', lineHeight: 44px, letterSpacing: -0.02em }
  headline-lg-mobile: { fontFamily: Chivo, fontSize: 28px, fontWeight: '700', lineHeight: 36px, letterSpacing: -0.02em }
  headline-md:  { fontFamily: Chivo, fontSize: 24px, fontWeight: '700', lineHeight: 32px, letterSpacing: -0.01em }
  headline-sm:  { fontFamily: Chivo, fontSize: 20px, fontWeight: '600', lineHeight: 28px, letterSpacing: 0em }
  title:        { fontFamily: Inter, fontSize: 16px, fontWeight: '600', lineHeight: 24px, letterSpacing: -0.01em }
  body-lg:      { fontFamily: Inter, fontSize: 16px, fontWeight: '400', lineHeight: 24px, letterSpacing: 0em }
  body-md:      { fontFamily: Inter, fontSize: 14px, fontWeight: '400', lineHeight: 20px, letterSpacing: 0em }
  body-sm:      { fontFamily: Inter, fontSize: 12px, fontWeight: '400', lineHeight: 16px, letterSpacing: 0em }
  spec-code:    { fontFamily: JetBrains Mono, fontSize: 13px, fontWeight: '500', lineHeight: 18px, letterSpacing: -0.02em }
  spec-code-sm: { fontFamily: JetBrains Mono, fontSize: 11px, fontWeight: '500', lineHeight: 14px, letterSpacing: 0.02em }
  label-caps:   { fontFamily: Chivo, fontSize: 11px, fontWeight: '700', lineHeight: 14px, letterSpacing: 0.08em }
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies high-tolerance engineering, mechanical clarity, and unyielding reliability. Built for an automotive parts marketplace, the aesthetic balances utilitarian industrial workshop precision with modern digital commerce velocity. It targets automotive enthusiasts, fleet technicians, and DIY mechanics who demand exact fitment validation and zero ambiguity.

The visual direction fuses High-Contrast Precision with Industrial Minimalism:
- **Structural Integrity:** Crisp lines, architectural component structures, and uncompromising alignment simulate technical blueprints and precision machining.
- **Engineered Utilitarianism:** Information architecture prioritizes technical specifications, stock verification, and mechanical fitment indicators over ornamental flourishes.
- **Controlled Velocity:** High-visibility performance orange acts as a singular, decisive call to action and critical status beacon against dense, durable slate tones.

## Colors

- **Primary (`#0F172A` / `#1E293B`):** Deep Slate and Structural Charcoal. Primary typography, structural headers, high-contrast toolbars, primary technical containers.
- **Secondary (`#EA580C` / `#F97316`):** Performance Amber & Ignition Orange. Strictly for high-priority actions, primary conversion buttons, sale highlights, critical fitment alerts.
- **Tertiary (`#0284C7`):** Precision Spec Blue. Technical schematics, part diagrams, OEM verification badges, hyperlinked part reference numbers.
- **Neutral (`#F8FAFC` to `#64748B`):** Canvas `#F8FAFC`, surfaces `#FFFFFF`, dividers `#E2E8F0`, muted metadata `#64748B`.
- **Semantic Feedback:**
  - *Fitment Guaranteed (Success):* Emerald `#059669` on `#ECFDF5`.
  - *Does Not Fit (Danger):* Crimson `#DC2626` on `#FEF2F2`.
  - *Universal Fit (Warning/Notice):* Amber `#D97706`.

## Typography

- **Headlines (Chivo):** Assertive, machined grotesque with sharp terminals.
- **Body Text (Inter):** Neutral, tuned for dense screens.
- **Technical & Tabular Data (JetBrains Mono):** SKUs, OEM part numbers, VINs, dimensions, tolerances, pricing, stock counters. Tabular numerals.
- **Case Rule:** Technical metadata labels (`OEM EQUIVALENT`, `BOLT PATTERN`, `FITMENT VERIFIED`) use `label-caps` uppercase with tracking.

## Layout & Spacing

- **Desktop (1280px+):** 12 columns, 24px gutters, 32px margin. Fixed 280px filter sidebar + 3–4 card product matrix.
- **Tablet (768px – 1279px):** 8 columns, 16px gutters, 24px margins. Filters collapse into a drawer. 2-column matrix.
- **Mobile (< 768px):** 4 columns, 12px gutters, 16px margins. Compact vertical lists.
- **Rhythm:** 8px base, 4px sub-rhythm for chips and badges.
- **Fitment Dock:** The Vehicle Selector stays anchored above the product grid.

## Elevation & Depth

- **Level 0:** Canvas `#F8FAFC`.
- **Level 1 (Cards):** `#FFFFFF`, 1px `#E2E8F0`, shadow `0 1px 3px rgba(15,23,42,.06), 0 1px 2px rgba(15,23,42,.04)`.
- **Level 2 (Hover/Dropdowns):** border `#CBD5E1`, shadow `0 4px 6px -1px rgba(15,23,42,.08), 0 2px 4px -2px rgba(15,23,42,.06)`.
- **Level 3 (Sticky selector/Modals):** `0 10px 15px -3px rgba(15,23,42,.1), 0 4px 6px -4px rgba(15,23,42,.05)`, bottom border 1px `#CBD5E1`.
- **Fitment Confirmation:** 2px Emerald `#059669` border with ultra-light tint.

## Shapes

- **Micro (4px):** badges, OEM tags, inputs, checkboxes, segmented toggles.
- **Containers (6–8px):** product cards, selector modules, modals.
- **Pills / Circles:** only numeric counts and icon-only tooltips. No pill-shaped buttons.

## Components

1. **Vehicle Compatibility Selector ("Fitment Garage")** — [Year] > [Make] > [Model] > [Engine]. Empty: slate `#1E293B`. Loaded: bold vehicle description + `FITMENT GUARANTEED` badge + "Change Vehicle". Cards show `Fits Your <vehicle>` (Emerald) or `Universal Fitment` (Slate).
2. **Buttons** — Primary orange, white 700 text, 4px radius, focus ring `#FDBA74`. Secondary deep slate. Outline 1px `#CBD5E1`.
3. **Product Cards** — white, 1px `#E2E8F0`; brand + OEM/Aftermarket badges; 1:1 `#F1F5F9` image; title (max 2 lines), SKU in mono, rating + count, fit banner; footer price in tabular mono, stock, primary action.
4. **Badges** — OEM Verified: mono uppercase, `#0F172A` bg, `#38BDF8` border. Aftermarket: `#F1F5F9` bg, `#475569` text, `#CBD5E1` border. Fitment Match: `#ECFDF5` bg, `#047857` text, check prefix.
5. **Faceted Filters** — `label-caps` accordion headers; 16px squared checkboxes, `#0F172A` fill; slate range rails with orange active bar; `(count)` in `spec-code-sm`, right-aligned.
6. **Star Ratings** — 14px angular stars, `#F97316` active / `#E2E8F0` inactive, decimal rating + `(248)`.

## Implementation notes (this project)

- The prose palette (slate/orange/emerald) is the source of truth; the Material-style frontmatter tokens are kept for reference.
- Primary button fill uses `#C2410C` (the documented hover shade) so white 16px text clears WCAG AA 4.5:1; `#EA580C` is used for non-text accents (slider bar, icon tiles, focus ring offset, active nav underline).
