# Homepage content

The homepage sections are generated from this directory at Vite build time.

- `site.toml` controls section headings, localized labels, publication display metadata, images, and links.
- `news/<language>/*.md` contains one news item per file.
- `research/<language>/*.md` contains one research area per file.
- `join/<language>/*.md` contains one join-us opportunity per file.
- `people/<language>/*.md` contains one member category per file. Edit the Markdown list in each file to add names, links, and short descriptions.
- `publications.bib` contains standard publication titles, authors, venues, years, and URLs. Publication display metadata is keyed by the same BibTeX citation key under `[publication.<key>]` in `site.toml`.

Markdown files use TOML front matter between `+++` delimiters. Add or delete a file to add or delete an item; `order` controls its position. Keep matching English and Chinese files when both languages should show the same set of entries.
