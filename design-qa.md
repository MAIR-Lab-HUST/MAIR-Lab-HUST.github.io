# Join-Us Outline Design QA

- Source visual truth: `C:\Users\27923\AppData\Local\Temp\codex-clipboard-b9fdded2-8e44-4ca4-b05d-e4c01e2f1046.png`
- Implementation: `http://127.0.0.1:4173/#join`
- Desktop implementation screenshot: `C:\Users\27923\AppData\Local\Temp\join-us-outline-local-full-pass2.png`
- Mobile implementation screenshot: `C:\Users\27923\AppData\Local\Temp\join-us-outline-mobile-final.png`
- Side-by-side focused comparison: `C:\Users\27923\AppData\Local\Temp\join-us-outline-comparison-pass2.jpg`
- Desktop viewport: 1280 x 720, English, Join Us anchor selected
- Mobile viewport: 390 x 844, English, Join Us anchor selected

## Full-view comparison evidence

The implementation preserves the reference's restrained black-on-white editorial treatment, thin major-section rules, uppercase numbered eyebrow, sans-serif opportunity titles, muted body copy, and generous but controlled section spacing. The lab-level Join Us heading and lead remain above the referenced opportunity outline because they are part of the existing homepage hierarchy.

The reference uses two columns for opportunity details. The implementation intentionally uses one vertical column because the user's final instruction explicitly requires the AIM3-style single-line reading flow.

## Focused region comparison evidence

The side-by-side comparison aligns the top rule, `01 / Graduate Applicants` eyebrow, opportunity title, introduction, `What we value` heading, and first detail group. After the second pass, the title scale and paragraph gaps closely match the source while preserving the requested single-column order.

## Required fidelity surfaces

- Fonts and typography: Inter/body styling, weights, line heights, uppercase tracking, and the title hierarchy match the reference closely. The existing Instrument Serif remains limited to the lab-level `Join Us` heading.
- Spacing and layout rhythm: Major rules, article padding, title-to-intro spacing, subsection spacing, and list rhythm match the source. All detail lists use one 920px desktop track and one mobile track.
- Colors and visual tokens: White background, near-black headings, muted secondary copy, and low-contrast rules are consistent with the source and existing site tokens.
- Image quality and asset fidelity: This section contains no image assets or non-standard icons.
- Copy and content: Existing English and Chinese MAIR Lab copy is preserved. The English reference copy remains unchanged.
- Responsiveness: At 390px, the outline stays single-column with no horizontal overflow, clipping, or off-screen content.

## Comparison history

### Pass 1

- P2: Opportunity title was visibly larger than the normalized reference.
- P2: Introductory paragraph and subsection gaps were too loose.
- Fixes: Reduced the desktop title scale, paragraph size, title-to-intro gap, subsection margin, list gap, and item size.

### Pass 2

- Post-fix evidence: `join-us-outline-comparison-pass2.jpg` shows aligned title hierarchy and substantially closer vertical rhythm.
- The remaining two-column versus one-column difference is intentional and directly required by the user.
- No actionable P0, P1, or P2 findings remain.

## Primary interactions tested

- English/Chinese language switching
- Join Us navigation anchor
- Responsive layout at desktop and 390px mobile
- Browser console checked with no errors

## Follow-up polish

No blocking follow-up items.

## News layout QA

- Source visual truth: `C:\Users\27923\AppData\Local\Temp\codex-clipboard-a7c0d8e1-c0cd-431a-bc58-f2c77f666ad4.png`
- Desktop implementation capture: `C:\Users\27923\AppData\Local\Temp\news-layout-full-pass1.png`
- Focused side-by-side comparison: `C:\Users\27923\AppData\Local\Temp\news-layout-comparison-final2.jpg`
- Mobile implementation capture: `C:\Users\27923\AppData\Local\Temp\news-layout-mobile-final.png`

The News section now follows the target's three-column information row: category at left, blue linked title with a supporting sentence in the center, and date right-aligned. The normalized comparison confirms the same hierarchy, row rules, and right-edge date alignment. Existing section heading and site width are retained as intentional homepage context.

- Fonts and typography: linked title, muted supporting copy, category label, and date retain the target's clear primary-secondary hierarchy.
- Spacing and layout rhythm: each row has controlled top and bottom padding; descriptions sit directly beneath their title without introducing cards or extra ornament.
- Colors and visual tokens: white field, blue links, dark supporting copy, and faint gray rules match the supplied reference.
- Image quality and asset fidelity: no images or custom icons are involved in this section.
- Copy and content: all three English and Chinese news entries now include matching one-line summaries.
- Responsiveness: at 390px, the date moves beneath the middle column and the third row expands to 108px without horizontal overflow.
- Console errors: none.

No actionable P0, P1, or P2 differences remain.

final result: passed
