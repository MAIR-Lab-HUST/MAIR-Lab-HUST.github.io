**Design QA — Homepage information restructure**

- source visual truth paths:
  - `C:\Users\27923\AppData\Local\Temp\codex-clipboard-7989595f-2401-4caf-92a4-a1669e3fcad2.png` — four-card Research layout
  - `C:\Users\27923\AppData\Local\Temp\codex-clipboard-ab6c3e7f-0b9e-4edb-a199-f34b5d6b98cf.png` — compact News list
  - `C:\Users\27923\AppData\Local\Temp\codex-clipboard-f9f95b8e-39d9-4c1c-bda6-ff521831b112.png` — large publication title and black square badge
- Lazyweb report: `https://www.lazyweb.com/report/lazyweb/c8654a0b-88c0-4484-9f59-f514344eae29/?source=create`
- implementation URL: `http://127.0.0.1:4173/`
- desktop implementation screenshots:
  - `D:\MAIR-Lab-HUST.github.io\.lazyweb\image-to-code\homepage-restructure-2026-07-11\news-desktop.png`
  - `D:\MAIR-Lab-HUST.github.io\.lazyweb\image-to-code\homepage-restructure-2026-07-11\research-desktop-2.png`
  - `D:\MAIR-Lab-HUST.github.io\.lazyweb\image-to-code\homepage-restructure-2026-07-11\join-before-publications.png`
  - `D:\MAIR-Lab-HUST.github.io\.lazyweb\image-to-code\homepage-restructure-2026-07-11\publications-desktop-final.png`
- mobile implementation screenshots:
  - `D:\MAIR-Lab-HUST.github.io\.lazyweb\image-to-code\homepage-restructure-2026-07-11\research-mobile.png`
  - `D:\MAIR-Lab-HUST.github.io\.lazyweb\image-to-code\homepage-restructure-2026-07-11\publications-mobile-final.png`
- desktop viewport: `1280 × 720`
- mobile viewport: `390 × 844`
- state: homepage, News / Research / Join Us / Publications sections and publication rows 1–3

**Full-view comparison evidence**

- The Research reference, News reference, publication-title/badge reference, and final desktop/mobile implementation captures were opened together in one comparison input.
- The implementation now uses the requested hierarchy: compact News followed by the three large headings Research, Join Us, and Publications.
- Selected Work, its category strip, Open Source, and Vision are absent.

**Focused region comparison evidence**

- The publication screenshots verify title scale, badge shape/color, metadata typography, link-strip size, and figure/content height matching.
- The Research desktop/mobile screenshots verify four rounded cards on desktop and a clean one-column stack at 390px.
- The Join Us transition screenshot verifies Join Us appears immediately before Publications.

**Required fidelity surfaces**

- Fonts and typography: Instrument Serif remains the display face and Inter remains the body face. Publication titles now use a 36–50px balanced scale on desktop and 40px on mobile. Author, description, and link text were enlarged for readability.
- Spacing and layout rhythm: Research uses four equal rounded cards. Every publication uses a two-column row with its figure on the left and content on the right; the figure stretches with the row height. Mobile stacks figure before content without horizontal overflow.
- Colors and tokens: The site remains white, black, neutral gray, and MAIR blue. Publication badges are now `#111` with white text, 0px corner radius, and a black-and-white editorial treatment.
- Image quality and asset fidelity: Real I2E, TMPO, and SciIR figures are used. Desktop figures are contained inside row-height frames; mobile figures preserve native aspect ratios.
- Copy and content: News contains lab announcements only. Publications contains only SciIR, TMPO, and I2E paper entries, ordered June → May → January 2026. Open-source-only entries were removed.
- Responsiveness and accessibility: Mobile `scrollWidth` equals the 390px viewport. Figures include descriptive alt text, publication figures have accessible link labels, and publication links are explicit.

**Comparison history**

1. Pass 1 — blocked by P1 information hierarchy drift.
   - Earlier finding: the page retained five generic large sections and a separate Selected Work module mixing papers and open-source projects.
   - Fixes: reduced the page to Research, Join Us, and Publications; changed Latest to News; removed Selected Work, Open Source, Vision, and project-only entries.
   - Post-fix evidence: `news-desktop.png`, `research-desktop-2.png`, and `publications-desktop-final.png`.

2. Pass 2 — blocked by P2 publication metadata treatment.
   - Earlier finding: the publication metadata appeared above titles and used blue/rounded styling during the first iteration.
   - Fixes: moved a single badge below each title, changed it to black with white text, increased the type, and set the corner radius to 0px.
   - Post-fix evidence: `publications-desktop-final.png` and `publications-mobile-final.png`.

3. Pass 3 — blocked by P2 row consistency.
   - Earlier finding: publication rows alternated figure placement and fixed figure aspect ratios did not follow variable text height.
   - Fixes: placed all figures on the left, all titles/content on the right, and changed the grid to stretch each figure frame to its row height.
   - Post-fix evidence: `publications-desktop-final.png`.

4. Pass 4 — blocked by P2 hierarchy/readability polish.
   - Earlier finding: publication titles, author lines, descriptions, and link labels were too small; Join Us followed Publications.
   - Fixes: enlarged publication typography and controls, balanced title wrapping, and moved Join Us before Publications in both page and navigation order.
   - Post-fix evidence: `join-before-publications.png`, `publications-desktop-final.png`, and `publications-mobile-final.png`.

5. Pass 5 — passed.
   - No actionable P0, P1, or P2 differences remain.

**Primary interactions tested**

- Header navigation links for Research, Join Us, and Publications scroll to the correct sections.
- Verified three publication records, nine external publication links, and four Research cards.
- Verified every publication figure is the first grid child; no alternating rows remain.
- Verified computed badge styling: black background, white text, 0px radius, 11px desktop type.
- Browser console warnings/errors checked: none.
- `npm run build:pages` passed; root Pages assets were synchronized and `/TMPO/` remains present.

**Findings**

- No remaining actionable P0, P1, or P2 findings.

**Open Questions**

- None.

**Implementation Checklist**

- [x] News replaces Latest
- [x] Four responsive Research cards
- [x] Join Us before Publications
- [x] Publications only, newest first
- [x] All figures left and content right on desktop
- [x] Figure height follows publication row height
- [x] Large balanced titles
- [x] Black square badges with larger white text
- [x] Larger author, description, and link typography
- [x] Desktop and mobile visual verification
- [x] Production Pages build passes

**Follow-up Polish**

- No blocking polish remains.

final result: passed
