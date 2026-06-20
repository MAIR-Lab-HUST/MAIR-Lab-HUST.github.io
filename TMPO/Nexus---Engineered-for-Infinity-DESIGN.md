---
version: "alpha"
name: "Nexus - Engineered for Infinity"
description: "Nexus Engineered Login Section is designed for authenticating users through a focused access flow. Key features include reusable structure, responsive behavior, and production-ready presentation. It is suitable for authentication screens in web products."
colors:
  primary: "#f74816"
  secondary: "#FFFFFF"
  tertiary: "#0A45FF"
  neutral: "#FFFFFF"
  background: "#FFFFFF"
  surface: "#FFFFFF"
  text-primary: "#A3A3A3"
  text-secondary: "#FFFFFF"
  border: "#FFFFFF"
  accent: "#f74816"
typography:
  display-lg:
    fontFamily: "System Font"
    fontSize: "72px"
    fontWeight: 300
    lineHeight: "72px"
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: "System Font"
    fontSize: "18px"
    fontWeight: 200
    lineHeight: "28px"
  label-md:
    fontFamily: "System Font"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: "20px"
rounded:
  md: "0px"
  full: "9999px"
spacing:
  base: "8px"
  sm: "2px"
  md: "8px"
  lg: "12px"
  xl: "14px"
  gap: "8px"
  section-padding: "40px"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "8px"
  button-secondary:
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "12px"
  button-link:
    textColor: "{colors.text-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "0px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Full Bleed
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses dark mode with #f74816 as the main accent and #FFFFFF as the neutral foundation.

- **Primary (#f74816):** Main accent and emphasis color.
- **Secondary (#FFFFFF):** Supporting accent for secondary emphasis.
- **Tertiary (#0A45FF):** Reserved accent for supporting contrast moments.
- **Neutral (#FFFFFF):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #FFFFFF; Surface: #FFFFFF; Text Primary: #A3A3A3; Text Secondary: #FFFFFF; Border: #FFFFFF; Accent: #f74816

## Typography

Typography relies on System Font across display, body, and utility text.

- **Display (`display-lg`):** System Font, 72px, weight 300, line-height 72px, letter-spacing -0.025em.
- **Body (`body-md`):** System Font, 18px, weight 200, line-height 28px.
- **Labels (`label-md`):** System Font, 14px, weight 300, line-height 20px.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, full bleed structural frame before changing ornament or component styling. Use 8px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / full bleed composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Full Bleed
- **Base unit:** 8px
- **Scale:** 2px, 8px, 12px, 14px, 20px, 24px, 40px, 53px
- **Section padding:** 40px
- **Gaps:** 8px, 12px, 16px, 20px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 0.67px #FFFFFF
- **Shadows:** rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.6) 0px 8px 32px -8px
- **Blur:** 24px

## Shapes

Shapes rely on a tight radius system anchored by 9999px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles.

### Buttons
- **Primary:** background #FFFFFF, text #000000, radius 9999px, padding 8px, border 0px solid rgb(229, 231, 235).
- **Secondary:** text #FFFFFF, radius 9999px, padding 12px, border 0.666667px solid rgba(255, 255, 255, 0.1).
- **Links:** text #A3A3A3, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 8px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected minimal motion intensity without a deliberate reason.

## Motion

Motion stays restrained and interface-led across text, layout, and scroll transitions. Timing clusters around 150ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on text and color changes.

**Motion Level:** minimal

**Durations:** 150ms

**Easings:** ease, cubic-bezier(0.4, 0, 0.2, 1)

**Hover Patterns:** text, color

## WebGL

Reconstruct the graphics as a full-bleed background field using canvas-backed effect. The effect should read as technical, meditative, and atmospheric: dot-matrix particle field with gray monochrome and moderate spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** WebGL

**Insights:**
  - **Scene:**
    - **Value:** Full-bleed background field
  - **Effect:**
    - **Value:** Dot-matrix particle field
  - **Primitives:**
    - **Value:** Dot particles + soft depth fade
  - **Motion:**
    - **Value:** Slow breathing pulse
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** Canvas-backed effect

**Techniques:** Dot matrix, Breathing pulse, Pointer parallax, Noise fields, DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- Animated WebGL/Canvas Background -->
      <canvas id="grid-canvas" class="absolute inset-0 z-0 pointer-events-none opacity-90"></canvas>

      <!-- Floating Glass Header Navigation -->
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      // Inline Canvas script to generate the pixelated particle wave effect
      const canvas = document.getElementById('grid-canvas');
      const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for solid background

      let width, height;
      let particles = [];
      // Responsive grid settings
      let size, gap, cols, rows;
      …
      ```
