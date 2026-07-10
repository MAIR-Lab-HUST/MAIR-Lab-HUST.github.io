# Design QA — Latest Strip

Reference: `.lazyweb/image-to-code/latest-strip-2026-07-10/latest-strip-spec.jpg`  
Final comparison: `.lazyweb/image-to-code/latest-strip-2026-07-10/latest-strip-final-comparison.png`

## Comparison history

- Pass 1 — P1 fidelity: the extracted MAIR signature was too wide and the display title was horizontally oversized. Fixed the source-image crop and title scale in `app/src/index.css`.
- Pass 2 — P1 layout: the Latest/content boundary and lower section dividers did not land on the reference coordinates. Re-measured the 1400 × 1074 mockup and matched the Latest block, section dividers, footer, and total page height.
- Pass 3 — P2 asset alignment: refined the MAIR/HUST lockup proportions and optical offset while retaining the user-supplied logo assets.

## Final verification

- Desktop reference geometry: 1074px page height; 463px video; 418px content strip; divider positions matched.
- Typography: Instrument Serif display treatment and Inter 400/500 body treatment verified.
- Assets: supplied MAIR and HUST logos used; original-color video is playing with `filter: none`; no red overlay or red filter.
- Content: I2E, TMPO, and SciIR appear in Latest with the requested external links.
- Behavior: navigation anchor tested; external links have valid targets; desktop console has no errors.
- Responsive checks: 768px and 390px viewports have zero horizontal overflow; mobile rows reflow without clipping.
- Build: `npm run build` and `npm run build:pages` both pass.

final result: passed
