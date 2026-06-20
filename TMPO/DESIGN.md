---
version: alpha
name: TMPO Diffusion Project Page
description: A cinematic academic project-page design system for diffusion-model research, balancing a black gallery-like hero with precise white research documentation surfaces.
colors:
  primary: "#4338F5"
  on-primary: "#FFFFFF"
  primary-container: "#F0EFFF"
  on-primary-container: "#2026C8"
  secondary: "#f74816"
  on-secondary: "#FFFFFF"
  secondary-container: "#151024"
  on-secondary-container: "#F4F1FA"
  tertiary: "#f74816"
  on-tertiary: "#080A10"
  tertiary-container: "#2A1408"
  on-tertiary-container: "#FFD9C4"
  background: "#FFFFFF"
  on-background: "#101525"
  surface: "#FFFFFF"
  on-surface: "#101525"
  surface-dim: "#F6F7FF"
  surface-container-lowest: "#FFFFFF"
  surface-container-low: "#FAFBFF"
  surface-container: "#F7F8FF"
  surface-container-high: "#EEF2FF"
  surface-container-highest: "#DFE4F1"
  inverse-surface: "#000000"
  inverse-on-surface: "#EEF2FF"
  dark-canvas: "#000000"
  dark-surface: "#07090F"
  dark-surface-container: "#080A10"
  dark-surface-container-high: "#11141D"
  dark-on-surface: "#F4F1FA"
  dark-on-surface-variant: "#C9C9D2"
  outline: "#DFE4F1"
  outline-variant: "#EBEFF8"
  muted: "#596174"
  muted-dark: "#ABB4C8"
  info: "#f74816"
  success: "#65A867"
  compare-purple: "#f74816"
  error: "#EF4438"
  warning: "#f74816"
typography:
  display-xl:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 6.2rem
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: 0em
  display-lg:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 4.28rem
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: 0em
  headline-lg:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 4.1rem
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: 0em
  headline-md:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 2rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: 0em
  title-md:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 1.16rem
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: 0em
  body-lg:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 1.24rem
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  body-md:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  body-sm:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 0.89rem
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  label-caps:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 0.82rem
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: 0.08em
  label-sm:
    fontFamily: "Styrene B, system-ui, sans-serif"
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0.08em
  mono-sm:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: 0.04em
  formula-md:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: 1.1rem
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0em
spacing:
  unit: 8px
  micro: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section-x: 72px
  section-y: 80px
  max-content: 1496px
  max-reading: 760px
  hero-safe-x: 20px
  card-padding-sm: 16px
  card-padding-md: 22px
  card-padding-lg: 34px
rounded:
  none: 0px
  xs: 2px
  sm: 7px
  md: 8px
  lg: 10px
  xl: 14px
  nav: 20px
  pill: 9999px
elevation:
  none: "none"
  hairline: "0 0 0 1px #DFE4F1"
  low: "0 8px 18px #38447C0F"
  medium: "0 14px 34px #252D5814"
  high: "0 20px 52px #252D581A"
  nav-glass: "0 18px 45px #252D581F, inset 0 1px 0 #FFFFFFD1"
  dark-card: "0 22px 54px #1014232E"
  image-tile: "0 18px 46px #00000042"
shadows:
  soft-panel: "0 14px 34px #252D5814"
  hover-lift: "0 16px 30px #4438F547"
  glass-inner: "inset 0 1px 0 #FFFFFFD1"
  text-on-image: "0 18px 44px #000000F5, 0 2px 18px #000000D1"
motion:
  duration-fast: 420ms
  duration-medium: 620ms
  duration-slow: 920ms
  duration-cinematic: 1500ms
  easing-soft: "cubic-bezier(0.32, 0.72, 0, 1)"
  easing-snap: "cubic-bezier(0.22, 1, 0.36, 1)"
  easing-heavy: "cubic-bezier(0.16, 1, 0.3, 1)"
  scroll-grid-perspective: 1500px
  reveal-distance: 42px
  hover-lift-distance: -3px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    height: 44px
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "#f74816"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    height: 44px
    padding: "0 24px"
  navigation-glass:
    backgroundColor: "#FFFFFFC2"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.nav}"
    height: 62px
    padding: "0 24px"
  abstract-panel:
    backgroundColor: "#FFFFFFDB"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-padding-md}"
  research-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.card-padding-lg}"
  dark-comparison-panel:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-padding-md}"
  formula-box:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.formula-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  metric-list-item:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  image-tile:
    backgroundColor: "{colors.dark-surface-container-high}"
    rounded: "{rounded.sm}"
    size: 1fr
---

# Design System: TMPO Diffusion Project Page

## Overview

The TMPO interface is a cinematic research-gallery page: an austere black opening sequence gives way to precise academic explanation, diagrammatic method surfaces, quantitative result panels, and dark image-comparison stages. It should feel like a NeurIPS project page that has been art-directed rather than merely formatted.

The emotional target is controlled technical drama. The hero behaves like a projection room: black canvas, centered white typography, violet emphasis, photographic grids, and heavy text shadows. The body behaves like a paper companion: calm white panels, measured borders, readable figures, and method diagrams that prioritize clarity over decoration.

Density is medium-high. The site can show many authors, metrics, figures, formulas, and comparison images, but each region must maintain generous gutters and clear containment. Motion intensity is high in the hero and comparison moments, medium in cards and diagrams, and low for long-form reading.

## Colors

The palette has two modes that must coexist without feeling like separate products.

- **Black Projection Canvas (#000000):** The opening and image-comparison environment. Use it for immersive diffusion-image storytelling, not for every section.
- **Paper Surface (#FFFFFF):** Main reading surface for abstract, method, results, citations, and figure panels.
- **TMPO Violet (#4338F5):** Primary identity color for actions, active states, method step markers, superscripts, and important numeric emphasis.
- **Luminous Violet (#f74816):** Dark-mode and hero accent used against black. It should glow through color contrast, not through fuzzy neon shadows.
- **Flow Orange (#f74816):** Comparison accent for Flow-GRPO and branching/trajectory contrast. It is a secondary semantic accent, not a competing brand color.
- **Ink (#101525):** Primary text in light sections.
- **Muted Slate (#596174):** Body descriptions, metadata, affiliations, and explanatory captions.
- **Whisper Lines (#DFE4F1 / #EBEFF8):** Hairline structure around cards, diagrams, figures, and navigation.

Avoid introducing additional saturated colors unless they represent data series in a figure. Data colors may include calibrated blue, green, purple, red, and orange, but they should stay inside charts, legends, and diagrams.

## Typography

Typography is built around a geometric grotesk voice with a restrained editorial accent.

- **Display and interface text:** Styrene B or a close geometric grotesk. It should feel precise, engineered, and contemporary. Use weight and scale for hierarchy; do not use letter-spacing tricks on large headings.
- **Hero title:** Large, centered, dense, and confident. The line-height is tight, but text must never overlap. Violet or gradient emphasis may be used sparingly on the project acronym.
- **Body copy:** Styrene B regular, medium line height, muted slate in light sections and soft gray in dark sections.
- **Labels and metadata:** Uppercase or compact label styling with 0.08em letter spacing, used for method labels, comparison headers, and small technical annotations.
- **Mathematical formulas:** A serif math voice is acceptable for equations and only equations. Do not use generic serif typography for narrative headings or UI labels.

Keep all text crisp. Avoid playful type treatments, exaggerated tracking, or marketing-style hero copy. This is a research artifact with cinematic presentation, not a SaaS landing page.

## Layout

The layout alternates between full-bleed cinematic sections and contained research documentation.

- **Hero:** Full-width black stage with a centered title block and supporting authors/actions. The first screen is allowed to be dramatic and sparse.
- **Scroll-universe stage:** Full-width, black, image-led, and motion-heavy. Image grids can exceed the viewport width and use perspective, but text overlays must remain centered and readable.
- **Research sections:** Use max-width containment around 1496px, strong grid systems, and visible structural divisions. Large result areas may use full viewport width with internal padding.
- **Method board:** Dense multi-column grid: steps, tree diagram, and distribution cards. It should look like a live figure from the paper, not like unrelated marketing cards.
- **Comparison panels:** Dark contained stage with aligned TMPO and Flow-GRPO columns. Maintain strict row alignment so the comparison reads scientifically.
- **Mobile:** Collapse multi-column method/results layouts to single-column flows. If six image comparisons cannot fit, use a controlled horizontal scroll region with visible content, never squeezed unreadable thumbnails.

Use grid first. Avoid nested cards inside cards. When containment is needed, use one clear panel or a full-width band, then place repeated items directly inside it.

## Elevation & Depth

Depth is subtle and technical.

- **Glass navigation:** Use translucent white, 18-22px backdrop blur, a soft blue-gray shadow, and an inner top highlight. It should float without becoming decorative.
- **Light research cards:** Prefer hairline borders plus soft shadows. Shadows should be cool and low-opacity, never muddy.
- **Dark comparison panels:** Use dark tonal layers and thin borders. Let image content provide energy.
- **Hero overlays:** Use local dark masks or strong text shadows over image grids. Avoid full-screen overlays that flatten the image field.

Elevation should clarify hierarchy, not make the page feel like a stack of generic cards.

## Shapes

The shape language is lightly rounded and engineered.

- **Navigation:** 20px radius, pill-like but not bubbly.
- **Buttons and formula boxes:** 9-10px radius.
- **Research cards and abstract panels:** 8-14px radius.
- **Image tiles:** 7-8px radius, square or fixed-aspect, with sharp alignment.
- **Circular markers:** Use true circles for step numbers, tree nodes, and legend dots.

Do not mix very soft consumer-app rounding with sharp academic diagrams. Corners should feel deliberate and compact.

## Components

### Buttons

Primary buttons use violet fill with white text and subtle vertical gradient. Secondary buttons are white or dark ghost buttons with a hairline border. Hover lifts by about 3px and increases shadow; active states compress slightly. Icons should be stroke-based and aligned before text.

### Navigation

Navigation is a fixed, glassy bar with compact links. Active and hover states use a pale violet container and violet text. Keep labels short. The nav should support scanning without competing with the hero.

### Abstract and TL;DR Panels

Use semi-translucent white panels over the black lower hero area, with restrained blur and gentle shadows. The TL;DR icon can use the violet gradient treatment; supporting text remains dark ink and readable.

### Method Diagrams

Diagrams should use SVG-like precision: dashed trajectory lines, color-coded rows, small labels, and clean arrows. Formula surfaces use pale violet paper backgrounds and math typography. Step markers use circular violet tokens with a soft violet shadow.

### Metrics and Result Cards

Metric lists are compact, bordered, and scan-oriented. Strong values use violet. Descriptions use muted slate. Avoid decorative icons in result cards unless they encode a real scientific category.

### Image Comparison Stage

Comparison stages are dark and image-first. TMPO uses violet labels; Flow-GRPO uses orange labels. Rows must preserve a strict left method, center VS, right method rhythm. Emerging-image effects should use pixelated reveal, grid traces, and color sweep only when they help emphasize generative output.

### Citation and Code Cards

Citation cards are utilitarian and quiet. Use white surfaces, thin borders, small text, and monospace for BibTeX. Interaction affordance can be a slight lift and border tint.

## Do's and Don'ts

### Do

- Do preserve the black cinematic hero and image-led diffusion storytelling.
- Do use TMPO violet as the primary identity accent.
- Do use Flow orange only for comparison/contrast semantics.
- Do keep academic content readable, structured, and figure-like.
- Do use motion to reveal trajectories, image grids, and comparison samples.
- Do keep dense result sections aligned and easy to scan.
- Do use local masks or text shadows for image readability instead of global dimming.
- Do maintain high contrast on black sections and quiet borders on white sections.

### Don't

- Do not turn the page into a generic SaaS landing page.
- Do not add decorative blobs, orbs, or unrelated gradients.
- Do not introduce extra brand colors outside charts and method diagrams.
- Do not use oversized rounded cards or nested card stacks.
- Do not make the hero a left-right marketing split.
- Do not hide real images behind effects that can fail silently.
- Do not rely on placeholder imagery when paper figures or generated samples are available.
- Do not use emojis, playful copy, or casual consumer-app UI language.
- Do not flatten the scroll-universe image field with full-screen overlays.
- Do not let formulas, labels, or comparison grids overflow on mobile.

